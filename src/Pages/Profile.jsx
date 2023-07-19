import React, { useEffect, useState } from 'react'

import AccountSettings from '../Components/Profile/AccountSettings'

import '../styles/profile.css'
import { Link } from 'react-router-dom'

function Profile(props) {
	const [profilePage, setProfilePage] = useState('accountSettings')

	useEffect(() => {
		setProfilePage(location.pathname.replace('/profile/', ''))
	}, [location.pathname])

	return (
		<main className='mainProfile'>
			<div className='profileMenu'>
				<h1>Profile</h1>
				<ul className='profileOptions'>
					<li className={profilePage === 'accountSettings' ? 'active' : ''}>
						<Link to={'/profile/accountSettings'}>Account Settings</Link>
					</li>
					<li className={profilePage === 'favoriteProperties' ? 'active' : ''}>
						<Link to={'/profile/favoriteProperties'}>Favorite Properties</Link>
					</li>
					<li className={profilePage === 'yourProperties' ? 'active' : ''}>
						<Link to={'/profile/yourProperties'}>Your Properties</Link>
					</li>
				</ul>
			</div>

			{profilePage === 'accountSettings' && <AccountSettings
				user={props.user}
				setUser={props.setUser}
				changeSuccessMessage={props.changeSuccessMessage}
			/>}

		</main >
	)
}

export default Profile