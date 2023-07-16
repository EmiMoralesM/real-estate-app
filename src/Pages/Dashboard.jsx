import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import '../styles/dashboard.css'

import SideBar from '../Components/Dashboard/SideBar'
import Navbar from '../Components/Dashboard/Navbar'
import Analytics from '../Components/Dashboard/Analytics'
function Dashboard(props) {
    const [sideBarOpen, setSideBarOpen] = useState(true)
    // location.hash.replace('#/dashboard/', '')

    let titile = location.hash.replace('#/dashboard/', '').charAt(0).toUpperCase() + location.hash.replace('#/dashboard/', '').slice(1)
    return (
        <>
            <SideBar sideBarOpen={sideBarOpen} />
            <Navbar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} user={props.user} />
            <main className={`mainDashboard ${sideBarOpen ? '' : 'extendDashboard'}`}>
                <div className='dashboardTitleDiv'>
                    <h1>{titile}</h1>
                    <p><Link to={'/'}>Home</Link> / Dashboard / {titile}</p>
                </div>
                <Analytics />
            </main>
        </>
    )
}

export default Dashboard