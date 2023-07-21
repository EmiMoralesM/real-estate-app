import React, { useContext, useEffect, useState } from 'react'
import '../styles/detailProduct.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../assets/Context'

function DetailProductModal(props) {
    const { SERVER_URL } = useContext(Context)
    const [property, setProperty] = useState('')
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        axios.get(`${SERVER_URL}/getProperty/${props.propertyDetail}`)
            .then(data => {
                setProperty(data.data)
            })
    }, [])

    const toggleFavorite = () => {
        setIsFavorite(prevIsFavorite => !prevIsFavorite)
    }

    return (
        <section className='properyDetailSection'>
            <Link to={'/properties'} onClick={() => props.setPropertyDetail('')} className='generalModalBackground detailProductModalBackground'></Link>
            <div className='properyDetailModal'>
                <button className='closeModal' onClick={() => props.setPropertyDetail('')}></button>
                {property &&
                    <>
                        <div className='propertyImages'>
                            <img className='mainImage' src={property.mainImage} alt="" />
                            {property.images.map(image => (
                                <img className='image' src={image} alt="" />
                            ))}
                        </div>
                        <div className='propertyDetails'>
                            <div className='propertyDetailslogoDiv'>
                                <p className='logo'><Link to={'/'}>Logo</Link></p>
                            </div>
                            <hr />
                            <div className='priceDiv'>
                                <h2>${Intl.NumberFormat().format(property.price)}</h2>
                                <button onClick={toggleFavorite} className={`favoriteButton ${isFavorite ? 'favoriteButtonActive' : ''}`}>Save</button>
                            </div>
                            <p className='address'>{property.address}</p>
                            <p className='beds-baths-sqft'>
                                <span className='beforeIcon'> {property.beds ? property.beds : '--'} </span> |
                                <span className='beforeIcon'> {property.baths ? property.baths : '--'} </span> |
                                <span className='beforeIcon'> {Intl.NumberFormat().format(property.lotAreaUnit == 'sqft' ? property.lotSize : parseInt(property.lotSize * 43560))} sqft </span> -
                                <span> {property.statusText} </span>
                            </p>
                            <button className='contactAgent'>Contact Agent</button>
                            <hr />
                            <div className='generalInfoDiv'>
                                <h3>General Info</h3>
                                <p className='hometype'><span></span> {property.statusText}</p>
                                <p className='lotSize'><span></span> {property.lotSize} {property.lotAreaUnit}</p>
                                <p className='beds'><span></span> {property.beds} bedrooms</p>
                                <p className='baths'><span></span> {property.baths} bathrooms</p>
                                <p className='priceSqft'><span></span> ${property.pricePerSqFt} price/sqft</p>
                            </div>
                            <hr />
                            <div className='descriptionDiv'>
                                <h3>Description</h3>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam aspernatur itaque pariatur esse error perferendis vel illo quas earum, enim dolor harum eligendi aperiam. Eum non sint praesentium obcaecati harum?</p>
                            </div>
                        </div>
                    </>
                }
            </div>
        </section>
    )
}

export default DetailProductModal