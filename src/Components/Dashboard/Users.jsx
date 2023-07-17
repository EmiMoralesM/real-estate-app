import React, { useEffect, useState } from 'react'
import axios from 'axios'

import profilePic from '../../assets/icons/profile.png'
import { Link } from 'react-router-dom'

function Users() {
    const [users, setUsers] = useState([])
    const [modalEdit, setModalEdit] = useState(false)
    const [userEdit, setUserEdit] = useState({})

    useEffect(() => {
        axios.get('http://localhost/getAdmins?limit=5')
            .then(res => setUsers(res.data))
            .catch(err => console.log(`Error: ${err}`))
    }, [])

    const openEditModal = (user) => {
        setModalEdit(true)
        setUserEdit(user)
        console.log(user);
    }

    const setNewUserRole = (newRole) => {
        setUserEdit(prevUserEdit => {
            return {
                ...prevUserEdit,
                role: newRole
            }
        })
        console.log(userEdit);
    }
    const handleUserChange = () => {
        console.log('User changed!');
        setModalEdit(false)
    }
    const handleUserDelete = () => {
        
    }
    return (
        <>
            <div className='dashboardItemBackground allUsers'>
                {(!users) ? (
                    <p>Loading...</p>
                ) : (
                    users.map((user, i) => (
                        <div className='userRow'>
                            <div className='userInfoDiv'>
                                <div className='profile profileUser'>
                                    <p className='profilePicItem'>
                                        <img className='profilePic' src={user.image ? user.image : profilePic} alt="" />
                                    </p>
                                </div>
                                <div className='userNameEmailDiv'>
                                    <p className='userName'>{user.name}</p>
                                    <p className='userEmail'>{user.email}</p>
                                </div>
                            </div>
                            <hr />
                            <div className='userRole'>
                                <p className={user.role}>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                                <Link className='editUser' onClick={() => openEditModal(user)}></Link>
                            </div>
                        </div>
                    ))

                )}
            </div>
            {modalEdit && <aside className='userModal'>
                <div className='userModalDiv'>
                    <button className='closeModal' onClick={() => setModalEdit(false)}></button>
                    <div className='userModalContent'>
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
                            <button onClick={handleUserChange} className='confirmUserChange'>Confirm Changes</button>
                            <button onClick={handleUserDelete}className='deleteUser'>Delete User</button>
                        </div>
                    </div>
                </div>
                <div onClick={() => setModalEdit(false)} className='userModalBackground'></div>
            </aside>}
        </>
    )
}

export default Users