import React from 'react'
import MapAddress from './MapAddress'
import PropertyDetails from './PropertyDetails'

function PropertyInformation(props) {
    
    return (
        <section className='mapAddressSection contentSellProp'>
            <div className='mapAddressTitleDiv'>
                <h1>For Sale by Owner Listings</h1>
                <p>{props.address}</p>
                <hr />
            </div>
            {props.sellLocation.includes('mapAddress') && <MapAddress address={props.address} sellLocation={props.sellLocation} />}
            {props.sellLocation.includes('propertyDetails') && <PropertyDetails address={props.address} sellLocation={props.sellLocation} />}
        </section>
    )
}

export default PropertyInformation