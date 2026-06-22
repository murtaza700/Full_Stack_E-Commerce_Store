import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Spiner from './Spiner'

const ProtectedRoutesAdmin = ({ children }) => {
    const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

    if (loading) {
        return (
            <Spiner className={`size-7 border-blue-900`} />
        );
    }

    if (!isAuthenticated) {
        return <Navigate to={'/login'} replace />
    }

    if (user?.role !== 'admin') {
        return <Navigate to={'/'} replace />
    }

    return children;
}

export default ProtectedRoutesAdmin