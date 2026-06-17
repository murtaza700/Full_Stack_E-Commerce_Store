import React, { lazy } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';

const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

const Home = lazy(() => import('./pages/Home'));

const App = () => {
  return (
    <>
      <Navbar />
      <Toaster position='top-center' reverseOrder={false} />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App