import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Home/Navbar';
import { formatDate } from './DateUtils';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 


import './index.css';
import Footer from '../Home/Footer';

const TourPage = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [showAllImages, setShowAllImages] = useState(false);
  const [numSeats, setNumSeats] = useState(1);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`http://localhost:5000/api/tour/${id}`).then(response => {
      setTour(response.data);
    });
  }, [id]);

  const updateTotalPrice = () => {
    const price = tour?.price;
    const seats = parseInt(numSeats);

    if (seats <= 0 || isNaN(seats)) {
      return 'Invalid number of seats';
    }

    const calculatedPrice = price * seats;
    return `Total Price: $${calculatedPrice.toFixed(2)}`;
  };

  const handleNumSeatsChange = e => {
    setNumSeats(e.target.value);
  };

  const Rating = ({ rating }) => {
    const totalStars = 5;
    const stars = [];
  
    for (let i = 0; i < totalStars; i++) {
      const starClassName = i < rating ? 'fa fa-star star-filled' : 'fa fa-star';
      stars.push(<i className={starClassName} aria-hidden="true" key={i}></i>);
    }
  
    return <div className="rating-stars">{stars}</div>;
  };
  
  

  return (
    <>
      <Navbar />
      {showAllImages ? (
        <div className="show-photos">
          <div className="show-photos-images">
            <h2 className="header-tour-photos">Photos of {tour?.name}</h2>
            <button onClick={() => setShowAllImages(false)} className="close-photo">
              <i className="bi bi-x-lg"></i>
              Close Photos
            </button>
            {tour?.images?.length > 0 &&
              tour.images.map((image, index) => (
                <div key={index}>
                  <img src={image} className="photo-images" alt={`Tour Photo ${index + 1}`} />
                </div>
              ))}
          </div>
        </div>
      ) : (
        <>
          <div className="tour-page-name">
            <h1 className="page-tour-name">{tour?.name}</h1>
            <a className="tour-location" target="#blank" href={'https://maps.google.com/?q='}>
              <i className="bi bi-geo-alt"></i>
              {tour?.location}
            </a>
          </div>
          <div className="pictures">
            <div className="grid">
              <div>
                {tour?.imageCover && (
                  <img onClick={() => setShowAllImages(true)} className="imageCover cover" src={tour.imageCover} alt={tour.imageCover} />
                )}
              </div>
              <div className="grid-image">
                {tour?.images && (
                  <img onClick={() => setShowAllImages(true)} className="imageCover first" src={tour.images[0]} alt={tour.images} />
                )}
                <div>
                  {tour?.images && (
                    <img onClick={() => setShowAllImages(true)} className="imageCover second" src={tour.images[1]} alt={tour.images} />
                  )}
                  <button className="show-more-button" onClick={() => setShowAllImages(true)}>
                    <i className="bi bi-grid-3x3-gap-fill"></i>
                    View Gallery
                  </button>
                </div>
              </div>
            </div>
            <div className="description-text">
              <h2 className="description-header">Description</h2>
              {tour?.description}
            </div>
            <div className="tour-dates">
              <div className='tour-dates-date'>
                <div className="start-date date-columns">
                  <div>
                    <h3>Start Date:</h3>
                  </div>
                  <div>
                    <h3>{formatDate(tour?.startDate)}</h3>
                  </div>
                </div>
                <div className="end-date date-columns">
                  <div>
                      <h3>End Date:</h3>
                  </div>
                  <div>
                    <h3>{formatDate(tour?.endDate)}</h3>
                  </div>                
                </div>
                  
                <div className="max-group-size date-columns">
                  <div>
                    <h3>Max Group Size: </h3>
                  </div>
                  <div>
                    <h3>{tour?.maxGroupSize}</h3>
                  </div>              
                </div>
              </div>
              <div>
                <div className="price-section">
                  <div>
                    <h2 className="price-text">
                      Price: ${tour?.price}
                    </h2>
                  </div>
                  <div className="custom-book">
                    <input
                      id="seatsInput"
                      type="number"
                      min="1"
                      value={numSeats}
                      onChange={handleNumSeatsChange}
                      placeholder="Input number of seats"
                    />
                    {numSeats > 0 && (
                      <div id="totalPrice">{updateTotalPrice()}</div>
                    )}
                  </div>
                  <div className="btn-grid">
                    <Link to={`/book?id=${id}&seats=${numSeats}`}>
                      <button 
                        className="book-tour-btn">
                        Book Tour
                      </button>
                    </Link>  
                  </div>
                </div>
              </div>
              <div className="homepage">
                <div>
                  <div className="row-container">
                    <i className="bi bi-check-circle-fill"></i>
                    <div>
                      <h4>Easy Booking</h4>
                      <p>Book your tour hassle-free with our secure payment options.</p>
                    </div>
                  </div>
                  <div className="row-container">
                    <i className="bi bi-star-fill"></i>
                    <div>
                      <h4>Unforgettable Experiences</h4>
                      <p>Embark on extraordinary adventures and create lifelong memories.</p>
                    </div>
                  </div>
                  <div className="row-container">
                    <div className="tooltip-container">
                      <OverlayTrigger
                        trigger="hover"
                        placement="top"
                        overlay={<Tooltip id="tooltip">Leave everything to us</Tooltip>}
                      >
                        <i className="bi bi-info-circle-fill"></i>
                      </OverlayTrigger>
                    </div>
                    <div>
                      <h4>Leave everything to us</h4>
                      <p>Let us take care of your flight and hotel bookings for a stress-free journey.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="reviews">
								<h2>Reviews</h2>
								{tour?.reviews.length > 0 ? (
                  tour.reviews.map((review) => (
                    <div key={review._id}>
                      <div className='profile-user-avatar'>
                        <div>
                          <img src={review.user.avatar} alt="user_avatar" />
                        </div>
                        <div>
                          <p>{review.comment}</p>
                          <Rating rating={review.rating} />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-reviews">
                    <p>No reviews yet</p>
                  </div>
                )}

							</div>
            </div>
          </div>
          <Footer/>
        </>
      )}
    </>
  );
};

export default TourPage;
