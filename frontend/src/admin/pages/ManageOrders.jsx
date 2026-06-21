import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ManageOrders = () => {
    const BASE_API = import.meta.env.VITE_BASE_API;
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAllOrders = async () => {
        try {
            // Connects cleanly to your getAllOrdersAdmin backend controller
            const response = await axios.get(`${BASE_API}/orders/admin/all`, { withCredentials: true });
            setOrders(response.data.orders || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAllOrders(); }, []);

    const handleStatusChange = async (id, currentStatus) => {
        // Toggles mapping options sequentially
        const nextStatusMap = { 'Pending': 'Processing', 'Processing': 'Shipped', 'Shipped': 'Delivered' };
        const newStatus = nextStatusMap[currentStatus];

        if (!newStatus) {
            toast.error('Order status cannot be moved further or is already delivered.');
            return;
        }

        try {
            // Hits your updateOrderStatus backend function securely
            const response = await axios.put(`${BASE_API}/orders/admin/${id}`, { status: newStatus }, { withCredentials: true });
            if (response.data.success) {
                toast.success(`Order advanced to ${newStatus}`);
                fetchAllOrders();
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Status progression error');
        }
    };

    if (loading) return <div className="text-xs uppercase tracking-widest text-gray-400">Loading master registry invoices...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-xl font-bold tracking-[2px] uppercase text-TEXT">Master Order Logs</h1>
                <p className="text-xs text-gray-400 font-light mt-1">Review user purchase metrics, modify states, and look up delivery coordinates.</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-sm shadow-xs overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[750px]">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50 text-gray-400 font-medium text-[10px] uppercase tracking-[2px]">
                            <th className="py-4 px-6">Customer</th>
                            <th className="py-4 px-6">Date</th>
                            <th className="py-4 px-6">Grand Total</th>
                            <th className="py-4 px-6">Status Level</th>
                            <th className="py-4 px-6 text-center">Workflow Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-xs tracking-wide">
                        {orders.length === 0 ? (
                            <tr><td colSpan="5" className="p-8 text-center text-gray-400 font-light">No invoice orders exist in database yet.</td></tr>
                        ) : (
                            orders.map((o) => (
                                <tr key={o._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-6">
                                        <p className="font-semibold text-TEXT">{o.user?.fullName || 'Guest Profile'}</p>
                                        <p className="text-[10px] text-gray-400 font-light mt-0.5">{o.email}</p>
                                    </td>
                                    <td className="py-4 px-6 text-gray-500 font-light">{new Date(o.createdAt).toLocaleDateString()}</td>
                                    <td className="py-4 px-6 font-medium text-TEXT">Rs. {o.totalPrice}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-xs ${
                                            o.orderStatus === 'Delivered' ? 'bg-green-50 text-green-700' :
                                            o.orderStatus === 'Shipped' ? 'bg-purple-50 text-purple-700' :
                                            o.orderStatus === 'Processing' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                                        }`}>
                                            {o.orderStatus}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        {o.orderStatus !== 'Delivered' ? (
                                            <button onClick={() => handleStatusChange(o._id, o.orderStatus)} className="px-4 py-2 border border-TEXT text-TEXT text-[10px] font-semibold uppercase tracking-wider hover:bg-TEXT hover:text-white transition-all rounded-sm shadow-2xs cursor-pointer">
                                                Advance Status
                                            </button>
                                        ) : (
                                            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Completed</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrders;