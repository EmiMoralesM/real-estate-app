import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../assets/Context'

function Chart_4(props) {
    const { imageUrl } = useContext(Context)
    const [properties, setProperties] = useState()
    useEffect(() => {
        axios.get('http://localhost/latestProperties?limit=2')
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
                    <p>Loading...</p>
                ) : (
                    properties.map((property, i) => (
                        <div key={i}>
                            <div className='imageDivDashboard'>
                                <div className='imageDiv'>
                                    <p className='locationDash'>{property.addressCity}, {property.addressState}</p>
                                    <img src={imageUrl(property.mainImage)} alt="" />
                                </div>
                            </div>
                            <div className='infoDiv'>
                                <p className='price'>${new Intl.NumberFormat().format(property.price)} <span> {property.statusText} </span></p>
                                <p className='beds-baths-sqft'>
                                    <span className='beforeIcon'> {property.beds ? property.beds : '--'} </span> |
                                    <span className='beforeIcon'> {property.baths ? property.baths : '--'} </span> |
                                    <span className='beforeIcon'> {new Intl.NumberFormat().format(property.lotAreaUnit == 'sqft' ? property.lotSize : parseInt(property.lotSize * 43560))} sqft </span>
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

export default Chart_4