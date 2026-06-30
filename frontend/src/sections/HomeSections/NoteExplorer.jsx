import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const notesData = [
    {
        id: 1,
        title: "Oud & Intense",
        subtitle: "Deep • Smoky • Oriental",
        description: "Rich Cambodian oud wood layers infused with warm amber resins and premium dark leather configurations.",
        image: "/oud&intense.webp",
        link: "/products?category=oud",
        alignLeft: true
    },
    {
        id: 2,
        title: "Fresh & Floral",
        subtitle: "Citrus • Crisp • Botanical",
        description: "Bright Sicilian bergamot extracts paired elegantly with crushed velvet rose layers and white musk crystals.",
        image: "fresh&floral.webp",
        link: "/products?category=fresh",
        alignLeft: false
    }
];

const NoteExplorer = () => {
    return (
        <section className="bg-[#FBFBFB] select-none py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100/60">
            <div className="max-w-7xl mx-auto space-y-16">

                <div className="text-center space-y-2">
                    <p className="text-[10px] tracking-[3px] uppercase font-semibold text-[#D4AF37]">Olfactory Discovery</p>
                    <h2 className="text-xl font-bold tracking-[2px] uppercase text-TEXT">Scent Note Explorer</h2>
                </div>

                <div className="space-y-16 md:space-y-28">
                    {notesData.map((note, index) => (
                        <div
                            key={note.id}
                            className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${note.alignLeft ? '' : 'md:flex-row-reverse'
                                }`}
                        >

                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7 }}
                                className="w-full md:w-1/2 h-75 sm:h-100 md:h-112.5 border border-gray-100 rounded-sm overflow-hidden bg-gray-100 shadow-2xs group relative"
                            >
                                <img
                                    src={note.image}
                                    alt={note.title}
                                    className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-103 transition-transform duration-4000 ease-out"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: note.alignLeft ? 20 : -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="w-full md:w-1/2 space-y-4 md:space-y-6 text-center md:text-left flex flex-col items-center md:items-start"
                            >
                                <p className="text-[10px] uppercase tracking-[3px] font-semibold text-[#D4AF37]">
                                    {note.subtitle}
                                </p>
                                <h3 className="font-bold text-2xl tracking-[2px] uppercase text-TEXT font-serif">
                                    {note.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed tracking-wide text-center md:text-left max-w-md text-balance">
                                    {note.description}
                                </p>

                                <div className="pt-2">
                                    <Link
                                        to={note.link}
                                        className="inline-flex items-center space-x-3 bg-TEXT text-white px-6 py-3.5 text-xs uppercase tracking-[2px] font-semibold border border-TEXT hover:bg-transparent hover:text-TEXT transition-all duration-300 shadow-xs active:scale-95 group rounded-sm cursor-pointer"
                                    >
                                        <span>Explore Formula</span>
                                        <ArrowRight size={13} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default NoteExplorer;