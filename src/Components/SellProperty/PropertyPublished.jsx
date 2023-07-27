import React from 'react'

function PropertyPublished(props) {
    return (
        <section className='contentSellProp'>
            <div>
                <h1>The property was successfully uploaded</h1>
                <p>Thanks you for listing with Zillow </p>
                <p>{props.propertyId}</p>
            </div>
        </section>
    )
}

export default PropertyPublished