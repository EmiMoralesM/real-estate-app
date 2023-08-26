
import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../assets/Context'
import { createRoot } from "react-dom/client"
import { LocationContext } from '../../assets/LocationContext'
import { useNavigate } from 'react-router-dom'

function Map(props) {
    const { SERVER_URL, imageUrl } = useContext(Context)
    const { locationCoordinates, setLocationCoordinates } = useContext(LocationContext)

    const [map, setMap] = useState()
    const [centerPosition, setCenterPosition] = useState({ lat: 36.778259, lng: -119.417931 })
    const [propertyHover, setPropertyHover] = useState('')

    const navigate = useNavigate();
    const mapRef = useRef()
   
    const mapOptions = {
        mapId: '49c3f173e021d634',
        center: locationCoordinates ? locationCoordinates : centerPosition,
        zoom: locationCoordinates ? 10 : 6,
        // disableDefaultUI: true
    }
    /* useEffect(() => {
        // Refresh the location filter (the locationCoordinates is in the locationContext. The value is shared among the manageProperties page and this page, that why we reset its value)
        setLocationCoordinates()
    }, []) */

    useEffect(() => {
        setMap()
        if (props.properties) {
            // setCenterPosition(props.properties[0].coordinates)
            const mapConfig = new window.google.maps.Map(mapRef.current, mapOptions)
            mapConfig.addListener('mousedown', (e) => {
                // It sets the position (center) of the map to be the lat and lng last clicked by the user. 
                setCenterPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() })
            })
            setMap(mapConfig)
        }
    }, [props.properties])

    return (
        <>
            {/* Map */}

            {!map && <div className='loadingMapSkeleton'></div>}
            <div ref={mapRef} className='map' />

            {/* Markers (they will be rendered when the properties have been fetched and the map has been created) */}
            {locationCoordinates && map && mapRef &&
                <Marker
                    map={map}
                    coordinates={locationCoordinates}
                >
                    <div className='locationSeach'></div>
                </Marker>}
            {props.properties && mapRef && map && props.properties.map(property => (
                <Marker
                    key={property._id}
                    map={map}
                    coordinates={property.coordinates}
                    className={`mapMarkerZindex ${propertyHover === property._id ? 'mapMarkerHoverZindex' : ''}`}
                >
                    {/* Content of the marker */}
                    <div onClick={() => navigate(`details/${property.address.replaceAll(' ', '-').replaceAll(',', '').replaceAll('/', '').replaceAll('?', '')}/${property._id}`)}>
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
                        <div className={`mapMarker ${propertyHover === property._id ? 'mapMarkerHover' : ''}`} 
                        onMouseEnter={() => setPropertyHover(property._id)}
                         onMouseLeave={() => setPropertyHover()}></div>
                    </div>
                </Marker>)
            )}
        </>
    )
}

// This function creates every individual marker  
export function Marker(props) {
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
