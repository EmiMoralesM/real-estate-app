import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoutes(props) {
  return (
    props.user.role === 'admin' || props.user.role === 'manager' ? <Outlet /> : <Navigate to='/'/> 
  )
}

export default ProtectedRoutes