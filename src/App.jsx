import { useState, useEffect } from 'react'
import './App.css'
import Header  from './Components/Header'
import Home from './Pages/Home'

function App() {
  const [properties, setProperties] = useState()

  useEffect(() => {
    fetch("http://localhost:4500/api/")
      .then(res => res.json())
      .then((data) => setProperties(data))
      .catch(err => console.log(`Error: ${err}`))
  }, [])

  return (
    <>
      <Header />
      <Home />
      {/* {(!properties) ? (
        <p>Loading...</p>
      ) : (
        properties.map((property, i) => (
          <div key={i}>
            <img src={property.images[0]} width='200px' alt="" />
            <h1>${property.price}</h1>
            <h3>{property.address}</h3>
            <br />
            <br />
            <br />
          </div>
        ))
      )} */}
    </>
  )
}

export default App
