import React, { useState } from 'react';
import {
  Overview, 
  Invoice, 
  Analytics, 
  UserProfilePage,
  PlannedTours
} from './pages'
import NavbarDashboard from '../NavbarDashboard';

import './index.css';

const UserProfile = () => {
  const [showLeftSection, setShowLeftSection] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('Overview');

  const handleIconHover = (iconName) => {
    if (!showLeftSection) {
      setShowLeftSection(true);
    }
    if (selectedIcon !== iconName) {
      setSelectedIcon(iconName);
    }
  };
  
  const handleIconLeave = () => {
    setShowLeftSection(false);
  };

  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
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
                {selectedIcon === 'Overview' && <span className="icon-name">Overview</span>}
              </span>
            </li>
            <li>
              <span
                className={`icon ${selectedIcon === 'Performance' ? 'selected' : ''}`}
                onMouseEnter={() => handleIconHover('Performance')}
                onClick={() => handleIconClick('Performance')}
              >
                <span className="fa fa-tachometer fa-lg"></span>
                {selectedIcon === 'Performance' && <span className="icon-name">Performance</span>}
              </span>
            </li>
            <li>
              <span
                className={`icon ${selectedIcon === 'Analytics' ? 'selected' : ''}`}
                onMouseEnter={() => handleIconHover('Analytics')}
                onClick={() => handleIconClick('Analytics')}
              >
                <span className="fa fa-line-chart fa-lg"></span>
                {selectedIcon === 'Analytics' && <span className="icon-name">Analytics</span>}
              </span>
            </li>
            <li>
              <span
                className={`icon ${selectedIcon === 'Planned Tours' ? 'selected' : ''}`}
                onMouseEnter={() => handleIconHover('Planned Tours')}
                onClick={() => handleIconClick('Planned Tours')}
              >
                <span className="fa fa-calendar fa-lg"></span>
                {selectedIcon === 'Planned Tours' && <span className="icon-name">Planned Tours</span>}
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
                {selectedIcon === 'User Profile' && <span className="icon-name">User Profile</span>}
              </span>
            </li>
            <li>
              <span
                className={`icon ${selectedIcon === 'Invoices' ? 'selected' : ''}`}
                onMouseEnter={() => handleIconHover('Invoices')}
                onClick={() => handleIconClick('Invoices')}
              >
                <span className="fa fa-file-text fa-lg"></span>
                {selectedIcon === 'Invoices' && <span className="icon-name">Invoices</span>}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="right-section">
        <NavbarDashboard/>
        {selectedIcon === 'Overview' && 
          <Overview/>  
        } 
        {selectedIcon === 'Analytics' && 
          <Analytics/>
        }
        {selectedIcon === 'Planned Tours' &&  
          <PlannedTours/>
        }
        {selectedIcon === 'User Profile' &&
          <UserProfilePage/>   
        }
        {selectedIcon === 'Invoices' && 
          <Invoice />
        }
      </div>
    </div>
  );
};

export default UserProfile;
