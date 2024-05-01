import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { googleLogout } from '@react-oauth/google';

const NavbarDashboard = () => {
  const navigate = useNavigate();

  const profileForm = () => {
    //navigate('/profile');

  };

  const [avatar, setAvatar] = useState(null);
  const [firstName, setFirstName] = useState('');

  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId');

  function handleLogout() {
    // Clear user ID and token from local storage
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  
    // Redirect to home page or any other desired page
    window.location.href = '/'; // Redirect to the home page
  }

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
      <header className=''>
        <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
          <div className='flex'>
            <a href='/'>
              <h1>Tours and <span>Travel</span></h1>
            </a>

            <h3 className='px-6'>Hello, {firstName}</h3>
          </div>
          
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <a href="#/" className="mr-5 hover:text-gray-900">Search</a>
            <a href="#/" className="mr-5 hover:text-gray-900">Tours</a>
            <a href="#/" className="mr-5 hover:text-gray-900">Hot Deals</a>
          </nav>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="absolute -inset-1.5"></span>
            <span className="sr-only">View notifications</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </button>

          {/* Profile dropdown */}
          <div className="relative ml-3">
            <div>
              <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                <img className="h-8 w-8 rounded-full" src={avatar} alt=""/>
              </button>
            </div>

            {/* Dropdown menu */}
            <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
              <a href="/profile" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</a>
              <a href="#/" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Settings</a>
              <googleLogout><a href="/" onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</a></googleLogout>
            </div>
          </div>
        </div>

        </div>
      </header>
  );
};

export default NavbarDashboard;
