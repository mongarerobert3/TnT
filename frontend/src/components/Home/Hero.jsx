import React, { useState } from 'react';
import './index.css';

const Hero = () => {
  const [searchString, setSearchString] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [startDate, setStartDate] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchString(value);
  };

  const handlePriceRangeChange = (event) => {
    const value = event.target.value;
    setPriceRange(value);
  };

  const handleDateChange = (event) => {
    const value = event.target.value;
    setStartDate(value);
  };

  const handleSearch = () => {
    // Pass the search criteria to the parent component
    const searchCriteria = {
      searchString,
      priceRange,
      startDate,
    };
    // Replace this with the appropriate function call to handle the search
    console.log('Search criteria:', searchCriteria);
  };

  return (
    <div id="search">
      <div className="search-bar">
        <nav className="navbar navbar-expand navbar-light bg-light"></nav>
        <div className="search-container">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for a location..."
              value={searchString}
              onChange={handleSearchChange}
            />
          </div>
          <div className="input-group">
            <select className="form-select" value={priceRange} onChange={handlePriceRangeChange}>
              <option value="">Select price range</option>
              <option value="0-100">$0 - $100</option>
              <option value="100-200">$100 - $200</option>
              <option value="200-300">$200 - $300</option>
              <option>Custom Select</option>
            </select>
          </div>
          <div className="input-group">
            <input
              type="date"
              className="form-control"
              placeholder="Search by date"
              value={startDate}
              onChange={handleDateChange}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
