import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'motion/react';
import {
    Clock, ShieldCheck, MapPin, Phone, Mail,
    ArrowLeft, Loader2, ShoppingBag, Truck,
    CheckCircle2, Package, Landmark, Building, Layers
} from 'lucide-react';

import {
    getOrderDetailsAdminThunk,
    updateOrderStatusAdmin,
    clearOrderError
} from '../../redux/slices/orderSlice';
import { showSuccessToast, showErrorToast } from '../../helper/MyToast';

const AdminOrderDetails = () => {
    const { id: targetOrderIdToken } = useParams();
    const dispatch = useDispatch();

    const { currentOrder, loading: orderLoading, errors, btnLoading = {} } = useSelector((state) => state.orders || {});

    useEffect(() => {
        if (targetOrderIdToken) {
            dispatch(getOrderDetailsAdminThunk(targetOrderIdToken));
        }
    }, [targetOrderIdToken, dispatch]);

    useEffect(() => {
        if (errors?.fetchOne) {
            showErrorToast(errors.fetchOne);
            if (dispatch(clearOrderError)) dispatch(clearOrderError('fetchOne'));
        }
        if (errors?.mutation) {
            showErrorToast(errors.mutation);
            if (dispatch(clearOrderError)) dispatch(clearOrderError('mutation'));
        }
    }, [errors?.fetchOne, errors?.mutation, dispatch]);

    const handleAdminStatusChangeSelect = async (selectedNewStatus) => {
        try {
            await dispatch(updateOrderStatusAdmin({ id: targetOrderIdToken, status: selectedNewStatus })).unwrap();
            showSuccessToast(`Operational tracking status advanced to: ${selectedNewStatus}`);

            dispatch(getOrderDetailsAdminThunk(targetOrderIdToken));
        } catch (serverErr) {
            showErrorToast(typeof serverErr === 'string' ? serverErr : 'Status tracking progression error.');
        }
    };

    if (orderLoading?.fetchOne || orderLoading?.loading) {
        return (
            <div className="min-h-screen bg-[#FBFBFB] flex flex-col items-center justify-center p-4 space-y-3 font-sans select-none">
                <Loader2 size={24} className="animate-spin text-neutral-400 stroke-[1.2]" />
                <p className="text-[10px] text-gray-400 font-light tracking-[2px] uppercase">Retrieving Vault Formulation Metrics...</p>
            </div>
        );
    }

    if (!currentOrder) {
        return (
            <div className="min-h-screen bg-[#FBFBFB] flex flex-col items-center justify-center p-4 text-center font-sans space-y-4 select-none">
                <div className="w-12 h-14 bg-white border border-gray-100 rounded-sm flex items-center justify-center text-gray-300 shadow-3xs mx-auto">
                    <Package size={16} />
                </div>
                <div className="space-y-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800">Manifest Not Found</h3>
                    <p className="text-[10px] text-gray-400 font-light uppercase tracking-[0.5px]">This reference ticket does not map to any active database record indices.</p>
                </div>
                <Link to="/admin/orders" className="inline-block bg-TEXT text-white px-5 py-2.5 text-[9px] uppercase tracking-[2px] font-bold border border-TEXT hover:bg-neutral-800 rounded-2xs shadow-3xs transition-all duration-300">
                    Return To Logs Vault
                </Link>
            </div>
        );
    }

    const serverFulfillmentTag = currentOrder.orderStatus || "Pending";
    const paymentMethodIndicator = currentOrder.paymentMethod || "COD";
    const transactionReferenceId = currentOrder.transactionId || "N/A";
    const baseSubTotalAmount = currentOrder.totalPrice - (currentOrder.taxPrice || 0) - (currentOrder.shippingPrice || 0);
    const computedGstTariff = currentOrder.taxPrice || 0;
    const premiumCargoTransitFee = currentOrder.shippingPrice || 0;
    const finalBillGrandTotal = currentOrder.totalPrice || 0;

    const formattedCreationDateStr = currentOrder.createdAt
        ? new Date(currentOrder.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
        : new Date().toLocaleDateString();

    return (
        <div className="bg-[#FBFBFB] min-h-screen text-TEXT antialiased select-none font-sans pb-24 selection:bg-TEXT selection:text-white">

            {/* Top High-End Typography Invoice Tracking Ribbon */}
            <div className="bg-white border-b border-gray-100 py-12 text-center">
                <h1 className="text-xl md:text-2xl font-bold tracking-[3px] uppercase text-TEXT">Audit Manifest</h1>
                <p className="text-[10px] tracking-[2px] text-gray-400 uppercase font-light mt-1.5">
                    Enterprise Single Document Inspection Corridor Node
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-12 space-y-6">

                {/* Upper control layout line back button links direction options */}
                <Link to="/admin/orders" className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[2px] font-semibold text-gray-400 hover:text-TEXT transition-colors duration-300 mb-2 group focus:outline-none">
                    <ArrowLeft size={12} className="transform group-hover:-translate-x-0.5 transition-transform" />
                    <span>Back To Master Order Logs</span>
                </Link>

                {/* CORE TICKET IDENTITY STATUS HUD HEADER CARD CARD PANEL */}
                <div className="bg-white border border-gray-100 p-5 md:p-6 rounded-sm shadow-2xs grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                    <div className="space-y-1">
                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-[1.5px]">Unique Hex Target ID:</span>
                        <p className="font-mono font-bold text-xs uppercase tracking-wide text-TEXT select-all">{currentOrder._id}</p>
                        <p className="text-[10px] text-gray-400 font-light uppercase tracking-[0.5px]">Logged: {formattedCreationDateStr}</p>
                    </div>

                    <div className="space-y-1 text-left md:text-center">
                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-[1.5px] block">Live Dispatch Pipeline Status:</span>
                        <span className={`inline-block text-[10px] font-bold uppercase tracking-[2px] px-3 py-1 rounded-2xs border ${serverFulfillmentTag === 'Delivered' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                            serverFulfillmentTag === 'Shipped' ? 'bg-purple-50 border-purple-100 text-purple-700' :
                                serverFulfillmentTag === 'Processing' ? 'bg-blue-50 border-blue-100 text-blue-700' :
                                    serverFulfillmentTag === 'Cancelled' ? 'bg-red-50 border-red-100 text-red-700' :
                                        'bg-amber-50 border-amber-100 text-amber-700'
                            }`}>
                            {serverFulfillmentTag}
                        </span>
                    </div>

                    <div className="space-y-1 text-left md:text-center">
                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-[1.5px] block">Settlement Tracking Route:</span>
                        <p className="text-xs font-bold text-TEXT uppercase tracking-wide flex md:justify-center items-center gap-1.5 mt-0.5">
                            {paymentMethodIndicator === 'COD' ? <Truck size={13} /> : <Landmark size={13} />}
                            {paymentMethodIndicator === 'COD' ? "Cash On Delivery" : "Simulated Gateway Paid"}
                        </p>
                        <p className="text-[9px] text-gray-400 font-mono tracking-tight truncate max-w-xs md:mx-auto">Ref: {transactionReferenceId}</p>
                    </div>

                    {/* INTERACTIVE WORKFLOW ADVANCEMENT DROP DOWN FOR ADMINISTRATORS */}
                    <div className="text-left md:text-right space-y-1">
                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-[1.5px] block">Modify Lifecycle State:</span>
                        <div className="bg-white border border-gray-200 rounded-sm px-2 py-2 flex items-center shadow-3xs max-w-xs md:ml-auto">
                            <Layers size={12} className="text-gray-400 mr-2 shrink-0" />
                            <select
                                disabled={btnLoading[currentOrder._id] || serverFulfillmentTag === 'Delivered'}
                                value={serverFulfillmentTag}
                                onChange={(eventNode) => handleAdminStatusChangeSelect(eventNode.target.value)}
                                className="w-full bg-transparent text-[10px] text-TEXT font-bold uppercase tracking-wider focus:outline-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Main Split Grid Central Blocks Details Frames Structure Layout Columns Panels */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT AREA WORKSPACE: RESERVATION PRODUCTS LIST LOOP (Takes 7 Grid Columns) */}
                    <div className="lg:col-span-7 bg-white border border-gray-100 p-5 md:p-6 rounded-sm shadow-2xs space-y-5">
                        <h3 className="text-xs font-bold tracking-[2px] uppercase text-TEXT pb-2 border-b border-gray-50 flex items-center gap-2">
                            <ShoppingBag size={13} className="text-gray-400" /> Itemized Inventory Registry
                        </h3>

                        <div className="space-y-4 custom-scrollbar max-h-[420px] overflow-y-auto pr-1">
                            {currentOrder.orderItems?.map((rowItem, idx) => {
                                const matchedProductNode = rowItem.item;
                                if (!matchedProductNode) return null;

                                return (
                                    <div key={rowItem._id || idx} className="flex justify-between items-center text-xs font-sans gap-4 border-b border-neutral-50 pb-3 last:border-0 last:pb-0 group select-none">
                                        <div className="flex items-center space-x-3 min-w-0">
                                            {/* Thumbnail frame with safe fallbacks */}
                                            <div className="w-12 h-12 bg-[#FBFBFB] border border-gray-100 rounded-xs overflow-hidden shrink-0">
                                                <img
                                                    src={matchedProductNode.image?.url || matchedProductNode.image || '/fallback-scent.png'}
                                                    alt={matchedProductNode.title}
                                                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-TEXT uppercase tracking-wide truncate max-w-47.5 sm:max-w-none">{matchedProductNode.title}</p>
                                                <p className="text-[10px] text-gray-400 font-mono mt-0.5">Unit Rate: Rs. {Number(matchedProductNode.price || 0).toLocaleString()} × Qty: {rowItem.quantity}</p>
                                            </div>
                                        </div>
                                        <span className="font-mono font-bold text-TEXT text-right shrink-0">
                                            Rs. {((matchedProductNode.price || 0) * (rowItem.quantity || 1)).toLocaleString()}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT AREA WORKSPACE: CUSTOMER CREDENTIALS & FINANCIAL LEDGER SUMMARY CARDS (Takes 5 Grid Columns) */}
                    <div className="lg:col-span-5 space-y-6">

                        {/* Cargo Allocation Destination Details info box list layout maps */}
                        <div className="bg-white border border-gray-100 p-5 md:p-6 rounded-sm shadow-2xs space-y-4">
                            <h3 className="text-xs font-bold tracking-[2px] uppercase text-TEXT pb-2 border-b border-gray-50 flex items-center gap-2">
                                <MapPin size={13} className="text-gray-400" /> Cargo Despatch Allocation
                            </h3>

                            <div className="space-y-3 text-xs font-sans">
                                <div className="p-3 bg-neutral-50 rounded-xs border border-gray-100/40 space-y-1">
                                    <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-[1px]">Consignee Profile Credentials</span>
                                    <p className="font-bold text-TEXT uppercase tracking-wide">{currentOrder.user?.fullName || "MAISON CUSTOMER COLLECTOR"}</p>
                                    <p className="text-gray-400 lowercase font-light text-[11px]">{currentOrder.email || currentOrder.user?.email || "N/A"}</p>
                                </div>

                                <div className="p-3 bg-neutral-50 rounded-xs border border-gray-100/40 space-y-1">
                                    <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-[1px]">Mailing Destination Delivery Lines</span>
                                    <p className="font-medium text-gray-600 uppercase tracking-wide leading-relaxed">{currentOrder.address}</p>
                                    <p className="font-bold text-TEXT uppercase text-[11px] tracking-widest pt-0.5 flex items-center gap-1">
                                        <Building size={11} className="text-gray-400" /> Hub City: {currentOrder.city} {currentOrder.postalCode ? `(${currentOrder.postalCode})` : ''}
                                    </p>
                                </div>

                                <div className="p-3 bg-neutral-50 rounded-xs border border-gray-100/40 space-y-1 flex items-center gap-2">
                                    <Phone size={13} className="text-gray-400 shrink-0 mt-0.5" />
                                    <div className="space-y-0.5">
                                        <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-[1px]">Mobile Contact Number</span>
                                        <p className="font-mono font-semibold text-TEXT tracking-wide">{currentOrder.phone || "03001234567"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Financial Stack Pricing Ledger Review Card List Sheet */}
                        <div className="bg-white border border-gray-100 p-5 md:p-6 rounded-sm shadow-2xs space-y-4">
                            <h3 className="text-xs font-bold tracking-[2px] uppercase text-TEXT pb-2 border-b border-gray-50">
                                Valuation Summary Ledger
                            </h3>

                            <div className="space-y-4 text-xs font-sans">
                                <div className="flex justify-between items-center text-gray-500 font-light">
                                    <span className="tracking-wide">Boutique Base Subtotal</span>
                                    <span className="font-mono text-TEXT font-medium">Rs. {baseSubTotalAmount.toLocaleString()}</span>
                                </div>

                                <div className="flex justify-between items-center text-gray-500 font-light">
                                    <div className="space-y-0.5">
                                        <span className="tracking-wide block">Integrated GST / VAT Tariff</span>
                                        <span className="text-[10px] text-gray-400 block font-light">Calculated unified GST rate matrix</span>
                                    </div>
                                    <span className="font-mono text-TEXT font-medium">Rs. {computedGstTariff.toLocaleString()}</span>
                                </div>

                                <div className="flex justify-between items-center text-gray-500 font-light border-b border-gray-50 pb-4">
                                    <span className="tracking-wide">Maison Premium Transit Cover</span>
                                    <span className="font-mono text-TEXT font-medium">
                                        {premiumCargoTransitFee === 0 ? 'COMPLIMENTARY' : `Rs. ${premiumCargoTransitFee}`}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center text-xs font-bold text-TEXT pt-1">
                                    <span className="uppercase tracking-[1px]">Grand Total Transacted</span>
                                    <span className="font-mono text-base tracking-tight text-TEXT">Rs. {finalBillGrandTotal.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Bottom Secure Sandbox Audit report Seals Statement notices footprint */}
                <div className="bg-white border border-gray-100 p-5 text-center rounded-sm max-w-3xl mx-auto space-y-2 select-none shadow-3xs">
                    <p className="text-[9px] uppercase tracking-[2px] font-bold text-gray-400 flex items-center justify-center gap-1.5">
                        <CheckCircle2 size={12} className="text-TEXT" /> SandboxDev Simulation Audit Report Token Seal Secure
                    </p>
                    <p className="text-[10px] text-gray-400 font-light leading-relaxed max-w-xl mx-auto lowercase font-sans">
                        This digital invoice record manifest reflects live data states written natively onto local Mongo database channels. Financial accounts query vectors stand fully captured matching security parameters criteria flawlessly.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default AdminOrderDetails;