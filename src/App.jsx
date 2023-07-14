import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.css'

import Header  from './Components/Header'
import Home from './Pages/Home'
import Properties from './Pages/Properties'
import SignInModal from './Components/SignIn/SignInModal'

function App() {
  const [signInModalOpen, setSignInModalOpen] = useState(false)

  return (
    <>
      <Header setSignInModalOpen={setSignInModalOpen} />
      {signInModalOpen && <SignInModal setSignInModalOpen={setSignInModalOpen} />}
      <Routes>
        <Route path='*' element={<Home signInModalOpen={signInModalOpen} />} />
        <Route path='/properties' element={<Properties />} />
      </Routes>
    </>
  )
}

export default App
