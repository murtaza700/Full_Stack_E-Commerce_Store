import React, { lazy, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar';
import { loadUser } from './redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

const Home = lazy(() => import('./pages/Home'));

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const isNavbarFooterHide = location.pathname === '/login' || location.pathname === '/signup'

  return (
    <>

      {!isNavbarFooterHide && <Navbar />}

      <Toaster position='top-center' reverseOrder={false} />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App;