import React from 'react';
import { motion } from 'motion/react';

const BrandManifesto = () => {
    return (
        <section className="bg-white border-y border-gray-100 select-none py-16 md:py-24 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6">


                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-[10px] sm:text-xs font-semibold tracking-[4px] uppercase text-[#D4AF37]"
                >
                    La Maison Scentsô
                </motion.h3>


                <motion.h2
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg sm:text-xl md:text-2xl font-light tracking-[2px] leading-relaxed sm:leading-loose text-TEXT text-balance"
                >
                    Crafting olfactory poetry. Experiencing elite sensory space through <span className="font-medium border-b border-gray-200 pb-0.5">masterfully distilled</span> extraction lines designed to trigger timeless memories.
                </motion.h2>

           
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="w-12 h-px bg-gray-300 mx-auto mt-6"
                />

            </div>
        </section>
    );
};

export default BrandManifesto;