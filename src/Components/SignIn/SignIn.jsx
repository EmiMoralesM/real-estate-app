import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import eyeOff from '../../assets/icons/eye-off.svg'
import eyeOn from '../../assets/icons/eye-on.svg'

function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisibility, setPasswordVisibility] = useState('password')

    
    const submit = async () => {
        // event.preventDefault()
        try{
            await axios.post('http://localhost/testPost/', {name:'ja'})
            .then(res => console.log(res))
        }catch(err){
            console.log(err);
        }
    }
    return (
        <>
            <form action="#" >
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter email' />
                </div>
                <div>
                    <label htmlFor="email">Password</label>
                    <img className='eye' src={passwordVisibility == 'password' ? eyeOff: eyeOn} onMouseDown={() => setPasswordVisibility('text')} onMouseUp={() => setPasswordVisibility('password')} />
                    <input type={passwordVisibility} onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter password' />
                </div>
                <button type="submit" onClick={() => submit()}>Sign In</button>
            </form>
            <Link className='forgotPass'>Forgot your password?</Link>
        </>
    )
}

export default SignIn