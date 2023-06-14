const express = require("express");
const {
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
} = require("../controllers/tourControllers");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

const router = express.Router();

// Get all tours
router.route("/").get(allTours);

// Create a new tour
router.route("/").post(protect, isAdmin, createTour);

// Get a single tour by ID
router.route("/:id").get(getTourById);

// Update a tour by ID
router.route("/:id").put(protect, isAdmin, updateTour);

// Delete a tour by ID
router.route("/:id").delete(protect, isAdmin, deleteTour);

// Get tours by location
router.route("/location/:location").get(getToursByLocation);

// Get all locations
router.route("/locations").get(getAllLocations)

// Get tours by date
router.route("/date/:date").get(getToursByDate);

// Add review to tour
router.route("/:id/reviews").post(protect, addReview);

// Delete review from tour
router.route("/:id/reviews/:reviewId").delete(protect, isAdmin, deleteReview);

// Update review for tour
router.route("/:id/reviews/:reviewId").put(protect, updateReview);

// Hot tours
router.route("/hot-tours").get(getHotTours);


module.exports = router;
