import React, { useContext, useEffect, useState } from 'react'
import profilePic from '../../assets/icons/profile.png'
import { Context } from '../../assets/Context'
import axios from 'axios'

function AccountSettings(props) {
  const { SERVER_URL, user, setUser, changeSuccessMessage, changeErrorMessage } = useContext(Context)

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
  const [newImage, setNewImage] = useState()
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [newPasswordError, setNewPasswordError] = useState('')

  // Checks email structure
  const checkEmail = async () => {
    let valid = false
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newEmail)) {
      setEmailError('Enter a valid email address')
      return false
    } else {
      // No errors
      await axios.get(`${SERVER_URL}/getUsers`)
        .then(res => {
          setEmailError('')
          valid = true
          res.data.forEach(user => {
            // If the email already exists then it sets the emailError to true
            if (user.email === newEmail) {
              setEmailError('This email has already been used')
              valid = false
            }
          });
        })
      return valid
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
    if (user.email !== "test_user@gmail.com" && user.email !== "test_manager@gmail.com") {
      // If the new email structure is correct 
      if (await checkEmail()) {
        // We verify that the password passed is the correct one
        if (await handleVerification('email')) {
          // If it is we updae the user data with the new email
          handleUserChange(user.name, newEmail, user.image)
        }
      }
    } else {
      changeErrorMessage("You can't change the email of this account. To try this functionality please create a new account")
    }
  }

  const handleImageChange = async (e) => {
    const formData = new FormData()
    formData.append('newImage', newImage)
    await axios.patch(`${SERVER_URL}/uploadImage/${user.email}`, formData)
      .then(res => {
        setUser(res.data)
        changeSuccessMessage(`Image changed!`)
        setOpenSettingsModal(false)
      })
  }

  const handlePasswordChange = async () => {
    if (user.email !== "test_user@gmail.com" && user.email !== "test_manager@gmail.com") {
      if (checkPassword()) {
        // We verify that the password passed is the correct one
        if (await handleVerification()) {
          // If it is, we change the users password for tyhe newPassword
          axios.patch(`${SERVER_URL}/changePassword/${user.email}`, { newPassword })
            .then(res => {
              setUser(res.data)
              changeSuccessMessage(`Password changed!`)
              setOpenSettingsModal(false)
            })
            .catch(e => console.log(e))
        }
      }
    } else {
      changeErrorMessage("You can't change the password of this account. To try this functionality please create a new account")
    }
  }
  const handleDeleteAcoount = async () => {
    if (user.email !== "test_user@gmail.com" && user.email !== "test_manager@gmail.com") {
      // We verify that the password passed is the correct one
      if (await handleVerification()) {
        // If it is, we change the users password for the newPassword
        await axios.delete(`${SERVER_URL}/deleteUser/${user.email}`)
          .then(res => {
            setUser({})
            changeSuccessMessage('User deleted!')
            setOpenSettingsModal(false)
          })
          .catch(e => console.log(e))
      }
    } else {
      changeErrorMessage("You can't delete this account. To try this functionality please create a new account")
    }
  }

  // This function validates that the current password the user entered is the correct one. 
  const handleVerification = async () => {
    let verified = false
    // We verify the user password to be correct
    const encodedEmail = encodeURIComponent(user.email);
    const encodedPassword = encodeURIComponent(password);
    await axios.post(`${SERVER_URL}/getUser?email=${encodedEmail}&password=${encodedPassword}`)
      .then(res => {
        // If the promise return a user, then we change the user email
        if (res.data.email === user.email) {
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
  const handleUserChange = (name, email) => {
    // We update the user with the info passed to the function
    axios.patch(`${SERVER_URL}/updateUser/${user.email}`, { name, email })
      .then(res => {
        setUser(res.data)
        changeSuccessMessage(`${newEmail ? 'Email' : newName ? 'Name' : ''} changed!`)
        setOpenSettingsModal(false)
      })
      .catch(e => console.log(e))
  }

  return (
    <div className='whiteBackground profileContentDiv accountSettings'>
      <div>
        <h2>Personal Info</h2>
        <div className='accountSetDiv'>
          <div>
            <p className='title'>Name</p>
            <p className='description'>Updates are going to be reflected across all Housely experiences.</p>
          </div>
          <div className='editProfileDiv'>
            <p className=''>{user.name}</p>
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
            <div className={`profile profileUser ${user.image ? 'imageSet' : ''}`}>
              <p className='profilePicItem'>
                <img className='profilePic'
                  src={user.image ? `${SERVER_URL}/images/${user.image}` : profilePic}
                  alt="profilePicture"
                />
              </p>
            </div>
            <button onClick={() => setOpenSettingsModal('image')} className={`editUser`}></button>
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
            <p className=''>{user.email}</p>
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
            <p className='description'>You won't be able to access your account anymore.</p>
          </div>
          <div className='editProfileDiv'>
            <button className='changePasswordButton' onClick={() => setOpenSettingsModal('deleteAccount')}>Delete account</button>
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
                    <label>New Name</label>
                    <input type="text" name="newName" onChange={(e) => setNewName(e.target.value)} value={newName} />
                  </div>
                  <div className='profileModalActions'>
                    <button onClick={() => setOpenSettingsModal(false)} className='cancel'>Cancel</button>
                    <button
                      disabled={newName ? '' : 'disabled'}
                      onClick={() => handleUserChange(newName, user.email, user.image)}
                      className={`button ${newName ? '' : 'disabled'}`}>Update</button>
                  </div>
                </>
              }
              {openSettingsModal === 'image' &&
                <>
                  <h3>Edit Image</h3>
                  <div>
                    <label>Upload New Image</label>
                    <input type="file" name="newImage" accept="image/png, image/jpg, image/jpeg" className='inputFile' onChange={(e) => setNewImage(e.target.files[0])} />
                  </div>
                  <div className='profileModalActions'>
                    <button onClick={() => setOpenSettingsModal(false)} className='cancel'>Cancel</button>
                    <button
                      disabled={newImage ? '' : 'disabled'}
                      onClick={handleImageChange}
                      className={`button ${newImage ? '' : 'disabled'}`}>Update</button>
                  </div>
                </>
              }
              {/* Content for the email modal */}
              {openSettingsModal === 'email' &&
                <>
                  <h3>Edit Email</h3>
                  <div>
                    <label htmlFor="newEmail">Your email is <span>{user.email}</span>. Enter new email</label>
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
                      className={`button ${newEmail ? '' : 'disabled'}`}
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
                      className={`button ${newPassword ? '' : 'disabled'}`}>Update</button>
                  </div>
                </>
              }
              {openSettingsModal === 'deleteAccount' &&
                <>
                  <h3>Delete Account</h3>
                  <div className='deleteAccountLabel'>
                    <label >Enter your current password</label>
                    <input type="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      className={passwordError ? 'errorInput' : ''}
                    />
                    {passwordError && <p className='errorText'>{passwordError}</p>}
                    <p className='warning'>Once you delete your account, you won't be able to recover it.</p>
                  </div>
                  <div className='profileModalActions'>
                    <button onClick={() => setOpenSettingsModal(false)} className='cancel'>Cancel</button>
                    <button
                      disabled={password ? '' : 'disabled'}
                      onClick={handleDeleteAcoount}
                      className={`button ${password ? '' : 'disabled'}`}>Delete</button>
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