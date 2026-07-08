import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearAuthError, clearAuthMessage, logoutUser } from '../../redux/slices/authSlice.js';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, User, Menu } from 'lucide-react';
import { showErrorToast, showSuccessToast } from '../../helper/MyToast.jsx';

const AdminNavbar = ({ openMobileMenu }) => {
    const { user, error, message } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    useEffect(() => {
        if (error) {
            showErrorToast(error || 'Logout Error!');
            dispatch(clearAuthError());
        }

        if (message) {
            showSuccessToast(message || 'Admin logged out successfully');
            setTimeout(() => { navigate('/login'); }, 1000);
            dispatch(clearAuthMessage());
        }
    }, [dispatch, error, message, navigate]);

    return (
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 md:px-10 select-none shrink-0 w-full">

            <div className="flex items-center space-x-3 min-w-0">

                <button
                    type="button"
                    onClick={openMobileMenu}
                    className="block md:hidden p-1.5 border border-gray-100 hover:bg-neutral-50 rounded-sm text-TEXT transition-colors focus:outline-none cursor-pointer shrink-0"
                    title="Open Side Menu Console"
                >
                    <Menu size={16} />
                </button>

                <h2 className="text-sm font-semibold tracking-wide text-TEXT truncate">
                    Welcome back, <span className="font-light text-gray-500">{user?.fullName || 'Administrator'}</span>
                </h2>
            </div>

            <div className="flex items-center space-x-6 shrink-0">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <User size={16} className="text-TEXT" />
                    <span className="font-medium tracking-wide">Admin Role</span>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-xs text-red-500 hover:text-red-700 transition-colors focus:outline-none cursor-pointer"
                >
                    <LogOut size={16} />
                    <span className="hidden sm:inline font-medium uppercase tracking-wider text-[10px]">Logout</span>
                </button>
            </div>
        </header>
    );
};

export default AdminNavbar;