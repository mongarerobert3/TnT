const express = require('express');
const { 
    createTourBooking,
    getAllTourBookingsForUser,
    getAllTourBookings,
    getTourBookingById,
    updateTourBooking,
    updateTourBookingPaymentStatus,
    cancelTourBooking,
    getDoneTripsCountForUser,
} = require('../controllers/bookingController');
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

const router = express.Router();

// create a new booking
router.route('/').post(protect, createTourBooking);

// get a tour by id
router.route('/tour/:id').get(protect, getTourBookingById);

// get tour counts by id
router.route('/count/:id').get(protect, getDoneTripsCountForUser);

// get all booking for a user
router.route('/trips/:id').get(protect, getAllTourBookingsForUser);

// get all tour booking
router.route('/:tourId').get(protect, isAdmin, getAllTourBookings);

// update a tour by id
router.route('/:id').put(protect, updateTourBooking);

// update a tourBookingPaymentStatus
router.route('/:id').put(updateTourBookingPaymentStatus);

// Cancel a tour
router.route('/cancel/:id').put(protect, cancelTourBooking);

// Get All done tours as Admin
//router.route('/done').get(protect, doneTours);

// Get All done tours for a user
//router.route('/done/:id').delete(protect, doneToursForUser);

module.exports = router;
