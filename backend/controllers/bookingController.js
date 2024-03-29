const asyncHandler = require('express-async-handler');
const Tour = require('../models/tourModel');
const TourBooking = require('../models/bookingModel');


// @desc    Create a new tour booking
// @route   POST /api/booking/tour
// @access  Private
const createTourBooking = asyncHandler(async (req, res) => {
  try {
    const { tourId, seatsBooked, paymentStatus, doneStatus } = req.body;

    // Retrieve the logged-in user ID
    const userId = req.user._id;

    // Validate the input data
    if (!tourId || !seatsBooked) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    // Find the tour being booked
    const tour = await Tour.findById(tourId);
    if (!tour) {
      res.status(404);
      throw new Error('Tour not found');
    }

    // Calculate the total price of the booking based on the tour price and number of seatsBooked
    const totalPrice = tour.price * parseInt(seatsBooked);

    // Calculate the available seats and check if there are enough for the booking
    const bookedSeats = await TourBooking.countDocuments({ tour: tourId, endDate: { $gte: new Date() } });
    const availableSeats = tour.maxGroupSize - bookedSeats;
    if (seatsBooked > availableSeats) {
      res.status(400);
      throw new Error(`Not enough seats available. Maximum group size for this tour is ${tour.maxGroupSize}`);
    }

    // Create the new tour booking
    const booking = await TourBooking.create({
      user: userId,
      tour: tourId,
      seatsBooked,
      totalAmount:totalPrice,
      paymentStatus,
      doneStatus,
    });

    // Save the booking to the database
    await booking.save();

    // Return the new booking as a response
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating tour booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// @desc    Get all tour bookings for a user
// @route   GET /api/booking/tours
// @access  Private
const getAllTourBookingsForUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;

    const bookings = await TourBooking.find({ user: userId }).populate('tour');
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching tour bookings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// @desc    Get count of done trips for a user
// @route   GET /api/bookings/tours/count
// @access  Private
const getDoneTripsCountForUser = asyncHandler(async (req, res) => {
  try {
    const bookings = await TourBooking.find({ user: req.user._id });
  
    const doneTripsCount = bookings.reduce((count, booking) => {
      if (booking.doneStatus === 'done') {
        return count + 1;
      }
      return count;
    }, 0);
  
    res.json([{ doneTripsCount }]);
  } catch (error) {
    console.error('Error counting done trips:', error);
    res.status(500).json({ error: 'Error counting done trips' });
  }
});

// @desc    Get a single tour booking by ID
// @route   GET /api/bookings/tours/:id
// @access  Private
const getTourBookingById = asyncHandler(async (req, res) => {
  try {
    const booking = await TourBooking.findById(req.params.id).populate('tour');
      if (!booking) {
        res.status(404);
        throw new Error('Booking not found');
    }
  res.json(booking);
  } catch (error) {
    console.error('Error fetching tour bookings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// @desc    Get all bookings for a tour
// @route   GET /api/tours/:tourId/bookings
// @access  Public
const getAllTourBookings = asyncHandler(async (req, res) => {
    const tour = await Tour.findById(req.params.tourId);
  
    if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Tour not found'
      });
    }
  
    const bookings = await TourBooking.find({ tour: req.params.tourId });
  
    res.status(200).json({
      status: 'success',
      results: bookings.length,
      data: {
        bookings
      }
    });
  });
  
// Update a booking for a specific tour
// PUT /api/bookings/:bookingId
// Public
const updateTourBooking = asyncHandler(async (req, res) => {
    const { bookingId } = req.params;
  
    const booking = await Booking.findById(bookingId);
  
    if (!booking) {
      res.status(404);
      throw new Error("Booking not found");
    }
  
    booking.startDate = req.body.startDate || booking.startDate;
    booking.endDate = req.body.endDate || booking.endDate;
    booking.seatsBooked = req.body.seatsBooked || booking.seatsBooked;
  
    const updatedBooking = await booking.save();
  
    res.json(updatedBooking);
  });
  

// @desc    Update the payment status of a tour booking
// @route   PUT /api/bookings/tours/:id/pay
// @access  Private
const updateTourBookingPaymentStatus = asyncHandler(async (req, res) => {
  const booking = await TourBooking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }
  booking.isPaid = true;
  booking.paidAt = Date.now();
  booking.paymentMethod = req.body.paymentMethod;
  await booking.save();
  res.json({ message: 'Payment updated' });
});

// @desc    Cancel a tour booking
// @route   DELETE /api/bookings/tours/:id
// @access  Private
const cancelTourBooking = asyncHandler(async (req, res) => {
  const booking = await TourBooking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }
  await booking.remove();
  res.json({ message: 'Booking cancelled' });
});

module.exports = {
  createTourBooking,
  getDoneTripsCountForUser,
  getAllTourBookingsForUser,
  getTourBookingById,
  getAllTourBookings,
  updateTourBooking,
  updateTourBookingPaymentStatus,
  cancelTourBooking,
};
