import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/header.css'
function Header(props) {
  return (
    <header>
      <nav>
        <div className='ulNavbar'>
          <ul>
            <li><Link to={'/properties'}>Buy</Link></li>
            <li><Link to={'/'}>Sell</Link></li>
          </ul>
        </div>
        <div className='logoDiv'>
          <h1><Link to={'/'}>Logo</Link></h1>
        </div>
        <div className='ulNavbar'>
          <ul>
            <li><Link to={'/properties'}>Map</Link></li>
            <li><Link to={'/'}>Dashboard</Link></li>
            <li className='signUpButton' onClick={() => props.setSignInModalOpen(true)}><button>Sign In</button></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header