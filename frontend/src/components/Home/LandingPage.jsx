import React, { Suspense } from 'react';
import { TourCard } from '..';
import './index.css';

const LandingPage = () => {
  return (
    <div>
      {/**<Hero onSearch={handleSearch} />**/}
      <Suspense fallback={<div>Loading...</div>}>
        <TourCard />
      </Suspense>
    </div>
  );
};

export default LandingPage;
