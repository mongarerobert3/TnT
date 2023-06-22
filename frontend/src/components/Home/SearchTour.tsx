import { Combobox, Transition } from '@headlessui/react';
import { SearchTourProps } from './navbar';
import './index.css';
import { useState, useEffect, Fragment } from 'react';
import React from 'react'
const SearchTour = ({ tour, setTour }: SearchTourProps) => {
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
      <Combobox >
        <div className="search-combo">
          <Combobox.Button className="absolute top-[14px]">
            <i class="bi bi-search-heart-fill"></i>
          </Combobox.Button>
          <Combobox.Input
            className="searchbar__input"
            placeholder="Seach location"
            displayValue={(tour: string) => tour}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Combobox.Options as="div">
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            show={tours.length > 0} // Show the transition if there are tours available
            afterLeave={() => setQuery('')}
          >
            <div>
              {tours.map((tour) => (
                <Combobox.Option 
                  key={tour.id} 
                  value={tour.name}
                  className='search_tour__option'
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
