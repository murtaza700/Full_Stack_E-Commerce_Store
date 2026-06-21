import React from 'react';
import { Link } from 'react-router-dom';
import { Edit3, Trash2 } from 'lucide-react';

const ProductRow = ({ product, onDelete }) => {
    return (
        <tr className="hover:bg-gray-50/50 transition-colors">
            {/* Image Thumbnail Block Container */}
            <td className="py-4 px-6">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-12 h-12 object-cover border border-gray-100 rounded-sm bg-gray-50"
                />
            </td>

            {/* Fragrance Title Field */}
            <td className="py-4 px-6 font-semibold text-TEXT">
                {product.title}
            </td>

            {/* Retail Cost Parameters */}
            <td className="py-4 px-6 text-gray-500 font-medium">
                $ {product.price}
            </td>

            {/* Availability State Status Identifier mapping */}
            <td className="py-4 px-6">
                <span className={`px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-xs ${product.isActive !== false
                    ? 'bg-green-50 text-green-700 border border-green-100/50'
                    : 'bg-red-50 text-red-700 border border-red-100/50'
                    }`}>
                    {product.isActive !== false ? 'In Stock' : 'Out of Stock'}
                </span>
            </td>

            {/* Individual Structural Mutation Buttons Controllers */}
            <td className="py-4 px-6 flex justify-center items-center space-x-3 h-20">
                <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="p-2 border border-gray-100 text-gray-500 hover:text-TEXT hover:bg-gray-50 rounded-sm transition-all"
                    title="Edit Specification Profile"
                >
                    <Edit3 size={14} />
                </Link>
                <button
                    onClick={() => onDelete(product._id)}
                    className="p-2 border border-gray-100 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-all cursor-pointer focus:outline-none"
                    title="Purge Fragrance Record"
                >
                    <Trash2 size={14} />
                </button>
            </td>
        </tr>
    );
};

export default ProductRow;