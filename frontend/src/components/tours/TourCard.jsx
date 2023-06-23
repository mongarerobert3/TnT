import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { formatDate } from './DateUtils';

const TourCard = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tour');
        const data = response.data;

        // Filter tours based on URL parameters
        const searchParams = new URLSearchParams(location.search);
        const tourParam = searchParams.get('tour');
        const priceParam = searchParams.get('price');

        let filteredTours = data;

        if (tourParam) {
          filteredTours = filteredTours.filter((tour) =>
            tour.name.toLowerCase().includes(tourParam.toLowerCase())
          );
        }

        if (priceParam) {
          const price = parseInt(priceParam);

          filteredTours = filteredTours.filter(
            (tour) =>
              tour.price >= price - 100 && tour.price <= price + 100
          );
        }

        setTours(filteredTours);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, [location.search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tour-card-container">
      {tours.length === 0 ? (
        <div>No match found.</div>
      ) : (
        tours.map((tour, index) => (
          <div className="card tour-card" key={index}>
            <Link to={'/tour/' + tour._id}>
              <div className="tour-details">
                <h3 className="tour-name">{tour.name}</h3>
                <p className="dates">
                  {formatDate(tour.startDate)} - {formatDate(tour.endDate)}
                </p>
                <img src={tour.imageCover} alt="Tour" className="tour-image" />
                <p className="availableSeats">
                  Available Seats: {tour.maxGroupSize}
                </p>
                <p className="tour-price">Price: ${tour.price}</p>
                <p className="Tcard-Desc">{tour.description}</p>
                <Link to={`/tour/${tour._id}`}>
                  <button type="button" className="btn-explore">
                    Explore
                  </button>
                </Link>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default TourCard;
