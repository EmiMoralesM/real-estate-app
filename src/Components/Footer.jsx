import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/footer.css'

function Footer() {
  return (
    <footer>
      <div className='logoAndCopy'>
        <p className='logo'><Link to={'/'}></Link></p>
        <p>2023 © Zillow</p>
      </div>
      <div className='menuFooter'>
        <div>
          <Link to={'/'}>Home</Link>
          <ul>
            <li><Link to={'/properties'}>Buy Property</Link></li>
            <li><Link to={'/sellProperty'}>Sell Property</Link></li>
            <li><Link to={'/properties'}>Map</Link></li>
          </ul>
        </div>
        <div>
          <Link to={'/profile/accountSettings'}>Profile</Link>
          <ul>
            <li><Link to={'/profile/accountSettings'}>Account Settings</Link></li>
            <li><Link to={'/profile/favoriteProperties'}>Favorite Properties</Link></li>
            <li><Link to={'/profile/yourProperties'}>Your Properties</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer