import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Truck, Sparkles, Gift } from 'lucide-react';

const badgesData = [
    {
        id: 1,
        icon: <ShieldCheck size={28} strokeWidth={1.2} />,
        title: "100% Authentic",
        description: "Pure French & premium Oriental oils guaranteed original."
    },
    {
        id: 2,
        icon: <Truck size={28} strokeWidth={1.2} />,
        title: "Complimentary Delivery",
        description: "Free shipping nationwide on all orders above Rs. 500."
    },
    {
        id: 3,
        icon: <Sparkles size={28} strokeWidth={1.2} />,
        title: "Signature Sillage",
        description: "Masterfully formulated for long-lasting premium trail aura."
    },
    {
        id: 4,
        icon: <Gift size={28} strokeWidth={1.2} />,
        title: "Boutique Packaging",
        description: "Every order arrives encapsulated in our signature luxury gift box."
    }
];

const TrustBadges = () => {
    return (
        <section className="bg-white select-none py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                    {badgesData.map((badge, index) => (
                        <motion.div
                            key={badge.id}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center text-center space-y-4 group p-4"
                        >
                            <div className="text-TEXT group-hover:text-[#D4AF37] transform group-hover:scale-105 transition-all duration-500 ease-out">
                                {badge.icon}
                            </div>

                            <div className="space-y-1.5">
                                <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-[2px] text-TEXT">
                                    {badge.title}
                                </h3>
                                <p className="text-[11px] text-gray-400 font-light leading-relaxed tracking-wide max-w-60 mx-auto text-balance">
                                    {badge.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TrustBadges;