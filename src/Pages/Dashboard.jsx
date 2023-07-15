import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import '../styles/dashboard.css'

import profilePic from '../assets/icons/profile.png'
function Dashboard(props) {
    const [sideBarOpen, setSideBarOpen] = useState(true)

    const toggleSideBar = () => {
        setSideBarOpen(prevSideBarOpen => !prevSideBarOpen)
    }

    return (
        <>
            <aside className={`sideBar ${sideBarOpen ? '' : 'collapseSideBar'}`}>
                {/* <button className='closeSidebar'><p className='rightArrow'></p></button> */}
                <h1 className='logo'><Link to={'/'}>Logo</Link></h1>
                <ul className='menuSideBar'>
                    <li className={location.hash.includes('analytics') ? 'active' : ''}>
                        <Link to={'/dashboard/analytics'}><i className='dashboardItem'></i><span>Analytics</span></Link>
                    </li>
                    <li className={location.hash.includes('users') ? 'active' : ''}>
                        <Link to={'/dashboard/users'}><i className='usersItem'></i><span>Users</span></Link>
                    </li>
                    <li className={location.hash.includes('properties') ? 'active' : ''}>
                        <Link to={'/dashboard/properties'}><i className='propertiesItem'></i><span>Manage Properties</span></Link>
                    </li>
                    <li className={location.hash.includes('notifications') ? 'active' : ''}>
                        <Link to={'/dashboard/notifications'}><i className='notificationsItem'></i><span>Notifications</span></Link>
                    </li>
                    {/* <li><p>LogOut</p></li> */}
                    {/* <li><button>Back Home</button></li> */}
                </ul>
            </aside >
            <header className={`headerDashboard ${sideBarOpen ? '' : 'extendheaderDashboard'}`}>
                <nav>
                    <div className='headerDashboardMenu'>
                        <Link onClick={toggleSideBar} className='closeSidebar'></Link>
                        <p ><Link className='blueButton' to={'/'}>Back Home</Link></p>
                        <p><Link>Mode</Link></p>
                        <p className='notifications'><Link >Notifications</Link></p>
                    </div>
                    <div className='profileInfo'>
                        <div className='profileNameEmail'>
                            <p>{props.user.name}</p>
                            <p>{props.user.email}</p>
                        </div>
                        <div className='profile'>
                            <Link to={'/profile'}>
                                <img className='profilePic' src={props.user.image ? props.user.image : profilePic} alt="" />
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Dashboard