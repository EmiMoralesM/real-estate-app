import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { ContextProvider } from './assets/Context.jsx'
import { LocationContextProvider } from './assets/LocationContext.jsx'
import { Wrapper } from '@googlemaps/react-wrapper'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Wrapper
      apiKey="AIzaSyDYd25d8gbKq9Voxfu5aFxog9SPnT4OZTU"
      version="beta"
      libraries={["marker", "places"]}
    >
      <ContextProvider>
        <LocationContextProvider>
          <App />
        </LocationContextProvider>
      </ContextProvider>
    </Wrapper>
  </BrowserRouter >,
)
