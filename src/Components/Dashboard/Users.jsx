import React, { useEffect, useState } from 'react'
import axios from 'axios'

import profilePic from '../../assets/icons/profile.png'
import { Link } from 'react-router-dom'

function Users(props) {
    const [users, setUsers] = useState([])
    const [userEdit, setUserEdit] = useState({})
    const [modalEdit, setModalEdit] = useState(false)
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)

    // Bring users from the database
    useEffect(() => {
        axios.get('http://localhost/getUsers')
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
        await axios.patch(`http://localhost/updateUser/${userEdit.email}`, { role: userEdit.role })
            .then(res => console.log('User changed!'))
            .catch(err => console.log(`Error: ${err}`))
        setModalEdit(false)
        // Update users in the page (So that you dont have to do another fetch form the database)
        setUsers(prevUsers => prevUsers.map(user => user.email === userEdit.email ? userEdit : user))
        props.changeSuccessMessage(`User (${userEdit.email}) updated!`)
    }

    const handleUserDelete = async () => {
        await axios.delete(`http://localhost/deleteUser/${userEdit.email}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(`Error: ${err}`))
        setConfirmDeleteModal(false)
        setModalEdit(false)
        props.changeSuccessMessage(`User deleted!`)
        setUsers(prevUsers => prevUsers.filter(user => user.email !== userEdit.email))
    }

    return (
        <>
            {props.userActive.role !== 'admin' && <p className='warningMessage'>Only admins can edit users. </p>}
            <div className='whiteBackground allUsers'>
                {(!users) ? (
                    <p>Loading...</p>
                ) : (
                    users.map((user, i) => (
                        <div className='userRow' id={props.userActive.email === user.email ? 'userActiveRow' : ''}>
                            <div className='userInfoDiv'>
                                <div className='profile profileUser'>
                                    <p className='profilePicItem'>
                                        <img className='profilePic' src={user.image ? user.image : profilePic} alt="" />
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