import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ShieldAlert, Terminal, HelpCircle } from 'lucide-react';

const AdminNotFound = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, ease: 'easeOut' } }
    };

    const elementFadeUpVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-6 text-center font-sans select-none selection:bg-TEXT selection:text-white">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-md w-full space-y-6 md:space-y-7"
            >

                <motion.div
                    variants={elementFadeUpVariants}
                    className="relative w-20 h-20 bg-neutral-900 border border-neutral-800 rounded-xs flex items-center justify-center text-white shadow-sm mx-auto group duration-500"
                >
                    <Terminal size={24} className="stroke-[1.3] text-neutral-400 group-hover:text-white transition-colors duration-500 animate-pulse" />
                    <div className="absolute -top-1.5 -right-1.5 bg-red-600 text-white p-0.5 rounded-full border border-neutral-900 shadow-sm animate-bounce">
                        <ShieldAlert size={11} className="stroke-2" />
                    </div>
                </motion.div>


                <div className="space-y-2">
                    <motion.span
                        variants={elementFadeUpVariants}
                        className="text-[9px] tracking-[3px] uppercase font-bold text-red-500 block font-mono"
                    >
                        CONSOLE ERROR_CODE: 404_NOT_FOUND
                    </motion.span>
                    <motion.h1
                        variants={elementFadeUpVariants}
                        className="font-bold text-xl md:text-2xl tracking-[2px] uppercase text-TEXT leading-tight"
                    >
                        Terminal Route Severed
                    </motion.h1>
                </div>

                <motion.p
                    variants={elementFadeUpVariants}
                    className="text-xs text-gray-400 font-light leading-relaxed max-w-sm mx-auto uppercase tracking-[0.5px]"
                >
                    The targeted admin management route node or data token parameters matrix you requested does not exist within the current console application configuration trees.
                </motion.p>


                <motion.div
                    variants={elementFadeUpVariants}
                    className="pt-3 flex flex-col sm:flex-row justify-center items-center gap-3"
                >

                    <Link
                        to="/admin"
                        className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-TEXT text-white px-5 py-3 text-[10px] uppercase tracking-[2px] font-bold border border-TEXT hover:bg-neutral-800 rounded-sm transition-all duration-300 shadow-3xs active:scale-97 group focus:outline-none"
                    >
                        <ArrowLeft size={12} className="transform group-hover:-translate-x-0.5 transition-transform" />
                        <span>Return To Dashboard</span>
                    </Link>

                    <Link
                        to="/admin/products"
                        className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-TEXT px-5 py-3 text-[10px] uppercase tracking-[2px] font-bold border border-gray-200 hover:border-TEXT rounded-sm transition-all duration-300 shadow-3xs active:scale-97 focus:outline-none"
                    >
                        Manage Products Catalog
                    </Link>
                </motion.div>


                <motion.div
                    variants={elementFadeUpVariants}
                    className="pt-8 text-[9px] uppercase tracking-[2px] text-gray-300/80 font-mono font-light select-none flex items-center justify-center gap-1.5"
                >
                    <HelpCircle size={11} className="text-gray-300" /> [ Security Boundaries Guarded ]
                </motion.div>

            </motion.div>
        </div>
    );
};

export default AdminNotFound;