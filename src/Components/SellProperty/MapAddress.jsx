import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function MapAddress(props) {
  const [modalAddress, setModalAddress] = useState(false)

  return (
    <>
      <div className='mapAddressDiv'>
        <p>Is this the right location of your home?</p>
        <div className='mapAddress'></div>
        <div className='addressActionsDiv'>
          <Link to={'propertyInformation/propertyDetails'} className='correctLocation'>Yes, it's the correct location</Link>
          <button className='incorrectLocation' onClick={() => setModalAddress(true)}>No, let me change it</button>
        </div>
      </div>


      {modalAddress && <aside className='generalModal'>
        <div className='generalModalDiv modalChangeLocation'>
          <button className='closeModal' onClick={() => setModalAddress(false)}></button>
          <div className='generalModalContent'>
            <h3>Modify Location</h3>
            <p className='lat_long'>{props.longitude}, {props.latitude}</p>

            <div className='mapAddress'></div>
            <div className='addressActionsDiv'>
              <button className='correctLocation'>Continue</button>
              <button className='incorrectLocation' onClick={() => setModalAddress(false)}>Cancel</button>
            </div>
          </div>
        </div>
        <div onClick={() => setModalAddress(false)} className='generalModalBackground'></div>
      </aside>}
    </>
  )
}

export default MapAddress