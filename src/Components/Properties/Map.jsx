import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../assets/Context'
import { createRoot } from "react-dom/client"


function Map(props) {
    const { SERVER_URL, imageUrl } = useContext(Context)
    const [map, setMap] = useState()
    const mapRef = useRef()
    const mapOptions = {
        mapId: '49c3f173e021d634',
        center: { lat: 36.778259, lng: -119.417931 },
        zoom: 6,
        // disableDefaultUI: true
    }

    useEffect(() => {
        setMap(new window.google.maps.Map(mapRef.current, mapOptions))
    }, [])

    const [propertyHover, setPropertyHover] = useState('')

    return (
        <>
            <div ref={mapRef} className='map' />
            {/* The content of the maker */}
            {map && props.properties && props.properties.map(property => (
                <Marker
                    key={property._id}
                    map={map}
                    setPropertyHover={setPropertyHover}
                    coordinates={property.coordinates}
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
            )}
        </>
    )
}

// This function creates the markers  
function Marker(props) {
    const markerRef = useRef()
    const rootRef = useRef()
    useEffect(() => {
        // If the rootRef is not defined
        if (!rootRef.current) {
            const container = document.createElement('div')
            rootRef.current = createRoot(container)

            // This creates the marker and passes the coordinates and the content (div) to be displayed to it.
            markerRef.current = new google.maps.marker.AdvancedMarkerView({
                position: props.coordinates,
                content: container
            })
            // This makes the other events work (review)
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