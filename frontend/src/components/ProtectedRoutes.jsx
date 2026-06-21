import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const ProtectedRoutes = ({ children }) => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className='size-7 rounded-full border-2 border-blue-700 border-t-transparent animate-spin'></div>
        );
    }

    if (!isAuthenticated) {
        return navigate('/login');
    }

    return children;
}

export default ProtectedRoutes