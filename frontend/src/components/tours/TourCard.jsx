import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { formatDate } from './DateUtils';

const TourCard = ({ query }) => {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [q, setQ] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [customPriceRange, setCustomPriceRange] = useState({ min: "", max: "" });
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tour');
        setTours(response.data);
        setIsLoaded(true);
        console.log('Data fetched:', response.data); // Debugging line
      } catch (err) {
        console.log('Fetch error:', err);
        setError(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Query changed:', query); // Debugging line
  }, [query]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value);
    if (e.target.value !== "custom") {
      setCustomPriceRange({ min: "", max: "" });
    }
  };

  const handleCustomPriceChange = (e) => {
    const { name, value } = e.target;
    setCustomPriceRange((prev) => ({ ...prev, [name]: value }));
  };


  const filterByPriceRange = (items) => {
    if (priceRange && priceRange !== "custom") {
      const [min, max] = priceRange.split("-").map(Number);
      return items.filter((item) => item.price >= min && item.price <= max);
    } else if (priceRange === "custom" && customPriceRange.min && customPriceRange.max) {
      const min = Number(customPriceRange.min);
      const max = Number(customPriceRange.max);
      return items.filter((item) => item.price >= min && item.price <= max);
    }
    return items;
  };

  const handleSearchByDate = (e) => {
    setDate(e.target.value);
  }

  const filterByDate = (items) => {
    if (date) {
      return items.filter((item) => formatDate(item.startDate) === date)
    }
    return items;
  }

  const search = (items) => {
    const filteredByPrice = filterByPriceRange(items);
    const filteredByDate = filterByDate(filteredByPrice);
    return filteredByDate.filter((item) =>
      item.name.toString().toLowerCase().includes(q.toLowerCase())
    );
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    //Render Empty Tour Cards
    return <div>Loading...</div>;
  }

  return (
    <>
      <div id="search">
        <div className="search-bar">
          <nav className="navbar navbar-expand navbar-light bg-light"></nav>
          <div className="search-container">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search for a location..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />    
            </div>
            <select className="form-select" value={priceRange} onChange={handlePriceRangeChange}>
              <option value="">Select price range</option>
              <option value="0-100">$0 - $100</option>
              <option value="100-200">$100 - $200</option>
              <option value="200-300">$200 - $300</option>
              <option value="custom">Custom Select</option>
            </select>
            {priceRange === "custom" && (
              <>
                <input
                  type="number"
                  className="form-control"
                  name="min"
                  placeholder="Min price"
                  value={customPriceRange.min}
                  onChange={handleCustomPriceChange}
                />
                <input
                  type="number"
                  className="form-control"
                  name="max"
                  placeholder="Max price"
                  value={customPriceRange.max}
                  onChange={handleCustomPriceChange}
                />
              </>
            )}
          <div className="input-group">
            <input
              type="date"
              className="form-control"
              placeholder="Search by date"
              onChange={handleSearchByDate}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          </div>
        </div>
      </div>

      <div className="tour-card-container">
        {search(tours).map((tour, index) => (
          <div className="card tour-card" key={tour._id}>
            <Link to={`/tour/${tour._id}`}>
              <div className="tour-details">
                <h3 className="tour-name">{tour.name}</h3>
                <p className="dates">{formatDate(tour.startDate)} - {formatDate(tour.endDate)}</p>
                <img src={tour.imageCover} alt="Tour" className="tour-image" />
                <p className="availableSeats">Available Seats: {tour.maxGroupSize}</p>
                <p className="tour-price">Price: ${tour.price}</p>
                <p className="Tcard-Desc">{tour.description}</p>
                <button type="button" className="btn-explore">Explore</button>
              </div>
            </Link>
          </div>
        ))}
        {search(tours).length === 0 && <p>No tours found</p>}
      </div>
    </>
  );
};

export default TourCard;
