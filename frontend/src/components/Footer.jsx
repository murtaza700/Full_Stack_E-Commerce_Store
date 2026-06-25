import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-100 text-TEXT select-none font-sans pt-16 pb-8 selection:bg-TEXT selection:text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Upper Section: Split Links Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-gray-100">

                    {/* Brand Meta Column */}
                    <div className="space-y-4 text-center sm:text-left">
                        <h2 className="font-bold text-xl tracking-[4px] uppercase text-TEXT">
                            Scentsô
                        </h2>
                        <p className="text-xs text-gray-400 font-light leading-relaxed tracking-wide text-balance">
                            Crafting premium olfactory art. Experience an elite sensory atmosphere built around rare ingredients.
                        </p>
                        {/* Social Links Utilities Tray */}
                        <div className="flex justify-center sm:justify-start items-center space-x-4 pt-2 text-gray-400">
                            <a href="#" className="hover:text-TEXT transition-colors duration-300"><FaInstagram size={16} strokeWidth={1.5} /></a>
                            <a href="#" className="hover:text-TEXT transition-colors duration-300"><FaFacebook size={16} strokeWidth={1.5} /></a>
                            <a href="#" className="hover:text-TEXT transition-colors duration-300"><FaTwitter size={16} strokeWidth={1.5} /></a>
                        </div>
                    </div>

                    {/* Column 2: Boutique Shop Links */}
                    <div className="space-y-4 text-center sm:text-left">
                        <h4 className="text-[10px] uppercase tracking-[2px] font-bold text-gray-400">Collections</h4>
                        <ul className="space-y-2.5 text-xs font-light text-gray-500">
                            <li><Link to="/products" className="hover:text-TEXT transition-colors">Shop All Fragrances</Link></li>
                            <li><Link to="/products?category=oud" className="hover:text-TEXT transition-colors">Oud & Precious Wood</Link></li>
                            <li><Link to="/products?category=fresh" className="hover:text-TEXT transition-colors">Fresh Ocean Minerals</Link></li>
                            <li><Link to="/products?category=floral" className="hover:text-TEXT transition-colors">Botanical Collections</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Customer Service Portals */}
                    <div className="space-y-4 text-center sm:text-left">
                        <h4 className="text-[10px] uppercase tracking-[2px] font-bold text-gray-400">Client Support</h4>
                        <ul className="space-y-2.5 text-xs font-light text-gray-500">
                            <li><Link to="/profile" className="hover:text-TEXT transition-colors">My Account Portfolio</Link></li>
                            <li><Link to="/orders/track" className="hover:text-TEXT transition-colors">Track Active Shipment</Link></li>
                            <li><Link to="/support/terms" className="hover:text-TEXT transition-colors">Privacy & Terms Policy</Link></li>
                            <li><Link to="/support/refunds" className="hover:text-TEXT transition-colors">Returns & Exchange Guide</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Coordinates */}
                    <div className="space-y-4 text-center sm:text-left">
                        <h4 className="text-[10px] uppercase tracking-[2px] font-bold text-gray-400">The Maison</h4>
                        <ul className="space-y-3 text-xs font-light text-gray-500 flex flex-col items-center sm:items-start">
                            <li className="flex items-center gap-2.5 text-center sm:text-left text-balance">
                                <MapPin size={14} className="text-TEXT shrink-0" strokeWidth={1.5} />
                                <span>Boutique 45, Gulberg Galleria, Lahore</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Mail size={14} className="text-TEXT shrink-0" strokeWidth={1.5} />
                                <span>murtazakasur7@gmail.com</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Phone size={14} className="text-TEXT shrink-0" strokeWidth={1.5} />
                                <span className="font-mono">+92 304 0670987</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Lower Section: Copyright and Meta indicators */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-light uppercase tracking-[2px] text-gray-400">
                    <p className="text-center sm:text-left">
                        &copy; {currentYear} Scentsô Luxury Maison. All rights reserved.
                    </p>
                    <p className="font-mono text-gray-300">
                        Designed with absolute sillage
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;