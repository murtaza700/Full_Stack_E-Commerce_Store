import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const sliderData = [
    {
        id: 1,
        title: "Oud Intense",
        subtitle: "The Royal Oriental Signature / Series I",
        description: "Experience the profound depths of rare Cambodian oud infused with smoked leather and warm Madagascar vanilla matrices.",
        image: "/slide1.webp",
        link: "/products"
    },
    {
        id: 2,
        title: "Chroma Fresh",
        subtitle: "A Midnight Sensory Escape / Series II",
        description: "A bright burst of Sicilian bergamot melting gracefully into sea salt minerals and crushed organic sage formulation notes.",
        image: "/slide2.webp",
        link: "/products"
    },
    {
        id: 3,
        title: "Maison De Rose",
        subtitle: "Elegance Captured in Glass / Series III",
        description: "Velvet damask rose layers wrapped around white musk crystals and Indonesian patchouli leaves for an elite trailing aura.",
        image: "/slide3.webp",
        link: "/products"
    }
];

const HeroSlider = () => {
    // ✅ FIXING ANIMATION BUG: Tracks active slide matrix index to re-trigger Framer Motion on every change smoothly
    const [currentActiveIndex, setCurrentActiveIndex] = useState(0);

    // Luxury animation configurations presets definitions
    const premiumTextFadeUpVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <div className="w-full h-[65vh] sm:h-[80vh] md:h-[95vh] bg-neutral-900 relative overflow-hidden select-none">
            <Swiper
                modules={[Autoplay, Navigation, Pagination, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={1200} // Slowed down speed for a highly graceful transition feel
                loop={true}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                pagination={{ clickable: true, el: '.custom-pagination' }}
                navigation={{
                    nextEl: '.swiper-btn-next',
                    prevEl: '.swiper-btn-prev'
                }}
                // ✅ TRIGGER INTERCEPTION: Fires state updates forcing animation cycles to rerun seamlessly
                onSlideChange={(swiper) => setCurrentActiveIndex(swiper.realIndex)}
                className="w-full h-full"
            >
                {sliderData.map((slide, slideIdx) => {
                    // Determines explicitly if this loop item matches currently visible screen index variables
                    const isThisSlideCurrentlyActive = currentActiveIndex === slideIdx;

                    return (
                        <SwiperSlide
                            key={slide.id}
                            className="relative w-full h-full flex items-center"
                        >
                            {/* Visual Asset Background Wrapper Desk */}
                            <div className="absolute inset-0 w-full h-full overflow-hidden">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    // Slow fluid parallax style zoom effect mapping standard
                                    className={`w-full h-full object-cover object-center transition-transform duration-[6000ms] ease-out ${isThisSlideCurrentlyActive ? 'scale-100' : 'scale-105'
                                        }`}
                                />
                                {/* Refined High-End Dark Vignette Veil Grid Protection Overlay */}
                                <div className="absolute inset-0 bg-neutral-950/40 via-neutral-900/20 to-transparent bg-gradient-to-r md:bg-gradient-to-r md:from-black/60 md:via-neutral-950/20" />
                            </div>

                            {/* Narrative Typography Central Alignment Workspace Card */}
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex flex-col justify-center text-white">
                                <motion.div
                                    // Custom control properties linking directly into active tracker indexes
                                    initial="hidden"
                                    animate={isThisSlideCurrentlyActive ? "visible" : "hidden"}
                                    variants={{
                                        visible: { transition: { staggerChildren: 0.15 } }
                                    }}
                                    className="max-w-xl space-y-4 md:space-y-5"
                                >
                                    {/* Muted Premium Luxury Brass Gold Color Tag Selector */}
                                    <motion.p
                                        variants={premiumTextFadeUpVariants}
                                        className="text-[10px] sm:text-xs uppercase tracking-[4px] font-bold text-[#C5A880]"
                                    >
                                        {slide.subtitle}
                                    </motion.p>

                                    <motion.h2
                                        variants={premiumTextFadeUpVariants}
                                        className="font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-[4px] leading-tight uppercase font-serif"
                                    >
                                        {slide.title}
                                    </motion.h2>

                                    <motion.p
                                        variants={premiumTextFadeUpVariants}
                                        className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed tracking-wide max-w-md uppercase"
                                    >
                                        {slide.description}
                                    </motion.p>

                                    <motion.div
                                        variants={premiumTextFadeUpVariants}
                                        className="pt-3"
                                    >
                                        <Link
                                            to={slide.link}
                                            className="inline-flex items-center space-x-4 bg-white text-neutral-950 px-7 py-3.5 text-[10px] uppercase tracking-[2px] font-bold border border-white hover:bg-transparent hover:text-white transition-all duration-300 active:scale-95 group rounded-sm shadow-sm"
                                        >
                                            <span>Discover Formulation</span>
                                            <ArrowRight
                                                size={12}
                                                className="group-hover:translate-x-2 transition-transform duration-300 stroke-[2]"
                                            />
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </SwiperSlide>
                    );
                })}

                {/* Minimalist circular outline navigation trigger buttons controls rows */}
                <button className="swiper-btn-prev hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border border-white/10 hover:border-white/40 text-white rounded-full items-center justify-center transition-all bg-black/5 hover:bg-black/20 backdrop-blur-xs cursor-pointer focus:outline-none">
                    <ChevronLeft size={18} className="stroke-[1.5]" />
                </button>

                <button className="swiper-btn-next hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border border-white/10 hover:border-white/40 text-white rounded-full items-center justify-center transition-all bg-black/5 hover:bg-black/20 backdrop-blur-xs cursor-pointer focus:outline-none">
                    <ChevronRight size={18} className="stroke-[1.5]" />
                </button>

                {/* Unified Custom Pagination Indicators Node Anchor */}
                <div className="custom-pagination absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-2.5" />
            </Swiper>
        </div>
    );
};

export default HeroSlider;