import React, { useState, useEffect } from 'react';
import './index.css';

import { NavbarDashboard, HeroDashboard, Footer } from '../../components';
import { formatDate, fetchTrips, prevSlide, nextSlide } from './dashboard';

const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTrips(setTrips, token);
  }, []);

  return (
    <div>
      <NavbarDashboard />
      <HeroDashboard />
      <div className="dash-container">
        <div className="row">
          <div className="col-9">
            <div className="dashboard-tour-card-container">
              <div className="trip-cards-slider" style={{ transform: `translateX(-${currentIndex * 25}%)` }}>
                {trips.slice(currentIndex, currentIndex + 4).map((trip) => (
                  <div key={trip.id} className="dashboard-tour-card">
                    <div className="card-image-wrapper">
                      <img src={trip.imageCover} alt="Trip Cover" className="trip-cover-image" />
                    </div>
                    <div className="card-details">
                      <h4>{trip.name}</h4>
                      <div className="card-hover-content">
                        <p>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</p>
                        <p>Available Seats: {trip.availableSeats}</p>
                        <p>Price: {trip.price}</p>
                        <button className="book-button">Book Now</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="slider-button prev-button" onClick={() => prevSlide(currentIndex, setCurrentIndex, trips)}>
                &#10094;
              </button>
              <button className="slider-button next-button" onClick={() => nextSlide(currentIndex, setCurrentIndex, trips)}>
                &#10095;
              </button>
            </div>
          </div>
          <div className="col-3 recommended-trips">
            <h3 className="recommended-trips-header">Upcoming trips</h3>
            <ul className="recommended-trips-list">
              {trips.map((trip) => (
                <div key={trip.id} className="container-fluid mt-3">
                  <div className="row">
                    <div className="col p-3">
                      <div>
                        <img src={trip.imageCover} alt="Trip Cover" className="trip-cover-image" />
                      </div>
                    </div>
                    <div className="col p-3">
                      <h4>{trip.name}</h4>
                      <p className="dates">
                        {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
