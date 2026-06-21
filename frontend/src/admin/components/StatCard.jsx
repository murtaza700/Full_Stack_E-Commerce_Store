import React from 'react';

const StatCard = ({ title, value, icon, colorClass }) => {
    return (
        <div className="bg-white border border-gray-100 rounded-sm p-6 flex items-center justify-between shadow-xs hover:shadow-md transition-shadow duration-300 select-none">
            <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[2px] font-medium text-gray-400">
                    {title}
                </p>
                <h3 className="text-2xl font-bold tracking-tight text-TEXT">
                    {value}
                </h3>
            </div>
            {/* Custom status wrappers color themes indicators dynamically mapping */}
            <div className={`p-3 rounded-full border ${colorClass}`}>
                {icon}
            </div>
        </div>
    );
};

export default StatCard;