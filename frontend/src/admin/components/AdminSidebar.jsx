import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingBag,
    Receipt,
    FolderHeart,
    ArrowLeft,
    Users,
    Sparkles
} from 'lucide-react';

const AdminSidebar = () => {
    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={16} /> },
        { name: 'Manage Orders', path: '/admin/orders', icon: <Receipt size={16} /> },
        { name: 'Manage Products', path: '/admin/products', icon: <ShoppingBag size={16} /> },
        { name: 'Manage Featureds', path: '/admin/featured', icon: <Sparkles size={16} /> },
        { name: 'Manage Categories', path: '/admin/categories', icon: <FolderHeart size={16} /> },
        { name: 'Manage Users', path: '/admin/users', icon: <Users size={16} /> },
    ];

    return (
        <aside className="w-64 bg-TEXT text-white flex flex-col justify-between p-6 select-none hidden md:flex border-r border-neutral-800 shrink-0 min-h-screen">
            <div>

                <div className="mb-10 text-center md:text-left">

                    <Link to="/admin" className="font-bold text-xl tracking-[4px] uppercase text-white hover:text-gray-300 transition-colors focus:outline-none">
                        Scentsô Panel
                    </Link>
                    <p className="text-[9px] uppercase tracking-[2px] text-neutral-500 mt-1 font-light">Boutique Console</p>
                </div>


                <nav className="space-y-2">
                    {navItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            end={item.path === '/admin'}
                            className={({ isActive }) =>
                                `flex items-center space-x-3 px-4 py-3 text-xs uppercase tracking-[2px] font-medium rounded-sm transition-all duration-300 focus:outline-none ${isActive
                                    ? 'bg-white text-TEXT font-bold shadow-md transform translate-x-1'
                                    : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                                }`
                            }
                        >
                            <span className="shrink-0">{item.icon}</span>
                            <span>{item.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>


            <Link to="/" className="flex items-center space-x-2 text-xs text-neutral-400 hover:text-white transition-colors border-t border-neutral-800 pt-4 font-light tracking-wide focus:outline-none group">
                <ArrowLeft size={14} className="transform group-hover:-translate-x-0.5 transition-transform duration-300" />
                <span>Return to Store</span>
            </Link>
        </aside>
    );
};

export default AdminSidebar;