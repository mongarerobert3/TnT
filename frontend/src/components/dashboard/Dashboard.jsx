import React, { useState, useEffect } from 'react';
import './index.css';

import { 
  NavbarDashboard, 
  HeroDashboard, 
  Footer, 
} from '../../components';

import { formatDate, 
  fetchTrips, 
  fetchDoneTrips, 
  fetchCanceledTrips, 
  fetchSpentMoney 
} from './dashboard';

const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [doneTrips, setDoneTrips] = useState(0);
  const [canceledTrips, setCanceledTrips] = useState(0);
  const [spentMoney, setSpentMoney] = useState(0);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTrips(setTrips, token);
    fetchDoneTrips(setDoneTrips, token);
    fetchCanceledTrips(setCanceledTrips, token);
    fetchSpentMoney(setSpentMoney, token);
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex < trips.length - 1 ? prevIndex + 1 : 0));
    }, 3000);

    return () => {
      clearInterval(slideInterval);
    };
  }, [trips.length]);

  return (
    <div>
      <NavbarDashboard />
      <HeroDashboard />
      <div className="dash-container">
        <div className="row">
          <div className="col-8">
            <div className="dashboard-tour-card-container">
              <div className="trip-cards-slider" style={{ transform: `translateX(-${currentIndex * 25}%)` }}>
                {trips.concat(trips).concat(trips).map((trip, index) => (
                  <div key={trip.id} className={`dashboard-tour-card ${index === currentIndex ? 'active' : ''}`}>
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
            </div>
            <div className="row your-trips-status">
              <div className="col-4">
                <div className="trips-status-container ">
                  <h4>Done Trips</h4>
                  <p>{doneTrips}</p>
                </div>
              </div>
              <div className="col-4">
                <div className="trips-status-container">
                  <h4>Canceled Trips</h4>
                  <p>{canceledTrips}</p>
                </div>
              </div>
              <div className="col-4">
                <div className="trips-status-container">
                  <h4>Spent Money</h4>
                  <p>${spentMoney}</p>
                </div>
              </div>
              <div className="col-12">
                <div className="trips-status-container">
                  {/* Line graph */}
                </div>
              </div>
            </div>
          </div>
          <div class="col-4 recommended-container">
            <div className="recommended-trips">
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
                        <p className="dates">{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          <div class="visited-places-container">
            <h4>Last Visited</h4>
            <div id='map'>
              <p>World Map Here</p>
            </div> 
          </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
