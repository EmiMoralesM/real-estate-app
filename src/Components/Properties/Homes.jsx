import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../assets/Context'
import { Link } from 'react-router-dom'
import { LocationContext } from '../../assets/LocationContext'
import SortProperties from '../SortProperties'

function Homes(props) {
  const { useOutsideClick, imageUrl } = useContext(Context)
  const { locationCoordinates, fetchPropertiesData } = useContext(LocationContext)

  useEffect(() => {
    props.setProperties()
    // Function (from LocationContext) that fetches the properties with the specified filters.
    
    fetchPropertiesData(props.setProperties, locationCoordinates, props.maxPrice, props.minPrice, props.minBaths, props.minBeds, props.homeTypes, props.sortPropertes);
  }, [locationCoordinates, props.maxPrice, props.minPrice, props.minBaths, props.minBeds, props.homeTypes, props.sortPropertes])

  return (
    <section className='homesSection'>
      <h1>Search Results</h1>
      <div className='homesSectionDescriptionDiv'>
        {<p className='resultsCout'>{props.properties && props.properties.length} Results</p>}
        <SortProperties
          properties={props.properties}
          setProperties={props.setProperties}
          
          sortPropertes={props.sortPropertes}
          setSortPropertes={props.setSortPropertes}
        />
      </div>
      <div className='propertiesDiv homesDiv'>
        {(!props.properties) ? (
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className='loadingProperty loadingPropertyMap'>
                <div className='loadingPropertyImage' />
                <div className='infoDiv'>
                  <span className='priceLoading' />
                  <span className='infoLoading' />
                  <span className='infoLoading' />
                </div>
              </div>
            ))}
          </>
        ) : (
          props.properties.map((property, i) => (
            <Link
              to={`/properties/details/${property.address.replaceAll(' ', '-').replaceAll(',', '').replaceAll('/', '').replaceAll('?', '')}/${property._id}`}
              // onClick={() => props.setPropertyDetail(property._id)}
              key={i}
              className='propertyDiv'
            >
              <div className='imagePropertyDiv'>
                <div className='imageContent homesImageContent'>
                  <p className='status'>{property.statusType.replace('_', ' ')}</p>
                  <div>
                    <p className='location'>{property.addressCity}, {property.addressState}</p>
                  </div>
                </div>
                <div className='imageDiv'>
                  <img src={imageUrl(property.mainImage)} alt="" />
                </div>
              </div>
              <div className='infoDiv'>
                <p className='price'>${new Intl.NumberFormat().format(property.price)}</p>
                <p className='beds-baths-sqft'>
                  <span className='beforeIcon'> {property.beds ? property.beds : '--'} </span> |
                  <span className='beforeIcon'> {property.baths ? property.baths : '--'} </span> |
                  <span className='beforeIcon'> {new Intl.NumberFormat().format(property.lotAreaUnit == 'sqft' ? property.lotSize : parseInt(property.lotSize * 43560))} ft. </span> -
                  <span> {property.statusText} </span>
                </p>
                <p className='address'>{property.address}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  )
}

export default Homes