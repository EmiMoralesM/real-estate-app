import React from 'react'

function ErrorMessage(props) {
  return (
    <aside className='errorMessage'>
        <p>{props.errorMessage}</p>
    </aside>
  )
}

export default ErrorMessage