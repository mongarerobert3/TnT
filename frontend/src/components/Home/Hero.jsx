import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Hero = () => {
  const [locationOptions, setLocationOptions] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [matchingTours, setMatchingTours] = useState([]);
  const [priceRange, setPriceRange] = useState('');
  const [startDate, setStartDate] = useState('');

  useEffect(() => {
    const fetchLocationOptions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tour/locations`);
        const data = response.data;
        setLocationOptions(data);
      } catch (error) {
        console.log('Error fetching location options:', error);
      }
    };

    fetchLocationOptions();
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchString(value);
    if (value.trim() === '') {
      setMatchingTours([]);
    } else {
      searchTours(value);
    }
  };

  const searchTours = async (searchString) => {
    try {
      if (!searchString) {
        alert('Please input the search string');
        return;
      }

      const response = await axios.get(`http://localhost:5000/api/tour/location/${searchString}`);
      const data = response.data;
      setMatchingTours(data);
    } catch (error) {
      console.log('Error searching tours:', error);
      setMatchingTours([]);
    }
  };

  const handlePriceRangeChange = (event) => {
    const value = event.target.value;
    setPriceRange(value);
    setSearchString('');
    inputRef.current.focus(); // Set the cursor back to the input field
  };

  const handleDateChange = (event) => {
    const value = event.target.value;
    setStartDate(value);
    searchToursByDate(value);
  };

  const searchToursByDate = async (selectedDate) => {
    try {
      const formattedDate = formatDate(selectedDate); // Format the selected date as needed
      const response = await axios.get(`http://localhost:5000/api/tour/date/${formattedDate}`);
      const data = response.data;
      setMatchingTours(data);
    } catch (error) {
      console.log('Error searching tours by date:', error);
      setMatchingTours([]);
    }
  };

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

  const inputRef = useRef(null); // Create a reference to the input element

  const handleGoButtonClick = () => {
    if (searchString.trim() !== '') {
      searchTours(searchString);
    } else if (startDate !== '') {
      searchToursByDate(startDate);
    } else if (priceRange !== '') {
      const [minPrice, maxPrice] = priceRange.split('-');
      const filteredTours = locationOptions.filter((tour) => {
        return tour.price >= Number(minPrice) && tour.price <= Number(maxPrice);
      });
      setMatchingTours(filteredTours);
    }
  };
  

  return (
    <div id="search" className="container mt-5">
      <div className="search-bar">
        <nav className="navbar navbar-expand navbar-light bg-light"></nav>
        <div className="search-container">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a location..."
            value={searchString}
            onChange={handleSearchChange}
            ref={inputRef} // Set the reference to the input element
          />
          {matchingTours.length > 0 && (
            <div className="autocomplete-suggestions">
              {matchingTours.map((tour, index) => (
                <div className="autocomplete-suggestion" key={index}>
                  {tour.name}
                </div>
              ))}
            </div>
          )}
          <div className="input-group">
            <select className="form-select" value={priceRange} onChange={handlePriceRangeChange}>
              <option value="">Select price range</option>
              <option value="0-100">$0 - $100</option>
              <option value="100-200">$100 - $200</option>
              <option value="200-300">$200 - $300</option>
            </select>
          </div>
          <input
            type="date"
            className="form-control"
            placeholder="Search by date"
            value={startDate}
            onChange={handleDateChange}
            min={new Date().toISOString().split('T')[0]}
          />
          <button className="btn btn-primary" onClick={handleGoButtonClick}>
            <i className="bi bi-search"></i> Go
          </button>
        </div>
      </div>
      <div className="tour-cards">
        {matchingTours.map((tour, index) => (
          <div className="tour-card" key={index}>
            {/* Display tour card details here */}
            <h2>{tour.name}</h2>
            <p>{tour.description}</p>
            {/* Other tour card details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
