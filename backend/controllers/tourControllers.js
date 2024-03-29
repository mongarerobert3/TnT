const asyncHandler = require("express-async-handler");
const Tour = require("../models/tourModel");

// @desc    Get all tours
// @route   GET /api/tours
// @access  Public
const allTours = asyncHandler(async (req, res) => {
  const tours = await Tour.find({});
  res.json(tours);
});

// @desc    Create a new tour
// @route   POST /api/tours
// @access  Private/Admin
const createTour = asyncHandler(async (req, res) => {
  const { name, description, imageCover, images, maxGroupSize, price, location, reviews, startDate, endDate, hot } = req.body;

  // Validate the input data
  if (!name || !description || !imageCover || !images || !maxGroupSize || !price || !location || !startDate || !endDate ) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  // Create the new tour
  const tour = new Tour({
    name,
    description,
    imageCover,
    images,
    maxGroupSize,
    price,
    location,
    reviews,
    startDate,
    endDate,
    hot,
  });

  // Save the tour to the database
  await tour.save();

  // Return the new tour as a response
  res.status(201).json(tour);
});


// @desc    Get a tour by ID
// @route   GET /api/tour/:id
// @access  Public
const getTourById = asyncHandler(async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id).populate({
      path: 'reviews',
      populate: {
        path: 'user',
        select: 'avatar',
      },
    });

    if (tour) {
      res.json(tour);
    } else {
      res.status(404);
      throw new Error('Tour not found');
    }
  } catch (error) {
    console.error('Error fetching tour by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// @desc    Update a tour
// @route   PUT /api/tour/:id
// @access  Private/Admin
const updateTour = asyncHandler(async (req, res) => {
  const tour = await Tour.findById(req.params.id);

  if (tour) {
    tour.name = req.body.name || tour.name;
    tour.description = req.body.description || tour.description;
    tour.location = req.body.location || tour.location;
    tour.startDate= req.body.startDate || tour.startDate;
    tour.endDate= req.body.endDate || tour.endDate;
    tour.price = req.body.price || tour.price;
    tour.image = req.body.image || tour.image;
    tour.availableSeats = req.body.availableSeats || tour.availableSeats;

    const updatedTour = await tour.save();
    res.json(updatedTour);
  } else {
    res.status(404);
    throw new Error("Tour not found");
  }
});

// @desc    Delete a tour
// @route   DELETE /api/tour/:id
// @access  Private/Admin
const deleteTour = asyncHandler(async (req, res) => {
  const deletedTour = await Tour.findByIdAndRemove(req.params.id);

  if (deletedTour) {
    res.status(200).json({ message: "Tour deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Tour not found");
  }
});

// @desc    Get tours by location
// @route   GET /api/tour/location/:location
// @access  Public
const getToursByLocation = asyncHandler(async (req, res) => {
  try {
    const searchString = req.params.location;
    const regex = new RegExp(searchString, 'i');

    const tours = await Tour.find({ location: { $regex: regex } });
    res.json(tours);
  } catch (error) {
    console.error('Error fetching tour bookings:', error);
    res.status(500).json({ message: 'Internal server error' });
  } 
});

// @desc    Get all tour locations & price
// @route   GET /api/tour/location
// @access  Public
const getAllLocations = async (req, res) => {
  try {
    const tours = await Tour.find({}, 'location price').exec();
    const locations = tours.map(tour => tour.location);
    const prices = tours.map(tour => tour.price);
    res.json({ locations, prices });
  } catch (error) {
    console.error('Error fetching tour locations and prices:', error);
    res.status(500).json({ message: 'Internal server error' });
  } 
};


// @desc    Get tours by date
// @route   GET /api/tour/date/:date
// @access  Public
const getToursByDate = asyncHandler(async (req, res) => {
  try {
    const tours = await Tour.find({ startDate: req.params.date });
    res.json(tours);
    console.log(tours);
  } catch (error) {
    console.error('Error fetching tour locations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// @desc     Add a review for a tour
// @route    POST /api/tou/:id/reviews
// @access   Private
const addReview = asyncHandler(async (req, res) => {
    const tour = await Tour.findById(req.params.id);
  
    if (!tour) {
      res.status(404);
      throw new Error("Tour not found");
    }
  
    const { rating, comment } = req.body;
  
    if (rating || comment) {
    
      const alreadyReviewed = tour.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
    
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("You already reviewed this tour");
      }
    }
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    tour.reviews.push(review);
    tour.numReviews = tour.reviews.length;
    tour.rating =
      tour.reviews.reduce((acc, r) => acc + r.rating, 0) / tour.numReviews;
  
    await tour.save();
  
    res.status(201).json({ message: "Review added successfully", review });
  });
  
// @description Delete review
// @route DELETE /api/tour/:tourId/reviews/:reviewId
// @access Private
const deleteReview = asyncHandler(async (req, res) => {
    const tour = await Tour.findById(req.params.tourId);
  
    if (!tour) {
      res.status(404);
      throw new Error("Tour not found");
    }
  
    const review = tour.reviews.find(
      (review) =>
        review._id.toString() === req.params.reviewId.toString() &&
        review.user.toString() === req.user._id.toString()
    );
  
    if (!review) {
      res.status(404);
      throw new Error("Review not found or user not authorized");
    }
  
    const index = tour.reviews.indexOf(review);
    tour.reviews.splice(index, 1);
    tour.numReviews = tour.reviews.length;
    tour.rating =
      tour.reviews.reduce((acc, item) => item.rating + acc, 0) / tour.reviews.length;
  
    await tour.save();
  
    res.json({ message: "Review deleted" });
  });
  
// @description Update review
// @route PUT /api/tour/:tourId/reviews/:reviewId
// @access Private
const updateReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const tour = await Tour.findById(req.params.tourId);

  if (!tour) {
    res.status(404);
    throw new Error("Tour not found");
  }

  const review = tour.reviews.find(
    (review) =>
      review._id.toString() === req.params.reviewId.toString() &&
      review.user.toString() === req.user._id.toString()
  );

  if (!review) {
    res.status(404);
    throw new Error("Review not found or user not authorized");
  }

  review.rating = rating || review.rating;
  review.comment = comment || review.comment;

  tour.rating =
    tour.reviews.reduce((acc, item) => item.rating + acc, 0) / tour.reviews.length;

  await tour.save();

  res.json({ message: "Review updated" });
});

// @description Get hot tours
// @route GET /api/tour/hot
// @access Public
const getHotTours = asyncHandler(async (req, res) => {
  try {
    const hotTours = await Tour.find({ hot: true });
    res.json(hotTours);
  } catch (error) {
    console.error('Error fetching hot tours:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = {
    allTours,
    createTour,
    getTourById,
    updateTour,
    deleteTour,
    getToursByLocation,
    getAllLocations,
    getToursByDate,
    addReview,
    deleteReview,
    updateReview,
    getHotTours,
}
