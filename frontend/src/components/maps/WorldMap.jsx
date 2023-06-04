import React from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const WorldMap = () => {
  return (
    <div className="world-map-container">
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 100 }}>
        <Geographies geography="https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json">
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} fill="#EAEAEC" stroke="#D6D6DA" />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};


export default WorldMap