import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../assets/Context';
import axios from 'axios';
import { Link } from 'react-router-dom';
import images from '../../assets/icons/images.svg'


function FavoriteProperties(props) {
    const { SERVER_URL, user, setUser } = useContext(Context)
    const [yourProperties, setYourProperties] = useState([])

    useEffect(() => {
        setYourProperties([])
        user.yourProperties.forEach(propertyId => {
            axios.get(`${SERVER_URL}/getProperty/${propertyId}`)
                .then(data => {
                    setYourProperties(prevYourProperties => [...prevYourProperties, data.data])
                })
        });
    }, [])

    const removeFavorite = async (propId) => {
        await axios.patch(`${SERVER_URL}/updateUser/${user.email}`, { yourProperties: user.yourProperties.filter(yourProp => yourProp != propId) })
            .then(res => {
                setUser(res.data)
                props.changeSuccessMessage('Property removed from favorites!')
                setYourProperties(prevYourProperties => prevYourProperties.filter(prop => prop._id != propId))
            })
    }

    return (
        <div className='whiteBackground profileContentDiv'>
            <div>
                <h2>Your Published Properties</h2>
                <div className='savedPropertiesDiv'>
                    {(yourProperties.length <= 0) ? (
                        <div className='noPropertiesToShow'>
                            <img src={images} alt="" />
                            <p>No properties published!</p>
                            <Link to={'/sellProperty'} className='button'>Sell your first property!</Link>
                        </div>
                    ) : (
                        yourProperties.map(prop => (
                            <div key={prop._id} className='favoriteProperty'>
                                <Link
                                    to={`/properties/details/${prop.address.replaceAll(' ', '-').replaceAll(',', '').replaceAll('/', '').replaceAll('?', '')}/${prop._id}`}
                                    className='contentFavoriteProperty'
                                >
                                    <div className='imgDiv'>
                                        <img src={prop.mainImage} alt="" />
                                    </div>
                                    <div>
                                        <h3>${Intl.NumberFormat().format(prop.price)} - <span> {prop.statusText}</span></h3>
                                        <p>{prop.address}</p>
                                    </div>
                                </Link>
                                <div>
                                    <button className='removeFavoriteButton' onClick={() => removeFavorite(prop._id)}>Remove</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default FavoriteProperties