import React, { useState, useEffect, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import './index.css';

const SearchTour = ({ tour, onChange }) => {
  const [query, setQuery] = useState('');
  const [tours, setTours] = useState([]);

  useEffect(() => {
    if (query) {
      fetchToursByLocation();
    } else {
      setTours([]);
    }
  }, [query]);

  const fetchToursByLocation = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/tour/location/${query}`);
      const data = await response.json();
      const filteredTours = data.filter((tour) => tour.name.toLowerCase().startsWith(query.toLowerCase()));
      setTours(filteredTours);
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
  };

  return (
    <div className='search-tour'>
      <Combobox>
        <div className="search-combo">
          <Combobox.Button className="absolute top-[14px]">
            <i className="bi bi-search-heart-fill"></i>
          </Combobox.Button>
          <Combobox.Input
            className="searchbar__input"
            placeholder="Search location"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Combobox.Options as="div">
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            show={tours.length > 0}
            afterLeave={() => setQuery('')}
          >
            <div>
              {tours.map((tour) => (
                <Combobox.Option
                  key={tour.id}
                  value={tour.name}
                  className='search_tour__option'
                  onClick={() => onChange(tour.name)}
                >
                  {tour.name}
                </Combobox.Option>
              ))}
            </div>
          </Transition>
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

export default SearchTour;