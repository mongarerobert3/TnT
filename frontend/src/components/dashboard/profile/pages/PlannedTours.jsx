import React, { useState, useEffect } from 'react';
import {
  UserBookings
} from './Gets';
import './index.css';

const PlannedTours = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    UserBookings(setBookings, token)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    )
  }

  if (bookings.length === 0) {
    return <h3>Sorry, you have no bookings</h3>;
  }

  return (
    <div className="booking-rows-container">
      {bookings.map((booking) => (
        <div className="booking-rows" key={booking._id}>
          <img src={booking.tour.imageCover} alt={booking.tour.name} className="booking-image" />
          <div className="booking-details">
            <h3 className='flex pt-2'>{booking.tour.name}</h3>
            <h3>Price: {booking.tour.price}</h3>
            <h3 className='flex'>Seats Booked: {booking.seatsBooked}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlannedTours;
