import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const FeaturedProducts = () => {
    const BASE_API = import.meta.env.VITE_BASE_API;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [wishlistedIds, setWishlistedIds] = useState(new Set());

    useEffect(() => {
        const fetchFeaturedItems = async () => {
            try {
                const response = await axios.get(`${BASE_API}/products`);
                const catalog = response.data.products || response.data || [];
                setProducts(catalog.slice(0, 4));
            } catch (err) {
                console.error('Error fetching showcase inventory', err);
            } finally {
                setLoading(false);
            }
        };
        fetchFeaturedItems();
    }, [BASE_API]);

    const handleWishlistToggle = async (productId, e) => {
        if (e) e.preventDefault(); 
        try {
            const response = await axios.post(
                `${BASE_API}/wishlist/toggle`,
                { item: productId },
                { withCredentials: true }
            );

            if (response.data.success) {
                const isItemWishlisted = response.data.isWishlisted;

                setWishlistedIds(prev => {
                    const next = new Set(prev);
                    if (isItemWishlisted) next.add(productId);
                    else next.delete(productId);
                    return next;
                });

                toast.success(response.data.message || 'Wishlist updated!', {
                    style: { fontFamily: 'Poppins', fontSize: '13px', borderRadius: '4px' }
                });
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Please log in to manage your wishlist.', {
                style: { fontFamily: 'Poppins', fontSize: '13px', borderRadius: '4px' }
            });
        }
    };

    const handleInstantAddToCart = async (productId, e) => {
        if (e) e.preventDefault();
        try {
            const response = await axios.post(
                `${BASE_API}/cart`,
                { item: productId },
                { withCredentials: true }
            );
            if (response.data.success) {
                toast.success('Added to your luxury shopping bag', {
                    style: { fontFamily: 'Poppins', fontSize: '13px', borderRadius: '4px', background: '#111111', color: '#ffffff' },
                    iconTheme: { primary: '#D4AF37', secondary: '#111111' }
                });
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login requested to save shopping bag properties.');
        }
    };

    if (loading) {
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
                    {products.map((product, idx) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group relative flex flex-col h-full bg-white border border-gray-100/60 p-3 rounded-sm transition-all duration-300 hover:shadow-md"
                        >
                           
                            <Link to={`/products/${product._id}`} className="flex flex-col flex-1">

                            
                                <div className="relative aspect-square w-full bg-[#FBFBFB] overflow-hidden border border-gray-50 rounded-xs mb-4">
                                    <img
                                        src={product.image.url}
                                        alt={product.title}
                                        className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-102 transition-transform duration-500 ease-out"
                                    />

                            
                                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 z-30">
                                        <button
                                            onClick={(e) => handleWishlistToggle(product._id, e)}
                                            className="p-2.5 bg-white border border-gray-100 text-TEXT rounded-full hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer focus:outline-none"
                                            title="Add to Wishlist"
                                        >
                                            <Heart
                                                size={15}
                                                className={wishlistedIds.has(product._id) ? 'fill-red-500 text-red-500' : 'text-TEXT'}
                                            />
                                        </button>
                                        <button
                                            onClick={(e) => handleInstantAddToCart(product._id, e)}
                                            className="p-2.5 bg-TEXT text-white rounded-full hover:bg-neutral-800 transition-colors shadow-2xs cursor-pointer focus:outline-none"
                                            title="Add to Luxury Bag"
                                        >
                                            <ShoppingBag size={15} />
                                        </button>
                                    </div>

                                    {product.isOutOfStock && (
                                        <div className="absolute inset-0 bg-white/70 backdrop-blur-2xs flex items-center justify-center">
                                            <span className="text-[10px] uppercase font-bold tracking-[2px] px-3 py-1.5 bg-TEXT text-white rounded-xs">Sold Out</span>
                                        </div>
                                    )}
                                </div>

                              
                                <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <p className="text-[9px] uppercase tracking-[2px] text-gray-400 font-medium">
                                            {product.category.name || "Oud Formulation"}
                                        </p>
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-TEXT line-clamp-1 mt-0.5 group-hover:text-gray-600 transition-colors">
                                            {product.title}
                                        </h3>
                                    </div>

                                    <div className="pt-2 flex justify-between items-center border-t border-gray-50 mt-1">
                                        <p className="text-xs font-bold text-TEXT font-mono">
                                            PKR {product.price.toLocaleString()}
                                        </p>

                                        <button
                                            onClick={(e) => handleInstantAddToCart(product._id, e)}
                                            className="sm:hidden p-2 rounded-full bg-TEXT text-white hover:bg-neutral-800 transition-colors"
                                        >
                                            <ShoppingBag size={14} />
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* If State is Empty */}
                {products.length === 0 && (
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