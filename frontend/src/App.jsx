import React, { lazy, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import { loadUser } from './redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import ProtectedRoutesAdmin from './components/ProtectedRoutesAdmin';
import { Suspense } from 'react';
import Spiner from './components/Spiner';

const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const UserLayout = lazy(() => import('./layouts/UserLayout'));

// Admin Pages
const AddProduct = lazy(() => import('./admin/pages/AddProduct'));
const DashboardHome = lazy(() => import('./admin/pages/DashboardHome'));
const ManageProducts = lazy(() => import('./admin/pages/ManageProducts'));
const ManageOrders = lazy(() => import('./admin/pages/ManageOrders'));
const EditProduct = lazy(() => import('./admin/pages/EditProduct'));
const ManageCategories = lazy(() => import('./admin/pages/ManageCategories'));

// User Pages
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />

      <Suspense fallback={<Spiner className={`size-8 border-3`} />}>
        <Routes>
          <Route path='/' element={<UserLayout />}>
            <Route index element={<Home />} />


            <Route path='signup' element={<Signup />} />
            <Route path='login' element={<Login />} />
          </Route>

          <Route path='/admin/*' element={
            <ProtectedRoutesAdmin>
              <AdminLayout />
            </ProtectedRoutesAdmin>
          }>
            <Route index element={<DashboardHome />} />
            <Route path='products' element={<ManageProducts />} />
            <Route path='products/add' element={<AddProduct />} />
            <Route path='products/edit/:id' element={<EditProduct />} />
            <Route path='categories' element={<ManageCategories />} />
            <Route path='orders' element={<ManageOrders />} />
          </Route>
        </Routes>
      </Suspense>

    </>
  )
}

export default App;