import React, { useEffect, useState } from 'react';
import api from '../../lib/api';
import { DollarSign, Globe, ShoppingBag, TrendingUp } from 'lucide-react';

const DashboardHome = () => {
    const [totalProducts, setTotalProducts] = useState();
    const [totalOrders, setTotalOrders] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const allProducts = async () => {
            try {
                const res = await api.get(`/products`);
                if (res.data.success) {
                    setTotalProducts(res.data.count)
                }
            } catch (err) {
                console.error('Failed to load analytical metrics', err);
            } finally {
                setLoading(false);
            }
        };


        const allOrders = async () => {
            try {
                const res = await api.get(`/orders/admin/all-orders`);
                if (res.data.success) {
                    setTotalOrders(res.data.count)
                    console.log(Number(totalOrders))
                }
            } catch (err) {
                console.error('Failed to load analytical metrics', err);
            } finally {
                setLoading(false);
            }
        };



        allProducts();
        allOrders();
    }, [api]);

    if (loading) return <div className="text-xs uppercase tracking-widest text-gray-400">Loading Analytics...</div>;

    const widgetData = [
        { title: 'Total Revenue', val: `Rs. 0`, icon: <DollarSign size={20} />, color: 'bg-green-50 text-green-700 border-green-100' },
        { title: 'Total Orders', val: 0, icon: <ShoppingBag size={20} />, color: 'bg-blue-50 text-blue-700 border-blue-100' },
        { title: 'Store Status', val: 'Active', icon: <TrendingUp size={20} />, color: 'bg-neutral-50 text-neutral-800 border-neutral-100' },
        { title: 'Total Products', val: `${totalProducts}`, icon: <Globe size={20} />, color: 'bg-blue-50 text-blue-700 border-blue-100' },
    ];

    return (
        <div className="space-y-10 animate-fade-in">
            <div>
                <h1 className="text-xl font-bold tracking-[2px] uppercase text-TEXT">Performance Suite</h1>
                <p className="text-xs text-gray-400 font-light mt-1">Real-time metrics tracking across Scentsô database.</p>
            </div>

            {/* Widget Grid row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {widgetData.map((w, idx) => (
                    <div key={idx} className={`p-6 border rounded-sm flex items-center justify-between bg-white shadow-xs`}>
                        <div className="space-y-2">
                            <p className="text-[10px] uppercase tracking-[2px] font-medium text-gray-400">{w.title}</p>
                            <h3 className="text-2xl font-bold tracking-tight text-TEXT">{w.val}</h3>
                        </div>
                        <div className={`p-3 rounded-full border ${w.color}`}>
                            {w.icon}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardHome;