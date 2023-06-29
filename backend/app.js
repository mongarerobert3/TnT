const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const tourRoutes = require("./routes/tourRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const cors = require("cors");
const { auth } = require("express-oauth2-jwt-bearer");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Initialize the JWT middleware for authentication
const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

// This route doesn't need authentication
app.get('/api/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

// This route needs authentication
app.get('/api/private', jwtCheck, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

// Apply the JWT middleware to routes that require authentication
app.use("/api/user", jwtCheck, userRoutes);
app.use("/api/booking", jwtCheck, bookingRoutes);

app.use("/api/tour", tourRoutes);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () =>
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);
