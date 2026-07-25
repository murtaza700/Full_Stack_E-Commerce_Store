import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom'
import { Compass, Sparkles, ShieldCheck, Feather, Eye, Globe } from 'lucide-react';

import Meta from '../components/Meta';

const AboutPage = () => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.25, ease: 'easeOut' } }
    };

    const textFadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <>
            <Meta
                title="Our Heritage & Artisan Story"
                description="Step inside the legacy of Scentsô. Discover our unmatched dedication to artisanal fragrance profiles, master formulation chemistry, and rare botanical sourcing loops."
                keywords="perfume house history, luxury fragrance creation, artisan perfumers, maison scent legacy, raw perfume oils sourcing"
            />

            <div className="bg-[#FBFBFB] min-h-screen text-TEXT antialiased select-none font-sans overflow-hidden selection:bg-TEXT selection:text-white">

                <div className="relative bg-white border-b border-gray-100 py-24 md:py-32 text-center overflow-hidden">

                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none" />

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-4xl mx-auto px-4 relative z-10 space-y-6"
                    >
                        <motion.span
                            variants={textFadeUpVariants}
                            className="text-[10px] tracking-[4px] text-gray-400 uppercase font-bold block"
                        >
                            Established MMXXVI — The Heritage
                        </motion.span>

                        <motion.h1
                            variants={textFadeUpVariants}
                            className="text-3xl md:text-5xl font-extrabold tracking-[5px] uppercase text-TEXT font-serif leading-tight"
                        >
                            Scentsô<br />
                            <span className="text-xl md:text-2xl font-light tracking-[8px] text-gray-400 block mt-2 lowercase italic">
                                la maison olfactive
                            </span>
                        </motion.h1>

                        <motion.div
                            variants={textFadeUpVariants}
                            className="w-12 h-[1px] bg-TEXT mx-auto my-6"
                        />

                        <motion.p
                            variants={textFadeUpVariants}
                            className="text-xs md:text-sm text-gray-500 font-light max-w-2xl mx-auto leading-relaxed uppercase tracking-[1px]"
                        >
                            We do not merely assemble fragrance formulas; we archive memory parameters. Scentsô is an avant-garde digital boutique designed to curate premium, high-fidelity olfactory experiences for the modern elite collector.
                        </motion.p>
                    </motion.div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
                    >

                        <div className="lg:col-span-5 space-y-4">
                            <motion.span variants={textFadeUpVariants} className="text-[9px] uppercase tracking-[3px] font-bold text-gray-400 block">
                                Our Philosophy
                            </motion.span>
                            <motion.h2 variants={textFadeUpVariants} className="text-xl md:text-2xl font-bold tracking-[3px] uppercase text-TEXT">
                                Archiving The Invisible Elements
                            </motion.h2>
                            <motion.div variants={textFadeUpVariants} className="w-8 h-[2px] bg-neutral-200 mt-2" />
                        </div>


                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-sans leading-relaxed text-gray-500 font-light">
                            <motion.p variants={textFadeUpVariants} className="space-y-2 uppercase tracking-[0.5px]">
                                Every Formulation Curated Within The Scentsô Vault Is Created In Collaboration With Multi-Generational Artisans. We Defy The Guidelines Of Mass Commercial Production, Prioritizing Rare Extraction Protocols, High Sillage Metrics, And Absolute Structural Purity.
                            </motion.p>

                            <motion.p variants={textFadeUpVariants} className="space-y-2 uppercase tracking-[0.5px] border-l border-neutral-100 pl-6">
                                By Aligning Precision Modern E-Commerce Engineering Frameworks With Classical Fine Perfumery Artistry, We Provide An Airtight Sandbox Where Collectors Secure Not Just Fluid Scent Molecules, But Singular Sensory Identities Flawlessly.
                            </motion.p>
                        </div>
                    </motion.div>
                </div>

                <div className="bg-white border-y border-gray-100/80 py-20 md:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={containerVariants}
                            className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14"
                        >

                            <motion.div variants={textFadeUpVariants} className="space-y-4 group">
                                <div className="w-10 h-10 bg-neutral-50 border border-neutral-100 rounded-sm flex items-center justify-center text-TEXT group-hover:bg-TEXT group-hover:text-white transition-all duration-500 shadow-3xs">
                                    <Feather size={16} className="stroke-[1.2]" />
                                </div>
                                <h3 className="text-xs font-bold tracking-[2px] uppercase text-TEXT">Artisanal Extraction</h3>
                                <p className="text-[11px] text-gray-400 font-light leading-relaxed uppercase tracking-[0.5px]">
                                    We harvest rare botanical species from targeted micro-climates. Our oils undergo slow pressure distillation to capture pristine olfactory signatures.
                                </p>
                            </motion.div>


                            <motion.div variants={textFadeUpVariants} className="space-y-4 group">
                                <div className="w-10 h-10 bg-neutral-50 border border-neutral-100 rounded-sm flex items-center justify-center text-TEXT group-hover:bg-TEXT group-hover:text-white transition-all duration-500 shadow-3xs">
                                    <Compass size={16} className="stroke-[1.2]" />
                                </div>
                                <h3 className="text-xs font-bold tracking-[2px] uppercase text-TEXT">High-Fidelity Sillage</h3>
                                <p className="text-[11px] text-gray-400 font-light leading-relaxed uppercase tracking-[0.5px]">
                                    Every single fragrance batch is mathematically tested in our sandboxed laboratory to exceed standard sillage limits and ensure lasting aromatic hold.
                                </p>
                            </motion.div>


                            <motion.div variants={textFadeUpVariants} className="space-y-4 group">
                                <div className="w-10 h-10 bg-neutral-50 border border-neutral-100 rounded-sm flex items-center justify-center text-TEXT group-hover:bg-TEXT group-hover:text-white transition-all duration-500 shadow-3xs">
                                    <ShieldCheck size={16} className="stroke-[1.2]" />
                                </div>
                                <h3 className="text-xs font-bold tracking-[2px] uppercase text-TEXT">Boutique Shield Guard</h3>
                                <p className="text-[11px] text-gray-400 font-light leading-relaxed uppercase tracking-[0.5px]">
                                    100% transparent tracking channels. From sustainable estate cultivation directly to our custom layout checkout queues, your vault identity is secure.
                                </p>
                            </motion.div>
                        </motion.div>

                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 border-b border-gray-100/50">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                    >

                        <div className="space-y-6">
                            <span className="text-[9px] uppercase tracking-[3px] font-bold text-gray-400 block">
                                Our Ambition
                            </span>
                            <h2 className="text-xl md:text-2xl font-bold tracking-[3px] uppercase text-TEXT">
                                The Precision Corridor Of Olfactory Arts
                            </h2>
                            <div className="w-8 h-[2px] bg-neutral-900" />
                            <p className="text-xs font-light text-gray-500 leading-relaxed uppercase tracking-[0.5px]">
                                By merging state-of-the-art software systems with classical niche formulations, we have established a luxury destination. Scentsô breaks traditional digital retail limitations, providing a tactile, high-fidelity curation model that ensures complete sensory connection upon every unique order dispatch.
                            </p>
                        </div>


                        <div className="grid grid-cols-2 gap-4">

                            <div className="bg-white border border-gray-100 p-6 rounded-sm space-y-2 shadow-3xs">
                                <Eye size={14} className="text-gray-400" />
                                <div className="text-xl font-mono font-bold tracking-tight text-TEXT">99.4%</div>
                                <div className="text-[9px] font-bold uppercase tracking-[1px] text-gray-400">Sillage Precision Retention Rate</div>
                            </div>


                            <div className="bg-white border border-gray-100 p-6 rounded-sm space-y-2 shadow-3xs">
                                <Globe size={14} className="text-gray-400" />
                                <div className="text-xl font-mono font-bold tracking-tight text-TEXT">14+</div>
                                <div className="text-[9px] font-bold uppercase tracking-[1px] text-gray-400">Global Micro-Climate Artisanal Hubs</div>
                            </div>


                            <div className="bg-white border border-gray-100 p-6 rounded-sm space-y-2 shadow-3xs">
                                <Sparkles size={14} className="text-gray-400" />
                                <div className="text-xl font-mono font-bold tracking-tight text-TEXT">100%</div>
                                <div className="text-[9px] font-bold uppercase tracking-[1px] text-gray-400">Rare Extraction Sourcing Purity</div>
                            </div>


                            <div className="bg-white border border-gray-100 p-6 rounded-sm space-y-2 shadow-3xs">
                                <ShieldCheck size={14} className="text-gray-400" />
                                <div className="text-xl font-mono font-bold tracking-tight text-TEXT">MMXXVI</div>
                                <div className="text-[9px] font-bold uppercase tracking-[1px] text-gray-400">Digital Archive Launch Identity</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="py-24 text-center bg-white border-t border-gray-100/50">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl mx-auto px-4 space-y-6"
                    >
                        <h3 className="text-sm font-bold tracking-[3px] uppercase text-TEXT">
                            Begin Your Olfactory Journey
                        </h3>

                        <p className="text-[11px] text-gray-400 font-light leading-relaxed uppercase tracking-[1px] max-w-md mx-auto">
                            Explore our archived collection of rare extractions and secure your definitive sensory signature today.
                        </p>

                        <div className="pt-2">
                            <Link
                                to="/products"
                                className="inline-flex bg-TEXT text-white px-7 py-3.5 text-[10px] uppercase tracking-[2px] font-semibold border border-TEXT hover:bg-neutral-800 active:scale-95 transition-all duration-300 rounded-sm shadow-xs focus:outline-none"
                            >
                                Explore The Collection Vault
                            </Link>
                        </div>
                    </motion.div>
                </div>

            </div>
        </>
    );
};

export default AboutPage;