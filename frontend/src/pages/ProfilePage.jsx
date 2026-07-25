import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
    User, Mail, Calendar, ShieldCheck, MapPin,
    Phone, Building, ShoppingBag, CreditCard, Clock,
    ChevronRight, ArrowLeft, Loader2, Award
} from 'lucide-react';

import Meta from '../components/Meta';

import { getMyAllOrders } from '../redux/slices/orderSlice';

const ProfilePage = () => {
    const dispatch = useDispatch();

    const { user: currentUser, isAuthenticated } = useSelector((state) => state.auth);
    const { orders: userOrderHistoryList, loading: orderLoading } = useSelector((state) => state.orders || { orders: [], loading: {} });

    const centralStaggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.12, ease: 'easeOut' } }
    };

    const editorialFadeUpSignature = {
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getMyAllOrders());
        }
    }, [dispatch]);

    const computeCumulativeInvestmentCaptured = () => {
        if (!userOrderHistoryList || userOrderHistoryList.length === 0) return 0;
        return userOrderHistoryList.reduce((accumulatedSum, currentOrderRow) => {
            const orderGrandTotalVal = currentOrderRow.grandTotal || currentOrderRow.totalPrice || 0;
            return accumulatedSum + orderGrandTotalVal;
        }, 0);
    };

    const globalInvestmentTotalScore = computeCumulativeInvestmentCaptured();

    if (!isAuthenticated) {
        return (
            <>
                <Meta
                    title="Sign In to Profile"
                    description="Secure authentication checkpoint for the Scentsô client dashboard workspace room. Please log in to manage your private accounts records."
                />

                <div className="min-h-screen bg-[#FBFBFB] flex flex-col items-center justify-center p-4 md:p-8 select-none font-sans text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="bg-white border border-gray-100 rounded-sm p-6 md:p-10 max-w-sm mx-auto shadow-sm space-y-6"
                    >

                        <div className="w-14 h-14 bg-neutral-50 border border-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                            <ShieldCheck size={26} className="stroke-[1.2]" />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-xs font-bold tracking-[3px] uppercase text-TEXT">You are not loggedin!</h2>
                            <p className="text-[11px] text-gray-400 font-light leading-relaxed max-w-xs mx-auto uppercase tracking-[0.5px]">
                                This secure sector archives high-fidelity olfactory metrics. Authentication parameters are required.
                            </p>
                        </div>

                        <div className="pt-2 flex flex-col gap-2.5">
                            <Link
                                to="/login"
                                className="bg-TEXT text-white w-full py-3.5 text-[10px] uppercase tracking-[2px] font-semibold border border-TEXT hover:bg-neutral-800 active:scale-95 transition-all duration-300 rounded-sm shadow-xs flex items-center justify-center focus:outline-none"
                            >
                                Authorize Account
                            </Link>

                            <Link
                                to="/products"
                                className="border border-gray-200 text-gray-400 w-full py-3 text-[10px] uppercase tracking-[2px] font-semibold hover:bg-neutral-50 hover:text-TEXT active:scale-95 transition-all duration-300 rounded-sm flex items-center justify-center focus:outline-none"
                            >
                                <ArrowLeft size={10} className="mr-1.5" /> Back To Gallery
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </>
        );
    }


    return (
        <>
            <Meta
                // title={currentUser?.fullName ? `${currentUser.fullName}'s Profile` : 'Client Account Dashboard'}
                title={`Your Profile`}
                description="Manage your secure Scentsô client settings. Update your luxury shipping credentials, review account credentials, and monitor chronological transaction history files safely."
            />

            <div className="bg-[#FBFBFB] min-h-screen text-TEXT antialiased select-none font-sans pb-24 selection:bg-TEXT selection:text-white">

                <div className="bg-white border-b border-gray-100 py-12 text-center">
                    <h1 className="text-xl md:text-2xl font-bold tracking-[3px] uppercase text-TEXT">Collector Profile</h1>
                    <p className="text-[10px] tracking-[2px] text-gray-400 uppercase font-light mt-1.5">
                        Manage your elite portfolio credentials and active database reservation logs
                    </p>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-12">

                    <Link to="/products" className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[2px] font-semibold text-gray-400 hover:text-TEXT transition-colors duration-300 mb-6 group focus:outline-none">
                        <ArrowLeft size={12} className="transform group-hover:-translate-x-0.5 transition-transform" />
                        <span>Back To Gallery Vault</span>
                    </Link>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={centralStaggerContainer}
                        className="space-y-10"
                    >

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">

                            <motion.div variants={editorialFadeUpSignature} className="bg-white border border-gray-100 p-6 rounded-sm space-y-3 shadow-2xs">
                                <div className="flex justify-between items-center text-gray-400">
                                    <ShoppingBag size={15} className="stroke-[1.3]" />
                                    <span className="text-[8px] font-bold uppercase tracking-[1.5px] px-2 py-0.5 bg-neutral-50 border border-neutral-100 rounded-2xs text-TEXT">Total Registry</span>
                                </div>
                                <div className="space-y-0.5">
                                    <div className="text-2xl font-mono font-bold tracking-tight text-TEXT">
                                        {orderLoading?.fetchAll ? (
                                            <Loader2 size={16} className="animate-spin text-gray-300" />
                                        ) : (
                                            String(userOrderHistoryList?.length || 0).padStart(2, '0')
                                        )}
                                    </div>
                                    <div className="text-[9px] font-bold uppercase tracking-[1.2px] text-gray-400">Acquisitions Captured In Database</div>
                                </div>
                            </motion.div>

                            <motion.div variants={editorialFadeUpSignature} className="bg-white border border-gray-100 p-6 rounded-sm space-y-3 shadow-2xs">
                                <div className="flex justify-between items-center text-gray-400">
                                    <CreditCard size={15} className="stroke-[1.3]" />
                                    <span className="text-[8px] font-bold uppercase tracking-[1.5px] px-2 py-0.5 bg-neutral-50 border border-neutral-100 rounded-2xs text-TEXT">Financial Value</span>
                                </div>
                                <div className="space-y-0.5">
                                    <div className="text-2xl font-mono font-bold tracking-tight text-TEXT">
                                        {orderLoading?.fetchAll ? (
                                            <Loader2 size={16} className="animate-spin text-gray-300" />
                                        ) : (
                                            `PKR ${globalInvestmentTotalScore.toLocaleString()}`
                                        )}
                                    </div>
                                    <div className="text-[9px] font-bold uppercase tracking-[1.2px] text-gray-400">Total Capital Safely Transacted</div>
                                </div>
                            </motion.div>

                            <motion.div variants={editorialFadeUpSignature} className="bg-white border border-gray-100 p-6 rounded-sm space-y-3 shadow-2xs">
                                <div className="flex justify-between items-center text-gray-400">
                                    <Award size={15} className="stroke-[1.3]" />
                                    <span className="text-[8px] font-bold uppercase tracking-[1.5px] px-2 py-0.5 bg-neutral-900 text-white rounded-2xs">Maison Rank</span>
                                </div>
                                <div className="space-y-0.5">
                                    <div className="text-2xl font-serif font-extrabold tracking-wide uppercase text-TEXT">
                                        {userOrderHistoryList?.length >= 5 ? "Vanguard" : "Collector"}
                                    </div>
                                    <div className="text-[9px] font-bold uppercase tracking-[1.2px] text-gray-400">Olfactory Portfolio Standing Class</div>
                                </div>
                            </motion.div>
                        </div>


                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                            <motion.div
                                variants={editorialFadeUpSignature}
                                className="lg:col-span-5 bg-white border border-gray-100 p-5 md:p-6 rounded-sm shadow-2xs space-y-6"
                            >
                                <div>
                                    <h3 className="text-xs font-bold tracking-[2px] uppercase text-TEXT flex items-center gap-2">
                                        <User size={13} className="text-gray-400" /> Account Information
                                    </h3>
                                    <p className="text-[10px] text-gray-400 font-light mt-0.5 uppercase tracking-[0.5px]">
                                        Verified Client Registry Identification Data logs
                                    </p>
                                </div>

                                <div className="space-y-4 text-xs font-sans">

                                    <div className="flex items-start gap-3.5 p-3 bg-neutral-50 rounded-xs border border-gray-100/40">
                                        <User size={14} className="text-gray-400 shrink-0 mt-0.5" />
                                        <div className="space-y-0.5">
                                            <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-[1px]">Collector Profile Name</span>
                                            <p className="font-semibold text-neutral-900 uppercase tracking-wide">
                                                {currentUser?.fullName || "ELITE ARCHIVE COLLECTOR"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3.5 p-3 bg-neutral-50 rounded-xs border border-gray-100/40">
                                        <Mail size={14} className="text-gray-400 shrink-0 mt-0.5" />
                                        <div className="space-y-0.5 min-w-0">
                                            <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-[1px]">Secure Digital Mailbox</span>
                                            <p className="font-medium text-TEXT font-mono break-all lowercase">
                                                {currentUser?.email || "N/A"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3.5 p-3 bg-neutral-50 rounded-xs border border-gray-100/40">
                                        <Calendar size={14} className="text-gray-400 shrink-0 mt-0.5" />
                                        <div className="space-y-0.5">
                                            <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-[1px]">Registry Timestamp Induction</span>
                                            <p className="font-medium text-TEXT font-mono tracking-tight uppercase">
                                                {currentUser?.createdAt
                                                    ? new Date(currentUser.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                                    : "March 2026"}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>


                            <div className="lg:col-span-7 space-y-6">

                                <div className="bg-white border border-gray-100 p-5 md:p-6 rounded-sm shadow-2xs space-y-4">
                                    <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                                        <div>
                                            <h3 className="text-xs font-bold tracking-[2px] uppercase text-TEXT flex items-center gap-2">
                                                <Clock size={13} className="text-gray-400" /> Acquisition Manifests History
                                            </h3>
                                            <p className="text-[10px] text-gray-400 font-light mt-0.5 uppercase tracking-[0.5px]">
                                                Real-time monitoring tracks matching unique database keys index lines
                                            </p>
                                        </div>
                                        <span className="text-[9px] font-mono font-bold text-gray-400 px-2 py-0.5 bg-neutral-50 border border-neutral-100 rounded-2xs">
                                            Active Records
                                        </span>
                                    </div>

                                    <div className="pt-2">

                                        {orderLoading?.fetchAll ? (
                                            <div className="flex flex-col items-center justify-center py-16 space-y-3">
                                                <Loader2 size={24} className="animate-spin text-neutral-400 stroke-[1.2]" />
                                                <p className="text-[10px] text-gray-400 font-light tracking-[2px] uppercase">Querying Historical Records Matrices...</p>
                                            </div>
                                        ) : (!userOrderHistoryList || userOrderHistoryList.length === 0) ? (
                                            (
                                                <div className="text-center py-16 space-y-4">
                                                    <div className="w-10 h-10 bg-neutral-50 border border-neutral-100/80 rounded-full flex items-center justify-center mx-auto text-gray-300">
                                                        <ShoppingBag size={16} className="stroke-[1.3]" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-xs font-semibold text-neutral-800 uppercase tracking-wider">No Acquisitions Found</p>
                                                        <p className="text-[10px] text-gray-400 font-light max-w-xs mx-auto uppercase tracking-[0.5px]">Your luxury shopping parameters registry database logs are currently clear.</p>
                                                    </div>
                                                    <div className="pt-2">
                                                        <Link to="/products" className="inline-block bg-TEXT text-white px-5 py-2.5 text-[9px] uppercase tracking-[2px] font-bold border border-TEXT hover:bg-neutral-800 rounded-2xs shadow-3xs transition-all duration-300">
                                                            Open Products Vault
                                                        </Link>
                                                    </div>
                                                </div>
                                            )
                                        ) : (

                                            <div className="space-y-3.5 max-h-115 overflow-y-auto pr-1 custom-scrollbar">

                                                {userOrderHistoryList.map((individualOrderRow) => {
                                                    const orderIdentificationKey = individualOrderRow._id || "MOCK-ID";
                                                    const orderCalculatedBillSum = individualOrderRow.grandTotal || individualOrderRow.totalPrice || 0;
                                                    const orderCargoTransitMethod = individualOrderRow.paymentMethod || "COD";
                                                    const orderFulfillmentStatusText = individualOrderRow.orderStatus || "Pending";

                                                    const formattedRegistryDateMarker = individualOrderRow.createdAt
                                                        ? new Date(individualOrderRow.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })
                                                        : new Date().toLocaleDateString();

                                                    return (
                                                        <div
                                                            key={orderIdentificationKey}
                                                            className="bg-neutral-50/60 hover:bg-neutral-50 border border-gray-100 p-4 rounded-xs transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none group"
                                                        >

                                                            <div className="space-y-1.5 min-w-0">
                                                                <div className="flex items-center space-x-2">
                                                                    <span className="w-1.5 h-1.5 bg-TEXT rounded-full shrink-0 group-hover:scale-125 transition-transform" />
                                                                    <p className="font-mono font-bold text-xs text-TEXT uppercase tracking-wide truncate max-w-45 sm:max-w-none">
                                                                        ID: {orderIdentificationKey}
                                                                    </p>
                                                                </div>
                                                                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-gray-400 uppercase font-light tracking-[0.5px]">
                                                                    <span className="flex items-center gap-1">
                                                                        <Calendar size={11} /> {formattedRegistryDateMarker}
                                                                    </span>
                                                                    <span className="font-mono bg-white border border-gray-200/50 px-1.5 py-0.5 rounded-2xs text-[9px] text-gray-500">
                                                                        {orderCargoTransitMethod}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 pt-2.5 sm:pt-0 border-gray-200/50">
                                                                <div className="space-y-0.5 text-left sm:text-right">
                                                                    <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-[1px]">Amount Captured</span>
                                                                    <p className="font-mono font-bold text-xs text-TEXT">
                                                                        PKR {orderCalculatedBillSum.toLocaleString()}
                                                                    </p>
                                                                </div>

                                                                <div className="flex items-center space-x-2">
                                                                    <span className={`text-[9px] font-bold uppercase tracking-[1.5px] px-2 py-0.5 rounded-2xs border font-sans ${orderFulfillmentStatusText.toLowerCase() === 'delivered'
                                                                        ? 'bg-emerald-50/60 border-emerald-100 text-emerald-700'
                                                                        : orderFulfillmentStatusText.toLowerCase() === 'dispatched'
                                                                            ? 'bg-blue-50/60 border-blue-100 text-blue-700'
                                                                            : orderFulfillmentStatusText.toLowerCase() === 'processing'
                                                                                ? 'bg-amber-50/60 border-amber-100 text-amber-700'
                                                                                : 'bg-neutral-50 border-neutral-200 text-gray-500'
                                                                        }`}>
                                                                        {orderFulfillmentStatusText}
                                                                    </span>

                                                                    <Link
                                                                        to={`/order/${orderIdentificationKey}`}
                                                                        className="w-7 h-7 bg-white hover:bg-TEXT hover:text-white border border-gray-200 text-gray-400 rounded-sm flex items-center justify-center transition-all duration-300 shadow-3xs cursor-pointer focus:outline-none"
                                                                    >
                                                                        <ChevronRight size={13} className="stroke-[1.5]" />
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;