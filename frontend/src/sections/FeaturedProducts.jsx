import React, { useEffect, useState } from 'react';
import { Link, useFetcher } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { showErrorToast, showSuccessToast } from '../helper/MyToast'
import { useDispatch, useSelector } from 'react-redux'
import { clearFeaturedError, getFeaturedProducts } from '../redux/slices/featuredSlice'

const FeaturedProducts = () => {
    const [wishlistedIds, setWishlistedIds] = useState(new Set());
    const dispatch = useDispatch();
    const { featured, loading, errors } = useSelector(state => state.featured);

    useEffect(() => {
        dispatch(getFeaturedProducts());

        if (errors.fetch) {
            showErrorToast(errors.fetch || 'Featured Fetch Error!');
            dispatch(clearFeaturedError('fetch'));
        }

    }, [dispatch, errors]);


    const handleWishlistToggle = async (productId, e) => {
        if (e) e.preventDefault();
        try {
            const response = await api.post(
                `wishlist/toggle`,
                { item: productId }
            );

            if (response.data.success) {
                const isItemWishlisted = response.data.isWishlisted;

                setWishlistedIds(prev => {
                    const next = new Set(prev);
                    if (isItemWishlisted) next.add(productId);
                    else next.delete(productId);
                    return next;
                });

                showSuccessToast(response.data.message || 'Wishlist updated!');
            }
        } catch (err) {
            showErrorToast(err.response?.data?.message || 'Please log in to manage your wishlist!');
        }
    };

    const handleInstantAddToCart = async (productId, e) => {
        if (e) e.preventDefault();
        try {
            const response = await api.post(
                `/cart`,
                { item: productId }
            );
            if (response.data.success) {
                showSuccessToast(response.data.message || 'Added to your luxury shopping bag');
            }
        } catch (err) {
            showErrorToast(err.response?.data?.message || 'Login requested to save shopping bag properties!');
        }
    };

    if (loading.fetch) {
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

                {/* Header Information Area */}
                <div className="flex flex-col sm:flex-row justify-between items-baseline gap-4">
                    <div className="space-y-2">
                        <p className="text-[10px] tracking-[3px] uppercase font-semibold text-[#D4AF37]">The Elite Selection</p>
                        <h2 className="text-xl font-bold tracking-[2px] uppercase text-TEXT">Best Sellers</h2>
                    </div>
                    <Link to="/products" className="text-xs uppercase tracking-[2px] font-semibold text-TEXT hover:text-gray-400 underline underline-offset-4 transition-colors">
                        View Complete Range
                    </Link>
                </div>

                {/* Fragrance Product Display Cards Grid Layout Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {featured.map((item, idx) => {
                        const perfume = item.product;

                        if (!perfume) return null;

                        return (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="group relative flex flex-col h-full bg-white border border-gray-100/60 p-3 rounded-sm transition-all duration-300 hover:shadow-md">

                                <Link to={`/products/${perfume._id}`} className="flex flex-col flex-1">


                                    <div className="relative aspect-square w-full bg-[#FBFBFB] overflow-hidden border border-gray-50 rounded-xs mb-4">
                                        <img
                                            src={perfume.image?.url || perfume.image}
                                            alt={perfume.title}
                                            className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-102 transition-transform duration-500 ease-out"
                                        />


                                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 z-30">
                                            <button
                                                onClick={(e) => handleWishlistToggle(perfume._id, e)}
                                                className="p-2.5 bg-white border border-gray-100 text-TEXT rounded-full hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer focus:outline-none"
                                                title="Add to Wishlist"
                                            >
                                                <Heart
                                                    size={15}
                                                    className={wishlistedIds.has(perfume._id) ? 'fill-red-500 text-red-500' : 'text-TEXT'}
                                                />
                                            </button>
                                            <button
                                                onClick={(e) => handleInstantAddToCart(perfume._id, e)}
                                                className="p-2.5 bg-TEXT text-white rounded-full hover:bg-neutral-800 transition-colors shadow-2xs cursor-pointer focus:outline-none"
                                                title="Add to Luxury Bag"
                                            >
                                                <ShoppingBag size={15} />
                                            </button>
                                        </div>

                                        {perfume.stock === false && (
                                            <div className="absolute inset-0 bg-white/70 backdrop-blur-2xs flex items-center justify-center">
                                                <span className="text-[10px] uppercase font-bold tracking-[2px] px-3 py-1.5 bg-TEXT text-white rounded-xs">Sold Out</span>
                                            </div>
                                        )}
                                    </div>


                                    <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                                        <div>

                                            <p className="text-[9px] uppercase tracking-[2px] text-gray-400 font-medium">
                                                {perfume.category?.name || "Oud Formulation"}
                                            </p>

                                            <h3 className="text-xs font-semibold uppercase tracking-wider text-TEXT line-clamp-1 mt-0.5 group-hover:text-gray-600 transition-colors">
                                                {perfume.title}
                                            </h3>
                                        </div>

                                        <div className="pt-2 flex justify-between items-center border-t border-gray-50 mt-1">

                                            <p className="text-xs font-bold text-TEXT font-mono">
                                                PKR {perfume.price?.toLocaleString()}
                                            </p>

                                            <button
                                                onClick={(e) => handleInstantAddToCart(perfume._id, e)}
                                                className="sm:hidden p-2 rounded-full bg-TEXT text-white hover:bg-neutral-800 transition-colors"
                                            >
                                                <ShoppingBag size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>


                {featured.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 border border-dashed border-gray-200 rounded-sm">
                        <p className="text-sm text-gray-500 uppercase tracking-[2px]">
                            No products available
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedProducts;