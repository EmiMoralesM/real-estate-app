import React, { useEffect, useState } from 'react'
import axios from 'axios'
function LatestProperties() {
    const [properties, setProperties] = useState()
    useEffect(() => {
        axios.get('https://real-estate-app-server.onrender.com/latestProperties')
            .then((data) => setProperties(data.data))
            .catch(err => console.log(`Error: ${err}`))
    }, [])

    return (
        <section className='propertiesSection'>
            <div className='propertiesTitleDiv'>
                <p>RECENT PROPERTIES</p>
                <h2><span>Explore the latest</span> <span>properties available</span></h2>
            </div>
            <div className='propertiesDiv'>
                {(!properties) ? (
                    <p>Loading...</p>
                ) : (
                    properties.map((property, i) => (
                        <div key={i}>
                            <div className='imagePropertyDiv'>
                                <div className='imageContent'>
                                    <p className='status'>{property.statusType.replace('_', ' ')}</p>
                                    <div>
                                        <p className='location'>{property.addressCity}, {property.addressState}</p>
                                        <p className='share'></p>
                                    </div>
                                </div>
                                <div className='imageDiv'>
                                    <img src={property.images[0]} alt="" />
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
                        </div>
                    ))
                )}
            </div>
        </section>
    )
}

export default LatestProperties