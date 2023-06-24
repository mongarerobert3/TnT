import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, Annotation } from "react-simple-maps";
import axios from 'axios';
import { BiMap } from 'react-icons/bi';

const WorldMap = () => {
  const [bookings, setBookings] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTRiODJjNWMwMGI3MzgyNjQzZTViMSIsImlhdCI6MTY4NTk2NDg3MiwiZXhwIjoxNjg4NTU2ODcyfQ.AbZ06U7Ax1cgwPsGYvzX5YwFy6rRNbbWac9mJli0tTs";
  const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get("http://localhost:5000/api/booking/6454b82c5c00b7382643e5b1", config);
        const data = response.data;
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      });
    }
  }, []);

  return (
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#ccc"
              stroke="#000"
              strokeWidth={0.5}
            />
          ))
        }
      </Geographies>
      {bookings.map((booking) => (
        <Marker
          key={booking.id}
          coordinates={[booking.tour.location.longitude, booking.tour.location.latitude]}
        >
          <g>
            <circle r={3} fill="#F00" />
            <Annotation
              subject={[booking.tour.location.longitude, booking.tour.location.latitude]}
              dx={8}
              dy={5}
              connectorProps={{
                stroke: '#F00',
                strokeWidth: 0.5,
                strokeLinecap: 'round',
              }}
            >
              <text x={4} fontSize={10} fill="#000">
                {booking.tour.name}
              </text>
            </Annotation>
          </g>
        </Marker>
      ))}
      {userLocation && (
        <Marker coordinates={[userLocation.longitude, userLocation.latitude]}>
          <g>
            <circle r={5} fill="#00F" />
            <Annotation
              subject={[userLocation.longitude, userLocation.latitude]}
              dx={-30}
              dy={-10}
              connectorProps={{
                stroke: '#000',
                strokeWidth: 0.5,
                strokeLinecap: 'round',
              }}
            >
              <text x={4} fontSize={40} fill="#000">
                <g transform="translate(-12, -6)">
                  <BiMap size={20} />
                  <text x={24} y={4}>
                    You are here
                  </text>
                </g>
              </text>
            </Annotation>
          </g>
        </Marker>
      )}
    </ComposableMap>
  );
};

export default WorldMap;
