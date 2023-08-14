import React, { useContext } from 'react'
import { Context } from '../assets/Context'

function SuccessMessage(props) {
  const { successMessage } = useContext(Context)
  return (
    <aside className='successMessage'>
        <p>{successMessage}</p>
    </aside>
  )
}

export default SuccessMessage