import React, { useContext, useEffect, useState } from 'react'
import '../styles/detailProperty.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../assets/Context'
import Carousel from '../Components/DetailProperty/Carousel'
import ContactOwner from '../Components/DetailProperty/ContactOwner'

function DetailProductModal(props) {
    const { SERVER_URL, user, setUser, imageUrl, changeSuccessMessage, changeErrorMessage } = useContext(Context)

    const [property, setProperty] = useState('')
    const [otherImages, setOtherImages] = useState([])

    const [isFavorite, setIsFavorite] = useState(false)

    // Contact owner
    const [openContactModal, setOpenContactModal] = useState(false)
    const [messageContact, setMessageContact] = useState('')

    useEffect(() => {
        axios.get(`${SERVER_URL}/getProperty/${props.propertyDetail}`)
            .then(data => {
                setProperty(data.data)
                console.log(props.propertyDetail);
                console.log(data.data);
                setOtherImages(data.data.otherImages.map(image => <img className='image' key={image} src={imageUrl(image)} alt="" />))
                setIsFavorite(user.favorites.includes(data.data._id) ? true : false)
                setMessageContact(`Hi, I'm interested in ${data.data.address}.`)
            })
    }, [])

    const toggleFavorite = () => {
        if (isFavorite) {
            axios.patch(`${SERVER_URL}/updateUser/${user.email}`, { favorites: user.favorites.filter(favProp => favProp != property._id) })
                .then(res => {
                    setUser(res.data)
                    changeSuccessMessage('Property removed from favorites!')
                })
        } else {
            axios.patch(`${SERVER_URL}/updateUser/${user.email}`, { favorites: [...user.favorites, property._id] })
                .then(res => {
                    setUser(res.data)
                    changeSuccessMessage('Property added to favorites!')
                })
        }
        setIsFavorite(prevIsFavorite => !prevIsFavorite)
    }

    return (
        <section className='properyDetailSection'>
            <Link to={'/properties'} onClick={() => props.setPropertyDetail('')} className='generalModalBackground detailProductModalBackground'></Link>
            <div className='properyDetailModal'>
                <Link to={'/properties'} className='closeModal' onClick={() => props.setPropertyDetail('')}></Link>
                {!property ? (
                    <div className='loaderDetailProperty'><span className="loader"></span></div>
                ) : (
                    <>
                        <div className='propertyImages'>
                            <img className='mainImage' src={imageUrl(property.mainImage)} alt="" />
                            {otherImages}
                        </div>

                        {/* Mobile images carousel */}
                        <Carousel otherImages={otherImages} mainImage={imageUrl(property.mainImage)} />

                        <div className='propertyDetails'>
                            <div className='propertyTitleDiv'>
                                <div className='propertyDetailslogoDiv'>
                                    <p className='logo'><Link to={'/'}>Logo</Link></p>
                                </div>
                                <hr />
                                <div className='priceDiv'>
                                    <h2>${Intl.NumberFormat().format(property.price)}</h2>
                                    <button onClick={user.email ? toggleFavorite : () => changeErrorMessage('You have to sign in to add a property to favorites')} className={`favoriteButton ${isFavorite ? 'favoriteButtonActive' : ''}`}>Save</button>
                                </div>
                                <p className='address'>{property.address}</p>
                                <p className='beds-baths-sqft'>
                                    <span className='beforeIcon'> {property.beds ? property.beds : '--'} </span> |
                                    <span className='beforeIcon'> {property.baths ? property.baths : '--'} </span> |
                                    <span className='beforeIcon'> {Intl.NumberFormat().format(property.lotAreaUnit == 'sqft' ? property.lotSize : parseInt(property.lotSize * 43560))} sqft </span> -
                                    <span> {property.statusText} </span>
                                </p>
                                <button
                                    className='contactAgent'
                                    onClick={() => {
                                        user.email ? setOpenContactModal(true) : changeErrorMessage('You have to sign in to be able to send messages')
                                    }}
                                >Contact Owner</button>
                                <hr />
                            </div>
                            <div className='propertyInfoDiv'>
                                <div className='generalInfoDiv'>
                                    <h3>General Info</h3>
                                    <p className='hometype'><span></span> {property.statusText}</p>
                                    <p className='lotSize'><span></span> {Intl.NumberFormat().format(property.lotSize)} {property.lotAreaUnit}</p>
                                    <p className='beds'><span></span> {property.beds} Bedrooms</p>
                                    <p className='baths'><span></span> {property.baths} Bathrooms</p>
                                    <p className='priceSqft'><span></span> ${property.pricePerSqFt} Price/sqft</p>
                                </div>
                                <hr />
                                <div className='descriptionDiv'>
                                    <h3>Location</h3>
                                    <iframe className='descriptionMap' src={`https://maps.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`} />
                                </div>

                            </div>
                        </div>
                    </>
                )
                }
            </div>
            {openContactModal && <ContactOwner
                setOpenContactModal={setOpenContactModal}
                property={property}
                messageContact={messageContact}
                setMessageContact={setMessageContact}
            />}
        </section >
    )
}

export default DetailProductModal