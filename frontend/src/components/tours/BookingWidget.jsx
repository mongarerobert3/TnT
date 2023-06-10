import React, { useState, useEffect } from 'react';
import BookingNav from './BookingNav';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formatDate } from './DateUtils';
import { Footer } from '..';
import useForm from '../Login/LoginHandler';
import BookingModal from './BookingModal';

const BookingWidget = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const numSeats = searchParams.get('seats');
  const [tour, setTour] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { handleChange, handleFormSubmit, errors, loginError, values } = useForm(submitForm);
  
  function submitForm() {
    navigate(`/dashboard?from=book`)
    setShowModal((prevShowModal) => !prevShowModal);
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`http://localhost:5000/api/tour/${id}`).then((response) => {
      setTour(response.data);
    });
  }, [id]);
  

  return (
    <>
      <BookingNav />
      <div className='booking-page-container'>
        <div className='side-a'>
          <h1>Booking for {tour && tour.name}</h1>
          <div className='book-details'>
            <div>
              <h5 className='dates-text'>Dates</h5>
              <p className='dates-text'>{tour && formatDate(tour.startDate)}</p>
            </div>
            <div>
              <p className='edit-text'>Edit</p>
            </div>
          </div>
          <div className='book-details seats'>
            <div>
              <h5 className='dates-text'>Seats</h5>
              <p className='dates-text'>{numSeats}</p>
            </div>
            <div>
              <p className='edit-text'>Edit</p>
            </div>
          </div>
          <div className='horizontal-line'>
            <hr />
          </div>
          <div className='booking-login'>
            <h2>Log in or Sign Up to Book</h2>
            <div className='login-spaces'>
              <div className='book-mail'>
                <input
                  type='email'
                  name='email'
                  placeholder='Enter your email'
                  className='book-mail-insider'
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && <p>{errors.email}</p>}
              </div>
              <div className='book-mail'>
                <input
                  type='password'
                  name='password'
                  placeholder='Enter your password'
                  className='book-mail-insider'
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && <p>{errors.password}</p>}
              </div>
              <div>
                <button
                  className='book-tour-btn continue-btn'
                  onClick={handleFormSubmit}
                  type='submit'
                >
                  Continue
                </button>
              </div>
              <div className='or-container'>
                <hr />
                <span className='or-text'>or</span>
                <hr />
              </div>
              <div className='direct-buttons'>
                <div>
                  <button type='submit' className='button-styles btn'>
                    <i className='fa fa-facebook' aria-hidden='true'></i> Login With Facebook
                  </button>
                </div>
                <div>
                  <button type='submit' className='button-styles-2 btn'>
                    <i className='fa fa-google' aria-hidden='true'></i> Login With Google
                  </button>
                </div>
                <div className='py-4 pt-4 text-center'>
                  Get Members Benefit.{' '}
                  <Link to='/signup'>
                    <a href='#signUp'>Sign Up</a>
                  </Link>
                </div>
              </div>
              {loginError && <p>Login failed. Please try again.</p>}
            </div>
          </div>
        </div>
        <div className='side-b'>
          <div className='row-1'>a</div>
          <div className='row-2'>b</div>
          <div className='row-3'>c</div>
        </div>
      </div>
      {showModal && <BookingModal />}
      <Footer />
    </>
  );
};

export default BookingWidget;
