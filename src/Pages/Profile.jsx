import React, { useEffect, useState } from 'react'

import AccountSettings from '../Components/Profile/AccountSettings'

import '../styles/profile.css'

function Profile(props) {
	const [profilePage, setProfilePage] = useState('accountSettings')


	return (
		<main className='mainProfile'>
			<div className='profileMenu'>
				<h1>Profile</h1>
				<ul className='profileOptions'>
					<li onClick={() => setProfilePage('accountSettings')} className={profilePage === 'accountSettings' ? 'active' : ''}>Account Settings</li>
					<li onClick={() => setProfilePage('favoriteProperties')} className={profilePage === 'favoriteProperties' ? 'active' : ''}>Favorite Properties</li>
					<li onClick={() => setProfilePage('yourProperties')} className={profilePage === 'yourProperties' ? 'active' : ''}>Your Properties</li>
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