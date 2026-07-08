import React from 'react'
import AdminSidebar from '../admin/components/AdminSidebar'
import AdminNavbar from '../admin/components/AdminNavbar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-gray-50/60 text-TEXT font-sans selection:bg-TEXT selection:text-white antialiased">

            <AdminSidebar />

            <div className="flex-1 flex flex-col min-w-0 h-full">

                <AdminNavbar />

                <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full max-w-7xl mx-auto custom-scrollbar">
                    <Outlet />
                </main>

            </div>
        </div>
    )
}

export default AdminLayout;