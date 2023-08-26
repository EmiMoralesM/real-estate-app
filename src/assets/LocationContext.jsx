import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { Context } from "./Context"
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export const LocationContext = React.createContext()

export function LocationContextProvider({ children }) {
    const [locationCoordinates, setLocationCoordinates] = useState()
    const [locationValue, setLocationValue] = useState('')

    // This is here in the location context because it is used by the banner (home page) and by the filters (dashboard and map page) 
    const [homeTypes, setHomeTypes] = useState([])

    useEffect(() => {
        if(locationValue == ''){
            setLocationCoordinates()
        }
    }, [locationValue])

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value)
        const coord = await getLatLng(results[0])
        console.log(coord);
        setLocationValue(value)
        setLocationCoordinates(coord)
    }

    const { SERVER_URL, hometypes_array } = useContext(Context)

    async function fetchPropertiesData(setResults, locationCoordinates, maxPrice, minPrice, minBaths, minBeds, homeTypes, sortPropertes) {
        // Fetch the properties with the specified filters
        console.log(sortPropertes);
        await axios.get(axios.get(`${SERVER_URL}/getProperties?minPrice=${minPrice ? minPrice : 0}&maxPrice=${maxPrice ? maxPrice : 0}&minBaths=${minBaths ? minBaths : 0}&minBeds=${minBeds ? minBeds : 0}&homeTypes=${homeTypes.length == 0 ? hometypes_array : homeTypes}&lat=${locationCoordinates ? locationCoordinates.lat : 0}&lng=${locationCoordinates ? locationCoordinates.lng : 0}&sortPropertes=${sortPropertes}`)
            .then((data) => setResults(data.data))
            .catch(err => console.log(`Error: ${err}`)))
    }

    return (
        <LocationContext.Provider value={{locationCoordinates, setLocationCoordinates, fetchPropertiesData, locationValue, setLocationValue, handleSelect, homeTypes, setHomeTypes}}>
            {children}
        </LocationContext.Provider>
    )

}