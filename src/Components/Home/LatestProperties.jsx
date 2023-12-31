import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Context } from '../../assets/Context'
import { Link } from 'react-router-dom'

function LatestProperties() {
    const { SERVER_URL, imageUrl } = useContext(Context)
    const [properties, setProperties] = useState()
    useEffect(() => {
        axios.get(`${SERVER_URL}/latestProperties?limit=6`)
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
                    <>
                        {[1, 2, 3].map(i => (
                            <div key={i} className='propertyDiv loadingProperty'>
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
                    properties.map((property, i) => (
                        <Link
                            to={`/properties/details/${property.address.replaceAll(' ', '-').replaceAll(',', '').replaceAll('/', '').replaceAll('?', '')}/${property._id}`}
                            key={i}
                            className='propertyDiv'
                        >
                            <div className='imagePropertyDiv'>
                                <div className='imageContent'>
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
                                <p className='price'>${Intl.NumberFormat().format(property.price)}</p>
                                <p className='beds-baths-sqft'>
                                    <span className='beforeIcon'> {property.beds ? property.beds : '--'} </span> |
                                    <span className='beforeIcon'> {property.baths ? property.baths : '--'} </span> |
                                    <span className='beforeIcon'> {Intl.NumberFormat().format(property.lotAreaUnit == 'sqft' ? property.lotSize : parseInt(property.lotSize * 43560))} ft. </span> -
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

export default LatestProperties