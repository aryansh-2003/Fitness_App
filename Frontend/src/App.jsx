import React, { useEffect, useState } from 'react'
import Layout from './layout/Layout'
import authService from '../Service/auth'
import { useNavigate, useLocation } from 'react-router';
import { login, logout } from './Store/authSlice';
import { useDispatch, useSelector } from 'react-redux'
import { ReactLenis } from 'lenis/react'
import { SpeedInsights } from '@vercel/speed-insights/react';
import Loader from './PreLoader/loader'
import ShinyText from "./components/BlurText/BlurText";

export default function App() {
  const user = useSelector(state => state.auth.userData)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const isAuthPage = location.pathname === '/' || location.pathname === '/signUp';

    if (!user) {
      authService.getCurrentUser().then((response) => {
        if (response && response.data && response.data.data && response.data.data.user) {
          dispatch(login(response.data.data.user))
          if (response.data.data.acessToken) {
            localStorage.setItem('token', response.data.data.acessToken);
          }
          if (isAuthPage) {
            navigate('/Home')
          }
        } else {
          dispatch(logout())
        }
      }).catch((error) => {
        console.error("Failed to fetch user:", error)
        dispatch(logout())
      }).finally(() => {
        setLoading(false)
      })
    } else {
      setLoading(false)
      if (isAuthPage) {
        navigate('/Home')
      }
    }
  }, [user, navigate, location.pathname, dispatch])

  if (loading) {
    return (
      <div className='h-screen flex justify-center items-center flex-col space-y-5 bg-slate-50'>
        <Loader />
        <ShinyText
          className='md:text-2xl'
          text="✨ Serving you best..."
          speed={3}
          delay={1}
          color="#b5b5b5"
          shineColor="#0ea5e9"
          spread={140}
          direction="left"
          yoyo={true}
          pauseOnHover={false}
        />
      </div>
    )
  }

  return (
    <>
      <ReactLenis root />
      <SpeedInsights />
      <Layout />
    </>
  );
}
