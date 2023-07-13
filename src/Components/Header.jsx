import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/header.css'
function Header() {
  return (
    <header>
      <nav>
        <div className='ulNavbar'>
          <ul>
            <li><Link to={'/'}>Buy</Link></li>
            <li><Link to={'/'}>Sell</Link></li>
          </ul>
        </div>
        <div className='logoDiv'>
          <h1><Link to={'/'}>Logo</Link></h1>
        </div>
        <div className='ulNavbar'>
          <ul>
            <li><Link to={'/'}>Map</Link></li>
            <li><Link to={'/'}>Dashboard</Link></li>
            <li className='signUpButton'><Link to={'/'}><button>Sign Up</button></Link></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header