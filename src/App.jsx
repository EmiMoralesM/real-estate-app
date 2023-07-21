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
import ProtectedRoutesUser from './assets/ProtectedRoutesUser'
import ProtectedRoutesAdmin from './assets/ProtectedRoutesAdmin'

function App() {
  let location = useLocation().pathname

  const [signInModalOpen, setSignInModalOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : {})
    
    // {
    //   name: "Emiliano Morales",
    //   email: "moralesemi000@gmail.com",
    //   favorites: [],
    //   image: "newImage_1689733481033.jpg",
    //   role: "admin",
    //   password: "$2b$10$.avopOH1J3i5RJIHTOg7Aey3XfuHhnOexLwEXemI1MhO3MTVT3I/O"
    // }

  useEffect(()=> {
    console.log('change');
    // console.log(user);
    if (user.email) {localStorage.setItem('user', JSON.stringify(user))}
    if (!user.email) {localStorage.removeItem('user')}
  }, [user])

  // Set scroll to top when the url is changed 
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const changeSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(''), 4200)
  }

  return (
    <>
      {!location.includes('dashboard') && <Header user={user} changeSuccessMessage={changeSuccessMessage} setUser={setUser} setSignInModalOpen={setSignInModalOpen} />}
      {signInModalOpen && <SignInModal setUser={setUser} setSignInModalOpen={setSignInModalOpen} changeSuccessMessage={changeSuccessMessage} />}
      <Routes>
        <Route path='*' element={<Home signInModalOpen={signInModalOpen} />} />
        <Route path='/properties/*' element={<Properties />} />
        <Route element={<ProtectedRoutesUser user={user} />}>
          <Route path='/profile/*' exact element={<Profile user={user} setUser={setUser} changeSuccessMessage={changeSuccessMessage} />} />
          <Route element={<ProtectedRoutesAdmin user={user} />}>
            <Route path='/dashboard/*' element={<Dashboard changeSuccessMessage={changeSuccessMessage} user={user} setUser={setUser} />} />
          </Route>
        </Route>
      </Routes>
      {successMessage && <SuccessMessage successMessage={successMessage} />}
    </>
  )
}

export default App
