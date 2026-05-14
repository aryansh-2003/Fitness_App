import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router';

function PrivateRoute({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector(state => state.auth.userData)

  useEffect(() => {
    if (!user) {
      navigate('/signUp?mode=login', { state: { from: location } })
    }
  }, [user, navigate, location])

  if (!user) {
    return null; // Return nothing while redirecting
  }

  return children
}

export default PrivateRoute