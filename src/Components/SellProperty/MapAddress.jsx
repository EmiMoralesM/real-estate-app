import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Marker } from '../Properties/Map'
import { Context } from '../../assets/Context'

function MapAddress(props) {
  const { disableScroll, enableScroll} = useContext(Context)
  const [modalAddress, setModalAddress] = useState(false)

  const [mapLocation, setMapLocation] = useState('')
  const mapLocationRef = useRef()

  const [mapLocationChange, setMapLocationChange] = useState('')
  const mapLocationChangeRef = useRef()

  const [newCoordinates, setNewCoordinates] = useState(props.coordinates)

  const mapOptions = {
    mapId: '49c3f173e021d634',
    center: props.coordinates,
    zoom: 16,
    disableDefaultUI: true
  }

  useEffect(() => {
    if (props.coordinates && modalAddress) {
      setMapLocationChange()
      const mapLocationChangeConfig = new window.google.maps.Map(mapLocationChangeRef.current, mapOptions)
      mapLocationChangeConfig.addListener('click', (e) => {
        setNewCoordinates({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      })
      setMapLocationChange(mapLocationChangeConfig)
    }
  }, [modalAddress, props.coordinates])

  useEffect(() => {
    if (props.coordinates) {
      setNewCoordinates(props.coordinates)
      // Map to change the location
      setMapLocation()
      const mapLocationConfig = new window.google.maps.Map(mapLocationRef.current, mapOptions)
      setMapLocation(mapLocationConfig)
    }
  }, [props.coordinates])

  return (
    <>
      <div className='mapAddressDiv'>
        <p>Is this the right location of your home?</p>
        {/* {props.coordinates && <iframe className='mapAddress' src={`https://maps.google.com/maps?q=${props.coordinates.lat},${props.coordinates.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`} />} */}
        {props.coordinates && <div ref={mapLocationRef} className='mapAddress' />}
        {props.coordinates && mapLocation && mapLocationRef &&
          <Marker
            map={mapLocation}
            coordinates={props.coordinates}
          >
            <div className='locationSeach'></div>
          </Marker>}

        <div className='addressActionsDiv'>
          <Link to={'propertyInformation/propertyDetails'} className='correctLocation'>Yes, it's the correct location</Link>
          <button className='incorrectLocation' onClick={() => {
            disableScroll()
            setModalAddress(true)
          }}>No, let me change it</button>
        </div>
      </div>


      {modalAddress && <aside className='generalModal'>
        <div className='generalModalDiv modalChangeLocation'>
          <button className='closeModal' onClick={() => {
            setModalAddress(false)
            enableScroll()
            setNewCoordinates(props.coordinates)
          }}></button>
          <div className='generalModalContent'>
            <h3>Select the right Location</h3>
            {newCoordinates && <p className='lat_long'>{newCoordinates.lng}, {newCoordinates.lat}</p>}

            <div ref={mapLocationChangeRef} className='mapAddress mapAddressChange' />
            {newCoordinates && mapLocationChange && mapLocationChangeRef && 
              <Marker
                map={mapLocationChange}
                coordinates={newCoordinates}
              >
                <div className='locationSeach'></div>
              </Marker>}

            <div className='addressActionsDiv'>
              <button className='correctLocation' onClick={() => {
                props.setCoordinates(newCoordinates)
                enableScroll()
                setModalAddress(false)
              }}>Continue</button>
              <button className='incorrectLocation' onClick={() => {
                setModalAddress(false)
                enableScroll()
                setNewCoordinates(props.coordinates)
              }}>Cancel</button>
            </div>
          </div>
        </div>
        <div onClick={() => {
          setModalAddress(false)
          enableScroll()
          setNewCoordinates(props.coordinates)
        }} className='generalModalBackground'></div>
      </aside>}
    </>
  )
}

export default MapAddress