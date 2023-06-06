import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Navbar from '../Home/Navbar';

import './index.css'

const TourPage = () => {
  const {id} = useParams();
  const [tour, setTour] = useState(null)
  const [showAllImages, setShowAllImages] = useState(false)

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`http://localhost:5000/api/tour/${id}`).then(response => {
      setTour(response.data);
    });
  }, [id]);

  if (showAllImages)
  {
    return (
      <div className="show-photos">
        <div className="show-photos-images">
          <h2 className='header-tour-photos'>Photos of {tour.name}</h2>
          <button 
            onClick={() => setShowAllImages(false)}
          className='close-photo'>
          <i class="bi bi-x-lg"></i>
            Close Photos</button>
          {tour?.images?.length > 0 && tour.images.map((image, index) => (
          <div key={index}>
            <img src={image}
              className='photo-images'
             alt={`Tour Photo ${index + 1}`} />
          </div>
          ))}
        </div>
      </div>
    )
  }
  return (
    <>
      <Navbar/>
    <>
    <div className='tour-page-name'>
      <h1 className='page-tour-name'>{tour && tour.name}</h1>
      <a className='tour-location' target="#blank" href={'https://maps.google.com/?q='}> 
      <i class="bi bi-geo-alt"></i>
      {tour && tour.location}</a>
    </div> 
    <div className='pictures'>
    <div className="grid">
      <div>
        {tour && tour.imageCover && <img className='imageCover cover' src={tour.imageCover} alt={tour.imageCover} />}
      </div>
      <div className='grid-image'>
      {tour && tour.images && <img className='imageCover first' src={tour.images[0]} alt={tour.images} />}
        <div>
        {tour && tour.images && <img  className='imageCover second' src={tour.images[1]} alt={tour.images} />}
          <button className='show-more-button'
            onClick={() => setShowAllImages(true)}
          >
          <i class="bi bi-grid-3x3-gap-fill"></i>

            Show more photos</button>
        </div>
      </div>
    </div>
    <div className="description-text">
      <h2 className='description-header'>Description</h2>
          {tour && tour.description}
        </div>
        <div className='tour-dates'>
          <div>Start Date:<b/> {tour && tour.startDate} <br/>
            End Date: <b/> {tour && tour.endDate}<br/>
            Max Group Size: {tour && tour.maxGroupSize} 
        </div>
        <div> 
          <div className='price-section'>
            <div>
              <h2 className='price-text'>
                Price: ${ tour && tour.price}
              </h2>
            </div>
            <div>
              <p>Custom Book</p>
            </div>
            <button className='book-tour-btn'>Book Tour</button> 
          </div>
        </div>
        </div>
    </div>
  </>
  </>
   
  )
}

export default TourPage
