import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, User, Menu, X, LogOut } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { clearError, clearMessage, logoutUser } from '../redux/slices/authSlice'

const Navbar = () => {
    const links = [
        { name: 'Home', link: '/' },
        { name: 'Products', link: '/products' },
        { name: 'About', link: '/about' },
        { name: 'Contact', link: '/contact' },
    ]

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, message, isAuthenticated, loading } = useSelector((state) => state.auth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logoutUser());
        setIsMenuOpen(false);
    };

    useEffect(() => {
        if (error) {
            toast.error(error || 'Logout Error!', {
                style: {
                    fontFamily: 'Poppins',
                    fontSize: '13px',
                    borderRadius: '8px',
                }
            });
            dispatch(clearError());
        }

        if (message) {
            toast.success(message || 'Logged out successfully', {
                style: {
                    fontFamily: 'Poppins',
                    fontSize: '13px',
                    borderRadius: '8px',
                    background: '#111111',
                    color: '#ffffff',
                },
                iconTheme: {
                    primary: '#D4AF37',
                    secondary: '#111111',
                },
            });

            setTimeout(() => {
                navigate('/login');
            }, 2500);

            dispatch(clearMessage());

        }
    }, [error, message, isAuthenticated, navigate, dispatch]);

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 select-none">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="text-TEXT hover:text-gray-500 focus:outline-none cursor-pointer"
                        >
                            <Menu size={22} />
                        </button>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {links.map((nav, index) => (
                            <Link key={index} to={nav.link} className="text-xs uppercase tracking-[2px] font-medium text-TEXT hover:text-gray-400 transition-colors duration-300">
                                {nav.name}
                            </Link>
                        ))}
                    </div>

                    <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
                        <Link to="/" className="font-bold text-2xl tracking-[5px] text-TEXT uppercase">
                            Scentsô
                        </Link>
                    </div>

                    <div className="flex items-center space-x-6">
                        <Link to="/wishlist" className="text-TEXT hover:text-gray-400 transition-colors duration-300 relative group">
                            <Heart size={20} />
                            <span className="absolute -top-1.5 -right-1.5 bg-TEXT text-white text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300">0</span>
                        </Link>

                        <Link to="/cart" className="text-TEXT hover:text-gray-400 transition-colors duration-300 relative group">
                            <ShoppingBag size={20} />
                            <span className="absolute -top-1.5 -right-1.5 bg-TEXT text-white text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">0</span>
                        </Link>

                        {isAuthenticated ? (
                            <div className="hidden md:flex items-center space-x-4">
                                <Link to="/profile" className="text-TEXT hover:text-gray-400 transition-colors duration-300">
                                    <User size={20} />
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-TEXT hover:text-red-500 transition-colors duration-300 focus:outline-none cursor-pointer"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="hidden md:block text-xs uppercase tracking-[2px] font-semibold text-TEXT hover:text-gray-400 transition-colors duration-300">
                                Sign In
                            </Link>
                        )}
                    </div>

                </div>
            </div>



            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-50 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMenuOpen(false)}
            />

            <div className={`fixed top-0 left-0 bottom-0 w-70 max-w-[80vw] bg-white z-50 p-6 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                <div>
                    <div className="flex justify-between items-center pb-6 border-b border-gray-100">
                        <span className="font-bold text-lg tracking-[3px] text-TEXT uppercase">Menu</span>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="text-TEXT hover:text-gray-500 focus:outline-none cursor-pointer"
                        >
                            <X size={22} />
                        </button>
                    </div>

                    <div className="mt-8 space-y-6">
                        {links.map((nav, index) => (
                            <Link
                                key={index}
                                to={nav.link}
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-xs uppercase tracking-[2px] font-medium text-TEXT hover:text-gray-400 transition-colors"
                            >
                                {nav.name}
                            </Link>
                        ))}
                        {isAuthenticated && (
                            <Link
                                to="/profile"
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-xs uppercase tracking-[2px] font-medium text-TEXT hover:text-gray-400 transition-colors"
                            >
                                My Profile
                            </Link>
                        )}
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                    {isAuthenticated ? (
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-between py-3 px-4 bg-red-50 text-red-600 rounded-sm hover:bg-red-100/70 transition-colors duration-300 focus:outline-none cursor-pointer"
                        >
                            <span className="text-xs uppercase tracking-[2px] font-semibold">Log Out</span>
                            <LogOut size={16} />
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-center py-3.5 bg-TEXT text-white text-xs uppercase tracking-[2px] font-semibold rounded-sm hover:opacity-90 transition-opacity"
                        >
                            Sign In
                        </Link>
                    )}
                </div>

            </div>
        </nav>
    );
};

export default Navbar;