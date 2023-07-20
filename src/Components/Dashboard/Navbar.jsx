import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import profilePic from '../../assets/icons/profile.png'
import { Context } from '../../assets/Context'

function Navbar(props) {
    const { SERVER_URL, useOutsideClick } = useContext(Context)
    const [profileSubMenu, setProfileSubMenu] = useState(false)

    const refSubMenu = useOutsideClick(() => setProfileSubMenu(false));

    const toggleSideBar = () => {
        props.setSideBarOpen(prevSideBarOpen => !prevSideBarOpen)
    }
    let fullname = props.user.name.split(' ');
    for (var i = 0; i < fullname.length; i++) {
        fullname[i] = fullname[i].charAt(0).toUpperCase() + fullname[i].slice(1) + ' ';
    }

    return (
        <header className={`headerDashboard ${props.sideBarOpen ? '' : 'extendheaderDashboard'}`}>
            <nav>
                <div className='headerDashboardMenu'>
                    <Link onClick={toggleSideBar} className='closeSidebar'></Link>
                    <p ><Link className='blueButton' to={'/'}>Back Home</Link></p>
                    <p className='notifications'><Link to={'/dashboard/notifications'}>Notifications</Link></p>
                </div>
                <div className='profileInfo'>
                    <div className='profileNameEmail'>
                        <p>{fullname}</p>
                        <p>{props.user.email}</p>
                    </div>
                    <div className={`profile ${props.user.image ? 'imageSet' : ''}`} ref={profileSubMenu ? refSubMenu : null}>
                        <p className='profilePicItem' onClick={() => setProfileSubMenu(prevValue => !prevValue)}>
                            <img className='profilePic' src={props.user.image ? `${SERVER_URL}/images/${props.user.image}` : profilePic} alt="" />
                        </p>
                    </div>
                    {profileSubMenu &&
                        <aside className='profileSubMenu dashboardProfileSubMenu '>
                            <ul className='ulProfileSubMenu'>
                                <li><Link to={'/profile/accountSettings'}>Account Settings</Link></li>
                                <li><Link to={'/profile/favoriteProperties'}>Favorite Properties</Link></li>
                                <li><Link to={'/profile/yourProperties'}>Your Properties</Link></li>
                            </ul>
                            <hr />
                            <button className='logOutButton' onClick={() => {
                                props.setUser({})
                                props.changeSuccessMessage('Succesfully signed out!')
                            }}>Sign Out</button>
                        </aside>
                    }
                </div>
            </nav>
        </header>
    )
}

export default Navbar