import React from 'react';
import { motion } from 'motion/react';
import { FaInstagram } from 'react-icons/fa';

const instaImages = [
    "/insta/insta1.webp",
    "/insta/insta2.webp",
    "/insta/insta3.webp",
    "/insta/insta4.webp",
    "/insta/insta5.webp"
];

const HomeExtensions = () => {
    return (
        <div className="bg-white select-none selection:bg-TEXT selection:text-white">

            <section className="py-16 border-t border-gray-100/70">
                <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-1">
                        <p className="text-[9px] tracking-[3px] uppercase font-semibold text-[#D4AF37]">Share Your Sensory Vibe</p>
                        <h2 className="text-sm font-bold tracking-[2px] uppercase text-TEXT">#ScentsôMaison</h2>
                    </div>


                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {instaImages.map((img, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.97 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="relative aspect-square border border-gray-100 rounded-sm overflow-hidden group bg-gray-50 cursor-pointer"
                            >
                                <img src={img} alt="Lifestyle curation layout" className="w-full h-full object-cover transform scale-100 group-hover:scale-103 transition-transform duration-500 ease-out" />
                            
                                <div className="absolute inset-0 bg-black/40 backdrop-blur-2xs opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                                    <FaInstagram size={20} className="text-white transform scale-90 group-hover:scale-100 transition-transform duration-300" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* News Letter */}
            <section className="py-16 md:py-24 border-t border-gray-100 bg-[#FBFBFB]">
                <div className="max-w-2xl mx-auto text-center px-4 space-y-6">
                    <div className="space-y-2">
                        <p className="text-[10px] tracking-[3px] uppercase font-semibold text-[#D4AF37]">The Scent Club</p>
                        <h2 className="text-xl font-bold tracking-[2px] uppercase text-TEXT">Subscribe to Elite Narratives</h2>
                        <p className="text-xs text-gray-400 font-light max-w-sm mx-auto text-balance">
                            Receive privileged access to private collections, limited edition releases, and olfactory stories.
                        </p>
                    </div>

                    <form onSubmit={(e) => e.preventDefault()} className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto w-full">
                        <input
                            type="email"
                            placeholder="YOUR EMAIL ADDRESS"
                            className="w-full py-3 px-4 border border-gray-200 text-xs tracking-wider text-TEXT bg-white rounded-sm focus:border-TEXT focus:outline-none placeholder-gray-300 transition-colors font-light"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full sm:w-auto bg-TEXT text-white px-6 py-3 text-xs uppercase tracking-[2px] font-semibold border border-TEXT hover:bg-transparent hover:text-TEXT transition-all duration-300 rounded-sm shadow-xs active:scale-95 cursor-pointer whitespace-nowrap"
                        >
                            Join Maison
                        </button>
                    </form>
                </div>
            </section>

        </div>
    );
};

export default HomeExtensions;