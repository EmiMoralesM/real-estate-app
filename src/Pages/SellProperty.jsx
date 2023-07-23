import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/sellProperty.css'

import MainPage from '../Components/SellProperty/MainPage'
import MapAddress from '../Components/SellProperty/MapAddress'  
import PropertyDetails from '../Components/SellProperty/PropertyDetails'
import PropertyInformation from '../Components/SellProperty/PropertyInformation'

function SellProperty() {
    const [sellLocation, setSellLocation] = useState()

    const [address, setAddress] = useState('5145 S Hatch Drive, Evergreen, CO 80439')

    useEffect(() => {
        setSellLocation(location.pathname.replace('/sellProperty', ''))
    }, [location.pathname])

    return (
        <main>
            {!sellLocation && <MainPage />}
            {sellLocation && sellLocation.includes('propertyInformation') && <PropertyInformation address={address} sellLocation={sellLocation} />}

            {/* {sellLocation == 'mapAddress' && <MapAddress />}
            {sellLocation == 'propertyDetails' && <PropertyDetails />} */}

            {/* <MapAddress /> */}
        </main>
    )
}

export default SellProperty