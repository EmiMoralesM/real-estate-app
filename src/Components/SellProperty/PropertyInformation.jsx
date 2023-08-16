import React, { useEffect, useState } from 'react'
import MapAddress from './MapAddress'
import PropertyDetails from './PropertyDetails'

function PropertyInformation(props) {
    useEffect(() => {
        if(!props.addressStreet || !props.addressCity || !props.addressZipCode){ location = '/sellProperty'} 
    })
    const [lng, setLng] = useState(48.464444)
    const [lat, setLat] = useState(-105.84886)

    return (
        <section className='mapAddressSection contentSellProp'>
            <div className='mapAddressTitleDiv'>
                <h1>For Sale by Owner Listings</h1>
                <p>{props.address}</p>
                <hr />
            </div>
            {props.sellLocation.includes('mapAddress') && <MapAddress
                lng={lng}
                setLng={setLng}
                lat={lat}
                setLat={setLat}
            />}
            {props.sellLocation.includes('propertyDetails') && <PropertyDetails
                addressStreet={props.addressStreet}
                addressCity={props.addressCity}
                addressState={props.addressState}
                addressZipCode={props.addressZipCode}
                lat={lat}
                lng={lng}
                // setPropertyId={props.setPropertyId}
            />}
        </section>
    )
}

export default PropertyInformation