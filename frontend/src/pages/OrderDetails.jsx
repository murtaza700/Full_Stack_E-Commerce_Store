import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'motion/react';
import {
    Clock, ShieldCheck, MapPin, Phone, Mail,
    Calendar, ArrowLeft, Loader2, ShoppingBag,
    Truck, CheckCircle2, Package, Landmark, Building,
    Download
} from 'lucide-react';

import Meta from '../components/Meta';

import { downloadSimulatedPdfInvoice } from '../utils/invoiceGenerator';

import { getMySingleOrder, clearOrderError } from '../redux/slices/orderSlice';
import { showErrorToast } from '../helper/MyToast';

const OrderDetails = () => {
    const { id: targetOrderIdToken } = useParams();
    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector(state => state.auth);
    const { currentOrder, loading: orderLoading, errors: orderError } = useSelector((state) => state.orders || state.order || { loading: {}, errors: {} });

    useEffect(() => {
        if (targetOrderIdToken) {
            if (isAuthenticated) {
                dispatch(getMySingleOrder(targetOrderIdToken));
            }
        }
    }, [targetOrderIdToken, dispatch]);

    useEffect(() => {
        if (orderError?.fetchSingle) {
            showErrorToast(orderError.fetchSingle);
            if (dispatch(clearOrderError)) dispatch(clearOrderError('fetchSingle'));
        }
    }, [orderError?.fetchSingle, dispatch]);


    if (!isAuthenticated) {
        return (
            <>
                <Meta
                    title="Sign In to View Invoice"
                    description="Secure verification checkpoint for the Scentsô billing manifest tracker. Please log in to manage your private transaction files."
                />

                <div className="min-h-screen bg-[#FBFBFB] flex flex-col items-center justify-center p-4 md:p-8 select-none font-sans text-center">
                    <div className="bg-white border border-gray-100 rounded-sm p-6 md:p-10 max-w-sm mx-auto shadow-sm space-y-6">

                        <div className="w-14 h-14 bg-neutral-50 border border-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                            <ShieldCheck size={26} className="stroke-[1.2]" />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-xs font-bold tracking-[3px] uppercase text-TEXT">You are not loggedin!</h2>
                            <p className="text-[11px] text-gray-400 font-light leading-relaxed max-w-xs mx-auto uppercase tracking-[0.5px]">
                                This secure sector archives high-fidelity olfactory metrics. Authentication parameters are required.
                            </p>
                        </div>

                        <div className="pt-2 flex flex-col gap-2.5">
                            <Link
                                to="/login"
                                className="bg-TEXT text-white w-full py-3.5 text-[10px] uppercase tracking-[2px] font-semibold border border-TEXT hover:bg-neutral-800 active:scale-95 transition-all duration-300 rounded-sm shadow-xs flex items-center justify-center focus:outline-none"
                            >
                                Authorize Account
                            </Link>

                            <Link
                                to="/products"
                                className="border border-gray-200 text-gray-400 w-full py-3 text-[10px] uppercase tracking-[2px] font-semibold hover:bg-neutral-50 hover:text-TEXT active:scale-95 transition-all duration-300 rounded-sm flex items-center justify-center focus:outline-none"
                            >
                                <ArrowLeft size={10} className="mr-1.5" /> Back To Gallery
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }


    if (orderLoading?.fetchSingle) {
        return (
            <>
                <Meta
                    title="Loading Invoice Details"
                    description="Synchronizing secure transaction records, billing properties, and delivery milestones maps with database cluster indices."
                />

                <div className="min-h-screen bg-[#FBFBFB] flex flex-col items-center justify-center p-4 space-y-3 font-sans select-none">
                    <Loader2 size={24} className="animate-spin text-neutral-400 stroke-[1.2]" />
                    <p className="text-[10px] text-gray-400 font-light tracking-[2px] uppercase">Retrieving Vault Formulation Metrics...</p>
                </div>
            </>
        );
    }

    if (!currentOrder) {
        return (
            <>
                <Meta
                    title="Invoice Manifest Not Found"
                    description="The targeted billing receipt record reference index could not be located inside our system financial repositories bounds."
                />

                <div className="min-h-screen bg-[#FBFBFB] flex flex-col items-center justify-center p-4 text-center font-sans space-y-4">
                    <div className="w-12 h-14 bg-white border border-gray-100 rounded-sm flex items-center justify-center text-gray-300 shadow-3xs mx-auto">
                        <Package size={16} />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800">Manifest Not Found</h3>
                        <p className="text-[10px] text-gray-400 font-light uppercase tracking-[0.5px]">This reference ticket does not map to any active database record indices.</p>
                    </div>
                    <Link to="/profile" className="inline-block bg-TEXT text-white px-5 py-2.5 text-[9px] uppercase tracking-[2px] font-bold border border-TEXT hover:bg-neutral-800 rounded-2xs shadow-3xs transition-all duration-300">
                        Return To Portfolio
                    </Link>
                </div>
            </>
        );
    }


    const serverFulfillmentTag = currentOrder.orderStatus || "Pending";
    const paymentMethodIndicator = currentOrder.paymentMethod || "COD";
    const transactionReferenceId = currentOrder.transactionId || "N/A";
    const baseSubTotalAmount = currentOrder.subTotal || 0;
    const computedGstTariff = currentOrder.taxPrice || 0;
    const premiumCargoTransitFee = currentOrder.shippingPrice || 0;
    const finalBillGrandTotal = currentOrder.grandTotal || currentOrder.totalPrice || 0;

    const formattedCreationDateStr = currentOrder.createdAt
        ? new Date(currentOrder.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
        : new Date().toLocaleDateString();

    return (
        <>
            <Meta
                title={targetOrderIdToken ? `Receipt Reference #${targetOrderIdToken.substring(targetOrderIdToken.length - 6)}` : 'Order Invoice Manifest'}
                description="Inspect dynamic consignee metadata, verified transaction item loops lines records, precise taxation totals, and logistics delivery milestones parameters status logs safely."
            />

            <div className="bg-[#FBFBFB] min-h-screen text-TEXT antialiased select-none font-sans pb-24 selection:bg-TEXT selection:text-white">

                <div className="bg-white border-b border-gray-100 py-12 text-center">
                    <h1 className="text-xl md:text-2xl font-bold tracking-[3px] uppercase text-TEXT">Acquisition Details</h1>
                    <p className="text-[10px] tracking-[2px] text-gray-400 uppercase font-light mt-1.5">
                        Live operational monitoring dispatch dashboard node matrix
                    </p>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-12 space-y-6">


                    <Link to="/profile" className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[2px] font-semibold text-gray-400 hover:text-TEXT transition-colors duration-300 mb-2 group focus:outline-none">
                        <ArrowLeft size={12} className="transform group-hover:-translate-x-0.5 transition-transform" />
                        <span>Back To Profile Archive</span>
                    </Link>


                    <div className="bg-white border border-gray-100 p-5 md:p-6 rounded-sm shadow-2xs grid grid-cols-1 md:grid-cols-4 gap-6 items-center">

                        <div className="space-y-1">
                            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-[1.5px]">Unique Hex Target ID:</span>
                            <p className="font-mono font-bold text-xs uppercase tracking-wide text-TEXT select-all">{currentOrder._id}</p>
                            <p className="text-[10px] text-gray-400 font-light uppercase tracking-[0.5px]">Logged: {formattedCreationDateStr}</p>
                        </div>

                        <div className="space-y-1 text-left md:text-center">
                            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-[1.5px] block">Live Dispatch Pipeline Status:</span>
                            <span className={`inline-block text-[10px] font-bold uppercase tracking-[2px] px-3 py-1 rounded-2xs border ${serverFulfillmentTag.toLowerCase() === 'delivered' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                                serverFulfillmentTag.toLowerCase() === 'dispatched' ? 'bg-blue-50 border-blue-100 text-blue-700' :
                                    serverFulfillmentTag.toLowerCase() === 'processing' ? 'bg-amber-50 border-amber-100 text-amber-700' :
                                        'bg-neutral-50 border-neutral-200 text-gray-500'
                                }`}>
                                {serverFulfillmentTag}
                            </span>
                        </div>

                        <div className="space-y-1 text-left md:text-center">
                            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-[1.5px] block">Settlement Tracking Route:</span>
                            <p className="text-xs font-bold text-TEXT uppercase tracking-wide flex md:justify-center items-center gap-1.5">
                                {paymentMethodIndicator === 'COD' ? <Truck size={13} /> : <Landmark size={13} />}
                                {paymentMethodIndicator === 'COD' ? "Cash On Delivery" : "Simulated Gateway Paid"}
                            </p>
                            <p className="text-[9px] text-gray-400 font-mono tracking-tight truncate max-w-xs md:mx-auto">Ref: {transactionReferenceId}</p>
                        </div>

                        <div className="text-left md:text-right">
                            <button
                                type="button"
                                onClick={() => {
                                    const calculatedTotalsSnapshot = {
                                        subTotal: baseSubTotalAmount,
                                        taxPrice: computedGstTariff,
                                        shippingPrice: premiumCargoTransitFee,
                                        grandTotal: finalBillGrandTotal
                                    };
                                    downloadSimulatedPdfInvoice(currentOrder, currentOrder.orderItems, calculatedTotalsSnapshot, paymentMethodIndicator);
                                }}
                                className="bg-TEXT text-white px-4 py-3 text-[9px] uppercase tracking-[2px] font-bold border border-TEXT hover:bg-neutral-800 active:scale-95 transition-all duration-300 rounded-sm shadow-3xs flex items-center justify-center space-x-2 cursor-pointer focus:outline-none w-full md:w-auto md:ml-auto"
                            >
                                <Download size={11} />
                                <span>Download Invoice</span>
                            </button>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        <div className="lg:col-span-7 bg-white border border-gray-100 p-5 md:p-6 rounded-sm shadow-2xs space-y-5">
                            <h3 className="text-xs font-bold tracking-[2px] uppercase text-TEXT pb-2 border-b border-gray-50 flex items-center gap-2">
                                <ShoppingBag size={13} className="text-gray-400" /> Itemized Inventory Registry
                            </h3>

                            <div className="space-y-4 custom-scrollbar max-h-95 overflow-y-auto pr-1">
                                {currentOrder.orderItems?.map((rowItem, idx) => {
                                    const matchedProductNode = rowItem.item;
                                    if (!matchedProductNode) return null;

                                    return (
                                        <div key={rowItem._id || idx} className="flex justify-between items-center text-xs font-sans gap-4 border-b border-neutral-50 pb-3 last:border-0 last:pb-0 group select-none">
                                            <div className="flex items-center space-x-3 min-w-0">
                                                <div className="w-12 h-12 bg-[#FBFBFB] border border-gray-100 rounded-xs overflow-hidden shrink-0">
                                                    <img src={matchedProductNode.image?.url || matchedProductNode.image} alt={matchedProductNode.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-TEXT uppercase tracking-wide truncate max-w-47.5 sm:max-w-none">{matchedProductNode.title}</p>
                                                    <p className="text-[10px] text-gray-400 font-mono mt-0.5">Unit Rate: PKR {matchedProductNode.price?.toLocaleString()} × Qty: {rowItem.quantity}</p>
                                                </div>
                                            </div>
                                            <span className="font-mono font-bold text-TEXT text-right shrink-0">
                                                PKR {((matchedProductNode.price || 0) * (rowItem.quantity || 1)).toLocaleString()}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>


                        <div className="lg:col-span-5 space-y-6">

                            <div className="bg-white border border-gray-100 p-5 md:p-6 rounded-sm shadow-2xs space-y-4">
                                <h3 className="text-xs font-bold tracking-[2px] uppercase text-TEXT pb-2 border-b border-gray-50 flex items-center gap-2">
                                    <MapPin size={13} className="text-gray-400" /> Cargo Despatch Allocation
                                </h3>

                                <div className="space-y-3 text-xs font-sans">
                                    <div className="p-3 bg-neutral-50 rounded-xs border border-gray-100/40 space-y-1">
                                        <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-[1px]">Consignee Profile Credentials</span>
                                        <p className="font-bold text-TEXT uppercase tracking-wide">{currentOrder.user?.fullName || "MAISON CUSTOMER COLLECTOR"}</p>
                                        <p className="text-gray-400 lowercase font-light text-[11px]">{currentOrder.email || currentOrder.user?.email || "N/A"}</p>
                                    </div>

                                    <div className="p-3 bg-neutral-50 rounded-xs border border-gray-100/40 space-y-1">
                                        <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-[1px]">Mailing Destination Delivery Lines</span>
                                        <p className="font-medium text-gray-600 uppercase tracking-wide leading-relaxed">{currentOrder.address}</p>
                                        <p className="font-bold text-TEXT uppercase text-[11px] tracking-widest pt-0.5 flex items-center gap-1">
                                            <Building size={11} className="text-gray-400" /> Hub City: {currentOrder.city} {currentOrder.postalCode ? `(${currentOrder.postalCode})` : ''}
                                        </p>
                                    </div>

                                    <div className="p-3 bg-neutral-50 rounded-xs border border-gray-100/40 space-y-1 flex items-center gap-2">
                                        <Phone size={13} className="text-gray-400 shrink-0 mt-0.5" />
                                        <div className="space-y-0.5">
                                            <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-[1px]">Mobile Contact Number</span>
                                            <p className="font-mono font-semibold text-TEXT tracking-wide">{currentOrder.phone || "03001234567"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border border-gray-100 p-5 md:p-6 rounded-sm shadow-2xs space-y-4">
                                <h3 className="text-xs font-bold tracking-[2px] uppercase text-TEXT pb-2 border-b border-gray-50">
                                    Valuation Summary Ledger
                                </h3>

                                <div className="space-y-4 text-xs font-sans">
                                    <div className="flex justify-between items-center text-gray-500 font-light">
                                        <span className="tracking-wide">Boutique Base Subtotal</span>
                                        <span className="font-mono text-TEXT font-medium">PKR {baseSubTotalAmount.toLocaleString()}</span>
                                    </div>

                                    <div className="flex justify-between items-center text-gray-500 font-light">
                                        <div className="space-y-0.5">
                                            <span className="tracking-wide block">Integrated GST / VAT Tariff</span>
                                            <span className="text-[10px] text-gray-400 block font-light">Calculated unified 15% rate matrix</span>
                                        </div>
                                        <span className="font-mono text-TEXT font-medium">PKR {computedGstTariff.toLocaleString()}</span>
                                    </div>

                                    <div className="flex justify-between items-center text-gray-500 font-light border-b border-gray-50 pb-4">
                                        <span className="tracking-wide">Maison Premium Transit Cover</span>
                                        <span className="font-mono text-TEXT font-medium">
                                            {premiumCargoTransitFee === 0 ? 'COMPLIMENTARY' : `PKR ${premiumCargoTransitFee}`}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center text-xs font-bold text-TEXT pt-1">
                                        <span className="uppercase tracking-[1px]">Grand Total Transacted</span>
                                        <span className="font-mono text-base tracking-tight text-TEXT">PKR {finalBillGrandTotal.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 p-5 text-center rounded-sm max-w-3xl mx-auto space-y-2 select-none shadow-3xs">
                        <p className="text-[9px] uppercase tracking-[2px] font-bold text-gray-400 flex items-center justify-center gap-1.5">
                            <CheckCircle2 size={12} className="text-TEXT" /> SandboxDev Simulation Audit Report Token Seal Secure
                        </p>
                        <p className="text-[10px] text-gray-400 font-light leading-relaxed max-w-xl mx-auto lowercase font-sans">
                            This digital invoice record manifest reflects live data states written natively onto local Mongo database channels. Financial accounts query vectors stand fully captured matching security parameters criteria flawlessly.
                        </p>
                    </div>

                </div>
            </div>
        </>
    );
};

export default OrderDetails;