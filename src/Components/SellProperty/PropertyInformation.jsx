import React, { useContext, useEffect, useState } from 'react'

import MapAddress from './MapAddress'
import PropertyDetails from './PropertyDetails'
import { useNavigate } from 'react-router-dom';
import { Context } from '../../assets/Context';

function PropertyInformation(props) {
    const { user } = useContext(Context)
    const navigate = useNavigate();
    useEffect(() => {
        if (!user.email || !props.coordinates || !props.coordinates.lat || !props.coordinates.lng) { navigate('/sellProperty') }
    }, [])

    return (
        <section className='mapAddressSection contentSellProp'>
            <div className='mapAddressTitleDiv'>
                <h1>For Sale by Owner Listings</h1>
                <p>{`${props.addressStreet}, ${props.addressCity}, ${props.addressState}, ${props.addressZipCode}`}</p>
                <hr />
            </div>

            {props.sellLocation.includes('mapAddress') && <MapAddress
                coordinates={props.coordinates}
                setCoordinates={props.setCoordinates}
            />}
            {props.sellLocation.includes('propertyDetails') && <PropertyDetails
                coordinates={props.coordinates}

                addressStreet={props.addressStreet}
                addressCity={props.addressCity}
                addressState={props.addressState}
                addressZipCode={props.addressZipCode}
            />}
        </section>
    )
}

export default PropertyInformation