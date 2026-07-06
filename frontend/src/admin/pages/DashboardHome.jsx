import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'motion/react';
import {
    ResponsiveContainer, AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import {
    TrendingUp, ShoppingBag, Users, Layers,
    ShieldCheck, DollarSign, Package, Activity, Loader2, Truck
} from 'lucide-react';

import { getAllOrdersAdmin } from '../../redux/slices/orderSlice';
import { fetchAllUsersAdmin } from '../../redux/slices/allUsersSlice';
import { getAllProducts } from '../../redux/slices/productSlice';
import { getAllCategories } from '../../redux/slices/categorySlice';

const DashboardHome = () => {
    const dispatch = useDispatch();

    const { adminOrders = [], totalRevenue = 0, loading: orderLoading } = useSelector((state) => state.orders || {});
    const { allUsersAdmin: allUsers = [], loading: usersLoading } = useSelector((state) => state.adminUsers || {});
    const { products = [] } = useSelector((state) => state.products || {});
    const { categories = [] } = useSelector((state) => state.categories || {});

    useEffect(() => {
        if (dispatch(getAllOrdersAdmin)) dispatch(getAllOrdersAdmin());
        if (dispatch(fetchAllUsersAdmin)) dispatch(fetchAllUsersAdmin());
        if (dispatch(getAllProducts)) dispatch(getAllProducts());
        if (dispatch(getAllCategories)) dispatch(getAllCategories());
    }, [dispatch]);

    const totalGlobalStoreRevenue = totalRevenue || 0;

    const netPlatformSavingsProfit = totalGlobalStoreRevenue * 0.40;

    const dispatchedOrdersCount = (adminOrders || []).filter(
        (order) => order?.orderStatus === 'Shipped' || order?.orderStatus === 'Delivered'
    ).length;

    const compileAdminMonthlyMetricsDataset = () => {
        const templateMonthMap = {
            'Jan': { name: 'Jan', NetSavings: 0, Dispatches: 0 },
            'Feb': { name: 'Feb', NetSavings: 0, Dispatches: 0 },
            'Mar': { name: 'Mar', NetSavings: 0, Dispatches: 0 },
            'Apr': { name: 'Apr', NetSavings: 0, Dispatches: 0 },
            'May': { name: 'May', NetSavings: 0, Dispatches: 0 },
            'Jun': { name: 'Jun', NetSavings: 0, Dispatches: 0 }
        };

        
        (adminOrders || []).forEach((order) => {
            if (!order?.createdAt) return;
            const dateObj = new Date(order.createdAt);
            const shortMonthName = dateObj.toLocaleString('en-US', { month: 'short' });

            if (templateMonthMap[shortMonthName]) {
                const orderAmountVal = Number(order.totalPrice || 0);

                
                templateMonthMap[shortMonthName].NetSavings += (orderAmountVal * 0.40);

                if (order.orderStatus === 'Shipped' || order.orderStatus === 'Delivered') {
                    templateMonthMap[shortMonthName].Dispatches += 1;
                }
            }
        });
        return Object.values(templateMonthMap);
    };

    const realtimeAdminChartsDataset = compileAdminMonthlyMetricsDataset();

    
    const centralStaggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08, ease: 'easeOut' } }
    };

    const editorialFadeUpSignature = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
    };

    
    if (orderLoading?.fetchAll || orderLoading?.loading) {
        return (
            <div className="min-h-screen bg-[#FBFBFB] flex flex-col items-center justify-center p-4 space-y-3 font-sans select-none">
                <Loader2 size={24} className="animate-spin text-neutral-400 stroke-[1.2]" />
                <p className="text-[10px] text-gray-400 font-light tracking-[2px] uppercase">Indexing Global Store Aggregates...</p>
            </div>
        );
    }

    return (
        <div className="bg-[#FBFBFB] min-h-screen text-TEXT antialiased select-none font-sans pb-24 selection:bg-TEXT selection:text-white">

            <div className="bg-white border-b border-gray-100 py-12 text-center">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div className="text-left">
                        <h1 className="text-xl md:text-2xl font-bold tracking-[3px] uppercase text-TEXT">Maison Command Center</h1>
                        <p className="text-[10px] tracking-[2px] text-gray-400 uppercase font-light mt-1">
                            Enterprise Operations & Strategic Sales Control Center Terminal
                        </p>
                    </div>
                    <div className="flex items-center space-x-2 bg-neutral-900 text-white px-4 py-2 rounded-sm text-[9px] uppercase tracking-[2px] font-bold md:ml-auto select-none shadow-sm">
                        <ShieldCheck size={12} />
                        <span>Root Administrator Access Secured</span>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-12">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={centralStaggerContainer}
                    className="space-y-10"
                >
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">

                        <motion.div variants={editorialFadeUpSignature} className="bg-white border border-gray-100 p-4 rounded-sm space-y-4 shadow-2xs hover:border-neutral-300 transition-colors duration-300">
                            <div className="flex justify-between items-center text-gray-400">
                                <DollarSign size={14} className="text-neutral-800" />
                                <span className="text-[8px] font-bold uppercase tracking-[1.5px] px-1.5 py-0.5 bg-neutral-50 border border-neutral-100 rounded-2xs text-TEXT">Revenue</span>
                            </div>
                            <div className="space-y-0.5">
                                <div className="text-lg font-mono font-bold tracking-tight text-TEXT">
                                    PKR {totalGlobalStoreRevenue.toLocaleString()}
                                </div>
                                <div className="text-[9px] font-bold uppercase tracking-[1.2px] text-gray-400">Gross Store Turnover</div>
                            </div>
                        </motion.div>

                        <motion.div variants={editorialFadeUpSignature} className="bg-white border border-gray-100 p-4 rounded-sm space-y-4 shadow-2xs hover:border-neutral-300 transition-colors duration-300">
                            <div className="flex justify-between items-center text-gray-400">
                                <TrendingUp size={14} className="text-emerald-600" />
                                <span className="text-[8px] font-bold uppercase tracking-[1.5px] px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-2xs">Savings</span>
                            </div>
                            <div className="space-y-0.5">
                                <div className="text-lg font-mono font-bold tracking-tight text-emerald-700">
                                    PKR {netPlatformSavingsProfit.toLocaleString()}
                                </div>
                                <div className="text-[9px] font-bold uppercase tracking-[1.2px] text-gray-400">Net Estimated Profit Margin</div>
                            </div>
                        </motion.div>

                        <motion.div variants={editorialFadeUpSignature} className="bg-white border border-gray-100 p-4 rounded-sm space-y-4 shadow-2xs hover:border-neutral-300 transition-colors duration-300">
                            <div className="flex justify-between items-center text-gray-400">
                                <Package size={14} className="text-neutral-800" />
                                <span className="text-[8px] font-bold uppercase tracking-[1.5px] px-1.5 py-0.5 bg-neutral-50 border border-neutral-100 rounded-2xs text-TEXT">Inventory</span>
                            </div>
                            <div className="space-y-0.5">
                                <div className="text-lg font-mono font-bold tracking-tight text-TEXT">
                                    {String(products?.length || 0).padStart(2, '0')}
                                </div>
                                <div className="text-[9px] font-bold uppercase tracking-[1.2px] text-gray-400">Products Count ({categories?.length || 0} Cats)</div>
                            </div>
                        </motion.div>

                       
                        <motion.div variants={editorialFadeUpSignature} className="bg-white border border-gray-100 p-4 rounded-sm space-y-4 shadow-2xs hover:border-neutral-300 transition-colors duration-300">
                            <div className="flex justify-between items-center text-gray-400">
                                <Users size={14} className="text-neutral-800" />
                                <span className="text-[8px] font-bold uppercase tracking-[1.5px] px-1.5 py-0.5 bg-neutral-50 border border-neutral-100 rounded-2xs text-TEXT">Accounts</span>
                            </div>
                            <div className="space-y-0.5">
                                <div className="text-lg font-mono font-bold tracking-tight text-TEXT">
                                    {usersLoading?.fetchAll ? (
                                        <Loader2 size={12} className="animate-spin text-gray-300" />
                                    ) : (
                                        String(allUsers?.length || 0).padStart(2, '0')
                                    )}
                                </div>
                                <div className="text-[9px] font-bold uppercase tracking-[1.2px] text-gray-400">Total Registered Clients</div>
                            </div>
                        </motion.div>

                        <motion.div variants={editorialFadeUpSignature} className="bg-white border border-gray-100 p-4 rounded-sm space-y-4 shadow-2xs hover:border-neutral-300 transition-colors duration-300">
                            <div className="flex justify-between items-center text-gray-400">
                                <Truck size={14} className="text-blue-600" />
                                <span className="text-[8px] font-bold uppercase tracking-[1.5px] px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-2xs">Logistics</span>
                            </div>
                            <div className="space-y-0.5">
                                <div className="text-lg font-mono font-bold tracking-tight text-blue-700">
                                    {String(dispatchedOrdersCount).padStart(2, '0')}
                                </div>
                                <div className="text-[9px] font-bold uppercase tracking-[1.2px] text-gray-400">Dispatched & Delivered</div>
                            </div>
                        </motion.div>

                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

                        <motion.div
                            variants={editorialFadeUpSignature}
                            className="lg:col-span-7 bg-white border border-gray-100 p-5 md:p-6 rounded-sm shadow-2xs space-y-6"
                        >
                            <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                                <div className="space-y-0.5">
                                    <h3 className="text-xs font-bold tracking-[2px] uppercase text-TEXT flex items-center gap-2">
                                        <Activity size={13} className="text-neutral-400" /> Net Savings Performance
                                    </h3>
                                    <p className="text-[10px] text-gray-400 font-light uppercase tracking-[0.5px]">
                                        Real-time temporal mapping tracking calculated 40% net business savings margin profiles
                                    </p>
                                </div>
                            </div>


                            <div className="w-full h-72 sm:h-80 text-[10px] font-mono tracking-tight font-light">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={realtimeAdminChartsDataset}
                                        margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
                                    >
                                        
                                        <defs>
                                            <linearGradient id="premiumSavingsShade" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0.00} />
                                            </linearGradient>
                                        </defs>

                                        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" vertical={false} />
                                        <XAxis dataKey="name" stroke="#a3a3a3" tickLine={false} axisLine={false} dy={8} />
                                        <YAxis stroke="#a3a3a3" tickLine={false} axisLine={false} tickFormatter={(val) => `PKR ${(val / 1000)}K`} dx={-8} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #f3f4f6', borderRadius: '2px', fontFamily: 'monospace', fontSize: '11px' }}
                                        />
                                        <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }} />


                                        <Area
                                            type="monotone"
                                            dataKey="NetSavings"
                                            name="Calculated Net Savings"
                                            stroke="#10b981"
                                            strokeWidth={2.2}
                                            fillOpacity={1}
                                            fill="url(#premiumSavingsShade)"
                                            activeDot={{ r: 4, strokeWidth: 0, fill: '#10b981' }}
                                            dot={{ r: 1.5, fill: '#10b981', strokeWidth: 0 }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>


                        <motion.div
                            variants={editorialFadeUpSignature}
                            className="lg:col-span-5 bg-white border border-gray-100 p-5 md:p-6 rounded-sm shadow-2xs space-y-6"
                        >
                            <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                                <div className="space-y-0.5">
                                    <h3 className="text-xs font-bold tracking-[2px] uppercase text-TEXT flex items-center gap-2">
                                        <Package size={13} className="text-neutral-400" /> Active Transits & Deliveries
                                    </h3>
                                    <p className="text-[10px] text-gray-400 font-light uppercase tracking-[0.5px]">
                                        Categorical metrics monitoring true monthly dispatched quantities metrics
                                    </p>
                                </div>
                            </div>

                            <div className="w-full h-72 sm:h-80 text-[10px] font-mono tracking-tight font-light">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={realtimeAdminChartsDataset}
                                        margin={{ top: 10, right: 5, left: 5, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" vertical={false} />
                                        <XAxis dataKey="name" stroke="#a3a3a3" tickLine={false} axisLine={false} dy={8} />
                                        <YAxis stroke="#a3a3a3" tickLine={false} axisLine={false} dx={-8} />
                                        <Tooltip cursor={{ fill: '#f9fafb', opacity: 0.6 }} contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #f3f4f6', borderRadius: '2px', fontFamily: 'monospace', fontSize: '11px' }} />
                                        <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }} />
                                        <Bar dataKey="Dispatches" name="Dispatched Volumes count" fill="#3b82f6" maxBarSize={30} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default DashboardHome;