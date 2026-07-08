import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader2, ArrowLeft, Star, StarOff, Sparkles, ShoppingBag, Search } from 'lucide-react';
import { showErrorToast, showSuccessToast } from '../../helper/MyToast';

import { getFeaturedProducts, toggleFeaturedProduct, clearFeaturedError, clearFeaturedMessage } from '../../redux/slices/featuredSlice';
import { getAllProducts } from '../../redux/slices/productSlice';

const ManageFeatured = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');

    const { featured = [], btnLoading = {}, loading: featuredLoading, errors: featuredErrors, message: featuredMessage } = useSelector(state => state.featured || {});
    const { products = [], loading: productLoading } = useSelector(state => state.products || {});

    useEffect(() => {
        dispatch(getFeaturedProducts());
        dispatch(getAllProducts({ page: 1, limit: 100 }));
    }, [dispatch]);

    useEffect(() => {
        if (featuredErrors?.fetch) {
            showErrorToast(featuredErrors.fetch);
            dispatch(clearFeaturedError('fetch'));
        }
        if (featuredErrors?.toggle) {
            showErrorToast(featuredErrors.toggle);
            dispatch(clearFeaturedError('toggle'));
        }
        if (featuredMessage) {
            showSuccessToast(featuredMessage);
            dispatch(clearFeaturedMessage());
            dispatch(getFeaturedProducts());
        }
    }, [featuredErrors?.fetch, featuredErrors?.toggle, featuredMessage, dispatch]);

    const handleFeaturedStatusToggle = async (productIdToken) => {
        dispatch(toggleFeaturedProduct(productIdToken));
    };

    const filteredProductsCatalog = products.filter(p =>
        p?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const checkIfProductIsFeatured = (productId) => {
        return featured.some(item => item.product?._id === productId || item.product === productId);
    };

    if (featuredLoading?.fetch || productLoading?.fetchAll) {
        return (
            <div className="flex flex-col items-center justify-center py-24 space-y-3 font-sans select-none">
                <Loader2 size={24} className="animate-spin text-neutral-400 stroke-[1.2]" />
                <p className="text-[10px] text-gray-400 font-light tracking-[2px] uppercase">Indexing Featured Promotion Networks...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 select-none font-sans pb-16">

            {/* Identity Header Title Area */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold tracking-[2px] uppercase text-TEXT flex items-center gap-2">
                        <Sparkles size={18} className="text-neutral-700" /> Promoted Showcases
                    </h1>
                    <p className="text-xs text-gray-400 font-light mt-1">
                        Control your homepage hero highlights, spotlight parameters, and premium luxury features flags toggles.
                    </p>
                </div>
            </div>

            {/* Split Operations Workspace Grid Area Framework */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                <div className="lg:col-span-7 bg-white border border-gray-100 p-5 md:p-6 rounded-sm shadow-2xs space-y-6">
                    <div className="space-y-1">
                        <h3 className="text-xs font-bold tracking-[1.5px] uppercase text-TEXT flex items-center gap-2">
                            <ShoppingBag size={13} className="text-gray-400" /> Storefront Catalog Directory
                        </h3>
                        <p className="text-[10px] text-gray-400 font-light uppercase tracking-[0.5px]">
                            Toggle the star status triggers below to add or drop formulations into featured rows.
                        </p>
                    </div>

                    {/* Integrated Quick Filter Query Vault Search Input Fields Input */}
                    <div className="relative flex items-center bg-neutral-50 border border-gray-200/80 rounded-sm p-1.5">
                        <Search size={14} className="absolute left-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Filter your complete formulas library list index dynamically by keyword names..."
                            value={searchQuery}
                            onChange={(eventNode) => setSearchQuery(eventNode.target.value)}
                            className="w-full pl-9 pr-4 py-1.5 text-xs font-sans placeholder-gray-300 text-TEXT focus:outline-none bg-transparent"
                        />
                    </div>

                    {/* Table Spreadsheet Directory Hub Grid */}
                    <div className="overflow-x-auto max-h-120 overflow-y-auto custom-scrollbar pr-1">
                        <table className="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr className="border-b border-gray-100 bg-neutral-50 text-gray-400 font-bold text-[9px] uppercase tracking-[1.5px] sticky top-0 z-10 select-none">
                                    <th className="py-3 px-4">Specs</th>
                                    <th className="py-3 px-4">Formulation Name</th>
                                    <th className="py-3 px-4 text-right">Switch Trigger</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 tracking-wide text-neutral-700">

                                {filteredProductsCatalog.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="p-8 text-center text-gray-400 font-light uppercase tracking-[0.5px]">
                                            No inventory item logs match your filter criteria queries.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredProductsCatalog.map((productItem) => {
                                        const isAlreadyFeatured = checkIfProductIsFeatured(productItem._id);
                                        return (
                                            <tr key={productItem._id} className="hover:bg-neutral-50/50 transition-colors group">
                                                <td className="py-3 px-4">
                                                    <div className="w-10 h-10 bg-neutral-50 border border-gray-100 rounded-xs overflow-hidden shrink-0">
                                                        <img
                                                            src={productItem.image?.url || productItem.image || '/fallback-scent.png'}
                                                            alt={productItem.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <p className="font-bold text-TEXT uppercase tracking-wide truncate max-w-50">{productItem.title}</p>
                                                    <p className="text-[10px] text-gray-400 font-mono">Rs. {Number(productItem.price || 0).toLocaleString()}</p>
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    <button
                                                        type="button"
                                                        disabled={btnLoading[productItem._id]}
                                                        onClick={() => handleFeaturedStatusToggle(productItem._id)}
                                                        className={`inline-flex items-center space-x-1.5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded-2xs border transition-all duration-300 focus:outline-none cursor-pointer ${isAlreadyFeatured
                                                            ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-red-50 hover:border-red-200 hover:text-red-700 group-hover:shadow-3xs'
                                                            : 'bg-white border-gray-200 text-gray-400 hover:border-TEXT hover:text-TEXT'
                                                            }`}
                                                    >
                                                        {isAlreadyFeatured ? <Star size={11} className="fill-amber-500 stroke-amber-600" /> : <StarOff size={11} />}
                                                        <span>{isAlreadyFeatured ? "Featured" : "Promote"}</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="lg:col-span-5 bg-white border border-gray-100 p-5 md:p-6 rounded-sm shadow-2xs space-y-5">
                    <div className="space-y-1">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xs font-bold tracking-[1.5px] uppercase text-TEXT">
                                Active Showcase Feed
                            </h3>
                            <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-neutral-900 text-white rounded-2xs">
                                Count: {String(featured.length).padStart(2, '0')}
                            </span>
                        </div>
                        <p className="text-[10px] text-gray-400 font-light uppercase tracking-[0.5px]">
                            Live visibility preview matrix currently running on your frontend boutique landing rows.
                        </p>
                    </div>

                    {/* Live Visual Showcase Display Cards Vertical Loop */}
                    <div className="space-y-4 max-h-137.5 overflow-y-auto custom-scrollbar pr-1">
                        {featured.length === 0 ? (
                            <div className="text-center py-16 border border-dashed border-gray-100 rounded-sm space-y-2">
                                <StarOff size={20} className="mx-auto text-gray-300 stroke-[1.2]" />
                                <p className="text-[10px] text-gray-400 font-light uppercase tracking-[1px]">No formulations are actively spotlighted.</p>
                            </div>
                        ) : (
                            featured.map((featuredNodeItem) => {
                                const activeProductNode = featuredNodeItem.product;
                                if (!activeProductNode) return null;

                                return (
                                    <div
                                        key={featuredNodeItem._id}
                                        className="flex items-center justify-between p-3 border border-neutral-100 rounded-sm bg-neutral-50/50 hover:bg-neutral-50 transition-colors group/card"
                                    >
                                        <div className="flex items-center space-x-3 min-w-0">
                                            <div className="w-11 h-11 bg-white border border-gray-100 rounded-2xs overflow-hidden shrink-0">
                                                <img
                                                    src={activeProductNode.image?.url || activeProductNode.image || '/fallback-scent.png'}
                                                    alt={activeProductNode.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-TEXT uppercase tracking-wide truncate max-w-35 sm:max-w-none">
                                                    {activeProductNode.title}
                                                </p>
                                                <p className="text-[9px] text-gray-400 uppercase tracking-wider mt-0.5 font-medium">
                                                    Category: {activeProductNode.category?.name || activeProductNode.category?.title || "Luxury Blend"}
                                                </p>
                                            </div>
                                        </div>


                                        <button
                                            type="button"
                                            disabled={btnLoading[activeProductNode._id]}
                                            onClick={() => handleFeaturedStatusToggle(activeProductNode._id)}
                                            className="w-7 h-7 bg-white hover:bg-red-50 hover:text-red-600 border border-gray-200 hover:border-red-200 text-gray-400 rounded-sm flex items-center justify-center transition-all duration-300 shadow-3xs cursor-pointer focus:outline-none shrink-0"
                                            title="Drop from highlights stream"
                                        >
                                            <Star size={12} className="fill-amber-400 stroke-amber-500 group-hover/card:fill-transparent group-hover/card:stroke-red-500 transition-colors" />
                                        </button>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ManageFeatured;