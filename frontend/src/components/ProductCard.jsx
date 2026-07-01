import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, Loader2 } from 'lucide-react';

const ProductCard = ({
    perfume,
    idx,
    isProductInWishlist,
    isWishLoading,
    isCartLoading,
    onWishlistToggle,
    onAddToCart
}) => {
    if (!perfume) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
            className="group relative flex flex-col h-full bg-white border border-gray-100/60 p-3 rounded-sm transition-all duration-300 hover:shadow-md"
        >
            <Link to={`/products/${perfume._id}`} className="flex flex-col flex-1">


                <div className="relative aspect-square w-full bg-[#FBFBFB] overflow-hidden border border-gray-50 rounded-xs mb-4">
                    <img
                        src={perfume.image?.url || perfume.image}
                        alt={perfume.title}
                        loading='lazy'
                        className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-102 transition-transform duration-500 ease-out"
                    />


                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 z-30">


                        <button
                            type="button"
                            onClick={(e) => {
                                if (e) { e.preventDefault(); e.stopPropagation(); }
                                onWishlistToggle(perfume._id, e);
                            }}
                            className="p-2.5 bg-white border border-gray-100 text-TEXT rounded-full hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer focus:outline-none flex items-center justify-center min-w-9 min-h-9"
                            title="Add to Wishlist"
                            disabled={isWishLoading}
                        >
                            {isWishLoading ? (
                                <Loader2 size={14} className="animate-spin text-gray-400" />
                            ) : (
                                <Heart
                                    size={15}
                                    className={isProductInWishlist ? 'fill-red-500 text-red-500' : 'text-TEXT'}
                                />
                            )}
                        </button>


                        <button
                            type="button"
                            onClick={(e) => {
                                if (e) { e.preventDefault(); e.stopPropagation(); }
                                onAddToCart(perfume._id, e);
                            }}
                            className="p-2.5 bg-TEXT text-white rounded-full hover:bg-neutral-800 transition-colors shadow-2xs cursor-pointer focus:outline-none flex items-center justify-center min-w-9 min-h-9"
                            title="Add to Luxury Bag"
                            disabled={isCartLoading}
                        >
                            {isCartLoading ? (
                                <Loader2 size={14} className="animate-spin text-white" />
                            ) : (
                                <ShoppingBag size={15} />
                            )}
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


                        <div className='flex items-center gap-3'>
                            <button
                                type="button"
                                onClick={(e) => {
                                    if (e) { e.preventDefault(); e.stopPropagation(); }
                                    onWishlistToggle(perfume._id, e);
                                }}
                                className="sm:hidden p-2 bg-white border border-gray-100 text-TEXT rounded-full hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer focus:outline-none flex items-center justify-center min-w-9 min-h-9"
                                title="Add to Wishlist"
                                disabled={isWishLoading}
                            >
                                {isWishLoading ? (
                                    <Loader2 size={14} className="animate-spin text-gray-400" />
                                ) : (
                                    <Heart
                                        size={15}
                                        className={isProductInWishlist ? 'fill-red-500 text-red-500' : 'text-TEXT'}
                                    />
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={(e) => {
                                    if (e) { e.preventDefault(); e.stopPropagation(); }
                                    onAddToCart(perfume._id, e);
                                }}
                                className="sm:hidden p-2 rounded-full bg-TEXT text-white hover:bg-neutral-800 transition-colors cursor-pointer focus:outline-none flex items-center justify-center"
                                disabled={isCartLoading}
                            >
                                {isCartLoading ? (
                                    <Loader2 size={13} className="animate-spin text-white" />
                                ) : (
                                    <ShoppingBag size={14} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

            </Link>
        </motion.div>
    );
};

export default ProductCard;