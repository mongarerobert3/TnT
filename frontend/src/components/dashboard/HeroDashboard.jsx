import React, { useEffect, useState } from 'react'
import axios from 'axios';

const HeroDashboard = () => {
  const [trips, setTrips] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = axios.get("http://localhost:5000/api/booking/trips/662f6cb5a04be98a4ef2bf64")
        setTrips(response.data)
      } catch (error) {
        console.error('Error fetching trips:', error)
      }
      
    }
    fetchData();
    
  }, [])
  
  return (
    <div className='container topnav'>
      {trips ? (
        <div>
          <h1>Active trips</h1>
          {trips}
        </div>
      ) : (
        <div>
          <h1>Join the Adventure! You have no active trips</h1>
        </div>
      )}
    </div>
  );
};

export default HeroDashboard;
