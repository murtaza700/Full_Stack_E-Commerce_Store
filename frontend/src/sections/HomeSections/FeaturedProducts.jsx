import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { showErrorToast, showSuccessToast } from '../../helper/MyToast';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import { clearFeaturedError, getFeaturedProducts } from '../../redux/slices/featuredSlice';
import { toggleWishlistAction, clearWishlistError, clearWishlistMessage, getMyWishlist } from '../../redux/slices/wishlistSlice';
import { addToCart, clearCartError, clearCartMessage } from '../../redux/slices/cartSlice';

const FeaturedProducts = () => {
    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector(state => state.auth);
    const { featured = [], loading: featuredLoading, errors: featureError } = useSelector(state => state.featured || { featured: [] });
    const { errors: cartError, messages: cartMessage, btnLoading: cartBtnLoading } = useSelector(state => state.cart || {});
    const { wishlistItems = [], errors: wishError, messages: wishMessage, btnLoading: wishBtnLoading } = useSelector(state => state.wishlist || { wishlistItems: [] });

    useEffect(() => {
        dispatch(getFeaturedProducts());

        if (isAuthenticated && wishlistItems?.length === 0) {
            dispatch(getMyWishlist());
        }
    }, [dispatch, isAuthenticated]);

    useEffect(() => {
        if (featureError?.fetch) {
            showErrorToast(featureError.fetch || 'Featured Fetch Error!');
            dispatch(clearFeaturedError('fetch'));
        }
    }, [dispatch, featureError?.fetch]);

    useEffect(() => {
        if (wishError?.toggle) {
            showErrorToast(wishError.toggle || 'Please log in to manage your wishlist!');
            dispatch(clearWishlistError('toggle'));
        }

        if (wishMessage?.toggle) {
            showSuccessToast(wishMessage.toggle || 'Wishlist updated!');
            dispatch(clearWishlistMessage('toggle'));
        }
    }, [dispatch, wishError?.toggle, wishMessage?.toggle]);

    useEffect(() => {
        if (cartError?.mutation) {
            showErrorToast(cartError.mutation || 'Login requested to save shopping bag properties!');
            dispatch(clearCartError('mutation'));
        }

        if (cartMessage?.mutation) {
            showSuccessToast(cartMessage.mutation || 'Added to your luxury shopping bag');
            dispatch(clearCartMessage('mutation'));
        }
    }, [dispatch, cartError?.mutation, cartMessage?.mutation]);

    const handleWishlistClick = (productId) => {
        if (!isAuthenticated) {
            showErrorToast('Please login first!');
            return;
        }
        dispatch(toggleWishlistAction(productId));
    };

    const handleCartClick = (productId) => {
        if (!isAuthenticated) {
            showErrorToast('Please login first!');
            return;
        }
        dispatch(addToCart(productId));
    };

    if (featuredLoading?.fetch) {
        return (
            <div className="flex flex-col items-center justify-center py-24 space-y-3 bg-white">
                <Loader2 size={24} className="animate-spin text-TEXT" />
                <span className="text-[10px] uppercase tracking-[2px] text-gray-400 font-light">Loading catalog...</span>
            </div>
        );
    }

    return (
        <section className="bg-white select-none py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Section Header Ribbon Row */}
                <div className="flex flex-col sm:flex-row justify-between items-baseline gap-4">
                    <div className="space-y-2">
                        <p className="text-[10px] tracking-[3px] uppercase font-semibold text-[#D4AF37]">The Elite Selection</p>
                        <h2 className="text-xl font-bold tracking-[2px] uppercase text-TEXT">Best Sellers</h2>
                    </div>
                    <Link to="/products" className="text-xs uppercase tracking-[2px] font-semibold text-TEXT hover:text-gray-400 underline underline-offset-4 transition-colors focus:outline-none">
                        View Complete Range
                    </Link>
                </div>

                {/* INFINITE AUTOPLAYING LUXURY SWIPER SLIDER SYSTEM */}
                {featured && featured.length > 0 && (
                    <div className="w-full relative admin-custom-swiper-container">
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            spaceBetween={24}
                            loop={featured.length >= 4}
                            autoplay={{
                                delay: 3500,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                            }}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true
                            }}

                            breakpoints={{
                                320: { slidesPerView: 1, spaceBetween: 16 },
                                640: { slidesPerView: 2, spaceBetween: 20 },
                                1024: { slidesPerView: 4, spaceBetween: 24 }
                            }}
                            className="pb-14 w-full"
                        >
                            {featured.map((item, idx) => {
                                if (!item || !item.product) return null;
                                const perfume = item.product;

                                return (
                                    <SwiperSlide key={item._id || idx} className="h-auto">
                                        <div className="h-full py-1 px-0.5">

                                            <ProductCard
                                                perfume={perfume}
                                                idx={idx}
                                                isProductInWishlist={Array.isArray(wishlistItems) && wishlistItems.some(
                                                    (wishItem) => (wishItem?.item?._id || wishItem?.item || wishItem) === perfume._id
                                                )}
                                                isWishLoading={wishBtnLoading?.[perfume._id]}
                                                isCartLoading={cartBtnLoading?.[perfume._id]}
                                                onWishlistToggle={(id) => handleWishlistClick(id)}

                                                onAddToCart={(id) => handleCartClick({ id, quantity: 1 })}
                                            />
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>

                    </div>
                )}

                {(!featured || featured.length === 0) && (
                    <div className="flex flex-col items-center justify-center py-20 border border-dashed border-gray-200 rounded-sm">
                        <p className="text-sm text-gray-500 uppercase tracking-[2px]">
                            No featured products available
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedProducts;