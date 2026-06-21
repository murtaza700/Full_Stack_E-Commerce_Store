import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/slices/authSlice.js';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminNavbar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser());
        toast.success('Admin logged out successfully', {
            style: { fontFamily: 'Poppins', fontSize: '13px', borderRadius: '4px' }
        });
        navigate('/login');
    };

    return (
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 md:px-10 select-none">
            {/* Left Welcome Node */}
            <div>
                <h2 className="text-sm font-semibold tracking-wide text-TEXT">
                    Welcome back, <span className="font-light text-gray-500">{user?.fullName || 'Administrator'}</span>
                </h2>
            </div>

            {/* Right Quick Controls */}
            <div className="flex items-center space-x-6">
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