import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logo } from '../../assets';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleHotDealsClick = (event) => {
    event.preventDefault();
    navigate('/hotdeals');
  };

  const handleButton = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/dashboard"
      },
    });
  };
  

  return (
    <div>
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-between">
          <a href='/' className="logo d-flex align-items-center me-auto me-lg-0">
            <img src={logo} alt="logo" className="w-60 h-60" />
            <h1>Tours and <span>Travel</span></h1>
          </a>

          <nav id="navbar" className="navbar">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="#search">Search</a></li>
              <li><a href="#tours">Tours</a></li>
              <li>
                <a href="/hotdeals" onClick={handleHotDealsClick}>
                  Hot Deals
                  <i className='bx bxs-star bx-tada red-icon'></i>
                </a>
              </li>
            </ul>
          </nav>
          {!isAuthenticated && (
            <>
              <button className="btn-book" onClick={handleButton}>
                Join the Adventure
              </button>
            </>
          )}
          <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
          <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
