import React from 'react';
import './index.css';

const BookingModal = () => {
  return (
    <div className="booking-modal">
      <div className="left-column">
        <h3>Payment Details</h3>
        <div className="booking-info-row">
          <div className="booking-modal-tour-image">
            {/**<img src={bookingInfo.coverImage} alt="Tour" />**/}
          </div>
          <div className="tour-details">
            <p>name</p>
            <p>Seats Booked:</p>
          </div>
        </div>
        <div className="payment-options-row">
          <h4>Payment Options</h4>
          <div className="payment-icons">
            {/* Add payment options icons here */}
          </div>
        </div>
        <div className="payment-info-row">
          {/* Add form fields for payment information here */}
        </div>
      </div>
      <div className="right-column">
        <h3>Tours and Travels</h3>
        <div className="promo-code-row">
          <label htmlFor="promo-code">Promo Code:</label>
          <input type="text" id="promo-code" />
          <button>Apply</button>
        </div>
        <div className="subtotal-row">
          <span>Subtotal:</span>
          <span>bookingInfo.subtotal</span>
        </div>
        <div className="taxes-row">
          <span>Taxes:</span>
          <span>bookingInfo.taxes</span>
        </div>
        <div className="grand-total-row">
          <span>Grand Total:</span>
          <span>bookingInfo.grandTotal</span>
        </div>
        <button className="pay-now-button">Pay Now</button>
        <div className="close-icon">
          {<i class="bi bi-x-circle-fill"></i>}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
