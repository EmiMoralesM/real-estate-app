import React, { useEffect, useState } from 'react'

import '../../styles/signIn.css'

import SignIn from './SignIn'
import NewAccount from './NewAccount'

function SignInModal(props) {
    const [signIn, setSignIn] = useState(true)


    return (
        <aside className='signInModal' >
            <div className='signInContent'>
                <button className='closeModal' onClick={() => props.setSignInModalOpen(false)}></button>
                <div className='modalContent'>
                    <h3>Welcome to Housely</h3>
                    <ul className='signInOptions'>
                        <li onClick={() => setSignIn(true)} className={signIn ? 'active' : ''}>Sign In</li>
                        <li onClick={() => setSignIn(false)} className={!signIn ? 'active' : ''}>New Account</li>
                    </ul>
                    <div className='modalForms'>
                        {signIn && <SignIn
                            setSignInModalOpen={props.setSignInModalOpen}
                        />}
                        {!signIn && <NewAccount
                            setSignInModalOpen={props.setSignInModalOpen}
                        />}
                    </div>
                </div>
            </div>

            <div onClick={() => props.setSignInModalOpen(false)} className='signInBackground'></div>
        </aside>
    )
}

export default SignInModal