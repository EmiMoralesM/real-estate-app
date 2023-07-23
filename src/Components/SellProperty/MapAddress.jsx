import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function MapAddress(props) {
  const [modalLocation, setModalLocation] = useState(false)
  
  let longitude = 48.464444
  let latitude = -105.84886
  console.log(props.sellLocation);

  return (
    <>
      <div className='mapAddressDiv'>
        <p>Is this the right location of your home?</p>
        <div className='mapAddress'></div>
        <div className='addressActionsDiv'>
          <Link to={'propertyInformation/propertyDetails'} className='correctLocation'>Yes, it's the correct location</Link>
          <button className='incorrectLocation' onClick={() => setModalLocation(true)}>No, let me change it</button>
        </div>
      </div>


      {modalLocation && <aside className='generalModal'>
        <div className='generalModalDiv modalChangeLocation'>
          <button className='closeModal' onClick={() => setModalLocation(false)}></button>
          <div className='generalModalContent'>
            <h3>Modify Location</h3>
            <p className='lat_long'>{longitude}, {latitude}</p>

            <div className='mapAddress'></div>
            <div className='addressActionsDiv'>
              <button className='correctLocation'>Continue</button>
              <button className='incorrectLocation' onClick={() => setModalLocation(false)}>Cancel</button>
            </div>
          </div>
        </div>
        <div onClick={() => setModalLocation(false)} className='generalModalBackground'></div>
      </aside>}
    </>
  )
}

export default MapAddress