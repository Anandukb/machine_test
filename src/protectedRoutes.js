import React from 'react'
import { Navigate } from 'react-router-dom'
const ProtectedRoutes = ({children}) => {
  const user = localStorage.getItem("user-details")
  if (!user) {
    return <Navigate to="/authentication"/>
  }
  return children;
}

export default ProtectedRoutes