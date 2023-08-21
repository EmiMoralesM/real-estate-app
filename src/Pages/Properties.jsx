import React, { useEffect, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

import "../styles/properties.css";

import Filters from '../Components/Dashboard/ManageProperties/Filters'
import Map from "../Components/Properties/Map";
import Homes from "../Components/Properties/Homes";
import DetailPropertyModal from "./DetailPropertyModal";

function Properties(props) {
  const [propertyDetail, setPropertyDetail] = useState("");
  const [properties, setProperties] = useState();
  // If we are trying to access a particular property
  useEffect(() => {
    if (location.pathname.includes('details')) {
      // Set propertyDetail to the _id of the property accessed.
      setPropertyDetail(location.pathname.split('/').pop())
      // Open the propery detail modal 
    }
  }, [location.pathname])
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [minBaths, setMinBaths] = useState();
  const [minBeds, setMinBeds] = useState();
  const [homeTypes, setHomeTypes] = useState([]);

  return (
    <main className="mainProperties">
      <section className="mapSection">
        {/* <Map properties={properties} setPropertyDetail={setPropertyDetail} /> */}
        <Wrapper
          apiKey="AIzaSyDYd25d8gbKq9Voxfu5aFxog9SPnT4OZTU"
          version="beta"
          libraries={["marker", "places"]}
        >
          <Map properties={properties} setPropertyDetail={setPropertyDetail} />
        </Wrapper>
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
