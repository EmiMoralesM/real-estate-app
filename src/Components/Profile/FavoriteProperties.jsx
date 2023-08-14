import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../assets/Context';
import axios from 'axios';
import { Link } from 'react-router-dom';
import images from '../../assets/icons/images.svg'


function FavoriteProperties(props) {
    const { SERVER_URL, user, setUser, imageUrl, changeSuccessMessage } = useContext(Context)
    const [favProperties, setFavProperties] = useState([])

    useEffect(() => {
        setFavProperties([])
        user.favorites.forEach(propertyId => {
            axios.get(`${SERVER_URL}/getProperty/${propertyId}`)
                .then(data => {
                    // Review
                    if (data.data) {
                        setFavProperties(prevFavProperties => [...prevFavProperties, data.data])
                    }
                })
        });
    }, [])

    const removeFavorite = async (propId) => {
        await axios.patch(`${SERVER_URL}/updateUser/${user.email}`, { favorites: user.favorites.filter(favProp => favProp != propId) })
            .then(res => {
                setUser(res.data)
                changeSuccessMessage('Property removed from favorites!')
                setFavProperties(prevFavProperties => prevFavProperties.filter(prop => prop._id != propId))
            })
    }

    return (
        <div className='whiteBackground profileContentDiv'>
            <div>
                <h2>Your Favorite Properties</h2>
                <div className='favoritePropertiesDiv'>
                    {(favProperties.length <= 0) ? (
                        <div className='noPropertiesToShow'>
                            <img src={images} alt="" />
                            <p>No properties saved!</p>
                            <p>Whenever you find homes you like, select the <span></span> to save them here.</p>
                        </div>
                    ) : (
                        favProperties.map(prop => (
                            <div key={prop._id} className='favoriteProperty'>
                                <Link
                                    to={`/properties/details/${prop.address.replaceAll(' ', '-').replaceAll(',', '').replaceAll('/', '').replaceAll('?', '')}/${prop._id}`}
                                    className='contentFavoriteProperty'
                                >
                                    <div className='imgDiv'>
                                        <img src={imageUrl(prop.mainImage)} alt="" />
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