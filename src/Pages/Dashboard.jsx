import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import '../styles/dashboard.css'

import SideBar from '../Components/Dashboard/SideBar'
import Navbar from '../Components/Dashboard/Navbar'
import Analytics from '../Components/Dashboard/Analytics'
import Users from '../Components/Dashboard/Users'
import { Context } from '../assets/Context'
import ManageProperties from '../Components/Dashboard/ManageProperties'

function Dashboard(props) {
    const { user} = useContext(Context)
    
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [dashboardPage, setDashboardPage] = useState('analytics')

    useEffect(() => {
        setDashboardPage(location.pathname.replace('/dashboard/', '').charAt(0).toUpperCase() + location.pathname.replace('/dashboard/', '').slice(1))
    }, [location.pathname])

    return (
        <>
            <SideBar sideBarOpen={sideBarOpen} />
            <Navbar
                sideBarOpen={sideBarOpen}
                setSideBarOpen={setSideBarOpen}
            />
            <main className={`mainDashboard ${sideBarOpen ? '' : 'extendDashboard'}`}>
                <div className='dashboardTitleDiv'>
                    <h1>{dashboardPage == 'Users' || dashboardPage == 'Properties' ? `Manage ${dashboardPage}` : dashboardPage}</h1>
                    <p><Link to={'/'}>Home</Link> / Dashboard / {dashboardPage}</p>
                </div>
                <div className='dashboardContent'>
                    {dashboardPage == 'Analytics' && <Analytics />}
                    {dashboardPage == 'Users' && <Users userActive={user} />}
                    {dashboardPage == 'Properties' && <ManageProperties />}
                </div>
            </main>
        </>
    )
}

export default Dashboard