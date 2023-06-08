import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlannedTours = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookingsForUser = async () => {
      const id = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`http://localhost:5000/api/booking/trips/${id}`, config);
        setBookings(response.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookingsForUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
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
            <h3>{booking.tour.name}</h3>
            <p>Price: {booking.tour.price}</p>
            <p>Seats Booked: {booking.seatsBooked}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlannedTours;
