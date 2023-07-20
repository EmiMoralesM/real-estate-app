import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import '../styles/dashboard.css'

import SideBar from '../Components/Dashboard/SideBar'
import Navbar from '../Components/Dashboard/Navbar'
import Analytics from '../Components/Dashboard/Analytics'
import Users from '../Components/Dashboard/Users'

function Dashboard(props) {
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
                user={props.user}
                changeSuccessMessage={props.changeSuccessMessage}
                setUser={props.setUser}
            />
            <main className={`mainDashboard ${sideBarOpen ? '' : 'extendDashboard'}`}>
                <div className='dashboardTitleDiv'>
                    <h1>{dashboardPage == 'Users' || dashboardPage == 'Properties' ? `Manage ${dashboardPage}` : dashboardPage}</h1>
                    <p><Link to={'/'}>Home</Link> / Dashboard / {dashboardPage}</p>
                </div>
                <div className='dashboardContent'>
                    {dashboardPage.toLowerCase() == 'analytics' && <Analytics />}
                    {dashboardPage.toLowerCase() == 'users' && <Users userActive={props.user} changeSuccessMessage={props.changeSuccessMessage} />}
                </div>
            </main>
        </>
    )
}

export default Dashboard