import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchTour from "./SearchTour";

const SearchBar = () => {
  const [tour, setTour] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();

    if (tour.trim() === "" && price.trim() === "") {
      alert("Please fill in the search bar");
      return;
    }

    updateSearchParams(tour.toLowerCase(), price);
  };

  const updateSearchParams = (tour, price) => {
    const searchParams = new URLSearchParams(location.search);

    if (tour) {
      searchParams.set("tour", tour);
    } else {
      searchParams.delete("tour");
    }

    if (price) {
      searchParams.set("price", price);
    } else {
      searchParams.delete("price");
    }

    const newPathname = location.pathname + "?" + searchParams.toString();

    navigate(newPathname, { replace: true });
  };

  const handleTourChange = (value) => {
    setTour(value);
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchTour tour={tour} onChange={handleTourChange} />
      </div>
      <div className="searchbar__item">
        <i className="bi bi-tag"></i>
        <input
          type="text"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price Range"
          className="searchbar__input"
        />
        <button type="submit" className="search-button sm:hidden">
          <i className="bi bi-search"></i>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
