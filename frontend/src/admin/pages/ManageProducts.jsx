import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit3, Trash2 } from 'lucide-react';
import { showErrorToast, showSuccessToast } from '../../helper/MyToast';
import { useDispatch, useSelector } from 'react-redux'
import { clearProductError, clearProductMessage, deleteProduct, getAllProducts } from '../../redux/slices/productSlice'

const ManageProducts = () => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const { loading, errors, messages, products, meta } = useSelector(state => state.products);


    const totalPages = meta?.totalPages || 1;

    const pageNumbers = Array.from(
        { length: totalPages },
        (_, i) => i + 1
    );


    useEffect(() => {
        dispatch(getAllProducts({ page, limit: 10 }));
    }, [dispatch, page]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to permanently delete this fragrance?')) return;
        dispatch(deleteProduct(id));
    };

    useEffect(() => {
        if (errors.delete) {
            showErrorToast(errors.delete || 'Product Delete Error!');
            dispatch(clearProductError('delete'));
        }

        if (messages.delete) {
            showSuccessToast(messages.delete || 'Product Deleted!');
            dispatch(clearProductMessage('delete'));
        }
    }, [errors.delete, messages.delete, dispatch]);

    if (loading.fetchAll) return <div className="text-xs uppercase tracking-widest text-gray-400">Syncing products...</div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold tracking-[2px] uppercase text-TEXT">Fragrance Portfolio</h1>
                    <p className="text-xs text-gray-400 font-light mt-1">Manage catalog entries, pricing models, and stocks status.</p>
                </div>
                <Link to="/admin/products/add" className="inline-flex items-center space-x-2 bg-TEXT text-white px-5 py-3 text-xs uppercase tracking-[2px] font-semibold border border-TEXT hover:bg-transparent hover:text-TEXT transition-all duration-300 rounded-sm shadow-xs self-start sm:self-auto cursor-pointer">
                    <Plus size={14} />
                    <span>Create Scent</span>
                </Link>
            </div>

            {/* Catalog Layout Table */}
            <div className="bg-white border border-gray-100 rounded-sm shadow-xs overflow-x-auto">
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
                            <tr><td colSpan="5" className="p-8 text-center text-gray-400 font-light">No fragrances found. create your first product.</td></tr>
                        ) : (
                            products.map((p) => (
                                <tr key={p._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-6">
                                        <img src={p.image.url} alt={p.title} className="w-12 h-12 object-cover border border-gray-100 rounded-sm bg-gray-50" />
                                    </td>
                                    <td className="py-4 px-6 font-semibold text-TEXT">{p.title}</td>
                                    <td className="py-4 px-6 text-gray-500">Rs. {p.price}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-2.5 text-center flex items-center justify-center py-1 text-[10px] font-semibold uppercase tracking-wider rounded-xs ${p.stock !== false ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                            {p.stock !== false ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 flex justify-center items-center space-x-4 h-20">
                                        <Link to={`/admin/products/edit/${p._id}`} className="p-2 border border-gray-100 text-gray-500 hover:text-TEXT hover:bg-gray-50 rounded-sm transition-all" title="Edit Product">
                                            <Edit3 size={14} />
                                        </Link>
                                        <button onClick={() => handleDelete(p._id)} className="p-2 border border-gray-100 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-all cursor-pointer" title="Delete Product">
                                            <Trash2 size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>


                <div className="flex justify-center items-center gap-3 mt-12 mb-6 select-none flex-wrap">

                    <button
                        onClick={() => setPage(prev => prev - 1)}
                        disabled={page === 1}
                        className="px-4 py-2 border border-gray-200 text-[10px] uppercase tracking-[2px] font-semibold text-TEXT rounded-sm disabled:opacity-30 disabled:hover:bg-transparent hover:bg-gray-50 active:scale-95 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed focus:outline-none"
                    >
                        Prev
                    </button>


                    <div className="flex items-center gap-1.5 font-mono text-xs">
                        {pageNumbers.map(num => (
                            <button
                                key={num}
                                onClick={() => setPage(num)}
                                className={`
                    w-9 h-9 border text-xs font-semibold rounded-sm transition-all duration-300 flex items-center justify-center cursor-pointer focus:outline-none
                    ${page === num ? 'bg-TEXT text-white border-TEXT shadow-xs font-bold'
                                        : 'bg-white text-TEXT border-gray-200 hover:border-TEXT hover:text-TEXT'}`}>
                                {num}
                            </button>
                        ))}
                    </div>


                    <button
                        onClick={() => setPage(prev => prev + 1)}
                        disabled={page === totalPages}
                        className="px-4 py-2 border border-gray-200 text-[10px] uppercase tracking-[2px] font-semibold text-TEXT rounded-sm disabled:opacity-30 disabled:hover:bg-transparent hover:bg-gray-50 active:scale-95 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed focus:outline-none">
                        Next
                    </button>
                </div>


            </div>
        </div>
    );
};

export default ManageProducts;