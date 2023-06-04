import React, { useState } from 'react';
import './index.css'

const UserProfile = () => {
  const [showLeftSection, setShowLeftSection] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconHover = (iconName) => {
    setSelectedIcon(iconName);
    setShowLeftSection(true);
  };

  const handleIconLeave = () => {
    setSelectedIcon(null);
    setShowLeftSection(false);
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
              >
                <span className="fa fa-home fa-lg"></span>
                {selectedIcon === 'Overview' && <span className="icon-name">Overview</span>}
              </span>
            </li>
            <li>
              <span
                className={`icon ${selectedIcon === 'Performance' ? 'selected' : ''}`}
                onMouseEnter={() => handleIconHover('Performance')}
              >
                <span className="fa fa-tachometer fa-lg"></span>
                {selectedIcon === 'Performance' && <span className="icon-name">Performance</span>}
              </span>
            </li>
            <li>
              <span
                className={`icon ${selectedIcon === 'Analytics' ? 'selected' : ''}`}
                onMouseEnter={() => handleIconHover('Analytics')}
              >
                <span className="fa fa-rocket fa-lg"></span>
                {selectedIcon === 'Analytics' && <span className="icon-name">Analytics</span>}
              </span>
            </li>
            <li>
              <span
                className={`icon ${selectedIcon === 'Planned Tours' ? 'selected' : ''}`}
                onMouseEnter={() => handleIconHover('Planned Tours')}
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
              >
                <span className="fa fa-user fa-lg"></span>
                {selectedIcon === 'User Profile' && <span className="icon-name">User Profile</span>}
              </span>
            </li>
            <li>
              <span
                className={`icon ${selectedIcon === 'Invoices' ? 'selected' : ''}`}
                onMouseEnter={() => handleIconHover('Invoices')}
              >
                <span className="fa fa-file-text fa-lg"></span>
                {selectedIcon === 'Invoices' && <span className="icon-name">Invoices</span>}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="right-section">
        {/* Content for the selected icon */}
        {/* Add appropriate content based on the clicked icon */}
        {selectedIcon && <div>{selectedIcon}</div>}
      </div>
    </div>
  );
};

export default UserProfile;
