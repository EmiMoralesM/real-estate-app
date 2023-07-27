import React, { useContext, useEffect, useState } from 'react'

import '../styles/properties.css'

import { Context } from '../assets/Context'
import Filters from '../Components/Properties/Filters'
import Map from '../Components/Properties/Map'
import Homes from '../Components/Properties/Homes'
import DetailProductModal from './DetailProductModal'

function Properties(props) {
  const [propertyDetail, setPropertyDetail] = useState('')

  // If we are trying to access a particular property
  useEffect(() => {
    if (location.pathname.includes('details')) {
      // Set propertyDetail to the _id of the property accessed.
      setPropertyDetail(location.pathname.split('/').pop())
      // Open the propery detail modal 
    }
  }, [location.pathname])

  return (
    <main className='mainProperties'>
      <Filters/>
      <Map />
      <Homes />
      {propertyDetail &&
        <DetailProductModal
          changeSuccessMessage={props.changeSuccessMessage}
          changeErrorMessage={props.changeErrorMessage}
          setPropertyDetail={setPropertyDetail}
          propertyDetail={propertyDetail}
        />
      }
    </main>
  )
}

export default Properties