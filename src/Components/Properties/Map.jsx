
import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../assets/Context'
import { createRoot } from "react-dom/client"
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { Combobox, ComboboxInput, ComboboxList, ComboboxPopover, ComboboxOption } from '@reach/combobox'

function Map(props) {
    const { SERVER_URL, imageUrl } = useContext(Context)
    const [map, setMap] = useState()
    // const [refreshMap, setRefreshMap] = useState({ lat: 36.778259, lng: -119.417931 })
    const [centerPosition, setCenterPosition] = useState({ lat: 36.778259, lng: -119.417931 })
    const [propertyHover, setPropertyHover] = useState('')

    const mapRef = useRef()

    const mapOptions = {
        mapId: '49c3f173e021d634',
        center: centerPosition,
        zoom: 6,
        // disableDefaultUI: true
    }

    useEffect(() => {
        setMap()
        if (props.properties) {
            // setCenterPosition(props.properties[0].coordinates)
            const mapConfig = new window.google.maps.Map(mapRef.current, mapOptions)
            mapConfig.addListener('mousedown', (e) => {
                // This refreshes the map every time the user click it.
                // It sets the position (center) of the map to be the lat and lng clicked by the user. 
                setCenterPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() })
            })
            setMap(mapConfig)
        }
    }, [props.properties])


    return (
        <>
            <PlacesAutocomplete />
            {/* Map */}

            {!map && <div className='loadingMapSkeleton'></div>}
            <div ref={mapRef} className='map' />

            {/* Markers (they will be rendered when the properties have been fetched and the map has been created) */}
            {props.properties && map && props.properties.map(property => (
                <Marker
                    key={property._id}
                    map={map}
                    coordinates={property.coordinates}
                >
                    {/* Content of the marker */}
                    <div onClick={() => props.setPropertyDetail(property._id)}>
                        {propertyHover == property._id && <div className='mapMarkerInfo'>
                            <div className='markerImg'>
                                <img src={imageUrl(property.mainImage)} alt="" />
                            </div>
                            <div className='markerData'>
                                <h3>${propertyHover == property._id ? Intl.NumberFormat().format(property.price) : 'hola'}</h3>
                                <div className='markerBaBd'>
                                    <p>{property.beds} bd</p>
                                    <p>{property.baths} ba</p>
                                </div>
                                <p>{property.lotAreaUnit == 'acres' ? property.lotSize.toFixed(3) : property.lotSize} {property.lotAreaUnit}</p>
                            </div>
                        </div>}
                        <div className={`mapMarker ${propertyHover === property._id ? 'mapMarkerHover' : ''}`} onMouseEnter={() => setPropertyHover(property._id)} onMouseLeave={() => setPropertyHover()}></div>
                    </div>
                </Marker>)
            )}
        </>
    )
}

function PlacesAutocomplete() {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions
    } = usePlacesAutocomplete()
    return <Combobox>
        <ComboboxInput value={value} onChange={(e) => setValue(e.target.value)} disabled={!ready} />
        <ComboboxPopover>
            <ComboboxList>
                {status === "OK" && data.map(({place_id, description}) => <ComboboxOption key={place_id} value={description} />)}
            </ComboboxList>
        </ComboboxPopover>
    </Combobox>
}

// This function creates every individual marker  
function Marker(props) {

    const markerRef = useRef()
    const rootRef = useRef()

    useEffect(() => {
        // The if condition solves the problem of duplicating the markers: 
        // If the rootRef is not defined yet (if the marker hasn't been created)...
        if (!rootRef.current) {
            // Div of the marker (later it will be replaced with the children of the Marker)
            const container = document.createElement('div')
            rootRef.current = createRoot(container)

            // This creates the marker. To create it we have to pass the coordinates and the content (the div to be displayed).
            markerRef.current = new google.maps.marker.AdvancedMarkerView({
                position: props.coordinates,
                content: container
            })
            // This makes the marker events work (click, mouseEnter, etc.) (review)
            if (markerRef.current) { markerRef.current.addListener('gmp-click', () => { }) }
        }
    }, [])

    useEffect(() => {
        // This updates the content of the div that was created before, with the info of the property. 
        rootRef.current.render(props.children)
        markerRef.current.position = props.coordinates
        markerRef.current.map = props.map
    }, [props.map, props.coordinates, props.children])
}

export default Map
