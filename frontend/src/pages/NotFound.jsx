import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Compass, AlertCircle } from 'lucide-react';

import Meta from '../components/Meta';

const NotFound = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, ease: 'easeOut' } }
    };

    const elementFadeUpVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <>
            <Meta
                title="Scent Profile Lost"
                description="The luxury fragrance formulation path or boutique catalog registry entry rows you are searching for does not exist inside our active framework records bounds."
            />

            <div className="min-h-screen bg-[#FBFBFB] flex flex-col items-center justify-center p-4 text-center font-sans select-none selection:bg-TEXT selection:text-white antialiased">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="max-w-md w-full space-y-6 md:space-y-8"
                >

                    <motion.div
                        variants={elementFadeUpVariants}
                        className="relative w-20 h-24 bg-white border border-gray-100 rounded-sm flex items-center justify-center text-TEXT shadow-2xs mx-auto group duration-500"
                    >
                        <Compass size={28} className="stroke-[1.1] animate-pulse text-gray-400 group-hover:text-TEXT transition-colors duration-500" />
                        <div className="absolute -top-1 -right-1 bg-neutral-900 text-white p-0.5 rounded-full border border-white">
                            <AlertCircle size={10} className="stroke-2" />
                        </div>
                    </motion.div>


                    <div className="space-y-3">
                        <motion.span
                            variants={elementFadeUpVariants}
                            className="text-[10px] tracking-[4px] uppercase font-bold text-[#D4AF37] block"
                        >
                            Error Code 404
                        </motion.span>
                        <motion.h1
                            variants={elementFadeUpVariants}
                            className="font-extrabold text-2xl md:text-3xl tracking-[3px] uppercase text-TEXT font-serif leading-tight"
                        >
                            Scent Profile Lost
                        </motion.h1>
                    </div>

                    <motion.p
                        variants={elementFadeUpVariants}
                        className="text-xs text-gray-400 font-light leading-relaxed uppercase tracking-[0.5px] max-w-sm mx-auto"
                    >
                        The specific fragrance formulation or tracking manifest registry corridor you are attempting to trace does not map to our live database index collection nodes.
                    </motion.p>

                    <motion.div
                        variants={elementFadeUpVariants}
                        className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-3"
                    >

                        <Link
                            to="/"
                            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-TEXT text-white px-6 py-3 text-[10px] uppercase tracking-[2px] font-bold border border-TEXT hover:bg-neutral-800 rounded-sm transition-all duration-300 shadow-3xs active:scale-97 group focus:outline-none"
                        >
                            <ArrowLeft size={12} className="transform group-hover:-translate-x-0.5 transition-transform" />
                            <span>Return To Home</span>
                        </Link>


                        <Link
                            to="/products"
                            className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-TEXT px-6 py-3 text-[10px] uppercase tracking-[2px] font-bold border border-gray-200 hover:border-TEXT rounded-sm transition-all duration-300 shadow-3xs active:scale-97 focus:outline-none"
                        >
                            Explore Formulas Range
                        </Link>
                    </motion.div>


                    <motion.div
                        variants={elementFadeUpVariants}
                        className="text-[9px] uppercase tracking-[2px] text-gray-300/80 font-mono font-light pt-8 select-none"
                    >
                        [ System Trace Corridor Broken ]
                    </motion.div>

                </motion.div>
            </div>
        </>
    );
};

export default NotFound;