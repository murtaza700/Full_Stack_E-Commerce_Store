import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearSliderError, fetchAllSliders } from '../../redux/slices/sliderSlice';
import { showErrorToast } from '../../helper/MyToast';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroSlider = () => {
    const dispatch = useDispatch();
    const { errors = {}, sliders = [] } = useSelector(state => state.sliders || {});
    const [currentActiveIndex, setCurrentActiveIndex] = useState(0);

    const premiumTextFadeUpVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
    };

    useEffect(() => {
        dispatch(fetchAllSliders());
    }, [dispatch]);

    useEffect(() => {
        if (errors?.fetch) {
            showErrorToast(errors.fetch || 'All slides fetching Error!');
            dispatch(clearSliderError('fetch'));
        }
    }, [dispatch, errors?.fetch]);

    if (!sliders || sliders.length === 0) {
        return (
            <div className="w-full h-[65vh] sm:h-[80vh] md:h-[95vh] bg-neutral-950 flex flex-col items-center justify-center p-4 space-y-2 select-none font-sans">
                <p className="text-[10px] text-neutral-500 font-light tracking-[3px] uppercase">Awaiting Luxury Billboard Manifests...</p>
            </div>
        );
    }

    return (
        <div className="w-full h-[65vh] sm:h-[80vh] md:h-[95vh] bg-neutral-900 relative overflow-hidden select-none user-home-hero-swiper">
            <Swiper
                modules={[Autoplay, Navigation, Pagination, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={1200}
                loop={sliders && sliders.length > 1}
                autoplay={sliders && sliders.length > 1 ? {
                    delay: 6000,
                    disableOnInteraction: false
                } : false}
                pagination={{
                    clickable: true,
                    el: '.custom-pagination'
                }}
                navigation={{
                    nextEl: '.swiper-btn-next',
                    prevEl: '.swiper-btn-prev'
                }}

                onSlideChange={(swiper) => setCurrentActiveIndex(swiper.realIndex)}
                className="w-full h-full"
            >
                {sliders.map((slide, slideIdx) => {

                    const isThisSlideCurrentlyActive = currentActiveIndex === slideIdx;

                    return (
                        <SwiperSlide
                            key={slide._id || slideIdx}
                            className="relative w-full h-full flex items-center"
                        >

                            <div className="absolute inset-0 w-full h-full overflow-hidden">
                                <img
                                    src={slide.image?.url || slide.image || '/fallback-banner.png'}
                                    alt={slide.title}
                                    className={`w-full h-full object-cover object-center transition-transform duration-6000 ease-out ${isThisSlideCurrentlyActive ? 'scale-100' : 'scale-105'
                                        }`}
                                />

                                <div className="absolute inset-0 bg-neutral-950/40 via-neutral-900/20 to-transparent bg-linear-to-r md:bg-linear-to-r md:from-black/60 md:via-neutral-950/20" />
                            </div>

                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex flex-col justify-end md:justify-center text-white pb-20 sm:pb-24 md:pb-0">
                                <motion.div
                                    initial="hidden"
                                    animate={isThisSlideCurrentlyActive ? "visible" : "hidden"}
                                    variants={{
                                        visible: { transition: { staggerChildren: 0.15 } }
                                    }}
                                    className="max-w-xl space-y-4 md:space-y-5"
                                >
                                    <motion.h2
                                        variants={premiumTextFadeUpVariants}
                                        className="font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-[4px] leading-tight uppercase font-serif"
                                    >
                                        {slide.title}
                                    </motion.h2>

                                    {slide.subtitle && (
                                        <motion.p
                                            variants={premiumTextFadeUpVariants}
                                            className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed tracking-wide max-w-md uppercase"
                                        >
                                            {slide.subtitle}
                                        </motion.p>
                                    )}

                                    <motion.div
                                        variants={premiumTextFadeUpVariants}
                                        className="pt-3"
                                    >
                                        <Link
                                            to={slide.link || '/products'}
                                            className="inline-flex items-center space-x-4 bg-white text-neutral-950 px-7 py-3.5 text-[10px] uppercase tracking-[2px] font-bold border border-white hover:bg-transparent hover:text-white transition-all duration-300 active:scale-95 group rounded-sm shadow-sm"
                                        >
                                            <span>Discover Formulation</span>
                                            <ArrowRight
                                                size={12}
                                                className="group-hover:translate-x-2 transition-transform duration-300 stroke-2"
                                            />
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </SwiperSlide>
                    );
                })}

                <button className="swiper-btn-prev hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border border-white/10 hover:border-white/40 text-white rounded-full items-center justify-center transition-all bg-black/5 hover:bg-black/20 backdrop-blur-xs cursor-pointer focus:outline-none">
                    <ChevronLeft size={18} className="stroke-[1.5]" />
                </button>

                <button className="swiper-btn-next hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border border-white/10 hover:border-white/40 text-white rounded-full items-center justify-center transition-all bg-black/5 hover:bg-black/20 backdrop-blur-xs cursor-pointer focus:outline-none">
                    <ChevronRight size={18} className="stroke-[1.5]" />
                </button>

                <div className="custom-pagination absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-2.5" />
            </Swiper>
        </div>
    );
};

export default HeroSlider;