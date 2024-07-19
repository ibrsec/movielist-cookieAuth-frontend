import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRouter = () => {
    const username = useSelector(state=>state.login.username)
console.log('publicrouterdan =' ,username);
  return !username ? <Outlet /> : <Navigate to='/'/>
}

export default PublicRouter