import React, { useEffect, useState } from 'react'
import MapAddress from './MapAddress'
import PropertyDetails from './PropertyDetails'

function PropertyInformation(props) {
    useEffect(() => {
        if(!props.addressStreet || !props.addressCity || !props.addressZipCode){ location = '/sellProperty'} 
    })
    const [longitude, setLongitude] = useState(48.464444)
    const [latitude, setLatitude] = useState(-105.84886)

    return (
        <section className='mapAddressSection contentSellProp'>
            <div className='mapAddressTitleDiv'>
                <h1>For Sale by Owner Listings</h1>
                <p>{props.address}</p>
                <hr />
            </div>
            {props.sellLocation.includes('mapAddress') && <MapAddress
                longitude={longitude}
                setLongitude={setLongitude}
                latitude={latitude}
                setLatitude={setLatitude}
            />}
            {props.sellLocation.includes('propertyDetails') && <PropertyDetails
                addressStreet={props.addressStreet}
                addressCity={props.addressCity}
                addressState={props.addressState}
                addressZipCode={props.addressZipCode}
                sellLocation={props.sellLocation}
                latitude={latitude}
                longitude={longitude}
                address={props.address}
                changeSuccessMessage={props.changeSuccessMessage}
            />}
        </section>
    )
}

export default PropertyInformation