import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, User, MapPin, Mail, Phone, Calendar, ShoppingBag } from 'lucide-react';
import { showErrorToast } from '../../helper/MyToast';

const AdminOrderDetails = () => {
    const BASE_API = import.meta.env.VITE_BASE_API;
    const { id } = useParams(); // URL se dynamic Order invoice hash collect kiya
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderInvoiceSpecs = async () => {
            try {
                // Hits your secure order tracking single endpoint route controller
                const response = await axios.get(`${BASE_API}/orders/${id}`, { withCredentials: true });
                if (response.data.success) {
                    setOrder(response.data.order);
                }
            } catch (err) {
                showErrorToast('Failed to locate specified order token receipt record.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderInvoiceSpecs();
    }, [id, BASE_API]);

    if (loading) return <div className="text-xs uppercase tracking-widest text-gray-400">Pulling ledger details...</div>;
    if (!order) return <div className="text-xs text-red-500 font-light">Order data matrix corrupted or missing.</div>;

    return (
        <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
            {/* Top Back Action Header Bar */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link to="/admin/orders" className="p-2 border border-gray-100 hover:border-TEXT rounded-sm text-gray-400 hover:text-TEXT transition-colors">
                        <ArrowLeft size={16} />
                    </Link>
                    <div>
                        <h1 className="text-lg font-bold tracking-[2px] uppercase text-TEXT">Invoice Manifest</h1>
                        <p className="text-[10px] text-gray-400 font-mono mt-0.5">ID: #{order._id}</p>
                    </div>
                </div>
                {/* Active Tracking Badge Flag Level element */}
                <span className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-xs ${order.orderStatus === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                    {order.orderStatus}
                </span>
            </div>

            {/* Split Information Section Grid layout blocks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Block 1: Customer Profile Node Metadata */}
                <div className="bg-white border border-gray-100 p-6 rounded-sm space-y-4 shadow-2xs">
                    <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[2px] text-gray-400 font-medium pb-2 border-b border-gray-50">
                        <User size={14} className="text-TEXT" />
                        <span>Purchaser Account</span>
                    </div>
                    <div className="text-xs space-y-1.5">
                        <p className="font-semibold text-TEXT">{order.user?.fullName || 'Guest Mode'}</p>
                        <p className="text-gray-500 flex items-center gap-2"><Mail size={12} /> {order.email}</p>
                        <p className="text-gray-500 flex items-center gap-2"><Phone size={12} /> {order.phone}</p>
                    </div>
                </div>

                {/* Block 2: Fulfillment Coordinates Delivery Target Node */}
                <div className="bg-white border border-gray-100 p-6 rounded-sm space-y-4 shadow-2xs col-span-2">
                    <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[2px] text-gray-400 font-medium pb-2 border-b border-gray-50">
                        <MapPin size={14} className="text-TEXT" />
                        <span>Fulfillment Coordinates</span>
                    </div>
                    <div className="text-xs space-y-1.5 font-light leading-relaxed">
                        <p className="text-TEXT font-medium">{order.address}</p>
                        <p className="text-gray-500">City: <span className="font-medium text-TEXT">{order.city}</span></p>
                        <p className="text-gray-500">Postal Matrix Code: <span className="font-mono text-TEXT">{order.postalCode || 'N/A'}</span></p>
                    </div>
                </div>

            </div>

            {/* Cart Grid Item Manifest List Block section row */}
            <div className="bg-white border border-gray-100 rounded-sm p-6 shadow-2xs space-y-6">
                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[2px] text-gray-400 font-medium pb-3 border-b border-gray-50">
                    <ShoppingBag size={14} className="text-TEXT" />
                    <span>Cart Items Manifest</span>
                </div>

                <div className="divide-y divide-gray-50">
                    {order.orderItems?.map((row, index) => (
                        <div key={index} className="py-4 flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-4">
                                <img src={row.item?.image} alt={row.item?.title} className="w-12 h-12 object-cover border border-gray-50 rounded-sm" />
                                <div>
                                    <p className="font-semibold text-TEXT">{row.item?.title || 'Fragrance Asset purged'}</p>
                                    <p className="text-[10px] text-gray-400 font-light mt-0.5">Quantity Order: {row.quantity}</p>
                                </div>
                            </div>
                            <p className="font-medium text-TEXT">Rs. {row.item?.price * row.quantity}</p>
                        </div>
                    ))}
                </div>

                {/* Computational Cost Metrics calculations summary module card block */}
                <div className="border-t border-gray-100 pt-4 flex justify-end">
                    <div className="w-64 text-xs space-y-3 font-light text-gray-500">
                        <div className="flex justify-between"><span>Tax Fee (15% Unified System Rate):</span><span className="text-TEXT font-medium">Rs. {order.taxPrice}</span></div>
                        <div className="flex justify-between"><span>Shipping & Delivery Cost:</span><span className="text-TEXT font-medium">Rs. {order.shippingPrice}</span></div>
                        <div className="flex justify-between border-t border-gray-100 pt-3 text-sm font-bold text-TEXT uppercase tracking-wide">
                            <span>Grand Aggregated Total:</span>
                            <span>Rs. {order.totalPrice}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminOrderDetails;