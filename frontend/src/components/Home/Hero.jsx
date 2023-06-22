import React, { useState } from 'react';
import './index.css';
import {CustomFilter,SearchBar} from './../../components';

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

    <div className='home__filters' id="discover">
      <SearchBar/>

      <div className='home__filter-container'>
        <CustomFilter title="price" />
        <CustomFilter title="date" />
      </div>  
    </div>
  );
};

export default Hero;
