import React, { useContext, useEffect, useState } from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'

import '../styles/properties.css'

import { Context } from '../assets/Context'
import Filters from '../Components/Properties/Filters'
import Map from '../Components/Properties/Map'
import Homes from '../Components/Properties/Homes'
import DetailPropertyModal from './DetailPropertyModal'

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
      <Filters />

      <section className='mapSection'>
        <Wrapper apiKey='AIzaSyDYd25d8gbKq9Voxfu5aFxog9SPnT4OZTU' version='beta' libraries={['marker']} >
          <Map />
        </Wrapper>
      </section>
      
      <Homes />
      {propertyDetail &&
        <DetailPropertyModal
          setPropertyDetail={setPropertyDetail}
          propertyDetail={propertyDetail}
        />
      }
    </main>
  )
}

export default Properties