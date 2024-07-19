import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouter = () => {
    const username = useSelector(state=>state.login.username)
console.log('private routerdan = ',username);
  return username ? <Outlet /> : <Navigate to='/login'/>
}

export default PrivateRouter