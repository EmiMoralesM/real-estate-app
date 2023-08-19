import React, { useContext, useEffect, useState } from 'react'
import '../styles/detailProduct.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../assets/Context'

function DetailProductModal(props) {
    const { SERVER_URL, user, setUser, imageUrl, changeSuccessMessage, changeErrorMessage } = useContext(Context)
    const [property, setProperty] = useState('')
    const [isFavorite, setIsFavorite] = useState(false)
    const [otherImages, setOtherImages] = useState([])
    const [nameContact, setNameContact] = useState(user.name)
    const [emailContact, setEmailContact] = useState(user.email)
    const [messageContact, setMessageContact] = useState('')

    const [openContactModal, setOpenContactModal] = useState(false)

    const sendMessageToOwner = async () => {
        if (property.ownerEmail) {
            console.log(property.ownerEmail);
            console.log(nameContact);
            console.log(emailContact);
            console.log(messageContact);
            await axios.patch(`${SERVER_URL}/updateUser/${property.ownerEmail}`, { notifications: ['aaa'] })
                .then((res) => console.log(res.data))
        }
    }

    useEffect(() => {
        axios.get(`${SERVER_URL}/getProperty/${props.propertyDetail}`)
            .then(data => {
                setProperty(data.data)
                setOtherImages(data.data.otherImages.map(image => <img className='image' key={image} src={imageUrl(image)} alt="" />))
                setIsFavorite(user.favorites.includes(data.data._id) ? true : false)
                setMessageContact(`Hi, I'm interested in ${data.data.address}.`)
                // location.pathname = `/properties/details/${data.data.address.replaceAll(' ', '-').replaceAll(',', '').replaceAll('/', '').replaceAll('?', '')}/${data.data._id}`
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
                {property &&
                    <>
                        <div className='propertyImages'>
                            <img className='mainImage' onClick={() => setIsFavorite(true)} src={imageUrl(property.mainImage)} alt="" />
                            {otherImages}
                        </div>
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
                                <button className='contactAgent' onClick={() => {
                                    setOpenContactModal(true)
                                }}>Contact Owner</button>
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
                }
            </div>
            {openContactModal && <aside className='generalModal contactOwnerModal'>
                <div className={`generalModalDiv`}>
                    <button className='closeModal' onClick={() => setOpenContactModal(false)}></button>
                    <div className='generalModalContent'>
                        <h3>Contact Owner</h3>
                        <div>
                            <label htmlFor="">Name</label>
                            <input type="text" value={nameContact} onChange={(e) => setNameContact(e.target.value)} name="" id="" />
                        </div>
                        <div>
                            <label htmlFor="">Email</label>
                            <input type="text" value={emailContact} onChange={(e) => setEmailContact(e.target.value)} name="" id="" />
                        </div>
                        <div>
                            <label htmlFor="">Message</label>
                            <textarea name="" id="" value={messageContact} onChange={(e) => setMessageContact(e.target.value)} cols="30" rows="10"></textarea>
                        </div>
                        <div className='sendOwnerMessage'>
                            <button className="button" onClick={sendMessageToOwner}>Send</button>
                        </div>
                    </div>
                </div>
                <div onClick={() => setOpenContactModal(false)} className='generalModalBackground'></div>
            </aside>}
        </section >
    )
}

export default DetailProductModal