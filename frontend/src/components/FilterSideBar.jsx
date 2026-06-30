import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FilterSidebar = ({
    isOpen,
    onClose,
    selectedCategory,
    selectedGender,
    search,
    sortBy,
    onUpdateParams,
    onResetFilters
}) => {
    const FilterContent = () => (
        <div className="space-y-8 bg-white h-full p-6 lg:p-0">

            <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                <h3 className="text-xs font-bold tracking-[2px] uppercase text-TEXT flex items-center gap-2">
                    <SlidersHorizontal size={14} /> Filters
                </h3>
                {(selectedCategory || selectedGender || search || sortBy !== 'default') && (
                    <button
                        onClick={() => {
                            onResetFilters();
                            if (onClose) onClose();
                        }}
                        className="text-[10px] uppercase tracking-[1px] text-gray-400 hover:text-red-500 transition-colors underline underline-offset-2 cursor-pointer focus:outline-none"
                    >
                        Clear All
                    </button>
                )}
            </div>

            <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-[2px] font-bold text-gray-400">Scent Families</h4>
                <div className="space-y-2 text-xs font-light text-gray-600">
                    {[
                        { code: 'oud', label: 'Oud & Precious Woods' },
                        { code: 'fresh', label: 'Fresh Ocean Citrus' },
                        { code: 'floral', label: 'Maison Botanical Rose' },
                        { code: 'spicy', label: 'Warm Spices & Vanilla' },
                        { code: 'intense', label: 'Extrait De Parfum' },
                        { code: 'giftsets', label: 'Boutique Gift Sets' }
                    ].map((cat) => (
                        <label key={cat.code} className="flex items-center space-x-3 cursor-pointer select-none py-1 group">
                            <input
                                type="radio"
                                name="categoryFilterSide"
                                checked={selectedCategory === cat.code}
                                onChange={() => onUpdateParams('category', cat.code)}
                                className="w-3.5 h-3.5 border border-gray-300 checked:bg-TEXT accent-TEXT cursor-pointer focus:outline-none"
                            />
                            <span className={`tracking-wide transition-colors group-hover:text-TEXT ${selectedCategory === cat.code ? 'text-TEXT font-medium' : ''}`}>
                                {cat.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>


            <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-[2px] font-bold text-gray-400">Classification</h4>
                <div className="space-y-2 text-xs font-light text-gray-600">
                    {[
                        { code: 'men', label: 'Pour Homme (Men)' },
                        { code: 'women', label: 'Pour Femme (Women)' },
                        { code: 'unisex', label: 'Les Unisexes (Shared)' }
                    ].map((gen) => (
                        <label key={gen.code} className="flex items-center space-x-3 cursor-pointer select-none py-1 group">
                            <input
                                type="radio"
                                name="genderFilterSide"
                                checked={selectedGender === gen.code}
                                onChange={() => onUpdateParams('gender', gen.code)}
                                className="w-3.5 h-3.5 border border-gray-300 checked:bg-TEXT accent-TEXT cursor-pointer focus:outline-none"
                            />
                            <span className={`tracking-wide transition-colors group-hover:text-TEXT ${selectedGender === gen.code ? 'text-TEXT font-medium' : ''}`}>
                                {gen.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>


            <button
                onClick={onClose}
                className="w-full bg-TEXT text-white py-3 text-xs uppercase tracking-[2px] font-semibold border border-TEXT hover:bg-neutral-800 transition-all rounded-sm shadow-xs block lg:hidden mt-8 cursor-pointer"
            >
                Apply Filters
            </button>
        </div>
    );

    return (
        <>

            <div className="hidden lg:block bg-white border border-gray-100 rounded-sm p-6 space-y-8 shadow-2xs sticky top-24">
                <FilterContent />
            </div>


            <AnimatePresence>
                {isOpen && (
                    <>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-black/40 backdrop-blur-2xs z-50 lg:hidden"
                        />


                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
                            className="fixed top-0 bottom-0 left-0 w-70 sm:w-[320px] bg-white z-55 shadow-xl border-r border-gray-100 overflow-y-auto lg:hidden"
                        >

                            <div className="absolute top-4 right-4 text-gray-400 hover:text-TEXT transition-colors cursor-pointer z-60">
                                <button onClick={onClose} className="focus:outline-none cursor-pointer">
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="pt-12 h-full">
                                <FilterContent />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default FilterSidebar;