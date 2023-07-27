import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Context } from './Context'

function ProtectedRoutes(props) {
  const { user} = useContext(Context)
  return (
    user.role === 'admin' || user.role === 'manager' ? <Outlet /> : <Navigate to='/'/> 
  )
}

export default ProtectedRoutes