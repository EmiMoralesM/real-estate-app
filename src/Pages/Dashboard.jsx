import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import '../styles/dashboard.css'

import SideBar from '../Components/Dashboard/SideBar'
import Navbar from '../Components/Dashboard/Navbar'
import Analytics from '../Components/Dashboard/Analytics'
import Users from '../Components/Dashboard/Users'

function Dashboard(props) {
    const [sideBarOpen, setSideBarOpen] = useState(true)
    
    let title = location.hash.replace('#/dashboard/', '').charAt(0).toUpperCase() + location.hash.replace('#/dashboard/', '').slice(1)
    return (
        <>
            <SideBar sideBarOpen={sideBarOpen} />
            <Navbar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} user={props.user} />
            <main className={`mainDashboard ${sideBarOpen ? '' : 'extendDashboard'}`}>
                <div className='dashboardTitleDiv'>
                    <h1>{title == 'Users' || title == 'Properties' ? `Manage ${title}` : title}</h1>
                    <p><Link to={'/'}>Home</Link> / Dashboard / {title}</p>
                </div>
                <div className='dashboardContent'>
                    {title.toLowerCase() == 'analytics' && <Analytics />}
                    {title.toLowerCase() == 'users' && <Users />}
                </div>
            </main>
        </>
    )
}

export default Dashboard