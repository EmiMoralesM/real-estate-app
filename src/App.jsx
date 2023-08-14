import { useState, useEffect, useContext } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import './App.css'

import Header from './Components/Header'
import Home from './Pages/Home'
import Properties from './Pages/Properties'
import SignInModal from './Components/SignIn/SignInModal'
import SuccessMessage from './Components/SuccessMessage'
import ErrorMessage from './Components/ErrorMessage'
import Profile from './Pages/Profile'
import Dashboard from './Pages/Dashboard'
import ProtectedRoutesUser from './assets/ProtectedRoutesUser'
import ProtectedRoutesAdmin from './assets/ProtectedRoutesAdmin'
import SellProperty from './Pages/SellProperty'
import { Context } from './assets/Context'
import Footer from './Components/Footer'

function App() {
  let location = useLocation().pathname
  const { user, setUser, successMessage, errorMessage } = useContext(Context)
  const [signInModalOpen, setSignInModalOpen] = useState(false)

  // {
  //   name: "Emiliano Morales",
  //   email: "moralesemi000@gmail.com",
  //   favorites: [],
  //   image: "newImage_1689733481033.jpg",
  //   role: "admin",
  //   password: "$2b$10$.avopOH1J3i5RJIHTOg7Aey3XfuHhnOexLwEXemI1MhO3MTVT3I/O"
  // }

  useEffect(() => {
    if (user.email) { localStorage.setItem('user', JSON.stringify(user)) }
    if (!user.email) { localStorage.removeItem('user') }
  }, [user])

  // Set scroll to top when the url is changed 
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])


  return (
    <>
      {!location.includes('dashboard') && <Header setSignInModalOpen={setSignInModalOpen} />}
      {signInModalOpen && <SignInModal setSignInModalOpen={setSignInModalOpen} />}
      <Routes>
        <Route path='*' element={<Home signInModalOpen={signInModalOpen} />} />
        <Route path='/properties/*' element={<Properties />} />
        <Route path='/sellProperty/*' element={<SellProperty />} />
        <Route element={<ProtectedRoutesUser />}>
          <Route path='/profile/*' exact element={<Profile />} />
          <Route element={<ProtectedRoutesAdmin />}>
            <Route path='/dashboard/*' element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
      {successMessage && <SuccessMessage />}
      {errorMessage && <ErrorMessage />}
      {!location.includes('dashboard') && <Footer />}
    </>
  )
}

export default App
