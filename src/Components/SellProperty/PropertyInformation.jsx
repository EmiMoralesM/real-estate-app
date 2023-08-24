import React, { useEffect, useState } from 'react'

import MapAddress from './MapAddress'
import PropertyDetails from './PropertyDetails'

function PropertyInformation(props) {
        useEffect(() => {
            if (!props.addressStreet || !props.addressCity || !props.addressZipCode) { location = '/sellProperty' }
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