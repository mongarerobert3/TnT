import React, { useState, useEffect } from 'react';
import './index.css';

const BookingModal = () => {
  const bookingDataString = localStorage.getItem('bookingData');
  const bookingData = JSON.parse(bookingDataString);

  const [showBookingContainer, setShowBookingContainer] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [blurDashboard, setBlurDashboard] = useState(true);


  const toggleBookingContainer = () => {
    setShowBookingContainer((prevState) => !prevState);
  };

  const handleMinimizeClick = () => {
    setShowToast(false);
    setBlurDashboard(false); 
  };

  const handleContinueBooking = () => {
    setBlurDashboard(true); 
  };
  

  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
  }, [showToast]);


  return (
    <>
      {showBookingContainer && (
        <div className="booking-modal">
          <div className="left-column">
            <div className="or-container">
              <hr />
              <span className="or-text">
                <b>Payment Details</b>
              </span>
              <hr />
            </div>

            <div className="booking-info-row">
              <div className="booking-modal-tour-image">
                {/* <img src={bookingInfo.coverImage} alt="Tour" /> */}
              </div>
              <div className="tour-details">
                <p>{bookingData && bookingData.tourName}</p>
                <p>Seats Booked: {bookingData && bookingData.seatsBooked}</p>
              </div>
            </div>
            <div className="payment-options-row">
              <div className="or-container">
                <hr />
                <span className="or-text">
                  <b>Payment Options</b>
                </span>
                <hr />
              </div>
              <div className="payment-icons">
                {/* Add payment options icons here */}
              </div>
            </div>
            <div className="payment-info-row">
              {/* Add form fields for payment information here */}
            </div>
          </div>
          <div className="right-column">
            <div className="booking-heading">
              <div className="close-icon" onClick={toggleBookingContainer}>
                <i className="bi bi-x-circle-fill"></i>
              </div>
              <h1>Tours and Travels</h1>
              <h4>
                <i>Join The Adventure!</i>
              </h4>
            </div>
            <div className="promo-code-row">
              <label htmlFor="promo-code">Promo Code:</label>
              <input type="text" id="promo-code" />
              <button className="btn-apply">Apply</button>
            </div>
            <div className="taxes-row">
              <div>
                <div className="subtotal-row">
                  <span>Subtotal:</span>
                  <span>bookingInfo.subtotal</span>
                </div>
              </div>
              <div>
                <div className="subtotal-row">
                  <span>Taxes:</span>
                  <span>bookingInfo.taxes</span>
                </div>
              </div>
              <div>
                <div className="subtotal-row">
                  <span>Grand Total:</span>
                  <span>bookingInfo.grandTotal</span>
                </div>
              </div>
            </div>
            <button className="pay-now btn-apply">Pay Now</button>
          </div>
        </div>
      )}

      {showToast && (
        <div className="booking-toast">
          <div className="booking-toast-content">
            <div className="booking-toast-message">
              Click here to resume booking
            </div>
            <div className="booking-toast-icons">
              <div className="close-icon" onClick={handleMinimizeClick}>
                <i className="bi bi-dash-circle-fill"></i>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showBookingContainer && (
        <div className="booking-resume-icon" onClick={toggleBookingContainer}>
          {showToast ? (
            <i className="bi bi-chevron-double-up"></i>
          ) : (
            <i className="bi bi-bookmark-plus-fill"></i>
          )}
        </div>
      )}
    </>
  );
};

export default BookingModal;
