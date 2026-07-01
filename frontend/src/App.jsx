import React, { lazy, useEffect, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './redux/slices/authSlice';
import { getMyWishlist } from './redux/slices/wishlistSlice'
import { getAllMyCarts } from './redux/slices/cartSlice'
import ProtectedRoutesAdmin from './components/ProtectedRoutesAdmin';
import Spiner from './components/Spiner';
import PageScrollTop from './components/PageScrollTop';

const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const UserLayout = lazy(() => import('./layouts/UserLayout'));

const AddProduct = lazy(() => import('./admin/pages/AddProduct'));
const DashboardHome = lazy(() => import('./admin/pages/DashboardHome'));
const ManageProducts = lazy(() => import('./admin/pages/ManageProducts'));
const ManageOrders = lazy(() => import('./admin/pages/ManageOrders'));
const EditProduct = lazy(() => import('./admin/pages/EditProduct'));
const ManageCategories = lazy(() => import('./admin/pages/ManageCategories'));

const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getMyWishlist());
      dispatch(getAllMyCarts());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />

      <PageScrollTop />

      <Suspense fallback={
        <div className="min-h-screen bg-CARD-BG flex items-center justify-center select-none">
          <Spiner className="size-8 border-3 text-TEXT" />
        </div>
      }>
        <Routes>
          <Route path='/' element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path='products' element={<ProductsPage />} />
            <Route path='products/:id' element={<ProductDetail />} />
            <Route path='signup' element={<Signup />} />
            <Route path='login' element={<Login />} />
          </Route>

          <Route path='/admin' element={
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