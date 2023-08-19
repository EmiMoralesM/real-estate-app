
import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../assets/Context'
import { createRoot } from "react-dom/client"


function Map(props) {
    const { SERVER_URL, imageUrl } = useContext(Context)
    const [propertyHover, setPropertyHover] = useState('')
    const [map, setMap] = useState()
    const [markers, setMarkers] = useState()
    const [refreshMap, setRefreshMap] = useState({ lat: 36.778259, lng: -119.417931 })
    
    const mapRef = useRef()

    const mapOptions = {
        mapId: '49c3f173e021d634',
        center: refreshMap,
        zoom: 6,
        // disableDefaultUI: true
    }

    useEffect(() => {
        const mapConfig = new window.google.maps.Map(mapRef.current, mapOptions)
        /* mapConfig.addListener('click', (e) => {
            // This refreshes the map every time the user click it.
            // It sets the position (center) of the map to be the lat and lng clicked by the user. 
            setRefreshMap({ lat: e.latLng.lat(), lng: e.latLng.lng() })
            console.log('click');
        }) */
        setMap(mapConfig)
    }, [])


    useEffect(() => {
        setMarkers(() => (
            props.properties && map && props.properties.map(property => (
                <Marker
                    key={property._id}
                    map={map}
                    setPropertyHover={setPropertyHover}
                    coordinates={property.coordinates}
                    properties={props.properties}
                >
                    <div onClick={() => props.setPropertyDetail(property._id)}>
                        {/* className={`mapMarkerDiv ${propertyHover === property._id ? 'mapMarkerDivHover' : ''}`} */}
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
            )
        ))
    }, [props.properties])

    return (
        <>
            {/* Map */}
            <div ref={mapRef} className='map' />
            {/* Markers (they will be rendered when the properties have been fetched and the map has been created) */}
            {markers}
        </>
    )
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

































// Original

import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../assets/Context'
import { createRoot } from "react-dom/client"


function Map(props) {
    const { SERVER_URL, imageUrl } = useContext(Context)
    const [map, setMap] = useState()
    const [refreshMap, setRefreshMap] = useState({ lat: 36.778259, lng: -119.417931 })
    const mapRef = useRef()
    const mapOptions = {
        mapId: '49c3f173e021d634',
        center: refreshMap,
        zoom: 6,
        // disableDefaultUI: true
    }

    useEffect(() => {
        const mapConfig = new window.google.maps.Map(mapRef.current, mapOptions) 
        /* mapConfig.addListener('click', (e) => {
            console.log('click');
            // This refreshes the map every time the user click it.
            // It sets the position (center) of the map to be the lat and lng clicked by the user. 
            setRefreshMap({lat: e.latLng.lat(), lng: e.latLng.lng() })
        })  */
        setMap(mapConfig)
    }, [props.properties, refreshMap])

    const [propertyHover, setPropertyHover] = useState('')
    
    return (
        <>
            {/* Map */}
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

































// Clusters
import axios from 'axios'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../assets/Context'
import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks"
import { MarkerClusterer } from "@googlemaps/markerclusterer"
import { createRoot } from "react-dom/client"


function Map(props) {
    const { SERVER_URL, imageUrl } = useContext(Context)
    const [map, setMap] = useState(null)
    console.log(props.properties);
    const onLoad = useCallback((map, properties) => addMarkers(map, properties), [])
    const mapOptions = {
        // mapId: '49c3f173e021d634',
        center: { lat: 36.778259, lng: -119.417931 },
        zoom: 5,
        // disableDefaultUI: true
    }
    return (
        props.properties && <GoogleMapsProvider
            googleMapsAPIKey="AIzaSyDYd25d8gbKq9Voxfu5aFxog9SPnT4OZTU"
            mapOptions={mapOptions}
            mapContainer={map}
            onLoadMap={(map) => onLoad(map, props.properties)}
        >
            <div ref={(node) => setMap(node)} className='map' />
        </GoogleMapsProvider>
    )
}

function addMarkers(map, properties) {
    console.log('add');
    console.log(properties);
    const markers = properties.map((property) => {
        const marker = new google.maps.Marker({ position: property.coordinates })

        return marker
    })

    // Options to pass along to the marker clusterer
    const clusterOptions = {
        gridSize: 130,
        zoomOnClick: false,
        maxZoom: 0,
    };
    
    // Add a marker clusterer to manage the markers.
    const cluster = new MarkerClusterer({
        markers,
        map,
        clusterOptions
    })
    // Change styles after cluster is created
    
}

export default Map


