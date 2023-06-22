"use Client";
import React, { useState } from "react"; 
import SearchTour from "./SearchTour.tsx";

const SearchBar = () => {
  const [tour, setTour] = useState('');
  const [price, setPrice] = useState('')

  const SearchButton = ({otherClasses}: {otherClasses: string}) => (
    <button
      type="submit"
      className={`-ml-3 z-10 search-button ${otherClasses}`}
    >
      <i class="bi bi-search"></i>
    </button>
  )
  const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

  }
  return (
    <form 
      className='searchbar'
      onSubmit={handleSearch}
      >
      <div className="searchbar__item">
        <SearchTour
          tour={tour}
          setTour={setTour}
        />
      </div>
      <div className="searchbar__item">
        <i class="bi bi-tag"></i>
        <input
          type="text"
          name='price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price Range"
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden"/>
      </div>
    </form>
  )
}

export default SearchBar