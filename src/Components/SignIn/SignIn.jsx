import axios from 'axios'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import eyeOff from '../../assets/icons/eye-off.svg'
import eyeOn from '../../assets/icons/eye-on.svg'

function SignIn(props) {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [formError, setFormError] = useState('')

    const [passwordVisibility, setPasswordVisibility] = useState('password')
    
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
    const submit = async () => {
        if (checkEmail(email) && checkPassword(password)) {
            setFormError('')
            // If the credentials are correct , the server will return an object with the user.
            // If the user is invalid it will retun { error: ... }.
            await axios.get(`http://localhost/getUser?email=${email}&password=${password}`)
                .then(res => {
                    if (res.data.error) {
                        setFormError(res.data.error)
                    } else {
                        props.changeSuccessMessage(`Welcome back ${res.data.name}!`)
                        props.setSignInModalOpen(false)
                        props.setUser(res.data)
                    }
                })
        }
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
                <button type="submit" onClick={submit}>Sign In</button>
            </form>
            <Link className='forgotPass' >Forgot your password?</Link>
            {formError && <p className='formErrorText'>{formError}</p>}
        </>
    )
}

export default SignIn
