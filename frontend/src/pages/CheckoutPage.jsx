import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'motion/react';
import {
    ShieldCheck, CreditCard, ShoppingBag, Truck, CheckCircle2,
    ArrowLeft, Loader2, Landmark, Smartphone, User, Mail,
    Phone, MapPin, Building, Hash, Download
} from 'lucide-react';

import { downloadSimulatedPdfInvoice } from '../utils/invoiceGenerator';

import { createOrder, clearOrderError } from '../redux/slices/orderSlice';
import { getAllMyCarts, clearAllCart } from '../redux/slices/cartSlice';
import { showErrorToast, showSuccessToast } from '../helper/MyToast';

const PAYFAST_SANDBOX_API_KEY = import.meta.env.VITE_PAYFAST_API_KEY || "PK_SANDBOX_DEFAULT_MOCK_KEY";

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, user: currentUser } = useSelector((state) => state.auth);
    const { cartItems, totals, loading: cartLoading } = useSelector((state) => state.cart);
    const { loading: orderLoading, errors: orderError } = useSelector((state) => state.orders || state.order || { loading: {} });

    const { register, handleSubmit, watch, formState: { errors: formInputErrors }, setValue } = useForm({
        defaultValues: {
            fullName: currentUser?.fullName || '',
            email: currentUser?.email || '',
            phone: '',
            address: '',
            city: '',
            postalCode: ''
        }
    });

    const currentTypedName = watch("fullName");
    const watchedCardNumberField = watch("cardNumberField") || "";
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [selectedWalletProvider, setSelectedWalletProvider] = useState('EasyPaisa');

    const [cardData, setCardData] = useState({
        cardNumber: '',
        cardExpiry: '',
        cardCvv: '',
        cardHolder: ''
    });

    const [walletData, setWalletData] = useState({
        walletNumber: '',
        accountTitleName: '',
        isWalletVerified: false,
        isWalletResolving: false
    });

    const [orderSuccessfulState, setOrderSuccessfulState] = useState(false);
    const [createdOrderData, setCreatedOrderData] = useState(null);
    const [detectedCardType, setDetectedCardType] = useState('unknown');

    useEffect(() => {
        if (!isAuthenticated) {
            showErrorToast('Authentication requested to access secure checkouts portal.');
            navigate('/login');
            return;
        }

        if (!orderSuccessfulState && !cartLoading?.fetchAll && (!cartItems || cartItems.length === 0)) {
            showErrorToast('Your luxury shopping bag configuration vault registries are currently clear.');
            navigate('/cart');
        }

    }, [isAuthenticated, cartItems, cartLoading?.fetchAll, orderSuccessfulState, navigate]);


    useEffect(() => {
        if (currentUser) {
            setValue("fullName", currentUser.fullName || "");
            setValue("email", currentUser.email || "");
        }
    }, [currentUser, setValue]);


    useEffect(() => {
        if (orderError?.mutation) {
            showErrorToast(orderError.mutation);
            if (dispatch(clearOrderError)) dispatch(clearOrderError('mutation'));
        }
    }, [orderError?.mutation, dispatch]);

    useEffect(() => {
        const rawDigits = watchedCardNumberField.replace(/\s+/g, '');
        if (rawDigits.length === 0) {
            setDetectedCardType('unknown');
            return;
        }

        if (rawDigits.startsWith('4')) {
            setDetectedCardType('visa');
        } else if (/^(5[1-5]|2[2-7])/.test(rawDigits)) {
            setDetectedCardType('mastercard');
        } else if (rawDigits.startsWith('6032') || rawDigits.startsWith('62')) {
            setDetectedCardType('paypak');
        } else {
            setDetectedCardType('unknown');
        }
    }, [watchedCardNumberField]);

    useEffect(() => {
        const cleanNumber = walletData.walletNumber.replace(/\s+/g, '');

        if (cleanNumber.length === 11 && cleanNumber.startsWith('03')) {
            setWalletData(prev => ({ ...prev, isWalletResolving: true, isWalletVerified: false }));

            const timer = setTimeout(() => {
                setWalletData(prev => ({
                    ...prev,
                    isWalletResolving: false,
                    isWalletVerified: true,
                    accountTitleName: currentTypedName ? currentTypedName.toUpperCase() : "ELITE COLLECTOR"
                }));
                showSuccessToast(`${selectedWalletProvider} account secure registration verified seamlessly!`);
            }, 1200);

            return () => clearTimeout(timer);
        } else {
            setWalletData(prev => ({ ...prev, isWalletVerified: false, accountTitleName: '' }));
        }
    }, [walletData.walletNumber, selectedWalletProvider, currentTypedName]);

    const handlePlaceOrderSubmit = async (data) => {

        if (paymentMethod === 'Card') {
            const cleanCardDigits = cardData.cardNumber.replace(/\s+/g, '');
            if (cleanCardDigits.length < 12 || !cardData.cardExpiry || cardData.cardCvv.length < 3) {
                showErrorToast("Simulated Card processing error! Verify your credentials template numbers.");
                return;
            }
        }

        if (paymentMethod === 'Wallet') {
            if (!walletData.isWalletVerified) {
                showErrorToast("Awaiting wallet holder account name verification titles resolver validation.");
                return;
            }
        }

        const compiledBackendOrderItems = cartItems.map(cartRowItem => ({
            item: cartRowItem.item?._id || cartRowItem.item,
            quantity: cartRowItem.quantity
        }));

        const finalOrderPayload = {
            orderItems: compiledBackendOrderItems,
            address: data.address,
            city: data.city,
            postalCode: data.postalCode,
            phone: data.phone,
            email: data.email,
            paymentMethod: paymentMethod === 'Wallet' ? 'Card' : paymentMethod,
            transactionId: paymentMethod === 'Card'
                ? `MOCK_CARD_GATEWAY_${detectedCardType.toUpperCase()}_${Date.now()}`
                : paymentMethod === 'Wallet'
                    ? `MOCK_WALLET_${selectedWalletProvider.toUpperCase()}_${Date.now()}`
                    : null
        };

        try {
            const actionResult = await dispatch(createOrder(finalOrderPayload)).unwrap();

            if (actionResult && actionResult.success) {
                const serverSavedOrder = actionResult.order || actionResult;
                setCreatedOrderData(serverSavedOrder);
                setOrderSuccessfulState(true);

                setTimeout(() => {
                    downloadSimulatedPdfInvoice(serverSavedOrder, cartItems, totals, paymentMethod);
                }, 0);

                showSuccessToast("Luxury fragrance portfolio checkout transaction captured seamlessly!");
                dispatch(clearAllCart());
            }
        } catch (serverError) {
            showErrorToast(typeof serverError === 'string' ? serverError : "Order generation script mismatch.");
        }
    };

    if (orderSuccessfulState) {
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
                        <h2 className="text-base font-bold tracking-[3px] uppercase text-TEXT">Checkout Confirmed</h2>
                        <p className="text-[11px] text-gray-400 font-light tracking-wide uppercase">
                            Ticket Reference ID: <span className="font-mono font-bold text-TEXT">{createdOrderData?._id || "MOCK-ORDER-2026"}</span>
                        </p>
                    </div>

                    <div className="bg-neutral-50 border border-gray-100/60 p-4 rounded-xs text-left space-y-3 max-w-sm mx-auto">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[1px] border-b border-gray-200 pb-1.5 flex items-center gap-1.5">
                            <ShieldCheck size={12} className="text-TEXT" /> Sandbox Audit Report:
                        </p>
                        <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                            This simulated acquisition has been logged onto your local Mongo database registries. Financial records map status as <strong className="text-TEXT">{paymentMethod === 'COD' ? 'Unpaid (COD Due)' : 'Captured (Simulated Paid)'}</strong> matching specifications flawlessly.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                        <button
                            type="button"
                            onClick={() => downloadSimulatedPdfInvoice(createdOrderData, cartItems, totals, paymentMethod)}
                            className="bg-TEXT text-white px-5 py-3 text-[10px] uppercase tracking-[2px] font-semibold border border-TEXT hover:bg-neutral-800 active:scale-95 transition-all duration-300 rounded-sm shadow-xs flex items-center justify-center space-x-2 cursor-pointer focus:outline-none"
                        >
                            <Download size={12} />
                            <span>Download PDF Receipt</span>
                        </button>
                        <Link
                            to="/products"
                            className="border border-gray-200 text-TEXT px-5 py-3 text-[10px] uppercase tracking-[2px] font-semibold hover:bg-neutral-50 active:scale-95 transition-all duration-300 rounded-sm flex items-center justify-center space-x-2 focus:outline-none"
                        >
                            <ArrowLeft size={12} />
                            <span>Back To Gallery</span>
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }
    return (
        <div className="bg-[#FBFBFB] min-h-screen text-TEXT antialiased select-none font-sans pb-24 selection:bg-TEXT selection:text-white">


            <div className="bg-white border-b border-gray-100 py-12 text-center">
                <h1 className="text-xl md:text-2xl font-bold tracking-[3px] uppercase text-TEXT">Secure Verification</h1>
                <p className="text-[10px] tracking-[2px] text-gray-400 uppercase font-light mt-1.5">
                    Finalize your custom olfactory reservation details profile metrics
                </p>
            </div>


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-12">


                <Link to="/cart" className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[2px] font-semibold text-gray-400 hover:text-TEXT transition-colors duration-300 mb-6 group focus:outline-none">
                    <ArrowLeft size={12} className="transform group-hover:-translate-x-0.5 transition-transform" />
                    <span>Review Shopping Bag</span>
                </Link>


                <form onSubmit={handleSubmit(handlePlaceOrderSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">


                    <div className="lg:col-span-7 space-y-8">

                        <div className="bg-white border border-gray-100 p-5 md:p-6 rounded-sm shadow-2xs space-y-5">
                            <h3 className="text-xs font-bold tracking-[2px] uppercase text-TEXT pb-2 border-b border-gray-50 flex items-center gap-2">
                                <User size={13} className="text-gray-400" /> Identity Credentials
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-1.5 text-xs">
                                    <label htmlFor="fullName" className="text-[10px] uppercase tracking-[1px] font-medium text-gray-400">
                                        Receiver Full Name:
                                    </label>
                                    <div className="relative flex flex-col border-b border-gray-200 focus-within:border-TEXT pb-1 transition-colors duration-300">
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            {...register("fullName", { required: "Name is required" })}
                                            placeholder="ENTER FULL NAME..."
                                            className="bg-transparent text-xs text-TEXT w-full outline-none focus:outline-none placeholder-gray-300 font-light uppercase"
                                            required
                                        />
                                        {formInputErrors.fullName && <p className="text-[10px] text-red-500 mt-1">{formInputErrors.fullName.message}</p>}
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-1.5 text-xs">
                                    <label htmlFor="email" className="text-[10px] uppercase tracking-[1px] font-medium text-gray-400">
                                        Secure Notification Email:
                                    </label>
                                    <div className="relative flex flex-col border-b border-gray-200 focus-within:border-TEXT pb-1 transition-colors duration-300">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            {...register("email", { required: "Email is required" })}
                                            placeholder="YOUR_EMAIL@EXAMPLE.COM..."
                                            className="bg-transparent text-xs text-TEXT w-full outline-none focus:outline-none placeholder-gray-300 font-light lowercase"
                                            required
                                        />
                                        {formInputErrors.email && <p className="text-[10px] text-red-500 mt-1">{formInputErrors.email.message}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-1.5 text-xs pt-1">
                                <label htmlFor="phone" className="text-[10px] uppercase tracking-[1px] font-medium text-gray-400">
                                    Mobile Delivery Contact Number:
                                </label>
                                <div className="relative flex flex-col border-b border-gray-200 focus-within:border-TEXT pb-1 transition-colors duration-300">
                                    <div className="flex items-center">
                                        <Phone size={13} className="text-gray-300 mr-2" />
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            {...register("phone", {
                                                required: "Mobile number is requested",
                                                minLength: { value: 11, message: "Phone number must be exactly 11 digits" }
                                            })}
                                            placeholder="E.G., 03001234567..."
                                            maxLength={11}
                                            className="bg-transparent text-xs text-TEXT w-full outline-none focus:outline-none placeholder-gray-300 font-mono tracking-wide"
                                            required
                                        />
                                    </div>
                                    {formInputErrors.phone && <p className="text-[10px] text-red-500 mt-1">{formInputErrors.phone.message}</p>}
                                </div>
                            </div>
                        </div>


                        <div className="bg-white border border-gray-100 p-5 md:p-6 rounded-sm shadow-2xs space-y-5">
                            <h3 className="text-xs font-bold tracking-[2px] uppercase text-TEXT pb-2 border-b border-gray-50 flex items-center gap-2">
                                <MapPin size={13} className="text-gray-400" /> Destination Logistics
                            </h3>

                            <div className="flex flex-col space-y-1.5 text-xs">
                                <label htmlFor="address" className="text-[10px] uppercase tracking-[1px] font-medium text-gray-400">
                                    Complete Mailing Physical Address:
                                </label>
                                <div className="relative flex flex-col border-b border-gray-200 focus-within:border-TEXT pb-1 transition-colors duration-300">
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        {...register("address", { required: "Address is required" })}
                                        placeholder="STREET NUMBER, APARTMENT, APEX HOUSING, RESIDENCY LOCAL DETAILS..."
                                        className="bg-transparent text-xs text-TEXT w-full outline-none focus:outline-none placeholder-gray-300 font-light uppercase"
                                        required
                                    />
                                    {formInputErrors.address && <p className="text-[10px] text-red-500 mt-1">{formInputErrors.address.message}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                                <div className="flex flex-col space-y-1.5 text-xs">
                                    <label htmlFor="city" className="text-[10px] uppercase tracking-[1px] font-medium text-gray-400">
                                        Provincial City Allocation:
                                    </label>
                                    <div className="relative flex flex-col border-b border-gray-200 focus-within:border-TEXT pb-1 transition-colors duration-300 w-full">
                                        <div className="flex items-center w-full">
                                            <Building size={13} className="text-gray-300 mr-2" />
                                            <select
                                                id="city"
                                                name="city"
                                                {...register("city", { required: "City allocation is required" })}
                                                className="bg-transparent text-xs text-TEXT w-full outline-none focus:outline-none cursor-pointer uppercase font-light"
                                                required
                                            >
                                                <option value="" disabled className="text-gray-300">Select Cargo Hub City...</option>
                                                <option value="Karachi">Karachi Hub</option>
                                                <option value="Lahore">Lahore Hub</option>
                                                <option value="Islamabad">Islamabad Capital</option>
                                                <option value="Rawalpindi">Rawalpindi Division</option>
                                                <option value="Faisalabad">Faisalabad Textile Zone</option>
                                                <option value="Multan">Multan City</option>
                                                <option value="Peshawar">Peshawar Valley</option>
                                                <option value="Quetta">Quetta Enclave</option>
                                                <option value="Sialkot">Sialkot Export Sector</option>
                                                <option value="Gujranwala">Gujranwala Region</option>
                                            </select>
                                        </div>
                                        {formInputErrors.city && <p className="text-[10px] text-red-500 mt-1">{formInputErrors.city.message}</p>}
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-1.5 text-xs">
                                    <label htmlFor="postalCode" className="text-[10px] uppercase tracking-[1px] font-medium text-gray-400">
                                        Postal Routing Zip Index (Optional):
                                    </label>
                                    <div className="relative flex flex-col border-b border-gray-200 focus-within:border-TEXT pb-1 transition-colors duration-300">
                                        <div className="flex items-center">
                                            <Hash size={13} className="text-gray-300 mr-2" />
                                            <input
                                                type="text"
                                                id="postalCode"
                                                name="postalCode"
                                                {...register("postalCode")}
                                                placeholder="E.G., 54000..."
                                                className="bg-transparent text-xs text-TEXT w-full outline-none focus:outline-none placeholder-gray-300 font-mono tracking-wide"
                                            />
                                        </div>
                                        {formInputErrors.postalCode && <p className="text-[10px] text-red-500 mt-1">{formInputErrors.postalCode.message}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="bg-white border border-gray-100 p-5 md:p-6 rounded-sm shadow-2xs space-y-6">
                            <div className="pb-2 border-b border-gray-50">
                                <h3 className="text-xs font-bold tracking-[2px] uppercase text-TEXT">
                                    Secure Settlement Method Selection
                                </h3>
                                <p className="text-[10px] text-gray-400 font-light mt-0.5 uppercase tracking-[0.5px]">
                                    Select an acquisition route to initiate simulated testing frameworks
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('COD')}
                                    className={`p-3.5 border rounded-sm flex flex-col items-center justify-center gap-2 transition-all duration-300 cursor-pointer focus:outline-none ${paymentMethod === 'COD'
                                        ? 'border-TEXT bg-neutral-900 text-white shadow-xs font-semibold'
                                        : 'border-gray-200 text-gray-400 bg-white hover:border-gray-400 hover:text-TEXT'
                                        }`}
                                >
                                    <Truck size={16} className={paymentMethod === 'COD' ? 'text-white' : 'text-gray-400'} />
                                    <span className="text-[10px] uppercase tracking-[1.5px]">Cash On Delivery</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('Card')}
                                    className={`p-3.5 border rounded-sm flex flex-col items-center justify-center gap-2 transition-all duration-300 cursor-pointer focus:outline-none ${paymentMethod === 'Card'
                                        ? 'border-TEXT bg-neutral-900 text-white shadow-xs font-semibold'
                                        : 'border-gray-200 text-gray-400 bg-white hover:border-gray-400 hover:text-TEXT'
                                        }`}
                                >
                                    <CreditCard size={16} className={paymentMethod === 'Card' ? 'text-white' : 'text-gray-400'} />
                                    <span className="text-[10px] uppercase tracking-[1.5px]">Card Simulator</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('Wallet')}
                                    className={`p-3.5 border rounded-sm flex flex-col items-center justify-center gap-2 transition-all duration-300 cursor-pointer focus:outline-none ${paymentMethod === 'Wallet'
                                        ? 'border-TEXT bg-neutral-900 text-white shadow-xs font-semibold'
                                        : 'border-gray-200 text-gray-400 bg-white hover:border-gray-400 hover:text-TEXT'
                                        }`}
                                >
                                    <Smartphone size={16} className={paymentMethod === 'Wallet' ? 'text-white' : 'text-gray-400'} />
                                    <span className="text-[10px] uppercase tracking-[1.5px]">Mobile Wallet</span>
                                </button>
                            </div>

                            <div className="pt-2">
                                <AnimatePresence mode="wait">
                                    {paymentMethod === 'Card' && (
                                        <motion.div
                                            key="cardFormView"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.25 }}
                                            className="p-4 bg-neutral-50 border border-gray-100/60 rounded-xs space-y-4"
                                        >
                                            <div className="flex justify-between items-center pb-2 border-b border-gray-200/60">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[1px]">Electronic Terminal Routing Grid</span>
                                                <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-TEXT text-white rounded-xs tracking-[1px] font-mono">
                                                    {detectedCardType === 'visa' ? '⚡ VISA DETECTED' : detectedCardType === 'mastercard' ? '⚡ MASTERCARD DETECTED' : detectedCardType === 'paypak' ? '⚡ PAYPAK DETECTED' : '💳 ENTER METRICS'}
                                                </span>
                                            </div>

                                            <div className="flex flex-col space-y-1.5 text-xs">
                                                <label htmlFor="cardNumber" className="text-[10px] uppercase tracking-[1px] font-medium text-gray-400">
                                                    16-Digit Card Number (Sandbox Testing Cover):
                                                </label>
                                                <input
                                                    type="text"
                                                    id="cardNumber"
                                                    placeholder="4242 4242 4242 4242 (TEST DEFAULTS)..."
                                                    className="bg-white text-xs text-TEXT w-full border border-gray-200 p-2.5 outline-none focus:border-TEXT font-mono tracking-widest rounded-xs"
                                                    {...register("cardNumberField", {
                                                        onChange: (e) => {
                                                            const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                                                            setCardData(prev => ({ ...prev, cardNumber: val.substring(0, 19) }));
                                                            setValue("cardNumberField", val.substring(0, 19));
                                                        }
                                                    })}
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex flex-col space-y-1.5 text-xs">
                                                    <label htmlFor="cardExpiry" className="text-[10px] uppercase tracking-[1px] font-medium text-gray-400">Expiry Matrix Date:</label>
                                                    <input
                                                        type="text"
                                                        id="cardExpiry"
                                                        value={cardData.cardExpiry}
                                                        onChange={(e) => {
                                                            const val = e.target.value.replace(/\D/g, '');
                                                            const formatted = val.length >= 2 ? `${val.substring(0, 2)}/${val.substring(2, 4)}` : val;
                                                            setCardData(prev => ({ ...prev, cardExpiry: formatted.substring(0, 5) }));
                                                        }}
                                                        placeholder="MM/YY..."
                                                        className="bg-white text-xs text-TEXT w-full border border-gray-200 p-2.5 outline-none focus:border-TEXT font-mono tracking-wider rounded-xs"
                                                    />
                                                </div>

                                                <div className="flex flex-col space-y-1.5 text-xs">
                                                    <label htmlFor="cardCvv" className="text-[10px] uppercase tracking-[1px] font-medium text-gray-400">Secure CVV Guard:</label>
                                                    <input
                                                        type="password"
                                                        id="cardCvv"
                                                        value={cardData.cardCvv}
                                                        onChange={(e) => setCardData(prev => ({ ...prev, cardCvv: e.target.value.replace(/\D/g, '').substring(0, 3) }))}
                                                        placeholder="***..."
                                                        className="bg-white text-xs text-TEXT w-full border border-gray-200 p-2.5 outline-none focus:border-TEXT font-mono tracking-widest rounded-xs"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col space-y-1.5 text-xs">
                                                <label htmlFor="cardHolder" className="text-[10px] uppercase tracking-[1px] font-medium text-gray-400">Cardholder Full Name Record:</label>
                                                <input
                                                    type="text"
                                                    id="cardHolder"
                                                    value={cardData.cardHolder}
                                                    onChange={(e) => setCardData(prev => ({ ...prev, cardHolder: e.target.value }))}
                                                    placeholder="E.G., DEAN OVERRIDE..."
                                                    className="bg-white text-xs text-TEXT w-full border border-gray-200 p-2.5 outline-none focus:border-TEXT font-light uppercase tracking-wide rounded-xs"
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                    {paymentMethod === 'Wallet' && (
                                        <motion.div
                                            key="walletFormView"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.25 }}
                                            className="p-4 bg-neutral-50 border border-gray-100/60 rounded-xs space-y-4"
                                        >
                                            <div className="flex items-center space-x-4 pb-2 border-b border-gray-200/60 text-xs">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[1px]">Wallet Gateway:</span>
                                                <div className="flex gap-3 font-semibold">
                                                    <label className="flex items-center gap-1.5 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            checked={selectedWalletProvider === 'EasyPaisa'}
                                                            onChange={() => setSelectedWalletProvider('EasyPaisa')}
                                                            className="accent-TEXT"
                                                        />
                                                        <span>EasyPaisa</span>
                                                    </label>
                                                    <label className="flex items-center gap-1.5 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            checked={selectedWalletProvider === 'JazzCash'}
                                                            onChange={() => setSelectedWalletProvider('JazzCash')}
                                                            className="accent-TEXT"
                                                        />
                                                        <span>JazzCash</span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="flex flex-col space-y-1.5 text-xs">
                                                <label htmlFor="walletNumber" className="text-[10px] uppercase tracking-[1px] font-medium text-gray-400">
                                                    Account Holder Mobile Number (11-Digits):
                                                </label>
                                                <input
                                                    type="text"
                                                    id="walletNumber"
                                                    value={walletData.walletNumber}
                                                    onChange={(e) => setWalletData(prev => ({ ...prev, walletNumber: e.target.value.replace(/\D/g, '').substring(0, 11) }))}
                                                    placeholder="E.G., 03001234567..."
                                                    className="bg-white text-xs text-TEXT w-full border border-gray-200 p-2.5 outline-none focus:border-TEXT font-mono tracking-widest rounded-xs"
                                                />
                                            </div>

                                            {(walletData.isWalletResolving || walletData.isWalletVerified) && (
                                                <div className="p-2.5 bg-white border border-gray-200/60 rounded-xs flex items-center space-x-2 text-[10px] font-mono tracking-wide uppercase transition-all duration-300">
                                                    {walletData.isWalletResolving ? (
                                                        <>
                                                            <Loader2 size={12} className="animate-spin text-gray-400" />
                                                            <span className="text-gray-400">Resolving Account Title Holders via PayFast Network Sandbox...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <CheckCircle2 size={12} className="text-emerald-600" />
                                                            <span className="text-emerald-600 font-bold">Verified Title: {walletData.accountTitleName}</span>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </motion.div>
                                    )}

                                    {paymentMethod === 'COD' && (
                                        <motion.div
                                            key="codNoticeView"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="p-3.5 bg-neutral-50 border border-gray-100/60 rounded-xs text-[11px] font-light text-gray-500 leading-relaxed font-sans"
                                        >
                                            Standard warehouse dispatch sequence applied. Settlement is requested via clean paper physical currency notes upon courier delivery.
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>


                    <div className="lg:col-span-5 w-full lg:sticky lg:top-24 bg-white border border-gray-100 rounded-sm p-5 md:p-6 space-y-6 shadow-2xs">
                        <h3 className="text-xs font-bold tracking-[2px] uppercase text-TEXT pb-3 border-b border-gray-50 flex items-center gap-2">
                            <ShoppingBag size={13} className="text-gray-400" /> Bag Reservation Review
                        </h3>

                        <div className="max-h-40 overflow-y-auto space-y-3 pr-1 border-b border-gray-50 pb-4 custom-scrollbar">
                            {cartItems.map((row) => {
                                if (!row || !row.item) return null;
                                return (
                                    <div key={row._id} className="flex justify-between items-center text-xs font-sans gap-4">
                                        <div className="flex items-center space-x-2.5 min-w-0">
                                            <div className="w-10 h-10 bg-[#FBFBFB] border border-gray-100/60 rounded-xs overflow-hidden shrink-0">
                                                <img src={row.item.image?.url || row.item.image} alt={row.item.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-semibold text-TEXT uppercase tracking-wide truncate max-w-37.5">{row.item.title}</p>
                                                <p className="text-[10px] text-gray-400 font-mono">Multiplier Qty: {row.quantity}</p>
                                            </div>
                                        </div>
                                        <span className="font-mono text-gray-400 shrink-0">
                                            PKR {((row.item.price || 0) * (row.quantity || 1)).toLocaleString()}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="space-y-4 text-xs font-sans border-b border-gray-50 pb-4">
                            <div className="flex justify-between items-center text-gray-500 font-light">
                                <span className="tracking-wide">Reservation Subtotal</span>
                                <span className="font-mono text-TEXT font-medium">PKR {totals.subTotal?.toLocaleString()}</span>
                            </div>

                            <div className="flex justify-between items-center text-gray-500 font-light">
                                <div className="space-y-0.5">
                                    <span className="tracking-wide block">Integrated GST / VAT</span>
                                    <span className="text-[10px] text-gray-400 block font-light">Calculated unified 15% tariff</span>
                                </div>
                                <span className="font-mono text-TEXT font-medium">PKR {totals.taxPrice?.toLocaleString()}</span>
                            </div>

                            <div className="flex justify-between items-center text-gray-500 font-light">
                                <div className="space-y-0.5">
                                    <span className="tracking-wide block">Maison Cargo Transit</span>
                                    <span className="text-[10px] text-gray-400 block font-light">Standard corridor rate matrix</span>
                                </div>
                                <span className="font-mono text-TEXT font-medium">
                                    {totals.shippingPrice === 0 ? 'FREE' : `PKR ${totals.shippingPrice}`}
                                </span>
                            </div>
                        </div>


                        <div className="flex justify-between items-center text-xs font-bold text-TEXT pt-1">
                            <span className="uppercase tracking-[1px]">Grand Total Due</span>
                            <span className="font-mono text-base tracking-tight text-TEXT">PKR {totals.grandTotal?.toLocaleString()}</span>
                        </div>


                        <button
                            type="submit"
                            disabled={orderLoading?.mutation || cartLoading?.fetchAll}
                            className="w-full bg-TEXT text-white py-4 text-xs uppercase tracking-[2px] font-semibold border border-TEXT hover:bg-neutral-800 active:scale-[0.99] transition-all duration-300 rounded-sm shadow-xs flex items-center justify-center space-x-2 cursor-pointer focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            {orderLoading?.mutation ? (
                                <>
                                    <Loader2 size={14} className="animate-spin text-white" />
                                    <span>Verifying Token Identity Channels...</span>
                                </>
                            ) : (
                                <>
                                    <ShieldCheck size={14} />
                                    <span>
                                        {paymentMethod === 'COD'
                                            ? 'Confirm Cash On Delivery'
                                            : paymentMethod === 'Wallet'
                                                ? `Authorize ${selectedWalletProvider} Wallet`
                                                : `Process ${detectedCardType.toUpperCase()} Simulation`}
                                    </span>
                                </>
                            )}
                        </button>


                        <div className="pt-3 space-y-2 text-[10px] text-gray-400 font-light border-t border-gray-50 mt-1">
                            <div className="flex items-center space-x-2 text-gray-400">
                                <ShieldCheck size={13} className="shrink-0 text-TEXT" />
                                <span className="tracking-wide">Environment: Sandbox Dev Simulation Mode Active</span>
                            </div>
                            <p className="text-[9px] text-gray-400 font-light leading-relaxed font-sans lowercase">
                                API Key: {String(PAYFAST_SANDBOX_API_KEY || '').substring(0, 10)}... Loaded securely from VITE environment settings matrix context.
                            </p>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;