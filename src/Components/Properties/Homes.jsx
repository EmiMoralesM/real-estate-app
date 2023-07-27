import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../assets/Context'
import { Link } from 'react-router-dom'

function Homes(props) {
  const { SERVER_URL, useOutsideClick } = useContext(Context)

  const sort_options_array = ['Homes for You', 'Price (Low to High)', 'Price (High to Low)', 'Square Feet']

  const [sortResults, setSortResults] = useState(sort_options_array[0])
  const [sortResultsOpen, setSortResultsOpen] = useState(false)

  const refSort = useOutsideClick(() => setSortResultsOpen(false))

  const [properties, setProperties] = useState()
  useEffect(() => {
    axios.get(`${SERVER_URL}/latestProperties?limit=6`)
      .then((data) => setProperties(data.data))
      .catch(err => console.log(`Error: ${err}`))
  }, [])

  return (
    <section className='homesSection'>
      <h1>Search Results</h1>
      <div className='homesSectionDescriptionDiv'>
        <p className='resultsCout'>{ } 29,093 results</p>
        <div className='sortButton' ref={refSort} onClick={() => setSortResultsOpen(prevSortResultsOpen => !prevSortResultsOpen)}>
          <p>Sort: {sortResults}</p>
          <p className={`arrow ${sortResultsOpen ? 'arrowActive' : ''}`}></p>
          {sortResultsOpen &&
            <div className='options sortOptions' >
              {sort_options_array.map(option => (
                <div className="option-item" onClick={() => setSortResults(option)}>{option}</div>
              ))}
            </div>
          }
        </div>
      </div>
      <div className='propertiesDiv homesDiv'>
        {(!properties) ? (
          <p>Loading...</p>
        ) : (
          properties.map((property, i) => (
            <Link
              to={`/properties/details/${property.address.replaceAll(' ', '-').replaceAll(',', '').replaceAll('/', '').replaceAll('?', '')}/${property._id}`}
              key={i}
              className='propertyDiv'
            >
              <div className='imagePropertyDiv'>
                <div className='imageContent homesImageContent'>
                  <p className='status'>{property.statusType.replace('_', ' ')}</p>
                  <div>
                    <p className='location'>{property.addressCity}, {property.addressState}</p>
                    <p className='share'></p>
                  </div>
                </div>
                <div className='imageDiv'>
                  <img src={property.mainImage} alt="" />
                </div>
              </div>
              <div className='infoDiv'>
                <p className='price'>${new Intl.NumberFormat().format(property.price)}</p>
                <p className='beds-baths-sqft'>
                  <span className='beforeIcon'> {property.beds ? property.beds : '--'} </span> |
                  <span className='beforeIcon'> {property.baths ? property.baths : '--'} </span> |
                  <span className='beforeIcon'> {new Intl.NumberFormat().format(property.lotAreaUnit == 'sqft' ? property.lotSize : parseInt(property.lotSize * 43560))} sqft </span> -
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