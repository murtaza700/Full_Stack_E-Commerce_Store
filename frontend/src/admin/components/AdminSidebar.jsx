import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, FolderHeart, ArrowLeft } from 'lucide-react';

const AdminSidebar = () => {
    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18} /> },
        { name: 'Manage Products', path: '/admin/products', icon: <ShoppingBag size={18} /> },
        { name: 'Manage Orders', path: '/admin/orders', icon: <FolderHeart size={18} /> },
        { name: 'Manage Categories', path: '/admin/categories', icon: <FolderHeart size={18} /> },
    ];

    return (
        <aside className="w-64 bg-[#111111] text-white flex flex-col justify-between p-6 select-none hidden md:flex border-r border-neutral-800">
            <div>
                {/* Brand Header */}
                <div className="mb-10 text-center md:text-left">
                    <Link to="/admin" className="font-bold text-xl tracking-[4px] uppercase text-white hover:text-gray-300 transition-colors">
                        Scentsô Panel
                    </Link>
                    <p className="text-[9px] uppercase tracking-[2px] text-neutral-500 mt-1 font-light">Boutique Console</p>
                </div>

                {/* Nav Links */}
                <nav className="space-y-2">
                    {navItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            end={item.path === '/admin'}
                            className={({ isActive }) =>
                                `flex items-center space-x-3 px-4 py-3 text-xs uppercase tracking-[2px] font-medium rounded-sm transition-all duration-300 ${isActive
                                    ? 'bg-white text-[#111111] font-semibold shadow-md'
                                    : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                                }`
                            }
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Back to Live Site Link */}
            <Link to="/" className="flex items-center space-x-2 text-xs text-neutral-400 hover:text-white transition-colors border-t border-neutral-800 pt-4 font-light tracking-wide">
                <ArrowLeft size={14} />
                <span>Return to Store</span>
            </Link>
        </aside>
    );
};

export default AdminSidebar;