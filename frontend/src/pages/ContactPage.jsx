import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import {
    Mail, Phone, MapPin, Clock, ShieldCheck,
    Send, Loader2, CheckCircle2, MessageSquare, AlertCircle
} from 'lucide-react';
import { showErrorToast, showSuccessToast } from '../helper/MyToast';

import Meta from '../components/Meta';

const ContactPage = () => {

    const { register, handleSubmit, reset, formState: { errors: formInputErrors } } = useForm({
        defaultValues: {
            clientName: '',
            clientEmail: '',
            contactSubject: '',
            conciergeMessage: ''
        }
    });


    const [isMessageSending, setIsMessageSending] = useState(false);
    const [messageSuccessState, setMessageSuccessState] = useState(false);
    const [submittedMessageData, setSubmittedMessageData] = useState(null);

    const handleContactSubmit = async (data) => {

        setIsMessageSending(true);

        try {

            await new Promise((resolve) => setTimeout(resolve, 1800));


            setSubmittedMessageData({
                ...data,
                ticketReference: `CONCIERGE-TICKET-${Math.floor(100000 + Math.random() * 900000)}`,
                timestamp: new Date().toLocaleTimeString()
            });

            setMessageSuccessState(true);
            showSuccessToast("Your luxury concierge ticket dispatch sequence initiated successfully!");
            reset(); // Safely flushes all hook-form input registers clean upon success
        } catch (simError) {
            console.error("Concierge simulation corridor malfunction:", simError);
            showErrorToast("Transmission gateway error. Please try again.");
        } finally {
            setIsMessageSending(false);
        }
    };


    if (messageSuccessState) {
        return (
            <div className="min-h-screen bg-[#FBFBFB] flex flex-col items-center justify-center p-4 md:p-8 select-none font-sans text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="bg-white border border-gray-100 rounded-sm p-6 md:p-10 max-w-lg mx-auto shadow-sm space-y-6"
                >
                    <div className="w-16 h-16 bg-neutral-50 border border-neutral-100 rounded-full flex items-center justify-center mx-auto text-TEXT">
                        <CheckCircle2 size={32} className="stroke-[1.2]" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-base font-bold tracking-[3px] uppercase text-TEXT">Dispatch Complete</h2>
                        <p className="text-[11px] text-gray-400 font-light tracking-wide uppercase">
                            Concierge Index ID: <span className="font-mono font-bold text-TEXT">{submittedMessageData?.ticketReference}</span>
                        </p>
                    </div>

                    <div className="bg-neutral-50 border border-gray-100/60 p-4 rounded-xs text-left space-y-3 max-w-sm mx-auto">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[1px] border-b border-gray-200 pb-1.5 flex items-center gap-1.5">
                            <ShieldCheck size={12} className="text-TEXT" /> Sandbox Audit Record:
                        </p>
                        <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                            Salutations <strong className="text-TEXT uppercase">{submittedMessageData?.clientName}</strong>. Your olfactory inquiry regarding <em className="text-TEXT">"{submittedMessageData?.contactSubject}"</em> has bypassed the backend router seamlessly and simulation logged locally at <span className="font-mono font-bold text-TEXT">{submittedMessageData?.timestamp}</span>.
                        </p>
                    </div>

                    <div className="pt-2">
                        <button
                            type="button"
                            onClick={() => setMessageSuccessState(false)}
                            className="bg-TEXT text-white px-6 py-3 text-[10px] uppercase tracking-[2px] font-semibold border border-TEXT hover:bg-neutral-800 active:scale-95 transition-all duration-300 rounded-sm shadow-xs cursor-pointer focus:outline-none"
                        >
                            Return To Helpdesk Form
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }


    return (
        <>
            <Meta
                title="Contact Private Client Services"
                description="Connect with Scentsô. Reach out to our private client services desk for custom formulation consultations, bespoke brand gifting layouts, or boutique order tracking assistance."
                keywords="contact perfume boutique, private client services, custom fragrance consultation, corporate scent gifting, customer care boutique"
            />

            <div className="bg-[#FBFBFB] min-h-screen text-TEXT antialiased select-none font-sans pb-24 selection:bg-TEXT selection:text-white">


                <div className="bg-white border-b border-gray-100 py-12 text-center">
                    <h1 className="text-xl md:text-2xl font-bold tracking-[3px] uppercase text-TEXT">Concierge Desk</h1>
                    <p className="text-[10px] tracking-[2px] text-gray-400 uppercase font-light mt-1.5">
                        Initiate direct communication vector links with our luxury support portals
                    </p>
                </div>


                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">


                        <div className="lg:col-span-5 space-y-6">
                            <div className="bg-white border border-gray-100 p-5 md:p-6 rounded-sm shadow-2xs space-y-6">
                                <div>
                                    <h3 className="text-xs font-bold tracking-[2px] uppercase text-TEXT">Maison Informations</h3>
                                    <p className="text-[10px] text-gray-400 font-light mt-0.5 uppercase tracking-[0.5px]">
                                        Direct physical channels parameters logs directories
                                    </p>
                                </div>

                                <div className="space-y-4 text-xs font-sans">


                                    <div className="flex items-start gap-3.5 p-3 bg-neutral-50 rounded-xs border border-gray-100/40">
                                        <Mail size={14} className="text-gray-400 shrink-0 mt-0.5" />
                                        <div className="space-y-0.5 min-w-0">
                                            <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-[1px]">Secure Digital Mailbox</span>
                                            <p className="font-medium text-TEXT font-mono break-all lowercase selection:bg-neutral-800">contact@scentso.com</p>
                                        </div>
                                    </div>


                                    <div className="flex items-start gap-3.5 p-3 bg-neutral-50 rounded-xs border border-gray-100/40">
                                        <Phone size={14} className="text-gray-400 shrink-0 mt-0.5" />
                                        <div className="space-y-0.5">
                                            <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-[1px]">Hotline Concierge Terminal</span>
                                            <p className="font-medium text-TEXT font-mono tracking-wide selection:bg-neutral-800">+92 (21) 111-SCENTS</p>
                                        </div>
                                    </div>


                                    <div className="flex items-start gap-3.5 p-3 bg-neutral-50 rounded-xs border border-gray-100/40">
                                        <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" />
                                        <div className="space-y-0.5">
                                            <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-[1px]">Physical Flagship Atelier</span>
                                            <p className="font-medium text-TEXT uppercase tracking-[0.5px]">Plot 42-C, Maison Corridor, Phase 8, DHA, Kasur, Pakistan</p>
                                        </div>
                                    </div>


                                    <div className="flex items-start gap-3.5 p-3 bg-neutral-50 rounded-xs border border-gray-100/40">
                                        <Clock size={14} className="text-gray-400 shrink-0 mt-0.5" />
                                        <div className="space-y-0.5">
                                            <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-[1px]">Operational Working Frame</span>
                                            <p className="font-medium text-TEXT uppercase tracking-[0.5px]">Mon — Sat: 11:00 AM - 09:00 PM PKT</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div className="lg:col-span-7">
                            <div className="bg-white border border-gray-100 p-5 md:p-6 rounded-sm shadow-2xs space-y-6">
                                <div>
                                    <h3 className="text-xs font-bold tracking-[2px] uppercase text-TEXT pb-2 border-b border-gray-50 flex items-center gap-2">
                                        <MessageSquare size={13} className="text-gray-400" /> Transmission Channel
                                    </h3>
                                    <p className="text-[10px] text-gray-400 font-light mt-1.5 uppercase tracking-[0.5px]">
                                        Complete all required parameters to log your concierge sandbox ticket
                                    </p>
                                </div>


                                <form onSubmit={handleSubmit(handleContactSubmit)} className="space-y-5">

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                        <div className="flex flex-col space-y-1.5 text-xs">
                                            <label htmlFor="clientName" className="text-[10px] uppercase tracking-[1px] font-medium text-gray-400">
                                                Your Full Name:
                                            </label>
                                            <div className="relative flex flex-col border-b border-gray-200 focus-within:border-TEXT pb-1 transition-colors duration-300">
                                                <input
                                                    type="text"
                                                    id="clientName"
                                                    placeholder="Jhon Doe..."
                                                    className="bg-transparent text-xs text-TEXT w-full outline-none focus:outline-none placeholder-gray-300 font-light uppercase"
                                                    {...register("clientName",
                                                        { required: "Name is requested" }
                                                    )}
                                                />
                                                {formInputErrors.clientName && (
                                                    <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1 font-sans">
                                                        <AlertCircle size={10} /> {formInputErrors.clientName.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>


                                        <div className="flex flex-col space-y-1.5 text-xs">
                                            <label htmlFor="clientEmail" className="text-[10px] uppercase tracking-[1px] font-medium text-gray-400">
                                                Secure Correspondence Email:
                                            </label>
                                            <div className="relative flex flex-col border-b border-gray-200 focus-within:border-TEXT pb-1 transition-colors duration-300">
                                                <input
                                                    type="email"
                                                    id="clientEmail"
                                                    placeholder="YOUR_EMAIL@EXAMPLE.COM..."
                                                    className="bg-transparent text-xs text-TEXT w-full outline-none focus:outline-none placeholder-gray-300 font-light lowercase"
                                                    {...register("clientEmail", {
                                                        required: "Notification email link is requested",
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                            message: "Invalid secure email structure parameters"
                                                        }
                                                    })}
                                                />
                                                {formInputErrors.clientEmail && (
                                                    <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1 font-sans">
                                                        <AlertCircle size={10} /> {formInputErrors.clientEmail.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col space-y-1.5 text-xs pt-1">
                                        <label htmlFor="contactSubject" className="text-[10px] uppercase tracking-[1px] font-medium text-gray-400">
                                            Enquiry Classification Subject:
                                        </label>
                                        <div className="relative flex flex-col border-b border-gray-200 focus-within:border-TEXT pb-1 transition-colors duration-300">
                                            <input
                                                type="text"
                                                id="contactSubject"
                                                placeholder="E.G., BESPOKE EXTRACTION QUERY, ORDER RECTIFICATION..."
                                                className="bg-transparent text-xs text-TEXT w-full outline-none focus:outline-none placeholder-gray-300 font-light uppercase tracking-wide"
                                                {...register("contactSubject", { required: "Classification theme is required" })}
                                            />
                                            {formInputErrors.contactSubject && (
                                                <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1 font-sans">
                                                    <AlertCircle size={10} /> {formInputErrors.contactSubject.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>


                                    <div className="flex flex-col space-y-1.5 text-xs pt-1">
                                        <label htmlFor="conciergeMessage" className="text-[10px] uppercase tracking-[1px] font-medium text-gray-400">
                                            Elaborate Message / Formulation Specifications:
                                        </label>
                                        <div className="relative flex flex-col border border-gray-100 bg-neutral-50 p-3 rounded-xs focus-within:bg-white focus-within:border-TEXT transition-all duration-300">
                                            <textarea
                                                id="conciergeMessage"
                                                rows={5}
                                                placeholder="WRITE YOUR DETAILED INQUIRY MATRIX PARAMETERS HERE..."
                                                className="bg-transparent text-xs text-TEXT w-full outline-none resize-none placeholder-gray-300 font-light uppercase leading-relaxed custom-scrollbar"
                                                {...register("conciergeMessage", {
                                                    required: "Message context lines are requested",
                                                    minLength: { value: 15, message: "Context description must exceed 15 characters parameters" }
                                                })}
                                            />
                                        </div>
                                        {formInputErrors.conciergeMessage && (
                                            <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1 font-sans">
                                                <AlertCircle size={10} /> {formInputErrors.conciergeMessage.message}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isMessageSending}
                                        className="w-full bg-TEXT text-white py-4 text-xs uppercase tracking-[2px] font-semibold border border-TEXT hover:bg-neutral-800 active:scale-[0.99] transition-all duration-300 rounded-sm shadow-xs flex items-center justify-center space-x-2 cursor-pointer focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        {isMessageSending ? (
                                            <>
                                                <Loader2 size={14} className="animate-spin text-white" />
                                                <span>Encrypting Transmission Channels...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send size={12} />
                                                <span>Initiate Transmission Route</span>
                                            </>
                                        )}
                                    </button>


                                    <div className="pt-3 space-y-1.5 text-[10px] text-gray-400 font-light border-t border-gray-50 mt-1">
                                        <div className="flex items-center space-x-2 text-gray-400">
                                            <ShieldCheck size={13} className="shrink-0 text-TEXT" />
                                            <span className="tracking-wide uppercase">Operational Mode: Isolated Frontend Sandbox Simulator</span>
                                        </div>
                                        <p className="text-[9px] text-gray-400 font-light leading-relaxed font-sans lowercase">
                                            Data tracking configuration: local local-storage session memory variables matrix mapping. System bypass active.
                                        </p>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactPage;