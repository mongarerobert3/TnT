const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const {generateToken, generateVerificationToken} = require("../config/generateToken");
const nodemailer = require("nodemailer");

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const createUser = asyncHandler(async (req, res) => {
  const { avatar, coverImage, name, email, password, bio, role, isActive } = req.body;

  if (!name || !email ||!password) {
      res.status(400);
      throw new Error("Please enter all the fields")
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
      res.status(400);
      throw new Error("User already exists");
  }

  const user = await User.create({
      avatar,
      coverImage,
      name,
      email,
      password,
      bio,
      role,
      isActive,
  });
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      coverImage:user.coverImage,
      bio: user.bio,
      role: user.role,
      isActive: user.isActive,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
}); 

//@description     verify a user
//@route           PUT /api/user/verify
//@access          Private
const verifyAccount = asyncHandler(async (req, res) => {
  try {
    const { token } = req.params;

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Generate verification token
    const verificationToken = generateVerificationToken();

    // Send verification email
    const user = await User.findById(userId);
    const transporter = nodemailer.createTransport({
      // Configure your email provider settings here
    });

    const mailOptions = {
      from: "toursntravel@gmail.com",
      to: user.email,
      subject: "Account Verification",
      text: `Hello ${user.name},\n\nPlease click on the following link to verify your account:\n\n${verificationToken}`,
    };

    await transporter.sendMail(mailOptions);

    // Update the user's verification status
    user.isVerified = true;
    await user.save();

    res.status(200).json({
      message: "Account verified successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//@description     Authenticate a Users 
//@route           GET /api/user/
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    res.status(200).json({
      _id: user._id,
      token: token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or password");
  }
});

//@description     get all Users 
//@route           GET /api/user/
//@access          Private
const getAllUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
  ? {
    $or: [
      { name: {$regex: req.query.search, $options: "i"} },
      { email: { $regex: req.query.search, $options: "i"} },
    ],
  }
  : {};

  const users = (await User.find( {...keyword, _id: {$ne: req.user._id } }));

  res.status(200).json(users);
});

//@description     get a user by email 
//@route           GET /api/user/:email
//@access          Private
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

//@description     get user by id
//@route           GEt /api/user/:id/deactivate
//@access          Private
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@description     Update user password
//@route           PUT /api/reset/:id
//@access          Private

const updateUserPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    const newPassword = req.body.newPassword;

    // Compare the new password with the old password
    if (newPassword && user.password) {
      const isSamePassword = await user.matchPassword(newPassword);
      if (isSamePassword) {
        return res.status(400).json({ message: "Please use a new password, not the old one" });
      }
    } else {
      return res.status(400).json({ message: "Invalid password data" });
    }

    user.password = newPassword;

    await user.save();

    res.json({ message: "Password updated successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});



//@description     update user details
//@route           PUT /api/user/update/:id
//@access          Private

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    for (const field in req.body) {
      if (Object.hasOwnProperty.call(req.body, field)) {
        user[field] = req.body[field];
      }
    }

    const updatedUser = await user.save();

    return res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
});


//@description     delete user
//@route           DELETE /api/user/:id
//@access          Private
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(404).json({ message: "No User"})
    }

    const user = await User.findByIdAndRemove(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", deletedUser: user })

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//@description     deactivateUser user
//@route           POST /api/user/:id/deactivate
//@access          Public
const deactivateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
  
    if (!req.user.isAdmin && req.user.id !== user.id) {
      res.status(401);
      throw new Error("Not authorized to deactivate this user account");
    }
  
    user.isActive = false;
  
    await user.save();
  
    res.status(200).json({
      message: "User account deactivated successfully",
    });
});
  
//@description     Reactivate user
//@route           POST /api/user/:id/deactivate
//@access          Public
const reactivateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
  
    if (user.isActive) {
      res.status(400);
      throw new Error("User account is already active");
    }
  
    if (req.user.role !== "admin" && req.user._id.toString() !== user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to reactivate this account");
    }
  
    user.isActive = true;
    const updatedUser = await user.save();
  
    res.status(200).json(updatedUser);
});
  
module.exports = {
  createUser, 
  verifyAccount,
  authUser,
  deactivateUser,
  reactivateUser, 
  getAllUsers, 
  getUserByEmail,
  getUser,
  updateUser,
  updateUserPassword,
  deleteUser,
}
