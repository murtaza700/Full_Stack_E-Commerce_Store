import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, Loader2, Star, ChevronRight, Truck, ShieldCheck, CornerDownLeft, Sparkles, MessageSquare } from 'lucide-react';

// Core Redux Thunk Reducers Action Hooks Imports Layer
import { getSingleProduct, clearProductError } from '../redux/slices/productSlice';
import { toggleWishlistAction, clearWishlistError, clearWishlistMessage } from '../redux/slices/wishlistSlice';
import { addToCart, clearCartError, clearCartMessage } from '../redux/slices/cartSlice';
import { showErrorToast, showSuccessToast } from '../helper/MyToast';


const ProductDetails = () => {
    // 1. Hooks Initialization Configuration Elements
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 2. Active Tab state variable management metrics for accordion boards
    const [activeTab, setActiveTab] = useState('description');
    // Local quantity piece multiplier counter tool
    const [quantity, setQuantity] = useState(1);

    // 3. Central Redux State Registry Map Layer Selectors
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { product, loading: productLoading, errors: productError } = useSelector((state) => state.products);
    const { wishlistItems, btnLoading: wishBtnLoading, errors: wishError, messages: wishMessage } = useSelector((state) => state.wishlist);
    const { btnLoading: cartBtnLoading, errors: cartError, messages: cartMessage } = useSelector((state) => state.cart);
    // 4. Core Lifecycle Effect: Trigger single scent documentation fetch on mount or id flip
    useEffect(() => {
        if (id) {
            dispatch(getSingleProduct(id));
            setQuantity(1); // Resets local order purchase pieces back to 1 on item switch
        }
    }, [dispatch, id]);

    // 5. Dynamic Error Logger validation monitoring pipeline
    useEffect(() => {
        if (productError?.fetchOne) {
            showErrorToast(productError.fetchOne || 'Scent configuration tracking failed.');
            dispatch(clearProductError('fetchOne'));
            navigate('/products'); // Gracefully sends user back to browsing space on missing item
        }
    }, [dispatch, productError?.fetchOne, navigate]);





    // 1. Wishlist operations monitoring sync framework
    useEffect(() => {
        if (productError?.fetchOne) {
            showErrorToast(productError.fetchOne);
            dispatch(clearProductError('fetchOne'));
            navigate('/products');
        }
    }, [dispatch, productError?.fetchOne, navigate]);

    // 2. ✅ FIXED WISHLIST MESSAGES & ERRORS CAPTURE
    useEffect(() => {
        // Check wishlist errors slice layer indicators
        if (wishError?.toggle) {
            showErrorToast(wishError.toggle || 'Please log in to manage your wishlist!');
            dispatch(clearWishlistError('toggle')); // Make sure to import clearWishlistError at top
        }
        if (wishMessage?.toggle) {
            showSuccessToast(wishMessage.toggle || 'Wishlist synchronized successfully.');
            dispatch(clearWishlistMessage('toggle')); // Make sure to import clearWishlistMessage at top
        }
    }, [dispatch, wishError?.toggle, wishMessage?.toggle]);

    // 3. ✅ FIXED CART ACTIONS MESSAGES & ERRORS CAPTURE
    useEffect(() => {
        // Check cart errors slice layer indicators
        if (cartError?.mutation) {
            showErrorToast(cartError.mutation || 'Login requested to modify your luxury bag.');
            dispatch(clearCartError('mutation'));
        }
        if (cartMessage?.mutation) {
            showSuccessToast(cartMessage.mutation || 'Added to your luxury shopping bag.');
            dispatch(clearCartMessage('mutation'));
        }
    }, [dispatch, cartError?.mutation, cartMessage?.mutation]);


    // 6. Global Full Screen Skeleton Loading State Handler Canvas
    if (productLoading?.fetchOne || !product) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4 select-none">
                <Loader2 size={32} className="animate-spin text-TEXT stroke-[1.2]" />
                <span className="text-[10px] uppercase tracking-[3px] text-gray-400 font-light font-sans">
                    Unveiling sensory coordinates...
                </span>
            </div>
        );
    }

    return (
        <div className="bg-[#FBFBFB] min-h-screen text-TEXT antialiased select-none font-sans pb-24 selection:bg-TEXT selection:text-white">

            {/* 🗺️ DYNAMIC BREADCRUMBS TRACKING NAVIGATION PANEL LAYOUT LINKS */}
            <div className="bg-white border-b border-gray-100 py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex items-center space-x-2 text-[10px] uppercase tracking-[2px] font-medium text-gray-400">
                    <Link to="/" className="hover:text-TEXT transition-colors duration-200">
                        Home
                    </Link>
                    <ChevronRight size={10} className="text-gray-300" />
                    <Link to="/products" className="hover:text-TEXT transition-colors duration-200">
                        La Collection
                    </Link>
                    <ChevronRight size={10} className="text-gray-300" />
                    <span className="text-gray-500 font-semibold truncate max-w-xs">
                        {product.title}
                    </span>
                </div>
            </div>

            {/* Main Application Matrix View Frame Display Workspace Wrapper */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-12">
                {/* DUAL DISPLAY SPLIT WORKSPACE COLUMN WRAPPER OVERVIEW */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* 📸 LEFT COLUMN MEDIA DECK FRAME VIEWPORT DISPLAY CANVAS CONTAINER */}
                    <div className="w-full lg:sticky lg:top-24 bg-white border border-gray-100/60 p-4 rounded-sm shadow-2xs">
                        <div className="relative aspect-square w-full bg-[#FBFBFB] overflow-hidden border border-gray-50 rounded-xs">
                            <motion.img
                                initial={{ scale: 0.98, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                src={product.image?.url || product.image}
                                alt={product.title}
                                className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out select-none"
                            />

                            {/* Live Stock Sold Out overlay check validation conditions tracker status */}
                            {product.stock === false && (
                                <div className="absolute inset-0 bg-white/75 backdrop-blur-2xs flex items-center justify-center">
                                    <span className="text-xs uppercase font-bold tracking-[3px] px-5 py-2.5 bg-TEXT text-white rounded-xs shadow-sm">
                                        Sold Out
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* 📝 RIGHT COLUMN META DETAIL CONTENT CONTROL PANELS (Takes 1 full column) */}
                    <div className="space-y-6 md:space-y-8 flex flex-col h-full justify-start">

                        {/* Title, Category Taxonomies, and Pricing metrics information layer */}
                        <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[9px] uppercase tracking-[2px] px-2.5 py-1 bg-neutral-100 text-gray-500 font-medium rounded-xs">
                                    {product.category?.name || "Oud Formulation"}
                                </span>
                                <span className="text-[9px] uppercase tracking-[2px] px-2.5 py-1 bg-neutral-900 text-white font-semibold rounded-xs">
                                    {product.gender === 'unisex' ? 'Les Unisexes' : product.gender === 'men' ? 'Pour Homme' : 'Pour Femme'}
                                </span>
                            </div>

                            <h1 className="text-xl md:text-2xl font-bold tracking-[2px] uppercase text-TEXT">
                                {product.title}
                            </h1>

                            {/* Dynamic populated customer satisfaction score metrics indicators grid */}
                            <div className="flex items-center space-x-3 text-xs pt-1">
                                <div className="flex items-center text-amber-500 space-x-0.5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className={i < Math.floor(product.ratings || 0) ? "fill-amber-500" : "text-gray-200"}
                                        />
                                    ))}
                                </div>
                                <span className="font-mono text-gray-500 text-[11px]">
                                    ({product.numReviews || 0} customer reviews)
                                </span>
                            </div>

                            <div className="pt-4 border-t border-gray-100 mt-2">
                                <p className="text-xl font-bold text-TEXT font-mono tracking-wide">
                                    PKR {product.price?.toLocaleString()}
                                </p>
                                <p className="text-[10px] text-gray-400 font-light mt-0.5 uppercase tracking-[1px]">
                                    Inclusive of all integrated luxury system taxes.
                                </p>
                            </div>
                        </div>
                        {/* 🎛️ INTERACTIVE ORDER CONTROLS CONSOLE PANEL SECTION */}
                        <div className="space-y-5 bg-white border border-gray-100 p-5 rounded-sm shadow-2xs">

                            {/* Quantity selection framework multiplier layer blocks */}
                            {product.stock !== false && (
                                <div className="flex flex-col space-y-2">
                                    <span className="text-[10px] uppercase tracking-[2px] font-medium text-gray-400">
                                        Quantity Pieces:
                                    </span>
                                    <div className="flex items-center w-28 border border-gray-200 rounded-sm overflow-hidden h-9 font-mono">
                                        <button
                                            type="button"
                                            onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                                            className="w-9 h-full flex items-center justify-center hover:bg-neutral-50 active:bg-neutral-100 transition-colors text-xs font-semibold focus:outline-none cursor-pointer"
                                        >
                                            -
                                        </button>
                                        <div className="flex-1 text-center text-xs font-bold text-TEXT select-none">
                                            {quantity}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setQuantity(prev => Math.min(prev + 1, 5))} // Set a safe luxury buying limit of 5 pieces max
                                            className="w-9 h-full flex items-center justify-center hover:bg-neutral-50 active:bg-neutral-100 transition-colors text-xs font-semibold focus:outline-none cursor-pointer"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Main core execution transaction triggering button layouts grid splits */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (!isAuthenticated) {
                                            showErrorToast('Please login to activate and load your premium luxury shopping bag.');
                                            return;
                                        }

                                        dispatch(addToCart({ id: product._id, quantity, isFromDetails: true }));
                                    }}
                                    disabled={product.stock === false || cartBtnLoading?.[product._id]}
                                    className="flex-1 bg-TEXT text-white py-3.5 text-xs uppercase tracking-[2px] font-semibold border border-TEXT hover:bg-neutral-800 active:scale-[0.99] transition-all duration-300 rounded-sm shadow-xs flex items-center justify-center space-x-2 disabled:opacity-40 disabled:hover:bg-TEXT cursor-pointer disabled:cursor-not-allowed focus:outline-none"
                                >
                                    {cartBtnLoading?.[product._id] ? (
                                        <Loader2 size={14} className="animate-spin text-white" />
                                    ) : (
                                        <>
                                            <ShoppingBag size={14} />
                                            <span>{product.stock === false ? 'Sold Out' : 'Acquire Fragrance'}</span>
                                        </>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        if (!isAuthenticated) {
                                            showErrorToast('Authentication requested to synchronize personal boutique wishlist items.');
                                            return;
                                        }
                                        dispatch(toggleWishlistAction(product._id));
                                    }}
                                    disabled={wishBtnLoading?.[product._id]}
                                    className="p-3.5 border border-gray-200 text-TEXT rounded-sm hover:bg-neutral-50 hover:border-TEXT active:scale-[0.99] transition-all duration-300 flex items-center justify-center cursor-pointer focus:outline-none min-w-[50px]"
                                    title="Add to Favorites"
                                >
                                    {wishBtnLoading?.[product._id] ? (
                                        <Loader2 size={14} className="animate-spin text-gray-400" />
                                    ) : (
                                        <Heart
                                            size={16}
                                            className={Array.isArray(wishlistItems) && wishlistItems.some(item => (item?.item?._id || item?.item || item) === product._id) ? "fill-red-500 text-red-500" : "text-TEXT"}
                                        />
                                    )}
                                </button>
                            </div>
                        </div>
                        {/* 🛡️ LUXURY BRAND TRUST SEALS INDICATORS ROW PRIVILEGE LOGS */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-b border-gray-100 py-6 my-2 text-[11px] font-light text-gray-500">
                            <div className="flex items-center space-x-3 sm:justify-center">
                                <Truck size={18} className="text-gray-400 stroke-[1.2]" />
                                <div className="space-y-0.5">
                                    <p className="font-semibold text-TEXT uppercase tracking-[1px]">Premium Transit</p>
                                    <p className="text-[10px] text-gray-400">Complimentary 2-4 days</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 sm:justify-center border-t sm:border-t-0 sm:border-l sm:border-r border-gray-100 pt-4 sm:pt-0">
                                <ShieldCheck size={18} className="text-gray-400 stroke-[1.2]" />
                                <div className="space-y-0.5">
                                    <p className="font-semibold text-TEXT uppercase tracking-[1px]">Authentic Origin</p>
                                    <p className="text-[10px] text-gray-400">100% French Importation</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 sm:justify-center border-t sm:border-t-0 pt-4 sm:pt-0">
                                <CornerDownLeft size={18} className="text-gray-400 stroke-[1.2]" />
                                <div className="space-y-0.5">
                                    <p className="font-semibold text-TEXT uppercase tracking-[1px]">Elite Returns</p>
                                    <p className="text-[10px] text-gray-400">Hassle-free 7 days cash back</p>
                                </div>
                            </div>
                        </div>
                        {/* 🎛️ TABBED ACCORDION NAVIGATION HEADER CONTROLLERS PANEL VIEWPORT */}
                        <div className="space-y-4 pt-2">
                            <div className="flex border-b border-gray-100 text-xs font-semibold uppercase tracking-[2px]">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('description')}
                                    className={`pb-3 pr-6 transition-all duration-300 relative focus:outline-none cursor-pointer ${activeTab === 'description' ? 'text-TEXT font-bold' : 'text-gray-400 hover:text-TEXT'
                                        }`}
                                >
                                    <span>Sensory Narrative</span>
                                    {activeTab === 'description' && (
                                        <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-6 h-[2px] bg-TEXT" />
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('details')}
                                    className={`pb-3 px-6 transition-all duration-300 relative focus:outline-none cursor-pointer ${activeTab === 'details' ? 'text-TEXT font-bold' : 'text-gray-400 hover:text-TEXT'
                                        }`}
                                >
                                    <span>Olfactory Pyramid</span>
                                    {activeTab === 'details' && (
                                        <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-TEXT" />
                                    )}
                                </button>
                            </div>


                            <div className="min-h-32 text-xs tracking-wide text-gray-500 font-light leading-relaxed font-sans">
                                <AnimatePresence mode="wait">
                                    {activeTab === 'description' && (
                                        <motion.div
                                            key="descriptionTab"
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.2 }}
                                            dangerouslySetInnerHTML={{ __html: product.description }}
                                            className="prose prose-sm text-gray-500 max-w-none space-y-2 wrap-break-word whitespace-pre-line text-justify overflow-hidden"
                                        />
                                    )}

                                    {activeTab === 'details' && (
                                        <motion.div
                                            key="detailsTab"
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.2 }}
                                            className="space-y-3"
                                        >
                                            <p className="flex items-center space-x-2 text-TEXT font-medium text-[10px] uppercase tracking-[1px]">
                                                <Sparkles size={12} className="text-[#D4AF37]" />
                                                <span>Composition Identity Matrix:</span>
                                            </p>
                                            <ul className="space-y-1.5 list-disc pl-4 text-gray-400 font-mono">
                                                <li><strong className="text-gray-500">Stock Vault SKU:</strong> {product.sku || 'SCN-GEN-01'}</li>
                                                <li><strong className="text-gray-500">Maison Volume:</strong> 100 mL Standard Full Pour</li>
                                                <li><strong className="text-gray-500">Concentration Scale:</strong> Extrait De Parfum (Luxury High Grade Cover)</li>
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </div>
                        </div>

                    </div>
                </div>

                <div className="mt-16 md:mt-24 border-t border-gray-100 pt-12 space-y-12">
                    <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                        <MessageSquare size={18} className="text-gray-400 stroke-[1.2]" />
                        <h2 className="text-sm font-bold tracking-[2px] uppercase text-TEXT">
                            Sensory Feedback Chronicles ({product.reviews?.length || 0})
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

                        <div className="lg:col-span-2 space-y-6">

                            {!product.reviews || product.reviews.length === 0 ? (
                                <div className="text-center py-12 bg-white border border-gray-100 rounded-sm p-6 shadow-2xs">
                                    <p className="text-xs uppercase tracking-[2px] text-gray-400 font-medium">Awaiting First Confession</p>
                                    <p className="text-[11px] text-gray-400 font-light mt-1">
                                        Have you experienced this formulation? Share your sensory narrative below to guide elite collectors.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4 divide-y divide-gray-50">
                                    {product.reviews.map((rev) => (
                                        <div key={rev._id} className="pt-4 first:pt-0 space-y-2 font-sans">
                                            <div className="flex justify-between items-center">
                                                <p className="text-xs font-semibold uppercase tracking-wider text-TEXT">{rev.name}</p>
                                                <div className="flex text-amber-500 space-x-0.5">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={11}
                                                            className={i < rev.rating ? "fill-amber-500" : "text-gray-200"}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-xs font-light text-gray-500 leading-relaxed pl-1">
                                                {rev.comment}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* Right column review input form section panel */}
                        <div className="bg-white border border-gray-100 rounded-sm p-6 shadow-2xs space-y-4">
                            <h3 className="text-xs font-bold tracking-[2px] uppercase text-TEXT">
                                Record Your Testimony
                            </h3>

                            {!isAuthenticated ? (
                                <div className="text-center py-6 text-gray-400">
                                    <p className="text-[11px] font-light uppercase tracking-[1px] leading-relaxed">
                                        Please login to unlock your luxury user authorization and leave an olfactory review.
                                    </p>
                                </div>
                            ) : (
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        // Standard baseline setup placeholder triggers for review logic
                                        showSuccessToast("Olfactory testimony successfully recorded in our vault database!");
                                    }}
                                    className="space-y-4 text-xs font-sans"
                                >
                                    {/* Star selection rating framework parameter controllers loops */}
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-[1px] font-medium text-gray-400">
                                            Sensory Score:
                                        </label>
                                        <div className="flex items-center text-gray-200 space-x-1 pt-0.5">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    className="focus:outline-none cursor-pointer text-amber-500 hover:scale-110 transition-transform"
                                                    title={`Rate ${i + 1} Stars`}
                                                >
                                                    <Star size={16} className={i < 4 ? "fill-amber-500" : "text-gray-200"} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Text commentary field area input element box logs */}
                                    <div className="flex flex-col space-y-1">
                                        <label htmlFor="commentInput" className="text-[10px] uppercase tracking-[1px] font-medium text-gray-400">
                                            Your Chronicle Statement:
                                        </label>
                                        <textarea
                                            id="commentInput"
                                            rows={4}
                                            placeholder="Describe the projection, sillage, or raw ambient emotions of this formulation..."
                                            className="bg-transparent text-xs text-TEXT w-full border border-gray-200 p-3 outline-none focus:border-TEXT placeholder-gray-300 font-light resize-none rounded-sm transition-colors"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-TEXT text-white py-3 text-xs uppercase tracking-[2px] font-semibold border border-TEXT hover:bg-neutral-800 transition-all rounded-sm shadow-xs cursor-pointer focus:outline-none"
                                    >
                                        Transmit Review
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetails;