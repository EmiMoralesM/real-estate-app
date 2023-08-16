import axios from 'axios'
import React, { Children, useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../assets/Context'
import { createRoot } from "react-dom/client"


function Map() {
    const { SERVER_URL, imageUrl } = useContext(Context)
    const [map, setMap] = useState()
    const [properties, setProperties] = useState()
    const mapRef = useRef()
    const mapOptions = {
        mapId: '49c3f173e021d634',
        center: { lat: 36.778259, lng: -119.417931 },
        zoom: 6,
        disableDefaultUI: true
    }

    useEffect(() => {
        setMap(new window.google.maps.Map(mapRef.current, mapOptions))
        axios.get(`${SERVER_URL}/latestProperties?limit=6`)
            .then((data) => setProperties(data.data))
            .catch(err => console.log(`Error: ${err}`))

    }, [])

    const [propertyHover, setPropertyHover] = useState('')

    return (
        <>
            <div ref={mapRef} className='map' />
            {/* The content of the maker */}
            {map && properties && properties.map(property => (
                <Marker
                    key={property._id}
                    map={map}
                    onClick={() => setPropertyHover(property._id)}
                    onMouseEnter={() => setPropertyHover(property._id)}
                    setPropertyHover={setPropertyHover}
                    coordinates={property.coordinates}
                >
                    <div>
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
                        <div className={`mapMarker ${propertyHover === property._id ? 'mapMarkerHover' : ''}`}></div>
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
        }
    }, [])

    useEffect(() => {
        if (markerRef.current) {
            markerRef.current.addListener('click', () => {
                // Handle marker click event here
                console.log('Marker clicked');
                // You can call the onClick function from props here if needed
                if (props.onClick) {
                    props.onClick();
                }
            });
            /* markerRef.current.addListener('mouseover', () => {
                // Handle marker click event here
                console.log('Marker hovered');
                // You can call the onClick function from props here if needed
                if (props.onMouseEnter) {
                    props.onMouseEnter();
                }
            }); */
        }
    }, []);


    useEffect(() => {
        // This updates the content of the div that was created before, with the info of the property. 
        rootRef.current.render(props.children)
        markerRef.current.position = props.coordinates
        markerRef.current.map = props.map
    }, [props.map, props.coordinates, props.children])
}

export default Map