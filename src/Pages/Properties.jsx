import React, { useContext, useState } from 'react'

import '../styles/properties.css'

import { Context } from '../assets/Context'
import Filters from '../Components/Properties/Filters'
import Map from '../Components/Properties/Map'
import Homes from '../Components/Properties/Homes'

function Properties() {
  const { useOutsideClick } = useContext(Context)

  
  
  return (
    <main className='mainProperties'>
      <Filters useOutsideClick={useOutsideClick} />
      <Map/>
      <Homes useOutsideClick={useOutsideClick}/>
      
    </main>
  )
}

export default Properties