import React, { useState } from 'react';
import {
  Overview,
  Invoice,
  Analytics,
  UserProfilePage,
  PlannedTours,
  Flights,
  Hotels,
  Maps
} from './pages';
import NavbarDashboard from '../NavbarDashboard';

import './index.css';

const UserProfile = () => {
  const [showLeftSection, setShowLeftSection] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('Overview');
  const [showIconNames, setShowIconNames] = useState(false);

  const handleIconHover = (iconName) => {
    setShowLeftSection(true);
    setShowIconNames(true);
  };

  const handleIconLeave = () => {
    setShowLeftSection(false);
    setShowIconNames(false);
  };

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
  };

  return (
    <div className="user-profile-container">
      <div className={`left-section ${showLeftSection ? 'expanded' : ''}`} onMouseLeave={handleIconLeave}>
        <div className="dashboard-section">
          <h3 className="dashboard-title">Dashboard</h3>
          <ul className="dashboard-icons">
            <li>
              <span
                className={`icon ${selectedIcon === 'Overview' ? 'selected' : ''}`}
                onMouseEnter={() => handleIconHover('Overview')}
                onClick={() => handleIconClick('Overview')}
              >
                <span className="fa fa-home fa-lg"></span>
                {showIconNames && <span className="icon-name">Overview</span>}
              </span>
            </li>
            <li>
              <span
                className={`icon ${selectedIcon === 'Flights' ? 'selected' : ''}`}
                onMouseEnter={() => handleIconHover('Flights')}
                onClick={() => handleIconClick('Flights')}
              >
                <span className="fas fa-plane"></span>
                {showIconNames && <span className="icon-name">Flights</span>}
              </span>
            </li>
            <li>
              <span
                className={`icon ${selectedIcon === 'Hotels' ? 'selected' : ''}`}
                onMouseEnter={() => handleIconHover('Hotels')}
                onClick={() => handleIconClick('Hotels')}
              >
                <span className="fas fa-hotel"></span>
                {showIconNames && <span className="icon-name">Hotels</span>}
              </span>
            </li>
            <li>
              <span
                className={`icon ${selectedIcon === 'Analytics' ? 'selected' : ''}`}
                onMouseEnter={() => handleIconHover('Analytics')}
                onClick={() => handleIconClick('Analytics')}
              >
                <span className="fa fa-line-chart fa-lg"></span>
                {showIconNames && <span className="icon-name">Analytics</span>}
              </span>
            </li>
            <li>
              <span
                className={`icon ${selectedIcon === 'Planned Tours' ? 'selected' : ''}`}
                onMouseEnter={() => handleIconHover('Planned Tours')}
                onClick={() => handleIconClick('Planned Tours')}
              >
                <span className="fa fa-calendar fa-lg"></span>
                {showIconNames && <span className="icon-name">Planned Tours</span>}
              </span>
            </li>
            <li>
              <span
                className={`icon ${selectedIcon === 'Maps' ? 'selected' : ''}`}
                onMouseEnter={() => handleIconHover('Maps')}
                onClick={() => handleIconClick('Maps')}
              >
                <span className="fas fa-map"></span>
                {showIconNames && <span className="icon-name">Maps</span>}
              </span>
            </li>
          </ul>
        </div>
        <div className="pages-section">
          <h3>Pages</h3>
          <ul className="pages-icons">
            <li>
              <span
                className={`icon ${selectedIcon === 'User Profile' ? 'selected' : ''}`}
                onMouseEnter={() => handleIconHover('User Profile')}
                onClick={() => handleIconClick('User Profile')}
              >
                <span className="fa fa-user fa-lg"></span>
                {showIconNames && <span className="icon-name">User Profile</span>}
              </span>
            </li>
            <li>
              <span
                className={`icon ${selectedIcon === 'Invoice' ? 'selected' : ''}`}
                onMouseEnter={() => handleIconHover('Invoice')}
                onClick={() => handleIconClick('Invoice')}
              >
                <span className="fa fa-file-text fa-lg"></span>
                {showIconNames && <span className="icon-name">Invoices</span>}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="right-section">
        <NavbarDashboard />
        {selectedIcon === 'Overview' && <Overview />}
        {selectedIcon === 'Analytics' && <Analytics />}
        {selectedIcon === 'Planned Tours' && <PlannedTours />}
        {selectedIcon === 'User Profile' && <UserProfilePage />}
        {selectedIcon === 'Invoice' && <Invoice />}
        {selectedIcon === 'Flights' && <Flights />}
        {selectedIcon === 'Hotels' && <Hotels />}
        {selectedIcon === 'Maps' && <Maps />}

      </div>
    </div>
  );
};

export default UserProfile;
