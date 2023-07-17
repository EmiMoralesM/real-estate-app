import React from 'react'
import { Link } from 'react-router-dom'

function SideBar(props) {
    return (
        <aside className={`sideBar ${props.sideBarOpen ? '' : 'collapseSideBar'}`}>
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
                    <Link to={'/dashboard/properties'}><i className='propertiesItem'></i><span>Properties</span></Link>
                </li>
                <li className={location.hash.includes('notifications') ? 'active' : ''}>
                    <Link to={'/dashboard/notifications'}><i className='notificationsItem'></i><span>Notifications</span></Link>
                </li>
                {/* <li><p>LogOut</p></li> */}
                {/* <li><button>Back Home</button></li> */}
            </ul>
        </aside >
    )
}

export default SideBar