import React from 'react'
import Navbar from '../components/Navbar'
import { useLocation, Outlet } from 'react-router-dom'

const UserLayout = () => {
    const location = useLocation();
    const isNavbarFooterHide = location.pathname === '/login' || location.pathname === '/signup'
    return (
        <>
            {!isNavbarFooterHide && <Navbar />}

            <main>
                <Outlet />
            </main>
        </>
    )
}

export default UserLayout