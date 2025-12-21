import React from 'react';

const CategoryCard = ({ category, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <div className="h-32 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900 m-0 mb-2">{category.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{category.description}</p>

        <div className="flex justify-between items-center mb-4">
          <div className="text-center">
            <span className="text-xs text-gray-500 uppercase font-medium block">Products</span>
            <span className="text-lg font-bold text-gray-800">{category.productCount}</span>
          </div>
          <div className="text-center">
            <span className="text-xs text-gray-500 uppercase font-medium block">Created</span>
            <span className="text-sm font-medium text-gray-700">{category.createdAt}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            onClick={() => onEdit(category)}
          >
            Edit
          </button>
          <button
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            onClick={() => onDelete(category.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
