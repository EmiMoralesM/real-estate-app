import React from 'react'
import { Link } from 'react-router-dom';

import '../styles/header.css'

import profilePic from '../assets/icons/profile.png'

function Header(props) {
  return (
    <header>
      <nav>
        <div className='ulNavbar'>
          <ul>
            {props.user.role == 'admin' && <li ><Link className='dashboard' to={'/dashboard/analytics'}>Admin Dashboard</Link></li>}
            <li><Link to={'/properties'}>Buy</Link></li>
            <li><Link to={'/'}>Sell</Link></li>
          </ul>
        </div>
        <div className='logoDiv'>
          <h1 className='logo'><Link to={'/'}>Logo</Link></h1>
        </div>
        <div className='ulNavbar'>
          <ul>
            <li><Link to={'/properties'}>Map</Link></li>
            {!props.user && <li className='signUpButton' onClick={() => props.setSignInModalOpen(true)}><button>Sign In</button></li>}
            {props.user && <li className='profile'>
              <Link to={'/profile'}>
                <img className='profilePic' src={props.user.image ? props.user.image : profilePic} alt="" />
              </Link>
            </li>}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header