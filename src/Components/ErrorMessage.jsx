import React, { useContext } from 'react'
import { Context } from '../assets/Context'

function ErrorMessage(props) {
  const { errorMessage } = useContext(Context)
  return (
    <aside className='errorMessage'>
        <p>{errorMessage}</p>
    </aside>
  )
}

export default ErrorMessage