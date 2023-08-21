import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../assets/Context';
import axios from 'axios';
import notificationImg from '../../assets/icons/no-notification.svg'
import { Link } from 'react-router-dom';
import profilePic from '../../assets/icons/profile.png'

function Notifications(props) {
    const { SERVER_URL, user, setUser, imageUrl, enableScroll, disableScroll, changeSuccessMessage, changeErrorMessage } = useContext(Context)
    const [notifications, setNotifications] = useState([])
    const [blockRefresh, setBlockRefresh] = useState(false)

    useEffect(() => {
        const getNotifications = async () => {
            // Get the notifications content (from the notifications database) passing the notifications ids.
            await axios.get(`${SERVER_URL}/getUserNotifications/${user.notifications}`)
                .then(res => {
                    setNotifications(res.data.reverse())
                })
        }
        getNotifications()
    }, [user])

    const refreshNotifications = async () => {
        // Refresh the user saved (localhost) if there are new notifications 
        if (!blockRefresh) {
            console.log('refresh');
            if (user.email) {
                await axios.get(`${SERVER_URL}/getUserNotificationsIds/${user.email}`)
                    .then(res => {
                        setBlockRefresh(true)
                        setTimeout(() => setBlockRefresh(false), 25000)
                        if (res.data && (res.data.length != user.notifications.length)) {
                            console.log('update');
                            changeSuccessMessage('Notifications refreshed!')
                            setUser(prevUser => ({ ...prevUser, notifications: [...res.data.reverse()] }))
                        } else {
                            changeSuccessMessage('Notifications up to date!')
                        }
                    })
            }
        } else {
            console.log('no refresh');
            changeErrorMessage('You have to wait 30 seconds to refresh again')
        }
    }

    const calculateTimePassed = (timestamp) => {
        const timeDiff = new Date() - new Date(timestamp);

        if (timeDiff < 60000) {
            return Math.floor(timeDiff / 1000) + ' seconds ago';
        } else if (timeDiff < 3600000) {
            return Math.floor(timeDiff / 60000) + ' minutes ago';
        } else if (timeDiff < 86400000) {
            return Math.floor(timeDiff / 3600000) + ' hours ago';
        } else if (timeDiff < 2592000000) {
            return Math.floor(timeDiff / 86400000) + ' days ago';
        } else if (timeDiff < 31536000000) {
            return Math.floor(timeDiff / 2592000000) + ' months ago';
        } else {
            return Math.floor(timeDiff / 31536000000) + ' years ago';
        }
    }

    return (
        <div className='whiteBackground profileContentDiv'>
            <div>
                <div className='refreshDiv'>
                    <h2>Notifications</h2>
                    {user.notifications.length > 0 && <p onClick={refreshNotifications} className=''><span></span>Refresh</p>}
                </div>
                <div className='savedPropertiesDiv'>
                    {(user.notifications.length <= 0) ? (
                        <div className='noPropertiesToShow'>
                            <img src={notificationImg} alt="" />
                            <p>No notifications yet!</p>
                            <p>When you get notifications, they'll show up here</p>
                            <button className='button' onClick={refreshNotifications}>Refresh</button>
                        </div>
                    ) : (
                        notifications.map(notification => (
                            <div key={notification._id} className='notificationDiv'>
                                <div className='notificationProfileDiv'>
                                    <h3>From: {notification.emailContact} <span>{calculateTimePassed(notification.time)}</span></h3>
                                    <span className='blueDot'></span>
                                </div>
                                <div>
                                    <p className='notificationMessage'>Message: {notification.messageContact}</p>
                                </div>
                                <p className='notificationProperty'>
                                    <span>{notification.nameContact}</span> is interested in
                                    <Link to={`../../properties/details/${notification.propertyAddress}/${notification.propertyId}`}>
                                        {notification.propertyAddress.replaceAll('-', ' ')}
                                    </Link>
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>


        </div>
    )
}

export default Notifications