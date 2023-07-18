import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import eyeOff from '../../assets/icons/eye-off.svg'
import eyeOn from '../../assets/icons/eye-on.svg'

function NewAccount(props) {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [passwordConfirmError, setPasswordConfirmError] = useState('')

    const [passwordVisibility, setPasswordVisibility] = useState('password')
    const [passwordConfirmVisibility, setPasswordConfirmVisibility] = useState('password')

    const checkEmail = async (email) => {
        let valid = false
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailError('Enter a valid email address')
            return false
        } else {
            // No errors
            await axios.get('https://real-estate-app-server.onrender.com/getUsers')
                .then(res => {
                    setEmailError('')
                    valid = true
                    res.data.forEach(user => {
                        // If the email already exists then it sets the emailError to true
                        if (user.email === email) {
                            setEmailError('This email has already been used')
                            valid = false
                            return
                        }
                    });
                })
            return valid
        }
    }
    const checkPassword = (password) => {
        if (password.length < 8 || !(/[a-zA-Z]/.test(password) && /[0-9]/.test(password))) {
            setPasswordError('Enter at least 8 characters. And at least one number')
            return false
        } else {
            setPasswordError('')
            return true
        }
    }
    const checkPasswordConfirm = (passwordConfirm) => {
        if (passwordConfirm !== password) {
            setPasswordConfirmError('Passwords do not match')
            return false
        } else {
            setPasswordConfirmError('')
            return true
        }
    }
    const submit = async () => {
        const emailValidation = await checkEmail(email)
        if (emailValidation && checkPassword(password) && checkPasswordConfirm(passwordConfirm)) {
            try {
                await axios.post('http://localhost/createUser', {
                    name: email.substring(0, email.indexOf('@')).toLowerCase(),
                    email: email.toLowerCase(),
                    favorites: [],
                    password: password,
                })
                    .then(res => {
                        // console.log(res.data);
                        props.setUser(res.data)
                        props.changeSuccessMessage(`Account created | Welcome ${email.substring(0, email.indexOf('@')).toLowerCase()}!`)
                        props.setSignInModalOpen(false)
                    })
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log('Account not created');
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
                        // type='text'
                        className={passwordError ? 'errorInput' : ''}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        onBlur={() => checkPassword(password)}
                        placeholder='Enter password'
                    />
                    {passwordError && <p className='errorText'>{passwordError}</p>}
                </div>
                <div>
                    <label htmlFor="email">Confirm Password</label>
                    <img
                        className='eye'
                        src={passwordConfirmVisibility == 'password' ? eyeOff : eyeOn}
                        onMouseDown={() => setPasswordConfirmVisibility('text')}
                        onMouseUp={() => setPasswordConfirmVisibility('password')}
                    />
                    <input
                        type={passwordConfirmVisibility}
                        className={passwordConfirmError ? 'errorInput' : ''}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        value={passwordConfirm}
                        onBlur={() => checkPasswordConfirm(passwordConfirm)}
                        placeholder='Confirm password'
                    />
                    {passwordConfirmError && <p className='errorText'>{passwordConfirmError}</p>}
                </div>
                <button type="submit" onClick={submit}>Create Account</button>
            </form>
        </>
    )
}

export default NewAccount