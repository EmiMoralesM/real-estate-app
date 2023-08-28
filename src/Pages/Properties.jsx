import React, { useContext, useEffect, useState } from "react";

import "../styles/properties.css";

import Filters from '../Components/Filters'
import Map from "../Components/Properties/Map";
import Homes from "../Components/Properties/Homes";
import DetailPropertyModal from "./DetailPropertyModal";
import { LocationContext } from "../assets/LocationContext";
import { Context } from "../assets/Context";

function Properties(props) {
  const { enableScroll, disableScroll } = useContext(Context)

  const [propertyDetail, setPropertyDetail] = useState("");
  const [properties, setProperties] = useState();

  // If we are trying to access a particular property
  useEffect(() => {
    if (location.pathname.includes('details')) {
      // Set propertyDetail to the _id of the property accessed.
      setPropertyDetail(location.pathname.split('/').pop())
      disableScroll()
      // Open the propery detail modal 
    }
  }, [location.pathname])

  const { homeTypes, setHomeTypes } = useContext(LocationContext)
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [minBaths, setMinBaths] = useState();
  const [minBeds, setMinBeds] = useState();
  
  const [sortPropertes, setSortPropertes] = useState('Homes for You');

  return (
    <main className="mainProperties">

      <section className="mapSection">
        <Map
          properties={properties}
          setPropertyDetail={setPropertyDetail}
        />
      </section>
      <header className="filtersHeader">
        <Filters
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          minBaths={minBaths}
          setMinBaths={setMinBaths}
          minBeds={minBeds}
          setMinBeds={setMinBeds}
          homeTypes={homeTypes}
          setHomeTypes={setHomeTypes}
          />
      </header>
      <Homes
        properties={properties}
        setProperties={setProperties}
        setPropertyDetail={setPropertyDetail}
        
        sortPropertes={sortPropertes}
        setSortPropertes={setSortPropertes}
        
        minPrice={minPrice}
        maxPrice={maxPrice}
        minBaths={minBaths}
        minBeds={minBeds}
        homeTypes={homeTypes}
        />
      {propertyDetail && (
        <DetailPropertyModal
          setPropertyDetail={setPropertyDetail}
          propertyDetail={propertyDetail}
        />
      )}
    </main>
  );
}

export default Properties;
