import React from 'react'
import AdminSidebar from '../admin/components/AdminSidebar'
import AdminNavbar from '../admin/components/AdminNavbar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-50/60 text-TEXT font-sans selection:bg-TEXT selection:text-white antialiased">
            <AdminSidebar />

            <div className="flex-1 flex flex-col min-w-0">
                <AdminNavbar />
                <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl w-full mx-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout