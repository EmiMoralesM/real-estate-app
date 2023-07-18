import React, { useEffect, useState } from 'react'

import profilePic from '../../assets/icons/profile.png'
import axios from 'axios'

function AccountSettings(props) {
  const [openSettingsModal, setOpenSettingsModal] = useState(false)

  useEffect(() => {
    // We reset the input values when any modal closes.
    setNewEmail('')
    setNewName('')
    setNewPassword('')
    setPassword('')
    setEmailError('')
    setPasswordError('')
  }, [openSettingsModal])

  const [password, setPassword] = useState('')

  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [newPasswordError, setNewPasswordError] = useState('')

  // Checks email structure
  const checkEmail = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newEmail)) {
      setEmailError('')
      return true
    } else {
      setEmailError('Enter a valid email address')
      return false
    }

  }
  // Checks password structure
  const checkPassword = () => {
    if (newPassword.length < 8 || !(/[a-zA-Z]/.test(newPassword) && /[0-9]/.test(newPassword))) {
      setNewPasswordError('Enter at least 8 characters. And at least one number')
      return false
    } else {
      setNewPasswordError('')
      return true
    }
  }

  const handleEmailChange = async () => {
    // If the new email structure is correct 
    if (checkEmail()) {
      // We verify that the password passed is the correct one
      if (await handleVerification('email')) {
        // If it is we updae the user data with the new email
        handleUserChange(props.user.name, newEmail, props.user.image)
      }
    }
  }
  
  const handlePasswordChange = async () => {
    if (checkPassword()) {
      // We verify that the password passed is the correct one
      if (await handleVerification('password')) {
        // If it is, we change the users password for tyhe newPassword
        axios.patch(`http://localhost/changePassword/${props.user.email}`, { newPassword })
          .then(res => {
            props.setUser(res.data)
            props.changeSuccessMessage(`Password changed!`)
            setOpenSettingsModal(false)
          })
          .catch(e => console.log(e))
      }
    }
  }

  // This function validates that the current password the user entered is the correct one. 
  const handleVerification = async (verify) => {
    let verified = false
    // We verify the user password to be correct
    await axios.get(`http://localhost/getUser?email=${props.user.email}&password=${password}`)
      .then(res => {
        // If the promise return a user, then we change the user email
        if (res.data.email === props.user.email) {
          setPasswordError('')
          verified = true
        }
        else {
          setPasswordError('Incorrect Password. Please try again.')
        }
      })
      .catch(e => console.log(e))
    return verified
  }

  // This function executes after all the validation. It reseives the values to update, and sends a patch request.
  const handleUserChange = (name, email, image) => {
    // We update the user with the info passed to the function
    axios.patch(`http://localhost/updateUser/${props.user.email}`, { name, email, image, })
      .then(res => {
        props.setUser(res.data)
        props.changeSuccessMessage(`${newEmail ? 'Email' : newName ? 'Name' : ''} changed!`)
        setOpenSettingsModal(false)
      })
      .catch(e => console.log(e))
  }

  return (
    <div className='whiteBackground accountSettings'>
      <div>
        <h2>Personal Info</h2>
        <div className='accountSetDiv'>
          <div>
            <p className='title'>Name</p>
            <p className='description'>Updates are going to be reflected across all Zillow experiences.</p>
          </div>
          <div className='editProfileDiv'>
            <p className=''>{props.user.name}</p>
            <button onClick={() => setOpenSettingsModal('name')} className={`editUser`}></button>
          </div>
        </div>
        <hr />
        <div className='accountSetDiv'>
          <div>
            <p className='title'>Photo</p>
            <p className='description'>Personalize your profile pic with a custom photo.</p>
          </div>
          <div className='editProfileDiv'>
            <div className='profile profileUser'>
              <p className='profilePicItem'>
                <img className='profilePic' src={profilePic} alt="" />
              </p>
            </div>
            <button className={`editUser`}></button>
          </div>
        </div>
        <hr />
      </div>
      <div>
        <h2>Sign in & Security</h2>
        <div className='accountSetDiv'>
          <div>
            <p className='title'>Email</p>
            <p className='description'>This is the email associated with your account.</p>
          </div>
          <div className='editProfileDiv'>
            <p className=''>{props.user.email}</p>
            <button onClick={() => setOpenSettingsModal('email')} className={`editUser`}></button>
          </div>
        </div>
        <hr />
        <div className='accountSetDiv'>
          <div>
            <p className='title'>Password</p>
            <p className='description'>Set a stronger password to protect your account.</p>
          </div>
          <div className='editProfileDiv'>
            <button onClick={() => setOpenSettingsModal('password')} className='changePasswordButton'>Change Password</button>
          </div>
        </div>
        <hr />
      </div>
      <div>
        <h2>Manage Account</h2>
        <div className='accountSetDiv'>
          <div>
            <p className='title'>Delete Account</p>
            <p className='description'>You won't be able to access yur account anymore.</p>
          </div>
          <div className='editProfileDiv'>
            <button className='changePasswordButton'>Delete account</button>
          </div>
        </div>
        <hr />
      </div>
      {openSettingsModal && <div className='accountSettingModal'>
        <aside className='generalModal '>
          <div className={`generalModalDiv profileModalDiv ${openSettingsModal}ModalDiv`}>
            <button className='closeModal' onClick={() => setOpenSettingsModal(false)}></button>
            <div className='generalModalContent'>
              {/* Content for the name modal */}
              {openSettingsModal === 'name' &&
                <>
                  <h3>Edit Name</h3>
                  <div>
                    <label htmlFor="newName">New Name</label>
                    <input type="text" name="newName" id="" onChange={(e) => setNewName(e.target.value)} value={newName} />
                  </div>
                  <div className='profileModalActions'>
                    <button onClick={() => setOpenSettingsModal(false)} className='cancel'>Cancel</button>
                    <button
                      disabled={newName ? '' : 'disabled'}
                      onClick={() => handleUserChange(newName, props.user.email, props.user.image)}
                      className={`update ${newName ? '' : 'disabled'}`}>Update</button>
                  </div>
                </>
              }
              {/* Content for the email modal */}
              {openSettingsModal === 'email' &&
                <>
                  <h3>Edit Email</h3>
                  <div>
                    <label htmlFor="newEmail">Your email is <span>{props.user.email}</span>. Enter new email</label>
                    <input
                      type="text"
                      name="newEmail"
                      onChange={(e) => setNewEmail(e.target.value)}
                      onBlur={checkEmail}
                      value={newEmail}
                      className={emailError ? 'errorInput' : ''}
                    />
                    {emailError && <p className='errorText'>{emailError}</p>}
                  </div>
                  <div>
                    <label htmlFor="pass">Enter the password you use to log in</label>
                    <input type="password" name="pass" id="" onChange={(e) => setPassword(e.target.value)} value={password} />
                    {passwordError && <p className='errorText'>{passwordError}</p>}
                  </div>

                  <div className='profileModalActions'>
                    <button onClick={() => setOpenSettingsModal(false)} className='cancel'>Cancel</button>
                    <button
                      disabled={newEmail ? '' : 'disabled'}
                      onClick={handleEmailChange}
                      className={`update ${newEmail ? '' : 'disabled'}`}
                    >
                      Update
                    </button>
                  </div>
                </>
              }
              {/* Content for the password modal */}
              {openSettingsModal === 'password' &&
                <>
                  <h3>Change Password</h3>
                  <div>
                    <label htmlFor="password">Current Password</label>
                    <input type="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      className={passwordError ? 'errorInput' : ''}
                    />
                    {passwordError && <p className='errorText'>{passwordError}</p>}
                  </div>
                  <div>
                    <label htmlFor="newPassword">New Password</label>
                    <input type="password"
                      name="newPassword"
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                      onBlur={checkPassword}
                      className={newPasswordError ? 'errorInput' : ''}
                    />
                    {newPasswordError && <p className='errorText'>{newPasswordError}</p>}
                  </div>
                  <div className='profileModalActions'>
                    <button onClick={() => setOpenSettingsModal(false)} className='cancel'>Cancel</button>
                    <button
                      disabled={newPassword ? '' : 'disabled'}
                      onClick={handlePasswordChange}
                      className={`update ${newPassword ? '' : 'disabled'}`}>Update</button>
                  </div>
                </>
              }
            </div>
          </div>
          <div onClick={() => setOpenSettingsModal(false)} className='generalModalBackground'></div>
        </aside>
      </div>}
    </div>
  )
}

export default AccountSettings