import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../assets/Context';
import axios from 'axios';
import { Link } from 'react-router-dom';
import images from '../../assets/icons/images.svg'
import EditPropertyModal from '../Modals/EditPropertyModal';
import ConfirmDeleteProperty from '../Modals/ConfirmDeleteProperty';


function FavoriteProperties(props) {
    const { SERVER_URL, user, setUser, imageUrl, enableScroll, disableScroll, changeSuccessMessage } = useContext(Context)
    const [yourProperties, setYourProperties] = useState([])

    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)
    const [editPropertyModal, setEditPropertyModal] = useState(false)

    useEffect(() => {
        setYourProperties([])
        user.yourProperties.forEach(propertyId => {
            axios.get(`${SERVER_URL}/getProperty/${propertyId}`)
                .then(data => {
                    if (data.data) {
                        setYourProperties(prevYourProperties => [...prevYourProperties, data.data])
                    }
                })
        });
    }, [])

    const handlePropertyDelete = async () => {
        await axios.delete(`${SERVER_URL}/deleteProperty/${confirmDeleteModal._id}`)
            .then(async res => {
                await axios.patch(`${SERVER_URL}/updateUser/${user.email}`, { yourProperties: user.yourProperties.filter(yourProp => yourProp != confirmDeleteModal._id) })
                    .then(res => {
                        changeSuccessMessage(`Property deleted!`)
                        enableScroll()
                        setUser(res.data)
                        setYourProperties(prevYourProperties => prevYourProperties.filter(prop => prop._id != confirmDeleteModal._id))
                        setConfirmDeleteModal(false)
                    })
            })
            .catch(err => console.log(`Error: ${err}`))
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
                                        <img src={imageUrl(prop.mainImage)} alt="" />
                                    </div>
                                    <div>
                                        <h3>${Intl.NumberFormat().format(prop.price)} - <span> {prop.statusText}</span></h3>
                                        <p>{prop.address}</p>
                                    </div>
                                </Link>
                                <div className='yourPropertiesButtons'>
                                    <button className='editUserPropertiesButton' onClick={() => {
                                        disableScroll()
                                        setEditPropertyModal(prop)
                                    }}>Edit Property</button>
                                    <button className='deleteUserPropertiesButton' onClick={() => {
                                        disableScroll()
                                        setConfirmDeleteModal(prop)
                                    }}>Delete Property</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            {confirmDeleteModal && <ConfirmDeleteProperty
                handlePropertyDelete={handlePropertyDelete}
                setConfirmDeleteModal={setConfirmDeleteModal}
                confirmDeleteModal={confirmDeleteModal}
            />}
            {editPropertyModal && <EditPropertyModal
                // blockAdmin={false}
                setResults={setYourProperties}
                editProperty={editPropertyModal}
                setEditProperty={setEditPropertyModal}
            />}
        </div>
    )
}

export default FavoriteProperties