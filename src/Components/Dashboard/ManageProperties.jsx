import React, { useContext, useEffect, useState } from 'react'
import ManagePropsFilters from './ManageProperties/ManagePropsFilters'
import axios from 'axios'
import { Context } from '../../assets/Context'
import Filters from './ManageProperties/Filters'

function ManageProperties() {
    const { SERVER_URL } = useContext(Context)
    const [results, setResults] = useState()

    const [minPrice, setMinPrice] = useState()
    const [maxPrice, setMaxPrice] = useState()
    const [minBaths, setMinBaths] = useState()
    const [minBeds, setMinBeds] =  useState()

    useEffect(() => {
        // Fetch the properties with the filters specified 
        axios.get(axios.get(`${SERVER_URL}/getProperties?minPrice=${minPrice ? minPrice : 0}&maxPrice=${maxPrice ? maxPrice : 0}&minBaths=${minBaths ? minBaths : 0}&minBeds=${ minBeds ? minBeds : 0}`)
            .then((data) => setResults(data.data))
            .catch(err => console.log(`Error: ${err}`)))
    }, [maxPrice, minPrice, minBaths, minBeds])

    return (
        <div className='whiteBackground manageProperties'>
            <div className='managePropertiesFilterDiv'>
                <Filters
                    minPrice={minPrice}
                    setMinPrice={setMinPrice}
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                    minBaths={minBaths}
                    setMinBaths={setMinBaths}
                    minBeds={minBeds}
                    setMinBeds={setMinBeds}
                />
            </div>
            <div className='propertiesDiv'>
                {(!results) ? (
                    <p>Loading...</p>
                ) : (results.map(property => (
                    <div key={property._id} className='propertyDiv'>
                        <div className='imagePropertyDiv'>
                            <div className='imageContent'>
                                <button className='button deletePropertyButton'>Delete Property</button>
                                <button className='button editPropertyButton'>Edit Property</button>
                                <div>
                                    <p className='location'>{property.addressCity}, {property.addressState}</p>
                                </div>
                            </div>
                            <div className='imageDiv'>
                                <img src={property.mainImage} alt="" />
                            </div>
                        </div>
                        <div className='infoDiv'>
                            <p className='price'>${Intl.NumberFormat().format(property.price)}</p>
                            <p className='beds-baths-sqft'>
                                <span className='beforeIcon'> {property.beds ? property.beds : '--'} </span> |
                                <span className='beforeIcon'> {property.baths ? property.baths : '--'} </span> |
                                <span className='beforeIcon'> {Intl.NumberFormat().format(property.lotAreaUnit == 'sqft' ? property.lotSize : parseInt(property.lotSize * 43560))} sqft </span> -
                                <span> {property.statusText} </span>
                            </p>
                            <p className='address'>{property.address}</p>
                        </div>
                    </div>
                ))
                )}
            </div>

        </div>
    )
}

export default ManageProperties