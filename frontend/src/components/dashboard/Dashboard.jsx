import React, { useState, useEffect } from 'react';
import { NavbarDashboard, HeroDashboard, Footer } from '../../components';
import { fetchTrips } from './dashboard';

import './index.css';

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const formattedDate = formatter.format(date);
  return formattedDate;
}

const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTrips(token)
      .then(data => setTrips(data));
  }, [token]);

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % trips.length);
    }, 5000);

    return () => clearInterval(sliderInterval);
  }, [trips]);

  return (
    <div>
      <NavbarDashboard />
      <HeroDashboard />
      <div className="dash-container">
        <div className="row">
          <div className="col-9">
            <div className="dashboard-tour-card-container">
              <div className="trip-cards-slider">
                <div className="trip-cards-wrapper">
                  {trips.map((trip, index) => (
                    <div
                      key={trip.id}
                      className={`dashboard-tour-card ${index === currentSlide ? 'active' : ''}`}
                    >
                      <img src={trip.imageCover} alt="Trip Cover" className="trip-cover-image" />
                      <div className="card-overlay">
                        <div className="card-overlay-content">
                          <h4>{trip.name}</h4>
                          <p>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</p>
                          <p>Available Seats: {trip.availableSeats}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-3 recommended-trips">
            <h3 className="recommended-trips-header">Upcoming trips</h3>
            <ul className="recommended-trips-list">
              {trips.map(trip => (
                <div key={trip.id} className="container-fluid mt-3">
                  <div className="row">
                    <div className="col p-3">
                      <div>
                        <img src={trip.imageCover} alt="Trip Cover" className="trip-cover-image" />
                      </div>
                    </div>
                    <div className="col p-3">
                      <h4>{trip.name}</h4>
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
