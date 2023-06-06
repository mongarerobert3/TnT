import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Footer, Hero, Navbar } from '..';

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
        const response = await Axios.get('http://localhost:5000/api/tour/hot');
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
      <div className="hot-deals-container">
      {hotDeals.map((deal, index) => (
        <div className="card hot-deal-card" key={index}>
          <div className="deal-details">
            <span className="hot-flag">
              <i className="bi bi-bookmark-heart"></i>
            </span>
            <h3 className="deal-name">{deal.name}</h3>
            <p className="dates">
              {formatDate(deal.startDate)} - {formatDate(deal.endDate)}
            </p>
            <img src={deal.imageCover} alt="Deal" className="deal-image" />
            <p className="availableSeats">Available Seats: {deal.availableSeats}</p>
            <p className="deal-price">Price: ${deal.price}</p>
            <p className="deal-description">{deal.description}</p>
            <button type="button" onClick={submitButton} className="btn-explore">
              Explore
            </button>
          </div>
          <div className="hot-deal-icon">
            <i className="bi bi-fire"></i>
          </div>
        </div>
      ))}
    </div>
    <Footer/>
    </> 
  );
};

export default HotDeals;
