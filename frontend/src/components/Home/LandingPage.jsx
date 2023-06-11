import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './index.css';
import {Hero, TourCard} from '../../components';

const LandingPage = () => {
  const [locationOptions, setLocationOptions] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocationOptions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tour/locations');
        const data = response.data;
        setLocationOptions(data);
        setFilteredTours(data); // Initialize filteredTours with all location options
      } catch (error) {
        console.log('Error fetching location options:', error);
      }
    };

    fetchLocationOptions();
  }, []);

  const handleSearch = (searchString, priceRange, startDate) => {
    let updatedTours = locationOptions;

    if (searchString) {
      updatedTours = updatedTours.map((tour) => {
        if (tour.location.toLowerCase().includes(searchString.toLowerCase())) {
          return { ...tour, match: true };
        } else {
          return { ...tour, match: false };
        }
      });
    }

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-');
      updatedTours = updatedTours.filter((tour) => {
        return tour.price >= Number(minPrice) && tour.price <= Number(maxPrice);
      });
    }

    if (startDate) {
      updatedTours = updatedTours.filter((tour) => {
        return tour.startDate === startDate;
      });
    }

    updatedTours.sort((a, b) => (a.match && !b.match ? -1 : b.match && !a.match ? 1 : 0));

    setFilteredTours(updatedTours);
  };

  const handleTourSelection = (tour) => {
    const tourId = tour._id;
    navigate(`/tour/${tourId}`);
  };

  return (
    <div>
      <Hero onSearch={handleSearch} />
      <TourCard tours={filteredTours} onTourSelection={handleTourSelection} />
    </div>
  );
};

export default LandingPage;
