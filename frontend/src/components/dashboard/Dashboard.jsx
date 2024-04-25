import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

import {
  NavbarDashboard,
  HeroDashboard,
  Footer,
  BookingModal,
} from '../../components';

import {
  formatDate,
  fetchTrips,
  fetchDoneTrips,
  fetchCanceledTrips,
  fetchSpentMoney,
} from './dashboardFunc';

const Dashboard = () => {
  const [tour, setTrips] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [doneTrips, setDoneTrips] = useState(0);
  const [canceledTrips, setCanceledTrips] = useState(0);
  const [spentMoney, setSpentMoney] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTrips(setTrips, token);
    fetchDoneTrips(setDoneTrips, token);
    fetchCanceledTrips(setCanceledTrips, token);
    fetchSpentMoney(setSpentMoney, token);
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex < tour.length - 1 ? prevIndex + 1 : 0));
    }, 3000);

    return () => {
      clearInterval(slideInterval);
    };
  }, [tour.length]);

  useEffect(() => {
    // Logic to check if the user was redirected from the TourPage
    const redirectedFromBooking = window.location.pathname === '/dashboard' && new URLSearchParams(window.location.search).get('from') === 'book';

    if (redirectedFromBooking) {
      setShowModal(true);
    }
  }, []);

  return (
    <div>
      <NavbarDashboard />
      <HeroDashboard />
      <div className={`dash-container ${showModal ? '' : ''}`}>
        <div className="row">
          <div className="col-8">

            <div className="dashboard-tour-card-container">
              <div className="trip-cards-slider" style={{ transform: `translateX(-${currentIndex * 25}%)` }}>
                {tour.concat(tour).concat(tour).map((tour, index) => (
                  <div key={tour.id} className={`dashboard-tour-card ${index === currentIndex ? 'active' : ''}`}>
                    <Link to={`/tour/${tour._id}`}>
                      <div className="card-image-wrapper">
                        <img src={tour.imageCover} alt="Trip Cover" className="main-trip-cover-image" />
                      </div>
                    </Link>
                    <div className="card-details">
                      <h4>{tour.name}</h4>
                      <div className="card-hover-content">
                        <p>{formatDate(tour.startDate)} - {formatDate(tour.endDate)}</p>
                        <p>Available Seats: {tour.availableSeats}</p>
                        <p>Price: {tour.price}</p>
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
            <div className='adverts-container'>
              <div>
                <img src="https://i.pinimg.com/236x/57/31/aa/5731aacc51d97322eeb7c77f2e50686b.jpg" alt="" />
              </div>
              <div>
                <p>b</p>
              </div>
            </div>
          </div>
          <div className="col-4 recommended-container">
            <div className="recommended-trips">
              <h3 className="recommended-trips-header">Upcoming trips</h3>
              <ul className="recommended-trips-list">
                {tour.map((tour) => (
                  <div key={tour.id} className="container mt-3">
                    <div className="row">
                      <div className="col p-2">
                        <div>
                          <img src={tour.imageCover} alt="Trip Cover" className="trip-cover-image" />
                        </div>
                      </div>
                      <div className="col p-2 recommended-info">
                        <h4>{tour.name}</h4>
                        <p className="dates">{formatDate(tour.startDate)} - {formatDate(tour.endDate)}</p>
                        <Link to={`/tour/${tour._id}`}>
                          <button className='recommended-button'>
                            Book
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
            <div className="visited-places-container">
              <div className="visited-places-header">
                <h4>Last Visited</h4>
                <h5><a href="#all">See All</a></h5>
              </div>
              <div id="map">
                <p>World Map Coming Here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && <BookingModal />}
      <Footer />
    </div>
  );
};

export default Dashboard;
