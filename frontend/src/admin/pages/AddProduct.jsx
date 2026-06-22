import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { toast } from 'react-hot-toast';
import { clearProductError, clearProductMessage, createProduct } from '../../redux/slices/productSlice';
import { clearCategoryError, clearCategoryMessage, getAllCategories } from '../../redux/slices/categorySlice';
import { useSelector, useDispatch } from 'react-redux';

const AddProduct = () => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);

    const {
        errors: productsError,
        messages: productMessage,
        loading: productLoading
    } = useSelector(state => state.products);

    const {
        errors: categoryError,
        messages: categoryMessage,
        categories
    } = useSelector(state => state.categories);

    const [description, setDescription] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            title: '',
            price: '',
            sku: '',
            category: '',
            gender: '',
            inStock: 'true'
        }
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setValue('image', file);

        const reader = new FileReader();

        reader.onloadend = () => {
            setImagePreview(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const onSubmit = (data) => {
        const plainText = description.replace(/<[^>]*>/g, '').trim();

        if (!plainText) {
            toast.error('Description is required');
            return;
        }

        if (!data.image) {
            toast.error('Product image is required');
            return;
        }

        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('price', data.price);
        formData.append('category', data.category);
        formData.append('gender', data.gender);
        formData.append('sku', data.sku || '');
        formData.append('description', description);
        formData.append('stock', data.inStock);
        formData.append('image', data.image);

        dispatch(createProduct(formData));
    };

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    useEffect(() => {
        if (productsError?.create) {
            toast.error(productsError.create, {
                style: {
                    fontFamily: 'Poppins',
                    fontSize: '13px',
                    borderRadius: '8px'
                }
            });

            dispatch(clearProductError('create'));
        }

        if (categoryError?.fetchAll) {
            toast.error(categoryError.fetchAll);
            dispatch(clearCategoryError('fetchAll'));
        }

        if (categoryMessage?.fetchAll) {
            dispatch(clearCategoryMessage('fetchAll'));
        }

        if (productMessage?.create) {
            toast.success(productMessage.create, {
                style: {
                    fontFamily: 'Poppins',
                    fontSize: '13px',
                    borderRadius: '8px',
                    background: '#111111',
                    color: '#ffffff'
                },
                iconTheme: {
                    primary: '#D4AF37',
                    secondary: '#111111'
                }
            });

            reset({
                title: '',
                price: '',
                sku: '',
                category: '',
                gender: '',
                inStock: 'true'
            });

            setDescription('');
            setImagePreview(null);
            setValue('image', null);

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            dispatch(clearProductMessage('create'));
        }
    }, [
        productsError,
        productMessage,
        categoryError,
        categoryMessage,
        dispatch,
        reset,
        setValue
    ]);

    return (
        <div className="max-w-2xl bg-white border border-gray-100 p-8 md:p-10 shadow-xs rounded-sm space-y-8 mx-auto">
            <div>
                <h1 className="text-lg font-bold tracking-[2px] uppercase text-TEXT">
                    Create Fragrance
                </h1>

                <p className="text-xs text-gray-400 font-light mt-1">
                    Populate details below to initialize a premium product display block.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-2">
                        <label className="text-[10px] uppercase tracking-[2px] font-medium text-gray-500">
                            Fragrance Name
                        </label>

                        <input
                            {...register('title', {
                                required: 'Name is required'
                            })}
                            className="py-2.5 px-3 border border-gray-200 text-xs rounded-sm"
                        />

                        {errors.title && (
                            <span className="text-[10px] text-red-500">
                                {errors.title.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="text-[10px] uppercase tracking-[2px] font-medium text-gray-500">
                            Price
                        </label>

                        <input
                            type="number"
                            {...register('price', {
                                required: 'Price is required',
                                min: {
                                    value: 0,
                                    message: 'Price cannot be negative'
                                }
                            })}
                            className="py-2.5 px-3 border border-gray-200 text-xs rounded-sm"
                        />

                        {errors.price && (
                            <span className="text-[10px] text-red-500">
                                {errors.price.message}
                            </span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-2">
                        <label className="text-[10px] uppercase tracking-[2px] font-medium text-gray-500">
                            SKU
                        </label>

                        <input
                            {...register('sku')}
                            className="py-2.5 px-3 border border-gray-200 text-xs rounded-sm"
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="text-[10px] uppercase tracking-[2px] font-medium text-gray-500">
                            Category
                        </label>

                        <select
                            {...register('category', {
                                required: 'Category required'
                            })}
                            className="py-2.5 px-3 border border-gray-200 text-xs rounded-sm"
                        >
                            <option value="">Select Category</option>

                            {categories?.map(cat => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        {errors.category && (
                            <span className="text-[10px] text-red-500">
                                {errors.category.message}
                            </span>
                        )}
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-6'>

                    <div className="flex flex-col space-y-2">
                        <label className="text-[10px] uppercase tracking-[2px] font-medium text-gray-500">
                            Stock Status
                        </label>

                        <select
                            {...register('inStock')}
                            className="py-2.5 px-3 border border-gray-200 text-xs rounded-sm"
                        >
                            <option value="true">In Stock</option>
                            <option value="false">Out of Stock</option>
                        </select>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="text-[10px] uppercase tracking-[2px] font-medium text-gray-500">Gender</label>
                        <select
                            {...register('gender', {
                                required: 'Gender is required'
                            })}
                            className="py-2.5 px-3 border border-gray-200 text-xs rounded-sm"
                        >
                            <option value="">Select Gender</option>
                            <option value="for man">For Man</option>
                            <option value="for woman">For Woman</option>
                            <option value="unisex">Unisex</option>
                        </select>

                        {errors.gender && (
                            <span className="text-red-500 text-xs">
                                {errors.gender.message}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col space-y-3">
                    <label className="text-[10px] uppercase tracking-[2px] font-medium text-gray-500">
                        Product Image
                    </label>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="py-2.5 px-3 border border-gray-200 text-xs rounded-sm"
                    />

                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-40 h-40 object-cover rounded-sm border"
                        />
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[2px] font-medium text-gray-500">
                        Description
                    </label>

                    <ReactQuill
                        theme="snow"
                        value={description}
                        onChange={setDescription}
                    />
                </div>

                <button
                    type="submit"
                    disabled={productLoading?.create}
                    className="w-full bg-TEXT text-white py-3.5 text-xs uppercase tracking-[2px] font-semibold border border-TEXT hover:bg-transparent hover:text-TEXT transition-all duration-300 disabled:opacity-50 rounded-sm cursor-pointer shadow-xs"
                >
                    {productLoading?.create
                        ? 'Publishing...'
                        : 'Publish Fragrance'}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;