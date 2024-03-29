import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import './index.css';

const NavbarDashboard = () => {
  const navigate = useNavigate();

  const profileForm = () => {
    navigate('/profile');
  };

  const [avatar, setAvatar] = useState(null);
  const [firstName, setFirstName] = useState('');

  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
        const response = await axios.get(`http://localhost:5000/api/user/${userId}`, config);
        const user = response.data;
        const userAvatar = user.avatar;
        const userFirstName = user.name;

        setAvatar(userAvatar);
        setFirstName(userFirstName);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId, token]);

  return (
    <div>
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-between">

          <nav id="navbar" className="navbar">
            <ul>
              <li className='hello'>Hello, <span className='name-text'>{firstName}!</span></li>
              <li><a href="#search">Search</a></li>
              <li><a href="#tours">Tours</a></li>
              <li><a href="#hot-deals">Hot Deals<i className="bx bxs-star bx-tada red-icon"></i></a></li>
            </ul>
          </nav>
          <i className="notification bx bxs-bell" style={{ color: '#ce1312' }}></i>
          {avatar && <img 
            className='avatar'
            src={avatar}
            alt="avatar" 
            onClick={profileForm}
            />
            
          }
          <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
          <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
        </div>
      </header>
    </div>
  );
};

export default NavbarDashboard;
