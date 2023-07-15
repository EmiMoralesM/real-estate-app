import React from 'react'

function SuccessMessage(props) {
  return (
    <aside className='successMessage'>
        <p>{props.successMessage}</p>
    </aside>
  )
}

export default SuccessMessage