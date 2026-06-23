import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Folder, Plus, Loader2, Trash2, Pencil } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux'
import { clearCategoryError, clearCategoryMessage, createCategory, getAllCategories, deleteCategory, updateCategory } from '../../redux/slices/categorySlice'
import { showErrorToast, showSuccessToast } from '../../helper/MyToast';

const ManageCategories = () => {
    const [editingCategory, setEditingCategory] = useState(null);
    const dispatch = useDispatch();

    const { categories, loading: catLoading, errors: categoryError, messages } = useSelector(state => state.categories);

    console.log(1)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            isActive: 'true'
        }
    });


    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);


    const onSubmitCategory = (data) => {
        const payload = {
            ...data,
            isActive: data.isActive === 'true'
        };

        if (editingCategory) {
            dispatch(updateCategory({
                id: editingCategory._id,
                data: payload
            }));
        } else {
            dispatch(createCategory(payload));
        }
    };

    useEffect(() => {

        if (categoryError.create) {
            showErrorToast(categoryError.create || 'Error while creating category!');
            dispatch(clearCategoryError('create'));
        }

        if (messages.create) {
            showSuccessToast(messages.create || 'Category created!');
            reset();
            dispatch(clearCategoryMessage('create'));
        }


    }, [categoryError.create, dispatch, messages.create]);

    const handleDeleteCategory = (id) => {
        dispatch(deleteCategory(id));

        if (editingCategory?._id === id) {
            setEditingCategory(null);
            reset({
                name: '',
                isActive: 'true'
            });
        }
    };

    useEffect(() => {

        if (categoryError.delete) {
            showErrorToast(categoryError.delete || 'Error while deleting category!');
            dispatch(clearCategoryError('delete'));
        }

        if (messages.delete) {
            showSuccessToast(messages.delete || 'Category deleted!');
            dispatch(clearCategoryMessage('delete'));
        }


    }, [categoryError.delete, dispatch, messages.delete]);

    const handleEditCategory = (cat) => {
        setEditingCategory(cat);

        reset({
            name: cat.name,
            isActive: String(cat.isActive)
        });
    };

    useEffect(() => {
        if (messages.update) {
            showSuccessToast(messages.update || 'Category Updated!')
            reset({
                name: '',
                isActive: 'true'
            });

            setEditingCategory(null);

            dispatch(clearCategoryMessage('update'));
        }

        if (categoryError.update) {
            showErrorToast(categoryError.update || 'Error While Updating Category!');
            dispatch(clearCategoryError('update'));
        }
    }, [messages.update, categoryError.update, dispatch]);


    return (
        <div className="space-y-8 animate-fade-in select-none selection:bg-TEXT selection:text-white">
            <div>
                <h1 className="text-xl font-bold tracking-[2px] uppercase text-TEXT">
                    Collections Console
                </h1>
                <p className="text-xs text-gray-400 font-light mt-1">
                    Manage fragrance categories.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                {/* LEFT PANEL */}
                <div className="lg:col-span-3 bg-white border border-gray-100 rounded-sm p-6 md:p-8 shadow-xs space-y-6">
                    <div className='flex items-center justify-between'>
                        <h2 className="text-sm font-bold tracking-[1px] uppercase text-TEXT">
                            Live Categories
                        </h2>
                        <span>
                            Total Categories : {categories.length}
                        </span>
                    </div>

                    {catLoading.fetchAll ? (
                        <div className="flex items-center space-x-3 text-xs text-gray-400 font-light py-10">
                            <Loader2 size={16} className="animate-spin text-TEXT" />
                            <span>Loading...</span>
                        </div>
                    ) : categories.length === 0 ? (
                        <div className="text-center py-12 border border-dashed border-gray-100 rounded-sm bg-gray-50/50">
                            <Folder size={28} className="text-gray-300 mx-auto mb-2" />
                            <p className="text-xs text-gray-400 font-light">
                                No categories found.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-50 border border-gray-100 rounded-sm bg-white overflow-hidden">
                            {categories.map((cat) => (
                                <div
                                    key={cat._id}
                                    className="p-4 flex items-center justify-between hover:bg-gray-50/50"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2 bg-neutral-50 text-TEXT rounded-sm border">
                                            <Folder size={16} />
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-TEXT tracking-wide uppercase">
                                                {cat.name}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-6">
                                        {cat.isActive ? (
                                            <span className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded-xs border text-xs font-semibold tracking-wide uppercase">
                                                Active
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-red-700 bg-red-50 px-2 py-0.5 rounded-xs border text-xs font-semibold tracking-wide uppercase">
                                                Inactive
                                            </span>
                                        )}
                                        <button
                                            onClick={() => handleEditCategory(cat)}
                                            className="text-gray-300 hover:text-blue-600"
                                        >
                                            <Pencil size={14} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteCategory(cat._id)
                                            }
                                            className="text-gray-300 hover:text-red-600"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* RIGHT PANEL */}
                <div className="lg:col-span-2 bg-white border border-gray-100 rounded-sm p-6 md:p-8 shadow-xs space-y-6 sticky top-24">
                    <div>
                        <h2 className="text-sm font-bold tracking-[1px] uppercase text-TEXT">
                            {editingCategory ? 'Edit Category' : 'Add Category'}
                        </h2>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmitCategory)}
                        className="space-y-6"
                    >
                        <div className="flex flex-col space-y-2">
                            <label className="text-[10px] uppercase tracking-[2px] font-medium text-gray-500">
                                Category Name
                            </label>

                            <input
                                type="text"
                                {...register('name', {
                                    required: 'Category name is required'
                                })}
                                className="py-2.5 px-3 border border-gray-200 text-xs text-TEXT rounded-sm"
                            />

                            {errors.name && (
                                <span className="text-red-500 text-xs">
                                    {errors.name.message}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-[10px] uppercase tracking-[2px] font-medium text-gray-500">
                                Status
                            </label>

                            <select
                                {...register('isActive')}
                                className="py-2.5 px-3 border border-gray-200 text-xs text-TEXT rounded-sm"
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>

                        <div className='flex items-center justify-center flex-col gap-2'>
                            <button
                                type="submit"
                                disabled={catLoading.create || catLoading.update}
                                className="w-full bg-TEXT text-white py-3.5 text-xs uppercase tracking-[2px] font-semibold border border-TEXT hover:bg-transparent hover:text-TEXT transition-all duration-300 disabled:opacity-50 rounded-sm"
                            >
                                {
                                    editingCategory
                                        ? (catLoading.update ? 'Updating...' : 'Update Category')
                                        : (catLoading.create ? 'Creating...' : 'Create Category')
                                }
                            </button>
                            {editingCategory && (
                                <button
                                    className='w-full bg-white text-TEXT py-3.5 text-xs uppercase tracking-[2px] font-semibold border border-TEXT hover:bg-TEXT hover:text-white transition-all duration-300 disabled:opacity-50 rounded-sm'
                                    type="button"
                                    onClick={() => {
                                        setEditingCategory(null);
                                        reset({
                                            name: '',
                                            isActive: 'true'
                                        });
                                    }}
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ManageCategories;