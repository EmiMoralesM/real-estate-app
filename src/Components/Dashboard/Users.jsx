import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import profilePic from '../../assets/icons/profile.png'
import { Link } from 'react-router-dom'
import { Context } from '../../assets/Context'

function Users(props) {
    const { SERVER_URL, changeSuccessMessage, changeErrorMessage } = useContext(Context)
    const [users, setUsers] = useState([])
    const [userEdit, setUserEdit] = useState({})
    const [modalEdit, setModalEdit] = useState(false)
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)

    // Bring users from the database
    useEffect(() => {
        axios.get(`${SERVER_URL}/getUsers`)
            .then(res => setUsers(res.data))
            .catch(err => console.log(`Error: ${err}`))

    }, [])

    const openEditModal = (user) => {
        setModalEdit(true)
        setUserEdit(user)
    }

    const setNewUserRole = (newRole) => {
        setUserEdit(prevUserEdit => {
            return {
                ...prevUserEdit,
                role: newRole
            }
        })
    }

    const handleUserChange = async () => {
        await axios.patch(`${SERVER_URL}/updateUser/${userEdit.email}`, { role: userEdit.role })
            .then(res => {
                // Update users in the page (So that you dont have to do another fetch form the database)
                setUsers(prevUsers => prevUsers.map(user => user.email === userEdit.email ? userEdit : user))
                changeSuccessMessage(`User (${userEdit.email}) updated!`)
            })
            .catch(err => {
                changeErrorMessage('An error occured. Please try again later')
            })
        setModalEdit(false)
    }

    const handleUserDelete = async () => {
        await axios.delete(`${SERVER_URL}/deleteUser/${userEdit.email}`)
            .then(res => {
                changeSuccessMessage(`User deleted!`)
                setUsers(prevUsers => prevUsers.filter(user => user.email !== userEdit.email))
            })
            .catch(err => {
                changeErrorMessage('An error occured. Please try again later')
            })
        setConfirmDeleteModal(false)
        setModalEdit(false)
    }

    return (
        <>
            {props.userActive.role !== 'admin' && <p className='warningMessage'>Only admins can edit users. </p>}
            <div className='whiteBackground allUsers'>
                {(!users.length != 0) ? (
                    <>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className='loadingUsers'></div>
                        ))}
                    </>
                ) : (
                    users.map((user, i) => (
                        <div className='userRow' key={user.email} id={props.userActive.email === user.email ? 'userActiveRow' : ''}>
                            <div className='userInfoDiv'>
                                <div className={`profile profileUser ${user.image ? 'imageSet' : ''}`}>
                                    <p className='profilePicItem'>
                                        <img className='profilePic' src={user.image ? `${SERVER_URL}/images/${user.image}` : profilePic} alt="" />
                                    </p>
                                </div>
                                <div className='userNameEmailDiv'>
                                    <p className='userName'>{user.name}</p>
                                    <p className='userEmail'>{user.email}</p>
                                    {props.userActive.email === user.email && <p className='you'>YOU</p>}
                                </div>
                            </div>
                            <div className='userSeparator'>
                                <hr />
                            </div>
                            <div className='userRole'>
                                <p className={user.role}>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                                {props.userActive.email !== user.email && props.userActive.role === 'admin' && <button disabled={props.userActive.role !== 'admin' ? 'disabled' : ''}
                                    className={`editUser ${props.userActive.role !== 'admin' ? 'editUserDisabled' : ''}`}
                                    onClick={() => openEditModal(user)}
                                ></button>}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {modalEdit && <aside className='generalModal'>
                <div className='generalModalDiv'>
                    <button className='closeModal' onClick={() => setModalEdit(false)}></button>
                    <div className='generalModalContent'>
                        <h3>Edit User</h3>
                        <div className='profileInfo'>
                            <div className={`profile profileUser ${userEdit.image ? 'imageSet' : ''}`}>
                                <p className='profilePicItem'>
                                    <img className='profilePic' src={userEdit.image ? `${SERVER_URL}/images/${userEdit.image}` : profilePic} alt="" />
                                </p>
                            </div>
                            <div>
                                <p>{userEdit.name}</p>
                                <p>{userEdit.email}</p>
                            </div>
                        </div>

                        <h4>Modify Role</h4>
                        <div className='chengeUserRole'>
                            <div className='userRole'>
                                <p onClick={() => setNewUserRole('user')} className={`user ${userEdit.role == 'user' ? 'roleActive' : 'roleInactive'}`}>User</p>
                            </div>
                            <div className='userRole'>
                                <p onClick={() => setNewUserRole('manager')} className={`manager ${userEdit.role == 'manager' ? 'roleActive' : 'roleInactive'}`}>Manager</p>
                            </div>
                            <div className='userRole'>
                                <p onClick={() => setNewUserRole('admin')} className={`admin ${userEdit.role == 'admin' ? 'roleActive' : 'roleInactive'}`}>Admin</p>
                            </div>
                        </div>
                        <div className='userEditActions'>
                            <button onClick={() => setConfirmDeleteModal(true)} className='deleteUser'>Delete User</button>
                            <button onClick={handleUserChange} className='confirmUserChange'>Confirm Changes</button>
                        </div>
                    </div>
                </div>
                <div onClick={() => setModalEdit(false)} className='generalModalBackground'></div>
            </aside>}
            {confirmDeleteModal && <aside className='generalModal'>
                <div className='deleteUserModalDiv'>
                    <div className='generalModalContent'>
                        <h3>Are you sure you want to delete this user?</h3>
                        <div className='profileInfo'>
                            <div className='profile profileUser'>
                                <p className='profilePicItem'>
                                    <img className='profilePic' src={userEdit.image ? userEdit.image : profilePic} alt="" />
                                </p>
                            </div>
                            <div>
                                <p>{userEdit.name}</p>
                                <p>{userEdit.email}</p>
                            </div>
                        </div>
                        <div className='deleteUserEditActions'>
                            <button onClick={() => setConfirmDeleteModal(false)} className='confirmUserChange'>Cancel</button>
                            <button onClick={handleUserDelete} className='deleteUser'>Delete</button>
                        </div>
                    </div>
                </div>
                <div onClick={() => setConfirmDeleteModal(false)} className='generalModalBackground'></div>
            </aside>}
        </>
    )
}

export default Users