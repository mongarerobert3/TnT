import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { Footer, Hero, Navbar } from '..';

import './index.css'

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const formattedDate = formatter.format(date);
  return formattedDate;
}

const HotDeals = () => {
  const navigate = useNavigate();

  const submitButton = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const [hotDeals, setHotDeals] = useState([]);

  useEffect(() => {
    const fetchHotDeals = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tour');
        const data = response.data;
        setHotDeals(data);
      } catch (error) {
        console.log('Error fetching hot deals:', error);
      }
    };

    fetchHotDeals();
  }, []);

  return (
    <>
      <Navbar/>
      <Hero/>
      <div className="tour-card-container">
      {hotDeals.map((tour, index) => (
        <div className="card tour-card" key={index}>
          <span className="hot-flag">
            <i className="bi bi-bookmark-heart"></i>
          </span>
          <Link to={'/tour/'+tour._id}>
            <div className="tour-details">
              <h3 className="tour-name">{tour.name}</h3>
              <p className="dates">
                {formatDate(tour.startDate)} - {formatDate(tour.endDate)}
              </p>
              <img src={tour.imageCover} alt="Deal" className="tour-image" />
              <p className="availableSeats">Available Seats: {tour.maxGroupSize}</p>
              <p className="tour-price">Price: ${tour.price}</p>
              <p className="Tcard-Desc">{tour.description}</p>
              <button type="button" onClick={submitButton} className="btn-explore">
                Explore
              </button>
            </div>
          </Link>
        </div>
      ))}
    </div>
    <Footer/>
    </> 
  );
};

export default HotDeals;
