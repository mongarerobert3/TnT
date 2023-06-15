import React, { useState, useEffect } from 'react';
import './index.css';
import PlannedTours from './PlannedTours';

const Overview = () => {

  const totalSpending = 1500; // Replace with actual value

  return (
    <div className="overview-page">
      <div className="bookings-section">
        <h2>Bookings</h2>
        <div className="overview-bookings">
          <PlannedTours/>
        </div>
      </div>

      <div className="spending-section">
        <h2>Total Spendings</h2>
        <div className="total-spending">${totalSpending}</div>
      </div>

      <div className="chart-section">
        <h2>Travel Chart</h2>
        <div className="chart">Insert Chart Component Here</div>
      </div>
    </div>
  );
};

export default Overview;
