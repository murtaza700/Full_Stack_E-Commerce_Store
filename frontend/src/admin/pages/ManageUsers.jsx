import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'motion/react';
import { Search, Loader2, Trash2, ArrowLeft, RefreshCw, Users, Shield, Calendar } from 'lucide-react';
import { showErrorToast, showSuccessToast } from '../../helper/MyToast';
import {
    fetchAllUsersAdmin,
    deleteUserAccountAdmin,
    clearAdminUsersErrors,
    resetAdminUsersStatusFlags
} from '../../redux/slices/allUsersSlice';

const ManageUsers = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const searchUrlParam = searchParams.get('search') || '';
    const sortUrlParam = searchParams.get('sort') || '-createdAt';

    const [searchQueryInput, setSearchQueryInput] = useState(searchUrlParam);

    const { allUsersAdmin: allUsers = [], loading, errors, actionSuccess } = useSelector((state) => state.adminUsers);

    useEffect(() => {
        dispatch(fetchAllUsersAdmin({ search: searchUrlParam, sort: sortUrlParam }));
    }, [dispatch, searchUrlParam, sortUrlParam]);

    useEffect(() => {
        if (errors?.fetchAll) {
            showErrorToast(errors.fetchAll);
            dispatch(clearAdminUsersErrors());
        }
        if (errors?.deleteAction) {
            showErrorToast(errors.deleteAction);
            dispatch(clearAdminUsersErrors());
        }
        if (actionSuccess) {
            showSuccessToast("Client identity profile wiped off database registries successfully!");
            dispatch(resetAdminUsersStatusFlags());
            // Immediately hot re-fetches keeping layouts synced transparent
            dispatch(fetchAllUsersAdmin({ search: searchUrlParam, sort: sortUrlParam }));
        }
    }, [errors?.fetchAll, errors?.deleteAction, actionSuccess, dispatch, searchUrlParam, sortUrlParam]);

    const handleClientProfileWipeSubmit = async (targetClientId, targetClientNameStr) => {
        const structuralAlertConfirmText = `Are you absolutely certain you want to permanently delete profile: [ ${targetClientNameStr.toUpperCase()} ]? This identity credentials record will be completely erased across global clusters databases.`;

        if (window.confirm(structuralAlertConfirmText)) {
            dispatch(deleteUserAccountAdmin(targetClientId));
        }
    };

    const handleFilterFormQuerySubmit = (eventNode) => {
        eventNode.preventDefault();
        setSearchParams({
            search: searchQueryInput.trim(),
            sort: sortUrlParam
        });
    };

    const handleQuickSortingSelectionUpdate = (dynamicSortingValue) => {
        setSearchParams({
            search: searchUrlParam,
            sort: dynamicSortingValue
        });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.04, ease: 'easeOut' } }
    };

    const rowFadeUpVariants = {
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
    };

    if (loading?.fetchAll) {
        return (
            <div className="flex flex-col items-center justify-center py-24 space-y-3 font-sans select-none">
                <Loader2 size={24} className="animate-spin text-neutral-400 stroke-[1.2]" />
                <p className="text-[10px] text-gray-400 font-light tracking-[2px] uppercase">Querying Central User Directories Vault...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 select-none font-sans">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold tracking-[2px] uppercase text-TEXT">Clients Vault Registry</h1>
                    <p className="text-xs text-gray-400 font-light mt-1">Audit platform accounts authorization tokens, verify credentials fields indices, and perform secure profiles wipes.</p>
                </div>
            </div>


            <Link to="/admin" className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[2px] font-semibold text-gray-400 hover:text-TEXT transition-colors duration-300 mb-2 group focus:outline-none">
                <ArrowLeft size={12} className="transform group-hover:-translate-x-0.5 transition-transform" />
                <span>Back To Operations Room</span>
            </Link>


            <div className="bg-white border border-gray-100 p-4 rounded-sm shadow-2xs">
                <form onSubmit={handleFilterFormQuerySubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">


                    <div className="md:col-span-8 relative flex items-center bg-neutral-50 border border-gray-200/80 rounded-sm p-1">
                        <Search size={14} className="absolute left-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Query records by Unique Hex ObjectId, Customer Name text fields, or email parameters..."
                            value={searchQueryInput}
                            onChange={(eventNode) => setSearchQueryInput(eventNode.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-xs font-sans placeholder-gray-300 text-TEXT focus:outline-none bg-transparent"
                        />
                        <button type="submit" className="bg-TEXT text-white px-4 py-2 text-[10px] uppercase tracking-[1.5px] font-bold rounded-sm border border-TEXT hover:bg-neutral-800 transition-colors focus:outline-none cursor-pointer">
                            Search
                        </button>
                    </div>

                    <div className="md:col-span-4 flex items-center bg-neutral-50 border border-gray-200/80 rounded-sm px-3 py-2.5">
                        <RefreshCw size={13} className="text-gray-400 mr-2 shrink-0" />
                        <select
                            value={sortUrlParam}
                            onChange={(eventNode) => handleQuickSortingSelectionUpdate(eventNode.target.value)}
                            className="w-full bg-transparent text-xs text-TEXT font-semibold focus:outline-none cursor-pointer uppercase tracking-wider"
                        >
                            <option value="-createdAt">Newest Registrations First</option>
                            <option value="createdAt">Oldest Accounts Index</option>
                            <option value="fullName">Alphabetical Name Sort (A-Z)</option>
                            <option value="-fullName">Reverse Name Sort (Z-A)</option>
                        </select>
                    </div>

                </form>
            </div>


            <div className="bg-white border border-gray-100 rounded-sm shadow-2xs overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-200">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50 text-gray-400 font-bold text-[10px] uppercase tracking-[2px] select-none">
                            <th className="py-4 px-6">Client Identity</th>
                            <th className="py-4 px-6">Token Role</th>
                            <th className="py-4 px-6">Account Verification Date</th>
                            <th className="py-4 px-6 text-center">Admin Actions</th>
                        </tr>
                    </thead>
                    <motion.tbody
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="divide-y divide-gray-50 text-neutral-700"
                    >

                        {allUsers.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-12 text-center text-gray-400 font-light font-sans uppercase tracking-[0.5px]">
                                    No registered consumer credentials files matched your filtration lookup criteria parameters.
                                </td>
                            </tr>
                        ) : (
                            allUsers.map((userRowItem) => {
                                const clientIdHexToken = userRowItem._id || 'MOCK-ID';
                                const clientFullNameStr = userRowItem.fullName || 'Anonymous Collector';
                                const systemAccessRoleStr = String(userRowItem.role || 'user').toLowerCase();

                                return (
                                    <motion.tr
                                        key={clientIdHexToken}
                                        variants={rowFadeUpVariants}
                                        className="hover:bg-neutral-50/50 transition-colors group text-xs font-sans"
                                    >


                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-3.5">
                                                <div className="w-9 h-9 bg-neutral-50 border border-neutral-100 rounded-full flex items-center justify-center text-neutral-400 group-hover:bg-TEXT group-hover:text-white transition-colors duration-300 shadow-3xs shrink-0">
                                                    <Users size={13} className="stroke-[1.3]" />
                                                </div>
                                                <div className="space-y-0.5 min-w-0">
                                                    <p className="font-bold text-TEXT uppercase tracking-wide truncate max-w-xs">{clientFullNameStr}</p>
                                                    <p className="text-[10px] text-gray-400 font-mono tracking-tight select-all">HEX: {clientIdHexToken}</p>
                                                    <p className="text-[10px] text-gray-400 lowercase font-light truncate max-w-xs">{userRowItem.email || 'N/A'}</p>
                                                </div>
                                            </div>
                                        </td>



                                        <td className="py-4 px-6 select-none">
                                            <span className={`px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded-2xs border inline-flex items-center gap-1 ${systemAccessRoleStr === 'admin'
                                                ? 'bg-neutral-900 border-neutral-900 text-white font-black'
                                                : 'bg-neutral-50 border-gray-200 text-gray-400'
                                                }`}>
                                                <Shield size={10} className={systemAccessRoleStr === 'admin' ? 'text-white' : 'text-gray-300'} />
                                                {systemAccessRoleStr === 'admin' ? 'Root Admin' : 'Verified Client'}
                                            </span>
                                        </td>



                                        <td className="py-4 px-6 font-mono text-gray-400 text-[11px] font-medium flex items-center gap-1.5 h-16 select-none">
                                            <Calendar size={12} className="text-gray-300" />
                                            {userRowItem.createdAt
                                                ? new Date(userRowItem.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                                                : "N/A"
                                            }
                                        </td>


                                        <td className="py-4 px-6 text-center min-w-35">
                                            <div className="flex items-center justify-center">
                                                <button
                                                    type="button"
                                                    disabled={loading?.deleteAction}
                                                    onClick={() => handleClientProfileWipeSubmit(clientIdHexToken, clientFullNameStr)}
                                                    className="w-8 h-8 bg-white hover:bg-red-600 hover:text-white border border-gray-200 text-gray-400 hover:border-red-600 rounded-sm flex items-center justify-center transition-all duration-300 shadow-3xs cursor-pointer focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed group-hover:border-gray-300"
                                                    title={systemAccessRoleStr === 'admin' ? "Disallowed Operation" : "Permanently Wipe Credentials File"}
                                                >
                                                    <Trash2 size={13} className="stroke-[1.5]" />
                                                </button>
                                            </div>
                                        </td>

                                    </motion.tr>
                                );
                            })
                        )}
                    </motion.tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;