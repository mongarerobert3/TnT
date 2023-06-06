import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { formatDate } from './DateUtils';

const TourCard = () => {
  const navigate = useNavigate();

  const submitButton = (e) => {
    e.preventDefault();

    navigate('/login');
    
  };

  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get('http://localhost:5000/api/tour');
        const data = response.data;
        setTours(data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="tour-card-container">
      {tours.map((tour, index) => (
        <div className="card tour-card" key={index}>
          <Link to={'/tour/'+tour._id}>
            <div className="tour-details">
              <h3 className="tour-name">{tour.name}</h3>
              <p className="dates">{formatDate(tour.startDate)} - {formatDate(tour.endDate)}</p>
              <img src={tour.imageCover} alt="Tour" className="tour-image" />
              <p className="availableSeats">Available Seats: {tour.availableSeats}</p>
              <p className="tour-price">Price: ${tour.price}</p>
              <p className='Tcard-Desc'>{tour.description}</p>
              <button type="button" onClick={submitButton}  className="btn-explore">Explore</button>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TourCard;
