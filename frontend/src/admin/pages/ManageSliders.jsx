import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { Loader2, Plus, Edit3, Trash2, Link2, Layers, Image, ArrowLeft, RefreshCw } from 'lucide-react';
import { showErrorToast, showSuccessToast } from '../../helper/MyToast';
import {
    fetchAllSliders,
    createSlider,
    updateSlider,
    deleteSlider,
    clearSliderError,
    clearSliderMessage,
    resetSliderStatusFlags
} from '../../redux/slices/sliderSlice';

const ManageSliders = () => {
    const dispatch = useDispatch();

    const [isEditingMode, setIsEditingMode] = useState(false);
    const [targetEditId, setTargetEditId] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors: formValidationErrors }
    } = useForm({
        defaultValues: {
            title: '',
            subtitle: '',
            link: '/products',
            orderPosition: 0,
            image: null
        }
    });


    const watchedImageFileNode = watch('image');

    const { sliders = [], loading, btnLoading = {}, errors, message, actionSuccess } = useSelector(state => state.sliders || {});

    useEffect(() => {
        dispatch(fetchAllSliders());
    }, [dispatch]);

    useEffect(() => {
        if (errors?.fetch) {
            showErrorToast(errors.fetch || 'Sliders Fetching Error!');
            dispatch(clearSliderError('fetch'));
        }
        if (errors?.mutation) {
            showErrorToast(errors.mutation || 'Slider Operation Failed!');
            dispatch(clearSliderError('mutation'));
        }
        if (message) {
            showSuccessToast(message);
            dispatch(clearSliderMessage());
        }
        if (actionSuccess) {
            handleResetFormWizardFields();
            dispatch(resetSliderStatusFlags());
            dispatch(fetchAllSliders());
        }
    }, [errors?.fetch, errors?.mutation, message, actionSuccess, dispatch]);

    const handleResetFormWizardFields = () => {
        setIsEditingMode(false);
        setTargetEditId(null);
        setImagePreviewUrl('');

        reset({
            title: '',
            subtitle: '',
            link: '/products',
            orderPosition: 0,
            image: null
        });
    };

    useEffect(() => {
        if (watchedImageFileNode && watchedImageFileNode.length > 0) {
            const rawFileBufferObj = watchedImageFileNode[0];
            if (rawFileBufferObj instanceof File) {
                setImagePreviewUrl(URL.createObjectURL(rawFileBufferObj));
            }
        }
    }, [watchedImageFileNode]);

    const onHookFormWizardSubmitApply = async (formRawJsonData) => {
        if (!isEditingMode && (!formRawJsonData.image || formRawJsonData.image.length === 0)) {
            showErrorToast("Please allocate a premium background billboard banner file asset image.");
            return;
        }

        const multiPartFormDataObj = new FormData();
        multiPartFormDataObj.append('title', formRawJsonData.title.trim());
        multiPartFormDataObj.append('subtitle', (formRawJsonData.subtitle || '').trim());
        multiPartFormDataObj.append('link', formRawJsonData.link.trim());
        multiPartFormDataObj.append('orderPosition', String(formRawJsonData.orderPosition));

        if (formRawJsonData.image) {
            const cleanFileTargetReference = formRawJsonData.image instanceof FileList
                ? formRawJsonData.image[0]
                : formRawJsonData.image;

            if (cleanFileTargetReference) {
                multiPartFormDataObj.append('image', cleanFileTargetReference);
            }
        }

        if (isEditingMode) {
            dispatch(updateSlider({ id: targetEditId, data: multiPartFormDataObj }));
        } else {
            dispatch(createSlider(multiPartFormDataObj));
        }
    };

    const triggerActiveSliderEditMode = (targetSliderDocument) => {
        setIsEditingMode(true);
        setTargetEditId(targetSliderDocument._id);

        setValue('title', targetSliderDocument.title || '');
        setValue('subtitle', targetSliderDocument.subtitle || '');
        setValue('link', targetSliderDocument.link || '/products');
        setValue('orderPosition', targetSliderDocument.orderPosition || 0);
        setValue('image', null);

        setImagePreviewUrl(targetSliderDocument.image?.url || '');
    };

    const handleHardcoreSliderPurgeSubmit = (targetSliderId) => {
        if (window.confirm("Are you absolutely sure you want to permanently delete this home carousel slider billboard? This operation cannot be undone.")) {
            dispatch(deleteSlider(targetSliderId));
        }
    };

    if (loading?.fetch) {
        return (
            <div className="flex flex-col items-center justify-center py-24 space-y-3 font-sans select-none">
                <Loader2 size={24} className="animate-spin text-neutral-400 stroke-[1.2]" />
                <p className="text-[10px] text-gray-400 font-light tracking-[2px] uppercase">Retrieving Maison Carousel Configuration Files...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 select-none font-sans pb-16">

            <div>
                <h1 className="text-xl font-bold tracking-[2px] uppercase text-TEXT">Hero Sliders Hub</h1>
                <p className="text-xs text-gray-400 font-light mt-1">Design homepage media carousels, inject navigation overlays links, and regulate layouts priority orders positions.</p>
            </div>

            <Link to="/admin" className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[2px] font-semibold text-gray-400 hover:text-TEXT transition-colors duration-300 group focus:outline-none">
                <ArrowLeft size={12} className="transform group-hover:-translate-x-0.5 transition-transform" />
                <span>Back To Operations Room</span>
            </Link>


            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">


                <div className="lg:col-span-5 bg-white border border-gray-100 p-5 md:p-6 rounded-sm shadow-2xs space-y-6">
                    <div className="pb-2 border-b border-gray-50 flex items-center justify-between">
                        <h3 className="text-xs font-bold tracking-[1.5px] uppercase text-TEXT flex items-center gap-2">
                            <Plus size={14} className="text-gray-400" />
                            {isEditingMode ? "Modify Slider Formulation" : "Initialize New Billboard"}
                        </h3>
                        {isEditingMode && (
                            <button onClick={handleResetFormWizardFields} className="text-[9px] font-bold uppercase tracking-wider text-red-500 hover:text-red-700 transition-colors focus:outline-none">
                                Cancel Edit
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit(onHookFormWizardSubmitApply)} className="space-y-4 text-xs">

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Core Banner Title Heading</label>
                            <input
                                type="text"
                                placeholder="e.g., THE WINTER LUXURY OUD MATRICES"
                                {...register('title', { required: 'Slider core layout display title string is required.' })}
                                className="w-full bg-neutral-50/60 border border-gray-200/80 rounded-sm p-3 text-TEXT placeholder-gray-300 font-medium focus:outline-none"
                            />
                            {formValidationErrors.title && (
                                <p className="text-[10px] text-red-600 font-medium tracking-wide mt-0.5">{formValidationErrors.title.message}</p>
                            )}
                        </div>


                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Secondary Subtitle Tagline</label>
                            <input
                                type="text"
                                placeholder="e.g., Experience absolute high-fidelity concentration extracts at 80% compression"
                                {...register('subtitle')}
                                className="w-full bg-neutral-50/60 border border-gray-200/80 rounded-sm p-3 text-TEXT placeholder-gray-300 focus:outline-none"
                            />
                        </div>


                        <div className="grid grid-cols-2 gap-4">

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1"><Link2 size={11} /> Redirection Link</label>
                                <input
                                    type="text"
                                    {...register('link', { required: 'Target routing tracking redirection string is required.' })}
                                    className="w-full bg-neutral-50/60 border border-gray-200/80 rounded-sm p-3 text-TEXT font-mono text-[11px] focus:outline-none"
                                />
                                {formValidationErrors.link && (
                                    <p className="text-[10px] text-red-600 font-medium tracking-wide mt-0.5">{formValidationErrors.link.message}</p>
                                )}
                            </div>


                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1"><Layers size={11} /> Order Weight</label>
                                <input
                                    type="number"
                                    min="0"
                                    {...register('orderPosition', { valueAsNumber: true })}
                                    className="w-full bg-neutral-50/60 border border-gray-200/80 rounded-sm p-3 text-TEXT font-bold focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5 pt-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1"><Image size={11} /> High-Res Backdrop Asset Image</label>
                            <div className="relative border border-dashed border-gray-200 rounded-sm p-4 bg-neutral-50/30 text-center hover:bg-neutral-50/60 transition-colors group duration-300">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                                    onChange={(e) => {
                                        const embeddedFileBufferObj = e.target.files[0];
                                        if (embeddedFileBufferObj) {
                                            setValue('image', embeddedFileBufferObj, { shouldValidate: true, shouldDirty: true });
                                            setImagePreviewUrl(URL.createObjectURL(embeddedFileBufferObj));
                                        }
                                    }}
                                />

                                {imagePreviewUrl ? (
                                    <div className="w-full h-28 relative rounded-xs overflow-hidden border border-gray-100">
                                        <img src={imagePreviewUrl} alt="Slider Blueprint preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="text-[9px] uppercase tracking-widest font-extrabold text-white">Click To Modify Media</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-6 space-y-1.5">
                                        <Image size={18} className="mx-auto text-gray-300 stroke-[1.2] group-hover:scale-105 transition-transform" />
                                        <p className="text-[10px] text-gray-400 font-light uppercase tracking-wider">Drag or drop single media file assets here</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading?.mutation}
                            className="w-full bg-TEXT text-white py-3.5 text-[10px] uppercase tracking-[2px] font-bold border border-TEXT hover:bg-neutral-800 rounded-sm transition-all focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 mt-4"
                        >
                            {loading?.mutation && <RefreshCw size={12} className="animate-spin" />}
                            <span>{isEditingMode ? "Commit Formulation Update" : "Establish New Banner"}</span>
                        </button>

                    </form>
                </div>

                <div className="lg:col-span-7 bg-white border border-gray-100 p-5 md:p-6 rounded-sm shadow-2xs space-y-4">
                    <div>
                        <h3 className="text-xs font-bold tracking-[1.5px] uppercase text-TEXT">
                            Active Carousel Registry
                        </h3>
                        <p className="text-[10px] text-gray-400 font-light uppercase tracking-[0.5px] mt-0.5">
                            Live chronological display sequence currently streaming layouts on your home storefront header screens.
                        </p>
                    </div>

                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse text-xs min-w-137.5">
                            <thead>
                                <tr className="border-b border-gray-100 bg-neutral-50 text-gray-400 font-bold text-[9px] uppercase tracking-[1.5px] select-none">
                                    <th className="py-3 px-4">Banner Preview</th>
                                    <th className="py-3 px-4">Typography Meta Header</th>
                                    <th className="py-3 px-4 text-center">Weight</th>
                                    <th className="py-3 px-4 text-center">Control Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 tracking-wide text-neutral-700">
                                {sliders.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="p-12 text-center text-gray-400 font-light uppercase tracking-[0.5px]">
                                            No homepage slider billboards indexed inside the system data records yet.
                                        </td>
                                    </tr>
                                ) : (
                                    sliders.map((sliderRowNode) => {
                                        const uniqueSliderId = sliderRowNode._id || 'MOCK-SLIDER-ID';
                                        return (
                                            <tr key={uniqueSliderId} className="hover:bg-neutral-50/50 transition-colors group">


                                                <td className="py-4 px-4">
                                                    <div className="w-20 h-11 bg-neutral-50 border border-gray-100 rounded-xs overflow-hidden shrink-0">
                                                        <img
                                                            src={sliderRowNode.image?.url || '/fallback-banner.png'}
                                                            alt={sliderRowNode.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </td>


                                                <td className="py-4 px-4">
                                                    <p className="font-bold text-TEXT uppercase tracking-wide truncate max-w-50">{sliderRowNode.title}</p>
                                                    {sliderRowNode.subtitle && (
                                                        <p className="text-[10px] text-gray-400 font-sans truncate max-w-50 mt-0.5">{sliderRowNode.subtitle}</p>
                                                    )}
                                                    <p className="text-[9px] text-neutral-400 font-mono tracking-tight mt-0.5 truncate max-w-50">Path: {sliderRowNode.link}</p>
                                                </td>


                                                <td className="py-4 px-4 text-center font-mono font-bold text-TEXT select-none">
                                                    {String(sliderRowNode.orderPosition || 0).padStart(2, '0')}
                                                </td>


                                                <td className="py-4 px-4 text-center min-w-30">
                                                    <div className="flex items-center justify-center space-x-2.5">


                                                        <button
                                                            type="button"
                                                            onClick={() => triggerActiveSliderEditMode(sliderRowNode)}
                                                            className="p-1.5 border border-gray-200 text-gray-400 hover:text-TEXT hover:bg-neutral-50 rounded-sm transition-all focus:outline-none cursor-pointer"
                                                            title="Edit Billboard Settings"
                                                        >
                                                            <Edit3 size={13} />
                                                        </button>



                                                        <button
                                                            type="button"
                                                            disabled={btnLoading[uniqueSliderId]}
                                                            onClick={() => handleHardcoreSliderPurgeSubmit(uniqueSliderId)}
                                                            className="p-1.5 border border-gray-200 text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 rounded-sm transition-all cursor-pointer focus:outline-none disabled:opacity-30"
                                                            title="Purge Billboard Record"
                                                        >
                                                            {btnLoading[uniqueSliderId] ? (
                                                                <RefreshCw size={13} className="animate-spin text-red-600" />
                                                            ) : (
                                                                <Trash2 size={13} />
                                                            )}
                                                        </button>

                                                    </div>
                                                </td>

                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ManageSliders;