import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import '../styles/sellProperty.css'

import MainPage from '../Components/SellProperty/MainPage'
import PropertyInformation from '../Components/SellProperty/PropertyInformation'

function SellProperty(props) {
    const [sellLocation, setSellLocation] = useState()


    const [coordinates, setCoordinates] = useState()
    // const [addressStreet, setAddressStreet] = useState('5145 S Hatch Drive')
    // const [addressCity, setAddressCity] = useState('Evergreen')
    // const [addressState, setAddressState] = useState('CO')
    // const [addressZipCode, setAddressZipCode] = useState('80439')
    const [addressStreet, setAddressStreet] = useState()
    const [addressCity, setAddressCity] = useState()
    const [addressState, setAddressState] = useState()
    const [addressZipCode, setAddressZipCode] = useState()

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

                setCoordinates={setCoordinates}
            />}
            {sellLocation && sellLocation.includes('propertyInformation') && <PropertyInformation
                addressStreet={addressStreet}
                addressCity={addressCity}
                addressState={addressState}
                addressZipCode={addressZipCode}
                sellLocation={sellLocation}

                coordinates={coordinates}
                setCoordinates={setCoordinates}
            />}
        </main>
    )
}

export default SellProperty