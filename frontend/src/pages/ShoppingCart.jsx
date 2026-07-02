import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Trash2, Plus, Minus, Loader2, ArrowLeft, CreditCard, ShieldCheck, Truck, LogIn } from 'lucide-react';

import { getAllMyCarts, updateCartQuantity, deleteSingleCart, clearAllCart, clearCartError, clearCartMessage } from '../redux/slices/cartSlice';
import { showErrorToast, showSuccessToast } from '../helper/MyToast';

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated } = useSelector((state) => state.auth);
    const { cartItems, count, totals, loading: cartLoading, btnLoading: cartBtnLoading, errors: cartError, messages: cartMessage } = useSelector((state) => state.cart);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getAllMyCarts());
        }
    }, [dispatch, isAuthenticated]);

    useEffect(() => {
        if (cartError?.fetchAll) {
            showErrorToast(cartError.fetchAll || 'Shopping bag synchronization failed.');
            dispatch(clearCartError('fetchAll'));
        }
        if (cartError?.mutation) {
            showErrorToast(cartError.mutation || 'Cart operational execution failed.');
            dispatch(clearCartError('mutation'));
        }
        if (cartMessage?.mutation) {
            showSuccessToast(cartMessage.mutation);
            dispatch(clearCartMessage());
        }
    }, [dispatch, cartError?.fetchAll, cartError?.mutation, cartMessage?.mutation]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-[80vh] bg-[#FBFBFB] flex flex-col items-center justify-center px-4 select-none font-sans text-center gap-4">
                <h4 className='text-2xl'>You are not logged in!</h4>
                <span className="text-[11px] uppercase tracking-[3px] text-gray-400 font-light font-sans">
                    Please Login Firts!
                </span>
                <Link
                    to="/login"
                    className="inline-flex items-center space-x-2 bg-TEXT text-white px-6 py-3 text-[10px] uppercase tracking-[2px] font-semibold border border-TEXT hover:bg-neutral-800 active:scale-95 transition-all duration-300 rounded-sm shadow-xs cursor-pointer focus:outline-none"
                >
                    <LogIn size={12} />
                    <span>Login</span>
                </Link>
            </div>
        )
    }

    if (cartLoading?.fetchAll && cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-[#FBFBFB] flex flex-col items-center justify-center space-y-4 select-none">
                <Loader2 size={32} className="animate-spin text-TEXT stroke-[1.2]" />
                <span className="text-[10px] uppercase tracking-[3px] text-gray-400 font-light font-sans">
                    Verifying luxury inventory coordinates...
                </span>
            </div>
        );
    }

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="min-h-[80vh] bg-[#FBFBFB] flex flex-col items-center justify-center px-4 select-none font-sans text-center">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="space-y-6 max-w-sm mx-auto"
                >
                    <div className="w-16 h-16 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-2xs mx-auto">
                        <ShoppingBag size={24} className="text-gray-300 stroke-[1.2]" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-sm font-bold tracking-[2px] uppercase text-TEXT">Your Shopping Bag Is Empty</h2>
                        <p className="text-[11px] text-gray-400 font-light text-balance leading-relaxed">
                            You have not committed any premium olfactory formulations to your checkout vault registry yet.
                        </p>
                    </div>

                    <Link
                        to="/products"
                        className="inline-flex items-center space-x-2 bg-TEXT text-white px-6 py-3 text-[10px] uppercase tracking-[2px] font-semibold border border-TEXT hover:bg-neutral-800 active:scale-95 transition-all duration-300 rounded-sm shadow-xs cursor-pointer focus:outline-none"
                    >
                        <ArrowLeft size={12} />
                        <span>Return To Catalog</span>
                    </Link>
                </motion.div>
            </div>
        );
    }
    return (
        <div className="bg-[#FBFBFB] min-h-screen text-TEXT antialiased select-none font-sans pb-24 selection:bg-TEXT selection:text-white">


            <div className="bg-white border-b border-gray-100 py-12 text-center">
                <h1 className="text-xl md:text-2xl font-bold tracking-[3px] uppercase text-TEXT">Your Shopping Bag</h1>
                <p className="text-[10px] tracking-[2px] text-gray-400 uppercase font-light mt-1.5">
                    Review your luxury collections selection before checkout validation ({count} unique lines)
                </p>
            </div>


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-14 items-start">


                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                            <span className="text-[10px] uppercase tracking-[2px] font-bold text-gray-400">Selected Formulation Details</span>
                            <button
                                type="button"
                                onClick={() => dispatch(clearAllCart())}
                                className="text-[10px] uppercase tracking-[1px] text-gray-400 hover:text-red-500 transition-colors underline underline-offset-2 cursor-pointer focus:outline-none"
                            >
                                Empty Bag Collection
                            </button>
                        </div>


                        <div className="space-y-4">
                            <AnimatePresence mode="popLayout">
                                {cartItems.map((cartRecord) => {
                                    if (!cartRecord || !cartRecord.item) return null;

                                    const perfume = cartRecord.item;
                                    const cartId = cartRecord._id;
                                    const isRowLoading = cartBtnLoading[cartId];

                                    return (
                                        <motion.div
                                            key={cartId}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="bg-white border border-gray-100 p-4 rounded-sm shadow-2xs flex gap-4 items-center relative overflow-hidden"
                                        >

                                            {isRowLoading && (
                                                <div className="absolute inset-0 bg-white/60 backdrop-blur-2xs flex items-center justify-center z-20" />
                                            )}


                                            <div className="w-20 h-20 bg-[#FBFBFB] border border-gray-50 rounded-xs overflow-hidden shrink-0">
                                                <img
                                                    src={perfume.image?.url || perfume.image}
                                                    alt={perfume.title}
                                                    className="w-full h-full object-cover object-center select-none"
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0 space-y-1">
                                                <p className="text-[9px] uppercase tracking-[2px] text-gray-400 font-medium">
                                                    {perfume.category?.name || "Oud Formulation"}
                                                </p>
                                                <Link
                                                    to={`/products/${perfume._id}`}
                                                    className="text-xs font-semibold uppercase tracking-wider text-TEXT hover:text-gray-400 truncate block transition-colors duration-200"
                                                >
                                                    {perfume.title}
                                                </Link>
                                                <p className="text-[10px] font-mono text-gray-400">
                                                    PKR {perfume.price?.toLocaleString()} / unit
                                                </p>
                                            </div>


                                            <div className="text-right font-mono text-xs font-bold text-TEXT shrink-0 hidden sm:block">
                                                PKR {((perfume.price || 0) * (cartRecord.quantity || 1)).toLocaleString()}
                                            </div>

                                            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 shrink-0">
                                                <div className="flex items-center border border-gray-200 rounded-sm overflow-hidden h-7 font-mono w-24 bg-white">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (cartRecord.quantity > 1) {
                                                                dispatch(updateCartQuantity({ id: cartId, quantity: cartRecord.quantity - 1 }));
                                                            } else {
                                                                dispatch(deleteSingleCart(cartId));
                                                            }
                                                        }}
                                                        disabled={isRowLoading}
                                                        className="w-7 h-full flex items-center justify-center hover:bg-neutral-50 active:bg-neutral-100 transition-colors text-xs font-semibold focus:outline-none cursor-pointer disabled:opacity-20"
                                                    >
                                                        <Minus size={10} />
                                                    </button>
                                                    <div className="flex-1 text-center text-xs font-bold text-TEXT select-none">
                                                        {cartRecord.quantity}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (cartRecord.quantity < 5) {
                                                                dispatch(updateCartQuantity({ id: cartId, quantity: cartRecord.quantity + 1 }));
                                                            } else {
                                                                showErrorToast("Luxury reservation cap set at 5 pieces per formulation profile.");
                                                            }
                                                        }}
                                                        disabled={isRowLoading}
                                                        className="w-7 h-full flex items-center justify-center hover:bg-neutral-50 active:bg-neutral-100 transition-colors text-xs font-semibold focus:outline-none cursor-pointer disabled:opacity-20"
                                                    >
                                                        <Plus size={10} />
                                                    </button>
                                                </div>


                                                <button
                                                    type="button"
                                                    onClick={() => dispatch(deleteSingleCart(cartId))}
                                                    disabled={isRowLoading}
                                                    className="p-1.5 text-gray-300 hover:text-red-500 rounded-sm hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none"
                                                    title="Purge formulation"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>

                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="w-full lg:sticky lg:top-24 bg-white border border-gray-100 rounded-sm p-6 space-y-6 shadow-2xs">
                        <h3 className="text-xs font-bold tracking-[2px] uppercase text-TEXT pb-3 border-b border-gray-50">
                            Order Summary
                        </h3>


                        <div className="space-y-4 font-sans text-xs">
                            <div className="flex justify-between items-center text-gray-500 font-light">
                                <span className="tracking-wide">Boutique Subtotal</span>
                                <span className="font-mono text-TEXT font-medium">
                                    PKR {totals.subTotal?.toLocaleString()}
                                </span>
                            </div>

                            <div className="flex justify-between items-center text-gray-500 font-light">
                                <div className="space-y-0.5">
                                    <span className="tracking-wide block">Integrated GST / VAT</span>
                                    <span className="text-[10px] text-gray-400 block font-light">Standard 15% system tariff</span>
                                </div>
                                <span className="font-mono text-TEXT font-medium">
                                    PKR {totals.taxPrice?.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-gray-500 font-light border-b border-gray-50 pb-4">
                                <div className="space-y-0.5">
                                    <span className="tracking-wide block">Complimentary Shipping</span>
                                    {totals.subTotal > 5000 ? (
                                        <span className="text-[10px] text-emerald-600 block font-semibold uppercase tracking-[0.5px]">Privilege Free Cover</span>
                                    ) : (
                                        <span className="text-[10px] text-gray-400 block font-light">Free over PKR 5,000 orders</span>
                                    )}
                                </div>
                                <span className="font-mono text-TEXT font-medium">
                                    {totals.shippingPrice === 0 ? 'PKR 0' : `PKR ${totals.shippingPrice?.toLocaleString()}`}
                                </span>
                            </div>


                            <div className="flex justify-between items-center text-sm font-bold text-TEXT pt-2">
                                <span className="uppercase tracking-[1px]">Grand Total</span>
                                <span className="font-mono text-xl tracking-tight">
                                    PKR {totals.grandTotal?.toLocaleString()}
                                </span>
                            </div>
                        </div>


                        <button
                            type="button"
                            onClick={() => navigate('/checkout')}
                            disabled={cartLoading?.mutation}
                            className="w-full bg-TEXT text-white py-4 text-xs uppercase tracking-[2px] font-semibold border border-TEXT hover:bg-neutral-800 active:scale-[0.99] transition-all duration-300 rounded-sm shadow-xs flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                        >
                            <CreditCard size={14} />
                            <span>Proceed To Checkout</span>
                        </button>
                        {/* 🛡️ SECURITY SEALS OVERLAY BADGES LOGS GRID SECTION */}
                        <div className="pt-2 space-y-3 text-[10px] text-gray-400 font-light border-t border-gray-50 mt-2">
                            <div className="flex items-center space-x-2.5">
                                <ShieldCheck size={14} className="text-gray-400 shrink-0" />
                                <span className="tracking-wide">256-Bit SSL Luxury Encrypted Gateway Protection</span>
                            </div>
                            <div className="flex items-center space-x-2.5">
                                <Truck size={14} className="text-gray-400 shrink-0" />
                                <span className="tracking-wide">Premium Cash On Delivery / Bank Vault Transfers</span>
                            </div>
                        </div>

                    </div> {/* Closing right summary card layout block node */}
                </div> {/* Closing dual grid template system rows layout split */}
            </div> {/* Closing max-w-7xl central cadre container frame */}
        </div>
    );
};

export default ShoppingCart;