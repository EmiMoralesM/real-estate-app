import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../assets/Context'
import { Link } from 'react-router-dom'

function Chart_4(props) {
    const { } = useContext(Context)
    const { SERVER_URL, imageUrl } = useContext(Context)
    const [properties, setProperties] = useState()
    useEffect(() => {
        axios.get(`${SERVER_URL}/latestProperties?limit=2`)
            .then((res) => setProperties(res.data))
            .catch(err => console.log(`Error: ${err}`))
    }, [])

    return (
        <div className='chart_4 chart_div'>
            <div className='titleChat'>
                <p>Latest Properties Available</p>
                <p>Total Properties: <span>{Intl.NumberFormat().format(props.totalProperties)}</span></p>
            </div>
            <div className='propertiesDashboard'>
                {(!properties) ? (
                    <>
                        {[1, 2].map(i => (
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
                        <Link to={`/properties/details/${property.address.replaceAll(' ', '-').replaceAll(',', '').replaceAll('/', '').replaceAll('?', '')}/${property._id}`} key={i}>
                            <div className='imageDivDashboard'>
                                <div className='imageDiv'>
                                    <p className='locationDash'>{property.addressCity}, {property.addressState}</p>
                                    <img src={imageUrl(property.mainImage)} alt="" />
                                </div>
                            </div>
                            <div className='infoDiv'>
                                <p className='price'>${new Intl.NumberFormat().format(property.price)} <span> - {property.statusText} </span></p>
                                <p className='beds-baths-sqft'>
                                    <span className='beforeIcon'> {property.beds ? property.beds : '--'} </span> |
                                    <span className='beforeIcon'> {property.baths ? property.baths : '--'} </span> |
                                    <span className='beforeIcon'> {new Intl.NumberFormat().format(property.lotAreaUnit == 'sqft' ? property.lotSize : parseInt(property.lotSize * 43560))} sqft </span>
                                </p>
                                <p className='address'>{property.address}</p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}

export default Chart_4