import React from 'react';
import { logo } from '../../assets';


const BookingNav = () => {

  return (
    <div>
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-between">
          <a href="/" className="logo d-flex align-items-center me-auto me-lg-0">
            <img src={logo} alt="logo" className="w-60 h-60" />
            <h1>Tours and <span>Travel</span></h1>
          </a>
        </div>
      </header>
    </div>
  );
};

export default BookingNav;
