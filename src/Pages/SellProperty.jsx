import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/sellProperty.css'

import MainPage from '../Components/SellProperty/MainPage'
import MapAddress from '../Components/SellProperty/MapAddress'
import PropertyDetails from '../Components/SellProperty/PropertyDetails'
import PropertyInformation from '../Components/SellProperty/PropertyInformation'
import PropertyPublished from '../Components/SellProperty/PropertyPublished'

function SellProperty(props) {
    const [sellLocation, setSellLocation] = useState()

    const [propertyId, setPropertyId] = useState()

    // const [addressStreet, setAddressStreet] = useState()
    // const [addressCity, setAddressCity] = useState()
    // const [addressState, setAddressState] = useState()
    // const [addressZipCode, setAddressZipCode] = useState()
    const [addressStreet, setAddressStreet] = useState('5145 S Hatch Drive')
    const [addressCity, setAddressCity] = useState('Evergreen')
    const [addressState, setAddressState] = useState('CO')
    const [addressZipCode, setAddressZipCode] = useState(80439)

    useEffect(() => {
        setSellLocation(location.pathname.replace('/sellProperty', ''))
    }, [location.pathname])

    return (
        <main>
            {!sellLocation && <MainPage
                addressStreet={addressStreet}
                addressCity={addressCity}
                addressState={addressState}
                addressZipCode={addressZipCode}
                setAddressStreet={setAddressStreet}
                setAddressCity={setAddressCity}
                setAddressState={setAddressState}
                setAddressZipCode={setAddressZipCode}
            />}
            {sellLocation && sellLocation.includes('propertyInformation') && <PropertyInformation
                addressStreet={addressStreet}
                addressCity={addressCity}
                addressState={addressState}
                addressZipCode={addressZipCode}
                sellLocation={sellLocation}
                changeSuccessMessage={props.changeSuccessMessage}
                setPropertyId={setPropertyId}
            />}
            {propertyId && sellLocation.includes('propertyPublished') && <PropertyPublished
                propertyId={propertyId}
                changeSuccessMessage={props.changeSuccessMessage}
            />}
        </main>
    )
}

export default SellProperty