import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';

import '../styles/header.css'

import profilePic from '../assets/icons/profile.png'
import { Context } from '../assets/Context'

function Header(props) {
  const { SERVER_URL, useOutsideClick, user, setUser, changeSuccessMessage } = useContext(Context)
  const [profileSubMenu, setProfileSubMenu] = useState(false)
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false)

  // This returns a reference. And creates an event listener that will activate with every click outside the reference. (form Context.jsx)
  const refSubMenu = useOutsideClick(() => setProfileSubMenu(false));
  return (
    <header >
      <nav className='hideMobileNav' onClick={() => { if (profileSubMenu) setProfileSubMenu(false) }}>
        <div className='ulNavbar'>
          <ul>
            {user.email && (user.role == 'admin' || user.role == 'manager') && <li className='tabletHide'><Link className='dashboard' to={'/dashboard/analytics'}>Admin Dashboard</Link></li>}
            {user.email && (user.role == 'admin' || user.role == 'manager') && <li className='tabletDisplay'><Link className='dashboard' to={'/dashboard/analytics'}>Dashboard</Link></li>}
            <li><Link to={'/properties'}>Buy</Link></li>
            <li><Link to={'/sellProperty'}>Sell</Link></li>
          </ul>
        </div>
        <div className='logoDiv'>
          <h1 className='logo'><Link to={'/'}>Logo</Link></h1>
        </div>
        <div className='ulNavbar'>
          <ul>
            <li><Link to={'/properties/'}>Map</Link></li>
            {!user.email && <li className='signUpButton' onClick={() => props.setSignInModalOpen(true)}><button>Sign In</button></li>}
            {user.email && <li className='profileItem' ref={profileSubMenu ? refSubMenu : null}>
              <p className={`profile ${user.image ? 'imageSet' : ''}`}>
                <Link className='profilePicItem' onClick={() => setProfileSubMenu(prevValue => !prevValue)}>
                  <img className='profilePic' src={user.image ? `${SERVER_URL}/images/${user.image}` : profilePic} alt="" />
                </Link>
              </p>
              {profileSubMenu &&
                <aside className='profileSubMenu'>
                  <ul>
                    <li><Link to={'/profile/accountSettings'}>Account Settings</Link></li>
                    <li><Link to={'/profile/favoriteProperties'}>Favorite Properties</Link></li>
                    <li><Link to={'/profile/yourProperties'}>Your Properties</Link></li>
                    <li><Link to={'/profile/notifications'}>Notifications</Link></li>
                  </ul>
                  <hr />
                  <button className='logOutButton' onClick={() => {
                    setUser({})
                    changeSuccessMessage('Succesfully signed out!')
                  }}>Sign Out</button>
                </aside>
              }
            </li>}
          </ul>
        </div>
      </nav>
      <nav className='displayMobileNav' onClick={() => { if (profileSubMenu) setProfileSubMenu(false) }}>
        <div className='ulNavbarMobile'>
          <button className='burgerMenu' onClick={() => setOpenBurgerMenu(true)}></button>
          {openBurgerMenu && <div className='menuMobile'>
            <button className='closeModal' onClick={() => setOpenBurgerMenu(false)}></button>
            <div className='logoDiv'>
              <h1 className='logo'><Link to={'/'}>Logo</Link></h1>
            </div>
            <ul>
              {user.email && (user.role == 'admin' || user.role == 'manager') && <li><Link to={'/dashboard/analytics'}>Admin Dashboard</Link></li>}
              <li><Link to={'/properties'}>Buy</Link></li>
              <li><Link to={'/sellProperty'}>Sell</Link></li>
              <li><Link to={'/sellProperty'}>Map</Link></li>
            </ul>
          </div>}
        </div>
        <div className='logoDiv'>
          <h1 className='logo'><Link to={'/'}>Logo</Link></h1>
        </div>
        <div className='ulNavbarMobile'>
          <ul>

          </ul>
        </div>
      </nav>
    </header >
  )
}

export default Header