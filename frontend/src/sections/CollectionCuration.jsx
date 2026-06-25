import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const categoriesData = [
    {
        id: 1,
        title: "Pour Homme",
        subtitle: "For Men",
        image: "/man.webp",
        link: "/products?gender=men"
    },
    {
        id: 2,
        title: "Pour Femme",
        subtitle: "For Women",
        image: "/woman.webp",
        link: "/products?gender=women"
    },
    {
        id: 3,
        title: "Les Unisexes",
        subtitle: "Shared Scent Profiles",
        image: "/unisex.webp",
        link: "/products?gender=unisex"
    }
];

const CollectionCuration = () => {
    return (
        <section className="bg-white select-none py-16 md:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-12">


                <div className="text-center md:text-left space-y-2">
                    <p className="text-[10px] tracking-[3px] uppercase font-semibold text-[#D4AF37]">Explore Frameworks</p>
                    <h2 className="text-xl font-bold tracking-[2px] uppercase text-TEXT">Curated Classifications</h2>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {categoriesData.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="group relative h-112.5 sm:h-125 md:h-120 lg:h-135 border border-gray-100 rounded-sm overflow-hidden bg-gray-50 shadow-2xs"
                        >

                            <div className="absolute inset-0 w-full h-full">
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/30 opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                            </div>

                            <div className="absolute top-5 right-5 text-white/50 group-hover:text-white transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                                <ArrowUpRight size={18} />
                            </div>


                            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white space-y-2 flex flex-col justify-end">
                                <p className="text-[9px] uppercase tracking-[3px] font-medium text-gray-300/80 group-hover:text-[#D4AF37] transition-colors duration-300">
                                    {category.subtitle}
                                </p>
                                <h3 className="font-bold text-lg sm:text-xl tracking-[3px] uppercase font-serif">
                                    {category.title}
                                </h3>


                                <div className="pt-2 overflow-hidden h-6 relative hidden sm:block">
                                    <Link
                                        to={category.link}
                                        className="text-[10px] uppercase tracking-[2px] font-semibold text-white/90 group-hover:text-white inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full v after:bg-white after:transform after:scale-x-0 group-hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300 cursor-pointer"
                                    >
                                        Browse Line
                                    </Link>
                                </div>


                                <Link
                                    to={category.link}
                                    className="absolute inset-0 z-20 sm:hidden"
                                />
                            </div>

                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CollectionCuration;