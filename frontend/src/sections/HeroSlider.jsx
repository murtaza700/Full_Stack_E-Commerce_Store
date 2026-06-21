import React from 'react';
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
        subtitle: "The Royal Oriental Signature",
        description:
            "Experience the profound depths of rare Cambodian oud infused with smoked leather and warm Madagascar vanilla.",
        image:
            "/slide1.webp",
        link: "#"
    },
    {
        id: 2,
        title: "Chroma Fresh EDP",
        subtitle: "A Midnight Sensory Escape",
        description:
            "A bright burst of Sicilian bergamot melting gracefully into sea salt minerals and crushed sage notes.",
        image:
            "/slide2.webp",
        link: "#"
    },
    {
        id: 3,
        title: "Maison De Rose",
        subtitle: "Elegance Captured in Glass",
        description:
            "Velvet damask rose layers wrapped around white musk crystals and patchouli leaves for an elite trailing scent aura.",
        image:
            "/slide3.webp",
        link: "#"
    }
];

const HeroSlider = () => {
    return (
        <div className="w-full h-[60vh] sm:h-[75vh] md:h-[95vh] bg-CARD-BG relative overflow-hidden select-none">
            <Swiper
                modules={[Autoplay, Navigation, Pagination, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={1000}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true, el: '.custom-pagination' }}
                navigation={{
                    nextEl: '.swiper-btn-next',
                    prevEl: '.swiper-btn-prev'
                }}
                className="w-full h-full"
            >
                {sliderData.map((slide) => (
                    <SwiperSlide
                        key={slide.id}
                        className="relative w-full h-full flex items-center"
                    >
                        <div className="absolute inset-0 w-full h-full">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className='w-full h-full object-cover object-right md:object-center scale-105 transition-transform duration-5000 ease-out'
                            />

                            <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/20 to-transparent md:from-black/60 md:via-black/30" />
                        </div>

                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex flex-col justify-center text-white">
                            <div className="max-w-xl space-y-4 md:space-y-6">
                                <motion.p
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="text-[10px] sm:text-xs uppercase tracking-[3px] font-semibold text-[#D4AF37]"
                                >
                                    {slide.subtitle}
                                </motion.p>

                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.4 }}
                                    className="font-bold text-3xl sm:text-4xl md:text-6xl tracking-[2px] leading-tight uppercase font-serif"
                                >
                                    {slide.title}
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.6 }}
                                    className="text-xs sm:text-sm text-gray-200 font-light leading-relaxed tracking-wide"
                                >
                                    {slide.description}
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                    className="pt-2"
                                >
                                    <Link
                                        to={slide.link}
                                        className="inline-flex items-center space-x-3 bg-white text-TEXT px-6 py-3 text-xs uppercase tracking-[2px] font-semibold border border-white hover:bg-transparent hover:text-white transition-all duration-300 shadow-lg active:scale-95 group rounded-sm"
                                    >
                                        <span>Discover Scent</span>
                                        <ArrowRight
                                            size={14}
                                            className="group-hover:translate-x-1.5 transition-transform duration-300"
                                        />
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                <button className="swiper-btn-prev hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 border border-white/20 hover:border-white text-white rounded-full items-center justify-center transition-all bg-black/10 hover:bg-black/30 backdrop-blur-xs cursor-pointer focus:outline-none">
                    <ChevronLeft />
                </button>

                <button className="swiper-btn-next hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 border border-white/20 hover:border-white text-white rounded-full items-center justify-center transition-all bg-black/10 hover:bg-black/30 backdrop-blur-xs cursor-pointer focus:outline-none">
                    <ChevronRight />
                </button>

                <div className="custom-pagination absolute bottom-6 left-0 right-0 z-20 flex justify-center space-x-2" />
            </Swiper>
        </div>
    );
};

export default HeroSlider;