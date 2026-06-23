import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Plus, Edit3, Trash2 } from 'lucide-react';
import { showErrorToast, showSuccessToast } from '../../helper/MyToast';

const ManageProducts = () => {
    const BASE_API = import.meta.env.VITE_BASE_API;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${BASE_API}/products`); // Normal products list route
            setProducts(response.data.products || response.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to permanently delete this fragrance?')) return;
        try {
            const response = await axios.delete(`${BASE_API}/products/admin/${id}`, { withCredentials: true });
            if (response.data.success) {
                showSuccessToast('Fragrance deleted successfully');
                fetchProducts(); // Refresh records dynamically
            }
        } catch (err) {
            showErrorToast(err.response?.data?.message || 'Delete operation failed');
        }
    };

    if (loading) return <div className="text-xs uppercase tracking-widest text-gray-400">Syncing products...</div>;

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
                                        <span className={`px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-xs ${p.isActive !== false ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                            {p.isActive !== false ? 'In Stock' : 'Out of Stock'}
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
            </div>
        </div>
    );
};

export default ManageProducts;