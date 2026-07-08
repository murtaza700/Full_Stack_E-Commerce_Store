import React, { useState } from 'react'
import AdminSidebar from '../admin/components/AdminSidebar'
import AdminNavbar from '../admin/components/AdminNavbar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-gray-50/60 text-TEXT font-sans selection:bg-TEXT selection:text-white antialiased relative">

            <div className={`
                fixed inset-y-0 left-0 z-50 transform md:relative md:translate-x-0 md:z-auto transition-transform duration-300 ease-in-out
                ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <AdminSidebar closeMobileMenu={() => setIsMobileSidebarOpen(false)} />
            </div>

            {isMobileSidebarOpen && (
                <div
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-xs transition-opacity duration-300"
                />
            )}

            <div className="flex-1 flex flex-col min-w-0 h-full">

                <AdminNavbar openMobileMenu={() => setIsMobileSidebarOpen(true)} isMobileOpen={isMobileSidebarOpen} />

                <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full max-w-7xl mx-auto custom-scrollbar">
                    <Outlet />
                </main>

            </div>
        </div>
    )
}

export default AdminLayout;