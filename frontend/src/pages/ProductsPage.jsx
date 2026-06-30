import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Search, Loader2, X, SlidersHorizontal } from 'lucide-react';

import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';

import { getAllProducts } from '../redux/slices/productSlice';
import { clearWishlistError, clearWishlistMessage, toggleWishlistAction } from '../redux/slices/wishlistSlice';
import { addToCart, clearCartError, clearCartMessage } from '../redux/slices/cartSlice';
import { showErrorToast, showSuccessToast } from '../helper/MyToast';

const ShopCatalog = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const { isAuthenticated } = useSelector((state) => state.auth);
    const { products, loading: productLoading, meta } = useSelector((state) => state.products);
    const { wishlistItems, btnLoading: wishBtnLoading, messages: wishMessage, errors: wishError } = useSelector((state) => state.wishlist);
    const { btnLoading: cartBtnLoading, errors: cartError, messages: cartMessage } = useSelector((state) => state.cart);

    const search = searchParams.get('search') || '';
    const selectedCategory = searchParams.get('category') || '';
    const selectedGender = searchParams.get('gender') || '';
    const sortBy = searchParams.get('sort') || 'default';
    const page = Number(searchParams.get('page')) || 1;

    // 3. Central Safe URL Parameter State Updating Engine Hook Utility
    const updateUrlParams = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value && value.trim() !== '') {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }
        if (key !== 'page') {
            newParams.set('page', '1');
        }
        setSearchParams(newParams);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    useEffect(() => {
        const queryParams = { page, limit: 12, category: selectedCategory, gender: selectedGender, search, sort: sortBy };
        dispatch(getAllProducts(queryParams));
    }, [dispatch, page, selectedCategory, selectedGender, search, sortBy]);


    const handleResetFilters = () => {
        setSearchParams({});
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    const handleWishlistClick = (productId) => {
        if (!isAuthenticated) {
            showErrorToast('Authentication requested to synchronize personal boutique wishlist items.');
            return;
        }
        dispatch(toggleWishlistAction(productId));
    };

    useEffect(() => {
        if (wishError.toggle) {
            showErrorToast(wishError.toggle || 'Login Please!');
            dispatch(clearWishlistError('toggle'));
            return;
        }

        if (wishMessage.toggle) {
            showSuccessToast(wishMessage.toggle || 'Added to Wishlist!');
            dispatch(clearWishlistMessage('toggle'));
        }
    }, [dispatch, wishError.toggle, wishMessage.toggle])

    const handleCartClick = (productId) => {
        if (!isAuthenticated) {
            showErrorToast('Please login to activate and initialize your luxury shopping bag checkout profile.');
            return;
        }
        dispatch(addToCart(productId));
    };

    useEffect(() => {
        if (cartError.mutation) {
            showErrorToast(cartError.mutation || 'Please Login!');
            dispatch(clearCartError('mutation'));
        }

        if (cartMessage.mutation) {
            showSuccessToast(cartMessage.mutation || 'Added to Cart!');
            dispatch(clearCartMessage('mutation'));
        }
    }, [dispatch, cartError.mutation, cartMessage.mutation]);
    return (
        <div className="bg-CARD-BG min-h-screen text-TEXT antialiased select-none font-sans pb-16 selection:bg-TEXT selection:text-white">


            <div className="bg-white border-b border-b-gray-100/60 py-12 md:py-16 text-center">
                <h1 className="text-2xl md:text-3xl font-bold tracking-[4px] uppercase text-TEXT">La Collection</h1>
                <p className="text-[11px] tracking-[2px] text-gray-400 uppercase font-light mt-2">Explore our premium olfactory portfolio</p>
            </div>


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">


                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white border border-gray-100 p-4 rounded-sm shadow-2xs mb-8">


                    <div className="relative w-full sm:w-80 flex items-center border-b border-gray-200 focus-within:border-TEXT pb-1 transition-colors duration-300">
                        <Search size={16} className="text-gray-400 mr-2" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => updateUrlParams('search', e.target.value)}
                            placeholder="SEARCH FRAGRANCE OR NOTES..."
                            className="bg-transparent text-xs tracking-wider text-TEXT w-full outline-none focus:outline-none placeholder-gray-300 font-light uppercase"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={() => updateUrlParams('search', '')}
                                className="text-gray-400 hover:text-TEXT cursor-pointer focus:outline-none"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">


                        <button
                            type="button"
                            onClick={() => setIsMobileFilterOpen(true)}
                            className="lg:hidden flex items-center space-x-2 border border-gray-200 px-4 py-2.5 rounded-sm text-xs font-semibold tracking-wider text-TEXT bg-white hover:bg-neutral-50 active:scale-95 transition-all cursor-pointer"
                        >
                            <SlidersHorizontal size={14} />
                            <span>Filters</span>
                        </button>

                        <div className="flex items-center space-x-3">
                            <span className="text-[10px] uppercase tracking-[2px] text-gray-400 font-medium hidden sm:inline">Sort By:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => updateUrlParams('sort', e.target.value)}
                                className="bg-white border border-gray-200 text-xs text-TEXT rounded-sm py-2 px-3 tracking-wide focus:border-TEXT focus:outline-none cursor-pointer"
                            >
                                <option value="default">Recently Added</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                </div>


                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

                    <FilterSidebar
                        isOpen={isMobileFilterOpen}
                        onClose={() => setIsMobileFilterOpen(false)}
                        selectedCategory={selectedCategory}
                        selectedGender={selectedGender}
                        search={search}
                        sortBy={sortBy}
                        onUpdateParams={updateUrlParams}
                        onResetFilters={handleResetFilters}
                    />


                    <div className="lg:col-span-3 space-y-8">

                        {productLoading?.fetchAll ? (
                            <div className="flex flex-col items-center justify-center py-32 space-y-3 bg-white border border-gray-100 rounded-sm shadow-2xs w-full">
                                <Loader2 size={24} className="animate-spin text-TEXT" />
                                <span className="text-[10px] uppercase tracking-[2px] text-gray-400 font-light">Syncing fragrance catalog...</span>
                            </div>
                        ) : !products || products.length === 0 ? (
                            <div className="text-center py-24 bg-white border border-gray-100 rounded-sm shadow-2xs w-full">
                                <Grid size={32} className="text-gray-300 mx-auto mb-3 stroke-[1.2]" />
                                <p className="text-xs uppercase tracking-[2px] text-gray-400 font-medium">No Fragrances Found</p>
                                <p className="text-[11px] text-gray-400 font-light mt-1 max-w-xs mx-auto text-balance">
                                    Try adjusting your scent filters or clearing search text queries to reveal available stock entries.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-12">

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map((perfume, idx) => (
                                        <ProductCard
                                            key={perfume._id}
                                            perfume={perfume}
                                            idx={idx}
                                            isProductInWishlist={Array.isArray(wishlistItems) && wishlistItems.some(
                                                (wishItem) => (wishItem?.item?._id || wishItem?.item || wishItem) === perfume._id
                                            )}
                                            isWishLoading={wishBtnLoading?.[perfume._id]}
                                            isCartLoading={cartBtnLoading?.[perfume._id]}
                                            onWishlistToggle={(id) => handleWishlistClick(id)}
                                            onAddToCart={(id) => handleCartClick(id)}
                                        />
                                    ))}
                                </div>


                                {meta?.totalPages > 1 && (
                                    <div className="flex justify-center items-center gap-3 mt-12 mb-6 select-none flex-wrap">
                                        <button
                                            type="button"
                                            onClick={() => updateUrlParams('page', String(Math.max(page - 1, 1)))}
                                            disabled={page === 1}
                                            className="px-4 py-2 border border-gray-200 text-[10px] uppercase tracking-[2px] font-semibold text-TEXT rounded-sm disabled:opacity-30 disabled:hover:bg-transparent hover:bg-gray-50 active:scale-95 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed focus:outline-none"
                                        >
                                            Prev
                                        </button>

                                        <div className="flex items-center gap-1.5 font-mono text-xs">
                                            {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(num => (
                                                <button
                                                    key={num}
                                                    type="button"
                                                    onClick={() => updateUrlParams('page', String(num))}
                                                    className={`w-9 h-9 border text-xs font-semibold rounded-sm transition-all duration-300 flex items-center justify-center cursor-pointer focus:outline-none ${page === num ? 'bg-TEXT text-white border-TEXT shadow-xs font-bold' : 'bg-white text-TEXT border-gray-200 hover:border-TEXT hover:text-TEXT'
                                                        }`}
                                                >
                                                    {num}
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => updateUrlParams('page', String(Math.min(page + 1, meta.totalPages)))}
                                            disabled={page === meta.totalPages}
                                            className="px-4 py-2 border border-gray-200 text-[10px] uppercase tracking-[2px] font-semibold text-TEXT rounded-sm disabled:opacity-30 disabled:hover:bg-transparent hover:bg-gray-50 active:scale-95 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed focus:outline-none"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ShopCatalog;