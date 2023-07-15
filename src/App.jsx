import { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import './App.css'

import Header from './Components/Header'
import Home from './Pages/Home'
import Properties from './Pages/Properties'
import SignInModal from './Components/SignIn/SignInModal'
import SuccessMessage from './Components/SuccessMessage'
import Profile from './Pages/Profile'
import Dashboard from './Pages/Dashboard'

function App() {
  let location = useLocation().pathname
  
  const [signInModalOpen, setSignInModalOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [user, setUser] = useState({
    name: "Emiliano Morales",
    email: "moralesemi000@gmail.com",
    favorites: [],
    image: "",
    role: "admin",
    password: "$2b$10$Y/fkB.14Xahp5XLxi.M5zOS9H2eab/SKQuw18w/nsR9RIA/bS95RO"
  })


  const changeSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(''), 4200)
  }

  return (
    <>
      {!location.includes('dashboard') && <Header user={user} setSignInModalOpen={setSignInModalOpen} />}
      {signInModalOpen && <SignInModal setUser={setUser} setSignInModalOpen={setSignInModalOpen} changeSuccessMessage={changeSuccessMessage} />}
      <Routes>
        <Route path='*' element={<Home signInModalOpen={signInModalOpen} />} />
        <Route path='/properties' element={<Properties />} />
        <Route path='/profile' element={<Profile />} />
        {user.role == 'admin' && <Route path='/dashboard/*' element={<Dashboard user={user} />} />}
      </Routes>
      {successMessage && <SuccessMessage successMessage={successMessage} />}
    </>
  )
}

export default App
