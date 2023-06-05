import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Overview = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/booking/trips/${userId}`);
        console.log(response)
        setBookings(response.data);
      } catch (error) {
        setError('Error fetching bookings');
      }
    };

    fetchBookings();
  }, []);

  const totalSpending = 1500; // Replace with actual value

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="overview-page">
      <div className="row">
        <div className="col-4">
          <div className="bookings-section">
            <h2>Bookings</h2>
            <ul className="bookings-list">
              {bookings.map((booking) => (
                <li key={booking._id} className="booking-item">
                  <div className="title">{booking.tour.title}</div>
                  <div className="details">{booking.tour.details}</div>
                  <div className="startDate">{booking.startDate}</div>
                  <div className="endDate">{booking.endDate}</div>
                  
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-4">
          <div className="spending-section">
            <h2>Total Spendings</h2>
            <div className="total-spending">${totalSpending}</div>
          </div>
        </div>
        <div className="col-4">
          <div className="chart-section">
            <h2>Travel Chart</h2>
            <div className="chart">Insert Chart Component Here</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
