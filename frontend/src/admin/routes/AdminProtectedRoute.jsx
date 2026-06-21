import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute = () => {
    // Redux auth slice se values extract karein
    const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

    // Jab tak backend ka '/getme' cookie check status complete na ho, blank state rakhein
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-[10px] uppercase tracking-[3px] text-gray-400 font-light animate-pulse">
                    Authenticating Console Access...
                </div>
            </div>
        );
    }

    // Security Gate Clause: Agar user token missing hai ya role admin nahi hai, login page par throw karein
    if (!isAuthenticated || user?.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    // Children administrative components render karne ke liye Outlet return karein
    return <Outlet />;
};

export default AdminProtectedRoute;