import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoutes(props) {
  return (
    props.user.email ? <Outlet /> : <Navigate to='/'/> 
  )
}

export default ProtectedRoutes