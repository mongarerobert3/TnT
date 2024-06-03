import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSearchClick } from './navbarFunc.js';
import { logo } from '../../assets/index.js';
import { Login } from '../index.js';

const Navbar = () => {
  const navigate = useNavigate();

  const handleHotDealsClick = (event) => {
    event.preventDefault();
    navigate('/hotdeals');
  };

  const handleButton = () => {
    navigate('/Login');
  };

  const handleClick = (event) => {
    handleSearchClick(event);
  };

  return (
    <div>
      <header class="text-gray-600 body-font header">
        <div class="container mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <a href='/' class="flex title-font font-medium items-center text-gray-900 md:mb-0">
            <img 
              className='w-20 h-30 left-2'
              src={logo}
              alt='logo'/>
            <h1 className='font-bold text-2xl'>Tours and <span>Travel</span></h1>
          </a>
          <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center mt-2">
            <a href="/" class="mr-5 hover:text-gray-900">Home</a>
            <a 
              href="#search"
              id='searchInput'
              class="mr-5 hover:text-gray-900"
              onClick={handleClick} >Search</a>
            <a href="#tours" class="mr-5 hover:text-gray-900">Tours</a>
            <a href="/hotdeals" onClick={handleHotDealsClick} class="mr-5 hover:text-gray-900">Hot Deals</a>
          </nav>
          <button 
            id='searchButton'
            class="btn-book inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base md:mt-0" 
            href={Login} 
            onClick={handleButton}>Join the Adventure
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
