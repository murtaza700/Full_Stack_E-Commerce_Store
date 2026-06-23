import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../../helper/MyToast';

const EditProduct = () => {
    const BASE_API = import.meta.env.VITE_BASE_API;
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        const loadProductDetails = async () => {
            try {
                const response = await axios.get(`${BASE_API}/products/${id}`);
                const data = response.data.product || response.data;
                setValue('title', data.title);
                setValue('price', data.price);
                setValue('image', data.image);
                setValue('description', data.description);
                setValue('isActive', data.isActive ?? true);
            } catch (err) {
                showErrorToast('Failed to load item schema data');
                navigate('/admin/products');
            } finally {
                setFetching(false);
            }
        };
        loadProductDetails();
    }, [id, BASE_API, setValue, navigate]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            data.price = Number(data.price);
            data.isActive = data.isActive === "true" || data.isActive === true;

            const response = await axiosInstance.put(`${BASE_API}/products/admin/${id}`, data, { withCredentials: true });
            if (response.data.success) {
                showSuccessToast('Fragrance portfolio entry updated!');
                navigate('/admin/products');
            }
        } catch (err) {
            showErrorToast(err.response?.data?.message || 'Update request failed.');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="text-xs uppercase tracking-widest text-gray-400">Fetching fragrance parameters...</div>;

    return (
        <div className="max-w-2xl bg-white border border-gray-100 p-8 md:p-10 shadow-xs rounded-sm space-y-8 mx-auto">
            <div>
                <h1 className="text-lg font-bold tracking-[2px] uppercase text-TEXT">Modify Fragrance Spec</h1>
                <p className="text-xs text-gray-400 font-light mt-1">Make direct edits to live inventory structures mapping variables below.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-2">
                        <label className="text-[10px] uppercase tracking-[2px] font-medium text-gray-500">Fragrance Name</label>
                        <input {...register('title', { required: true })} className="py-2.5 px-3 border border-gray-200 text-xs text-TEXT rounded-sm focus:border-TEXT focus:outline-none bg-transparent" />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="text-[10px] uppercase tracking-[2px] font-medium text-gray-500">Retail Price (PKR)</label>
                        <input type="number" {...register('price', { required: true, min: 1 })} className="py-2.5 px-3 border border-gray-200 text-xs text-TEXT rounded-sm focus:border-TEXT focus:outline-none bg-transparent" />
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-[10px] uppercase tracking-[2px] font-medium text-gray-500">Image Asset Location URL</label>
                    <input {...register('image', { required: true })} className="py-2.5 px-3 border border-gray-200 text-xs text-TEXT rounded-sm focus:border-TEXT focus:outline-none bg-transparent" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Status Boolean Control Toggle (As you explicitly manage stock as a boolean status) */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-[10px] uppercase tracking-[2px] font-medium text-gray-500">Inventory Status Flag</label>
                        <select {...register('isActive')} className="py-2.5 px-3 border border-gray-200 text-xs text-TEXT rounded-sm focus:border-TEXT focus:outline-none bg-white">
                            <option value="true">In Stock / Available</option>
                            <option value="false">Out of Stock / Disabled</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-[10px] uppercase tracking-[2px] font-medium text-gray-500">Formulation Profile Description</label>
                    <textarea rows="4" {...register('description', { required: true })} className="py-2.5 px-3 border border-gray-200 text-xs text-TEXT rounded-sm focus:border-TEXT focus:outline-none bg-transparent resize-none" />
                </div>

                <button type="submit" disabled={loading} className="w-full bg-TEXT text-white py-3.5 text-xs uppercase tracking-[2px] font-semibold border border-TEXT hover:bg-transparent hover:text-TEXT transition-all duration-300 disabled:opacity-50 rounded-sm cursor-pointer shadow-xs">
                    {loading ? 'Saving adjustments...' : 'Apply Spectacle Edits'}
                </button>
            </form>
        </div>
    );
};

export default EditProduct;