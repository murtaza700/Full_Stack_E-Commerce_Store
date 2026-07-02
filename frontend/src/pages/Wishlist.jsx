import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, Loader2, LogIn, Trash2, SlidersHorizontal, ArrowLeft } from 'lucide-react';

import { getMyWishlist, toggleWishlistAction, clearWishlistError, clearWishlistMessage } from '../redux/slices/wishlistSlice';
import { addToCart, clearCartError, clearCartMessage } from '../redux/slices/cartSlice';
import { showErrorToast, showSuccessToast } from '../helper/MyToast';

import ProductCard from '../components/ProductCard';

const Wishlist = () => {
    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector((state) => state.auth);
    const { wishlistItems, loading: wishLoading, btnLoading: wishBtnLoading, errors: wishError, messages: wishMessage } = useSelector((state) => state.wishlist);
    const { btnLoading: cartBtnLoading, errors: cartError, messages: cartMessage } = useSelector((state) => state.cart);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getMyWishlist());
        }
    }, [dispatch, isAuthenticated]);


    useEffect(() => {

        if (wishError?.fetch) {
            showErrorToast(wishError.fetch || 'Wishlist collection sync failed.');
            dispatch(clearWishlistError('fetch'));
        }
        if (wishError?.toggle) {
            showErrorToast(wishError.toggle || 'Failed to update favorite collection.');
            dispatch(clearWishlistError('toggle'));
        }
        if (wishMessage?.toggle) {
            showSuccessToast(wishMessage.toggle);
            dispatch(clearWishlistMessage('toggle'));
        }


        if (cartError?.mutation) {
            showErrorToast(cartError.mutation || 'Cart addition execution failed.');
            dispatch(clearCartError('mutation'));
        }
        if (cartMessage?.mutation) {
            showSuccessToast(cartMessage.mutation);
            dispatch(clearCartMessage());
        }
    }, [dispatch, wishError?.fetch, wishError?.toggle, wishMessage?.toggle, cartError?.mutation, cartMessage?.mutation]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-[80vh] bg-[#FBFBFB] flex flex-col items-center justify-center px-4 select-none font-sans text-center">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="space-y-6 max-w-sm mx-auto"
                >
                    <div className="w-16 h-16 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-2xs mx-auto">
                        <Heart size={22} className="text-gray-300 stroke-[1.2]" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-sm font-bold tracking-[2px] uppercase text-TEXT">You are not logged in!</h2>
                        <p className="text-[11px] text-gray-400 font-light text-balance leading-relaxed">
                            Please Login firts!
                        </p>
                    </div>

                    <Link
                        to="/login"
                        className="inline-flex items-center space-x-2 bg-TEXT text-white px-6 py-3 text-[10px] uppercase tracking-[2px] font-semibold border border-TEXT hover:bg-neutral-800 active:scale-95 transition-all duration-300 rounded-sm shadow-xs cursor-pointer focus:outline-none"
                    >
                        <LogIn size={12} />
                        <span>Login</span>
                    </Link>
                </motion.div>
            </div>
        );
    }

    if (wishLoading?.fetch && wishlistItems.length === 0) {
        return (
            <div className="min-h-screen bg-[#FBFBFB] flex flex-col items-center justify-center space-y-4 select-none">
                <Loader2 size={32} className="animate-spin text-TEXT stroke-[1.2]" />
                <span className="text-[10px] uppercase tracking-[3px] text-gray-400 font-light font-sans">
                    Synchronizing favorite archives...
                </span>
            </div>
        );
    }

    if (!wishlistItems || wishlistItems.length === 0) {
        return (
            <div className="min-h-[80vh] bg-[#FBFBFB] flex flex-col items-center justify-center px-4 select-none font-sans text-center">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="space-y-6 max-w-sm mx-auto"
                >
                    <div className="w-16 h-16 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-2xs mx-auto">
                        <Heart size={22} className="text-gray-300 stroke-[1.2]" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-sm font-bold tracking-[2px] uppercase text-TEXT">Your Wishlist Is Blank</h2>
                        <p className="text-[11px] text-gray-400 font-light text-balance leading-relaxed">
                            You have not archived any luxury olfactory formulations to your curated favorites vault yet.
                        </p>
                    </div>

                    <Link
                        to="/products"
                        className="inline-flex items-center space-x-2 bg-TEXT text-white px-6 py-3 text-[10px] uppercase tracking-[2px] font-semibold border border-TEXT hover:bg-neutral-800 active:scale-95 transition-all duration-300 rounded-sm shadow-xs cursor-pointer focus:outline-none"
                    >
                        <ArrowLeft size={12} />
                        <span>Discover Fragrances</span>
                    </Link>
                </motion.div>
            </div>
        );
    }
    return (
        <div className="bg-[#FBFBFB] min-h-screen text-TEXT antialiased select-none font-sans pb-24 selection:bg-TEXT selection:text-white">


            <div className="bg-white border-b border-gray-100 py-12 text-center">
                <h1 className="text-xl md:text-2xl font-bold tracking-[3px] uppercase text-TEXT">Curated Favorites</h1>
                <p className="text-[10px] tracking-[2px] text-gray-400 uppercase font-light mt-1.5">
                    Your personal vault of elite olfactory desires ({wishlistItems.length} formulations archived)
                </p>
            </div>


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-12">
                <div className="space-y-6">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <span className="text-[10px] uppercase tracking-[2px] font-bold text-gray-400">Archived Portfolio</span>
                        <Link
                            to="/products"
                            className="text-[10px] uppercase tracking-[1px] text-gray-400 hover:text-TEXT transition-colors underline underline-offset-2 cursor-pointer focus:outline-none"
                        >
                            Continue Browsing Collection
                        </Link>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                        <AnimatePresence mode="popLayout">
                            {wishlistItems.map((wishRecord, idx) => {

                                if (!wishRecord) return null;


                                const perfume = wishRecord.item?._id ? wishRecord.item : wishRecord;
                                const wishId = wishRecord._id;


                                if (!perfume || !perfume._id) return null;


                                const isWishLoading = wishBtnLoading?.[perfume._id];
                                const isCartLoading = cartBtnLoading?.[perfume._id];
                                return (
                                    <motion.div
                                        key={wishId || perfume._id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative group h-full"
                                    >

                                        <ProductCard
                                            perfume={perfume}
                                            idx={idx}
                                            isProductInWishlist={true}
                                            isWishLoading={isWishLoading}
                                            isCartLoading={isCartLoading}
                                            onWishlistToggle={(id) => dispatch(toggleWishlistAction(id))}
                                            onAddToCart={(id) => dispatch(addToCart({ id, quantity: 1 }))}
                                        />
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-20">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-gray-100 pt-10 text-[11px] font-light text-gray-400 text-center uppercase tracking-[1px]">
                    <div className="space-y-1">
                        <p className="font-semibold text-TEXT">Maison Privacy</p>
                        <p className="text-[10px] text-gray-400 lowercase font-sans font-light">Your archived selections remain strictly confidential.</p>
                    </div>
                    <div className="space-y-1 border-t sm:border-t-0 sm:border-l sm:border-r border-gray-100 pt-4 sm:pt-0">
                        <p className="font-semibold text-TEXT">Insured Allocation</p>
                        <p className="text-[10px] text-gray-400 lowercase font-sans font-light">Vault items reserve initial stock matching queues priority.</p>
                    </div>
                    <div className="space-y-1 border-t sm:border-t-0 pt-4 sm:pt-0">
                        <p className="font-semibold text-TEXT">Elite Concierge</p>
                        <p className="text-[10px] text-gray-400 lowercase font-sans font-light">Dedicated 24/7 styling specialists assistance tracking.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;