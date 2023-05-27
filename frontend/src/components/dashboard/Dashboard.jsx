import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'

import { NavbarDashboard, HeroDashboard, Footer, TourCard } from '../../components';

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

  const token = localStorage.getItem('token');

  const fetchTrips = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get('http://localhost:5000/api/tour', config);
      const data = response.data;
      setTrips(data);
    } catch (error) {
      console.error('Error fetching upcoming trips:', error);
    }
  };

  useEffect(() => {
    fetchTrips();
  });

  return (
    <div>
      <NavbarDashboard />
      <HeroDashboard />
      <div className="dash-container">
        <div className="row">
          <div className="col-9">
            <TourCard />
          </div>
          <div className="col-3 recommended-trips">
            <h3 className="recommended-trips-header">Upcoming trips</h3>
            <ul className="recommended-trips-list">
              {trips.map((trip) => (
                <div key={trip.id} className="container-fluid mt-3">
                  <div className="row">
                    <div className="col p-3">
                      <div className="trip-cover-image-container">
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
