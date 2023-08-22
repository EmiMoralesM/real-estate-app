import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { ContextProvider } from './assets/Context.jsx'
import { LocationContextProvider } from './assets/LocationContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ContextProvider>
      <LocationContextProvider>
        <App />
      </LocationContextProvider>
    </ContextProvider>
  </BrowserRouter >,
)
