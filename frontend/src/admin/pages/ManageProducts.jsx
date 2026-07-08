import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Plus, Edit3, Trash2, Search, Loader2 } from 'lucide-react';
import { showErrorToast, showSuccessToast } from '../../helper/MyToast';
import { useDispatch, useSelector } from 'react-redux';
import { clearProductError, clearProductMessage, deleteProduct, getAllProducts } from '../../redux/slices/productSlice';

const ManageProducts = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const pageUrlParam = parseInt(searchParams.get('page')) || 1;
    const searchUrlParam = searchParams.get('search') || '';
    const [searchQueryInput, setSearchQueryInput] = useState(searchUrlParam);

    const { loading, errors, messages, products = [], meta } = useSelector(state => state.products);

    const totalPages = meta?.totalPages || 1;

    useEffect(() => {
        dispatch(getAllProducts({ page: pageUrlParam, limit: 10, search: searchUrlParam }));
    }, [dispatch, pageUrlParam, searchUrlParam]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to permanently delete this fragrance?')) return;
        dispatch(deleteProduct(id));
    };

    useEffect(() => {
        if (errors?.delete) {
            showErrorToast(errors.delete || 'Product Delete Error!');
            dispatch(clearProductError('delete'));
        }

        if (messages?.delete) {
            showSuccessToast(messages.delete || 'Product Deleted!');
            dispatch(clearProductMessage('delete'));
            dispatch(getAllProducts({ page: pageUrlParam, limit: 10, search: searchUrlParam }));
        }
    }, [errors?.delete, messages?.delete, dispatch, pageUrlParam, searchUrlParam]);

    const handleSearchSubmitSubmit = (eventEvent) => {
        eventEvent.preventDefault();

        setSearchParams({
            page: '1',
            search: searchQueryInput.trim()
        });
    };

    const compileSmartSmartPageNumbers = () => {
        const activePageNum = pageUrlParam;
        const pageNumbersStack = [];
        const maximumVisibleButtonsRange = 3;

        let startingPivotIndex = Math.max(1, activePageNum - 1);
        let endingPivotIndex = Math.min(totalPages, startingPivotIndex + maximumVisibleButtonsRange - 1);

        if (endingPivotIndex - startingPivotIndex + 1 < maximumVisibleButtonsRange) {
            startingPivotIndex = Math.max(1, endingPivotIndex - maximumVisibleButtonsRange + 1);
        }

        for (let numIdx = startingPivotIndex; numIdx <= endingPivotIndex; numIdx++) {
            pageNumbersStack.push(numIdx);
        }
        return pageNumbersStack;
    };

    const smartRenderedPageNumbers = compileSmartSmartPageNumbers();

    if (loading?.fetchAll) {
        return (
            <div className="flex flex-col items-center justify-center py-24 space-y-3 font-sans select-none">
                <Loader2 size={24} className="animate-spin text-neutral-400 stroke-[1.2]" />
                <p className="text-[10px] text-gray-400 font-light tracking-[2px] uppercase">Syncing Scent Portfolio Assets...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 select-none">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold tracking-[2px] uppercase text-TEXT">Fragrance Portfolio</h1>
                    <p className="text-xs text-gray-400 font-light mt-1">Manage catalog entries, pricing models, and stocks status.</p>
                </div>
                <Link to="/admin/products/add" className="inline-flex items-center space-x-2 bg-TEXT text-white px-5 py-3 text-xs uppercase tracking-[2px] font-semibold border border-TEXT hover:bg-transparent hover:text-TEXT transition-all duration-300 rounded-sm shadow-xs self-start sm:self-auto cursor-pointer focus:outline-none">
                    <Plus size={14} />
                    <span>Create Scent</span>
                </Link>
            </div>


            <form onSubmit={handleSearchSubmitSubmit} className="flex gap-2 max-w-md bg-white border border-gray-100 p-1.5 rounded-sm shadow-2xs">
                <div className="relative flex-1 flex items-center">
                    <Search size={14} className="absolute left-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search formulas by name or key identifier parameters..."
                        value={searchQueryInput}
                        onChange={(eventNode) => setSearchQueryInput(eventNode.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-xs font-sans placeholder-gray-300 text-TEXT focus:outline-none bg-transparent"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-TEXT text-white px-4 py-2 text-[10px] uppercase tracking-[1.5px] font-bold rounded-sm border border-TEXT hover:bg-neutral-800 transition-colors focus:outline-none cursor-pointer"
                >
                    Search
                </button>
            </form>


            <div className="bg-white border border-gray-100 rounded-sm shadow-xs overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-150">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50 text-gray-400 font-medium text-[10px] uppercase tracking-[2px]">
                            <th className="py-4 px-6">Image</th>
                            <th className="py-4 px-6">Title</th>
                            <th className="py-4 px-6">Price</th>
                            <th className="py-4 px-6">Availability</th>
                            <th className="py-4 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-xs tracking-wide">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-12 text-center text-gray-400 font-light uppercase tracking-[0.5px]">
                                    No fragrances matching your filter criteria parameters indexed inside the catalog collections.
                                </td>
                            </tr>
                        ) : (
                            products.map((productRowItem) => (
                                <tr key={productRowItem._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="py-4 px-6">
                                        <img src={productRowItem.image?.url || productRowItem.image} alt={productRowItem.title} className="w-12 h-12 object-cover border border-gray-100 rounded-sm bg-gray-50 opacity-95 group-hover:opacity-100 transition-opacity" />
                                    </td>
                                    <td className="py-4 px-6 font-semibold text-TEXT uppercase tracking-wide">{productRowItem.title}</td>
                                    <td className="py-4 px-6 font-mono text-gray-500">Rs. {Number(productRowItem.price || 0).toLocaleString()}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-2.5 text-center inline-block py-1 text-[9px] font-bold uppercase tracking-wider rounded-2xs border ${productRowItem.stock !== false ? 'bg-emerald-50/60 border-emerald-100 text-emerald-700' : 'bg-red-50/60 border-red-100 text-red-700'}`}>
                                            {productRowItem.stock !== false ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 flex justify-center items-center space-x-3.5 h-20">
                                        <Link to={`/admin/products/edit/${productRowItem._id}`} className="p-2 border border-gray-200 text-gray-400 hover:text-TEXT hover:bg-gray-50 rounded-sm transition-all focus:outline-none" title="Edit Formulation">
                                            <Edit3 size={13} />
                                        </Link>
                                        <button onClick={() => handleDelete(productRowItem._id)} className="p-2 border border-gray-200 text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 rounded-sm transition-all cursor-pointer focus:outline-none" title="Purge Item">
                                            <Trash2 size={13} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>


                {products.length > 0 && (
                    <div className="flex justify-center items-center gap-3 mt-12 mb-6 select-none flex-wrap">

                        <button
                            onClick={() => setSearchParams({ page: String(pageUrlParam - 1), search: searchUrlParam })}
                            disabled={pageUrlParam === 1}
                            className="px-4 py-2 border border-gray-200 text-[10px] uppercase tracking-[2px] font-semibold text-TEXT rounded-sm disabled:opacity-30 hover:bg-gray-50 active:scale-95 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed focus:outline-none"
                        >
                            Prev
                        </button>


                        <div className="flex items-center gap-1.5 font-mono text-xs">
                            {smartRenderedPageNumbers.map(pageNumberIndex => (
                                <button
                                    key={pageNumberIndex}
                                    onClick={() => setSearchParams({ page: String(pageNumberIndex), search: searchUrlParam })}
                                    className={`w-9 h-9 border text-xs font-semibold rounded-sm transition-all duration-300 flex items-center justify-center cursor-pointer focus:outline-none
                                    ${pageUrlParam === pageNumberIndex
                                            ? 'bg-TEXT text-white border-TEXT shadow-xs font-bold'
                                            : 'bg-white text-TEXT border-gray-200 hover:border-TEXT hover:text-TEXT'
                                        }`}
                                >
                                    {String(pageNumberIndex).padStart(2, '0')}
                                </button>
                            ))}
                        </div>


                        <button
                            onClick={() => setSearchParams({ page: String(pageUrlParam + 1), search: searchUrlParam })}
                            disabled={pageUrlParam === totalPages}
                            className="px-4 py-2 border border-gray-200 text-[10px] uppercase tracking-[2px] font-semibold text-TEXT rounded-sm disabled:opacity-30 hover:bg-gray-50 active:scale-95 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed focus:outline-none"
                        >
                            Next
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ManageProducts;