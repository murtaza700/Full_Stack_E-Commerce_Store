import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Loader2, Trash2, Eye, RefreshCw, Layers } from 'lucide-react';
import { showErrorToast, showSuccessToast } from '../../helper/MyToast';

import {
    getAllOrdersAdmin,
    updateOrderStatusAdmin,
    deleteOrderAdmin,
    clearOrderError
} from '../../redux/slices/orderSlice';

const ManageOrders = () => {
    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const pageUrlParam = parseInt(searchParams.get('page')) || 1;
    const searchUrlParam = searchParams.get('search') || '';
    const statusUrlParam = searchParams.get('status') || 'All';
    const sortUrlParam = searchParams.get('sort') || '-createdAt';

    const [searchFieldInput, setSearchFieldInput] = useState(searchUrlParam);

    const { adminOrders = [], loading: orderLoading, errors, meta, btnLoading = {} } = useSelector((state) => state.orders || {});

    const totalPages = meta?.totalPages || 1;
    useEffect(() => {
        dispatch(getAllOrdersAdmin({
            page: pageUrlParam,
            limit: 10,
            search: searchUrlParam,
            status: statusUrlParam,
            sort: sortUrlParam
        }));
    }, [dispatch, pageUrlParam, searchUrlParam, statusUrlParam, sortUrlParam]);

    useEffect(() => {
        if (errors?.fetchAll) {
            showErrorToast(errors.fetchAll);
            if (dispatch(clearOrderError)) dispatch(clearOrderError('fetchAll'));
        }
        if (errors?.mutation) {
            showErrorToast(errors.mutation);
            if (dispatch(clearOrderError)) dispatch(clearOrderError('mutation'));
        }
    }, [errors?.fetchAll, errors?.mutation, dispatch]);

    const handleAdminStatusChangeSelect = async (targetOrderId, selectedNewStatus) => {
        try {
            await dispatch(updateOrderStatusAdmin({ id: targetOrderId, status: selectedNewStatus })).unwrap();
            showSuccessToast(`Order status updated to ${selectedNewStatus} successfully!`);

            dispatch(getAllOrdersAdmin({ page: pageUrlParam, limit: 10, search: searchUrlParam, status: statusUrlParam, sort: sortUrlParam }));
        } catch (serverErr) {
            showErrorToast(typeof serverErr === 'string' ? serverErr : 'Status modification processing conflict.');
        }
    };

    const handleOrderDeletePurgeSubmit = async (targetOrderId) => {
        if (window.confirm("Are you absolutely sure you want to permanently delete this checkout manifest file record? This action is irreversible.")) {
            try {
                await dispatch(deleteOrderAdmin(targetOrderId)).unwrap();
                showSuccessToast("Order successfully purged from registry records.");
                dispatch(getAllOrdersAdmin({ page: pageUrlParam, limit: 10, search: searchUrlParam, status: statusUrlParam, sort: sortUrlParam }));
            } catch (serverErr) {
                showErrorToast(typeof serverErr === 'string' ? serverErr : 'Order deletion corridor exception error.');
            }
        }
    };

    const handleFiltersSubmissionApply = (eventNode) => {
        eventNode.preventDefault();
        setSearchParams({
            page: '1',
            search: searchFieldInput.trim(),
            status: statusUrlParam,
            sort: sortUrlParam
        });
    };

    const handleQuickFilterSelectionUpdate = (filterKeyString, dynamicValueString) => {
        const structuralSearchParamsMap = {
            page: '1',
            search: searchUrlParam,
            status: statusUrlParam,
            sort: sortUrlParam,
            [filterKeyString]: dynamicValueString
        };
        setSearchParams(structuralSearchParamsMap);
    };

    const compileBoundedOrderPages = () => {
        const activePageNum = pageUrlParam;
        const pageNumbersStack = [];
        const maximumVisibleButtonsRange = 3;

        let startingPivotIndex = Math.max(1, activePageNum - 1);
        let endingPivotIndex = Math.min(totalPages, startingPivotIndex + maximumVisibleButtonsRange - 1);

        if (endingPivotIndex - startingPivotIndex + 1 < maximumVisibleButtonsRange) {
            startingPivotIndex = Math.max(1, endingPivotIndex - maximumVisibleButtonsRange + 1);
        }

        for (let numIdx = startingPivotIndex; numIdx <= endingPivotIndex; numIdx++) {
            pageNumbersStack.push(numIdx);
        }
        return pageNumbersStack;
    };

    const smartRenderedPageNumbers = compileBoundedOrderPages();

    if (orderLoading?.fetchAll || orderLoading?.loading) {
        return (
            <div className="flex flex-col items-center justify-center py-24 space-y-3 font-sans select-none">
                <Loader2 size={24} className="animate-spin text-neutral-400 stroke-[1.2]" />
                <p className="text-[10px] text-gray-400 font-light tracking-[2px] uppercase">Retrieving Master Invoice Registries...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 select-none font-sans">
            {/* Top Identity Header Title */}
            <div>
                <h1 className="text-xl font-bold tracking-[2px] uppercase text-TEXT">Master Order Logs</h1>
                <p className="text-xs text-gray-400 font-light mt-1">Review user purchase metrics, modify states, and look up delivery coordinates.</p>
            </div>

            {/* DYNAMIC FILTER DROPDOWNS BAR */}
            <div className="bg-white border border-gray-100 p-4 rounded-sm shadow-2xs space-y-4">
                <form onSubmit={handleFiltersSubmissionApply} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">

                    {/* Universal Keyword Input Search form Field */}
                    <div className="md:col-span-6 relative flex items-center bg-neutral-50 border border-gray-200/80 rounded-sm p-1">
                        <Search size={14} className="absolute left-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Query by Order Hex ID, Customer Name, Email, Mobile, City parameters..."
                            value={searchFieldInput}
                            onChange={(eventNode) => setSearchFieldInput(eventNode.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-xs font-sans placeholder-gray-300 text-TEXT focus:outline-none bg-transparent"
                        />

                        <button type="submit" className="bg-TEXT text-white px-4 py-2 text-[10px] uppercase tracking-[1.5px] font-bold rounded-sm border border-TEXT hover:bg-neutral-800 transition-colors focus:outline-none cursor-pointer">
                            Search
                        </button>

                    </div>

                    {/* Status Selection Dropdown */}
                    <div className="md:col-span-3 flex items-center bg-neutral-50 border border-gray-200/80 rounded-sm px-3 py-2.5">
                        <Layers size={13} className="text-gray-400 mr-2 shrink-0" />
                        <select
                            value={statusUrlParam}
                            onChange={(eventNode) => handleQuickFilterSelectionUpdate('status', eventNode.target.value)}
                            className="w-full bg-transparent text-xs text-TEXT font-semibold focus:outline-none cursor-pointer uppercase tracking-wider"
                        >
                            <option value="All">All Lifecycles States</option>
                            <option value="Pending">Pending Files</option>
                            <option value="Processing">Processing Corridor</option>
                            <option value="Shipped">Shipped Transit</option>
                            <option value="Delivered">Delivered Vault</option>
                            <option value="Cancelled">Cancelled Void</option>
                        </select>
                    </div>

                    {/* Sorting Controls Dropdown */}
                    <div className="md:col-span-3 flex items-center bg-neutral-50 border border-gray-200/80 rounded-sm px-3 py-2.5">
                        <RefreshCw size={13} className="text-gray-400 mr-2 shrink-0" />
                        <select
                            value={sortUrlParam}
                            onChange={(eventNode) => handleQuickFilterSelectionUpdate('sort', eventNode.target.value)}
                            className="w-full bg-transparent text-xs text-TEXT font-semibold focus:outline-none cursor-pointer uppercase tracking-wider"
                        >
                            <option value="-createdAt">Newest Logs Recieved</option>
                            <option value="createdAt">Oldest Invoices First</option>
                            <option value="-totalPrice">Highest Financial Bill</option>
                            <option value="totalPrice">Lowest Economic Matrix</option>
                        </select>
                    </div>

                </form>
            </div>

            {/* Catalog Layout Table Spreadsheet Canvas */}
            <div className="bg-white border border-gray-100 rounded-sm shadow-2xs overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-212.5">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50 text-gray-400 font-bold text-[10px] uppercase tracking-[2px] select-none">
                            <th className="py-4 px-6">Invoice Manifest Context</th>
                            <th className="py-4 px-6">Timestamp</th>
                            <th className="py-4 px-6">Gross Price</th>
                            <th className="py-4 px-6">Status</th>
                            <th className="py-4 px-6 text-center">Operational Direct Management Tools</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-xs tracking-wide">

                        {adminOrders.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-12 text-center text-gray-400 font-light uppercase tracking-[0.5px]">
                                    No transaction checkout sheets match your designated query filters credentials.
                                </td>
                            </tr>
                        ) : (
                            adminOrders.map((orderRowItem) => {
                                const orderIdKey = orderRowItem._id || 'MOCK-ID';
                                return (
                                    <tr key={orderIdKey} className="hover:bg-neutral-50/50 transition-colors group">

                                        {/* Client Profile credentials tracking data fields cell */}
                                        <td className="py-4 px-6">
                                            <div className="space-y-0.5">
                                                <p className="font-bold text-TEXT uppercase tracking-wide truncate max-w-xs">
                                                    {orderRowItem.user?.fullName || 'Anonymous Profile'}
                                                </p>
                                                <p className="text-[10px] text-gray-400 font-mono tracking-tight select-all">ID: {orderIdKey}</p>
                                                <p className="text-[10px] text-gray-400 lowercase font-light truncate max-w-xs">{orderRowItem.email || 'N/A'}</p>
                                            </div>
                                        </td>

                                        {/* CreatedAt standard calendar timestamp outputs values */}
                                        <td className="py-4 px-6 text-gray-500 font-mono text-[11px] font-medium">
                                            {orderRowItem.createdAt
                                                ? new Date(orderRowItem.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                                                : "N/A"
                                            }
                                        </td>

                                        {/* Total prices gross values counters numbers */}
                                        <td className="py-4 px-6 font-mono font-bold text-TEXT">
                                            Rs. {Number(orderRowItem.totalPrice || 0).toLocaleString()}
                                        </td>

                                        {/* Color badges checking dynamic state enums values markers */}
                                        <td className="py-4 px-6">
                                            <span className={`px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider rounded-2xs border ${orderRowItem.orderStatus === 'Delivered' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                                                orderRowItem.orderStatus === 'Shipped' ? 'bg-purple-50 border-purple-100 text-purple-700' :
                                                    orderRowItem.orderStatus === 'Processing' ? 'bg-blue-50 border-blue-100 text-blue-700' :
                                                        orderRowItem.orderStatus === 'Cancelled' ? 'bg-red-50 border-red-100 text-red-700' :
                                                            'bg-amber-50 border-amber-100 text-amber-700'
                                                }`}>
                                                {orderRowItem.orderStatus || 'Pending'}
                                            </span>
                                        </td>

                                        {/* Multi-Action Workflow control dropdown and redirect links triggers tools */}
                                        <td className="py-4 px-6 text-center">
                                            <div className="flex items-center justify-center space-x-3">

                                                {/* Inline Status Dropdown Picker matrix selector */}
                                                <div className="bg-white border border-gray-200 rounded-sm px-2 py-1 flex items-center shadow-3xs">
                                                    <select
                                                        disabled={btnLoading[orderIdKey] || orderRowItem.orderStatus === 'Delivered'}
                                                        value={orderRowItem.orderStatus || 'Pending'}
                                                        onChange={(eventNode) => handleAdminStatusChangeSelect(orderIdKey, eventNode.target.value)}
                                                        className="bg-transparent text-[10px] text-TEXT font-bold uppercase tracking-wider focus:outline-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </div>

                                                {/* Inspect complete order layout sheets routing anchor */}
                                                <Link
                                                    to={`/admin/orders/${orderIdKey}`}
                                                    className="w-8 h-8 bg-white hover:bg-neutral-900 hover:text-white border border-gray-200 text-gray-400 rounded-sm flex items-center justify-center transition-all duration-300 shadow-3xs focus:outline-none"
                                                    title="Inspect Full Invoice Sheet"
                                                >
                                                    <Eye size={13} className="stroke-[1.5]" />
                                                </Link>

                                                {/* Hard delete drop action query trigger button node */}
                                                <button
                                                    type="button"
                                                    disabled={btnLoading[orderIdKey]}
                                                    onClick={() => handleOrderDeletePurgeSubmit(orderIdKey)}
                                                    className="w-8 h-8 bg-white hover:bg-red-600 hover:text-white border border-gray-200 text-gray-400 hover:border-red-600 rounded-sm flex items-center justify-center transition-all duration-300 shadow-3xs cursor-pointer focus:outline-none disabled:opacity-30"
                                                    title="Purge Invoice Sheet File"
                                                >
                                                    <Trash2 size={13} className="stroke-[1.5]" />
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>

                {/* PAGINATION FOOTER PANEL */}
                {adminOrders.length > 0 && (
                    <div className="flex justify-center items-center gap-3 mt-12 mb-6 select-none flex-wrap">
                        {/* Prev Navigator Trigger Button */}
                        <button
                            onClick={() => setSearchParams({ page: String(pageUrlParam - 1), search: searchUrlParam, status: statusUrlParam, sort: sortUrlParam })}
                            disabled={pageUrlParam === 1}
                            className="px-4 py-2 border border-gray-200 text-[10px] uppercase tracking-[2px] font-semibold text-TEXT rounded-sm disabled:opacity-30 hover:bg-gray-50 active:scale-95 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed focus:outline-none"
                        >
                            Prev
                        </button>

                        {/* Limited visible numeric buttons array loops */}
                        <div className="flex items-center gap-1.5 font-mono text-xs">
                            {smartRenderedPageNumbers.map(pageIndexNumber => (
                                <button
                                    key={pageIndexNumber}
                                    onClick={() => setSearchParams({ page: String(pageIndexNumber), search: searchUrlParam, status: statusUrlParam, sort: sortUrlParam })}
                                    className={`w-9 h-9 border text-xs font-semibold rounded-sm transition-all duration-300 flex items-center justify-center cursor-pointer focus:outline-none
                                    ${pageUrlParam === pageIndexNumber
                                            ? 'bg-TEXT text-white border-TEXT shadow-xs font-bold'
                                            : 'bg-white text-TEXT border-gray-200 hover:border-TEXT hover:text-TEXT'
                                        }`}
                                >
                                    {String(pageIndexNumber).padStart(2, '0')}
                                </button>
                            ))}
                        </div>

                        {/* Next Navigator Trigger Button */}
                        <button
                            onClick={() => setSearchParams({ page: String(pageUrlParam + 1), search: searchUrlParam, status: statusUrlParam, sort: sortUrlParam })}
                            disabled={pageUrlParam === totalPages}
                            className="px-4 py-2 border border-gray-200 text-[10px] uppercase tracking-[2px] font-semibold text-TEXT rounded-sm disabled:opacity-30 hover:bg-gray-50 active:scale-95 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed focus:outline-none"
                        >
                            Next
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ManageOrders;