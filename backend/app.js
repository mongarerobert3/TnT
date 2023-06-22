const express = require("express");
const connectDB = require("./config/db")
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const tourRoutes = require("./routes/tourRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const cors = require('cors');
const { auth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: '5Yt8H43UAPqEjhhFzEFv71PRuPpmLufnJxld1zepObblydFCGQr2k3lY2XkiQvVR5Yt8H43UAPqEjhhFzEFv71PRuPpmLufnJxld1zepObblydFCGQr2k3lY2XkiQvVR',
    baseURL: 'http://localhost:3000',
    clientID: 'FTk4Yx2kxUj5yyyl2Yhh0fKtUgrkaFMJ',
    issuerBaseURL: 'https://dev-fu78t5pi0oxgadcn.us.auth0.com'
};

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.use(cors());

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

//app.get("/", (req,res) => {
    //res.send("API Running!");
//});

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


app.use("/api/user", userRoutes);
app.use("/api/tour", tourRoutes);
app.use("/api/booking", bookingRoutes);


const PORT = process.env.PORT;

const server = app.listen(
    PORT,
    console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);
