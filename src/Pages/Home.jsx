import React from 'react'
import Banner from '../Components/Home/Banner'
import LatestProperties from '../Components/Home/LatestProperties'
import About from '../Components/Home/About'

import '../styles/home.css'

function Home() {
  return (
    <main>
      <Banner />
      <LatestProperties />
      <About />
    </main>
  )
}

export default Home