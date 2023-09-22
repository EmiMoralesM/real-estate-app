import axios from 'axios'

import React, { useContext, useState } from 'react'

import eyeOff from '../../assets/icons/eye-off.svg'
import eyeOn from '../../assets/icons/eye-on.svg'
import { Context } from '../../assets/Context'

function SignIn(props) {

    const { SERVER_URL, setUser, changeSuccessMessage, changeErrorMessage } = useContext(Context)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [formError, setFormError] = useState('')

    const [passwordVisibility, setPasswordVisibility] = useState('password')

    const [loading, setLoading] = useState(false)


    const checkEmail = (email) => {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailError('Enter a valid email address')
        } else {
            setEmailError('')
            return true
        }
    }

    const checkPassword = (password) => {
        if (password.length < 1) {
            setPasswordError('Enter a password')
        } else {
            setPasswordError('')
            return true
        }
    }

    const submit = async (e) => {
        e.preventDefault()
        if (checkEmail(email) && checkPassword(password)) {
            try {
                setLoading(true)
                setFormError('')
                // Encode the data so that there is no problem when sending it over through the URL (special characters)
                const encodedEmail = encodeURIComponent(email);
                const encodedPassword = encodeURIComponent(password);
                // If the credentials are correct , the server will return an object with the user.
                // If the user is invalid it will retun { error: ... }.
                await axios.post(`${SERVER_URL}/getUser?email=${encodedEmail}&password=${encodedPassword}`)
                    .then(res => {
                        if (res.data.email) {
                            changeSuccessMessage(`Welcome back ${res.data.name}!`)
                            props.setSignInModalOpen(false)
                            setUser(res.data)
                        } else {
                            setFormError(res.data.error)
                        }
                    })
            } catch (e) {
                changeErrorMessage('An error occured. Please try again later')
            }
            setLoading(false)
        }
    }

    const testAccount = async (testEmail, testPassword) => {
        try {
            setLoading(true)
            setFormError('')
            await axios.post(`${SERVER_URL}/getUser?email=${testEmail}&password=${testPassword}`)
                .then(res => {
                    if (res.data.email) {
                        changeSuccessMessage(`Welcome back ${res.data.name}!`)
                        props.setSignInModalOpen(false)
                        setUser(res.data)
                    } else {
                        setFormError(res.data.error)
                    }
                })
        } catch (e) {
            changeErrorMessage('An error occured. Please try again later')
        }
        setLoading(false)
    }

    return (
        <>
            <form action="#">
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        className={emailError ? 'errorInput' : ''}
                        // On focus out check the value
                        onBlur={() => checkEmail(email)}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder='Enter email' />
                    {emailError && <p className='errorText'>{emailError}</p>}
                </div>
                <div>
                    <label htmlFor="email">Password</label>
                    <img
                        className='eye'
                        src={passwordVisibility == 'password' ? eyeOff : eyeOn}
                        onMouseDown={() => setPasswordVisibility('text')}
                        onMouseUp={() => setPasswordVisibility('password')}
                    />
                    <input
                        type={passwordVisibility}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className={passwordError ? 'errorInput' : ''}
                        onBlur={() => checkPassword(password)}
                        placeholder='Enter password'
                    />
                    {passwordError && <p className='errorText'>{passwordError}</p>}
                </div>
                {!loading && <button type="submit" onClick={submit} className='submitSignInButton'>Sign In</button>}
                {loading && <button className='submitSignInButtonLoading'><span className="loader"></span></button>}
                {/* <Link className='forgotPass' >Forgot your password?</Link> */}
                {formError && <p className='formErrorText'>{formError}</p>}
            </form>
            <hr />
            <div>
                <button className='testAccountButton' onClick={() => {
                    setEmail('test_manager@gmail.com')
                    setPassword('testManager1234')
                    testAccount('test_manager@gmail.com', 'testManager1234')
                }}>Test Manager Account</button>
                <button className='testAccountButton' onClick={() => {
                    setEmail('test_user@gmail.com')
                    setPassword('testUser1234')
                    testAccount('test_user@gmail.com', 'testUser1234')
                }}>Test User Account</button>
            </div>
        </>
    )
}

export default SignIn
