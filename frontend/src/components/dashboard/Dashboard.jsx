import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { NavbarDashboard, HeroDashboard, Footer, TourCard } from '../../components';

import './index.css';

const Dashboard = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <div>
      <NavbarDashboard />
      <HeroDashboard />
      <div className="dash-container">
        <div className="row">
          <div className="col-9">
            <Slider {...settings} className="tour-slider">
              <TourCard />
            </Slider>
          </div>
          <div className="col-3 recommended-trips">
            <h3>Recommended trips</h3>
            <ul className="recommended-trips-list">
              <li>Trip 1</li>
              <li>Trip 2</li>
              <li>Trip 3</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
