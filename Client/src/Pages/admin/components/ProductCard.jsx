import React from 'react';

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {product.discountPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
            {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 m-0 mb-1 line-clamp-2">{product.title}</h3>
        <p className="text-sm text-blue-600 font-medium m-0 mb-3 uppercase">{product.category}</p>

        <div className="mb-3">
          {product.discountPrice ? (
            <>
              <span className="text-gray-500 line-through text-sm mr-2">${product.price}</span>
              <span className="text-2xl font-bold text-gray-800">${product.discountPrice}</span>
            </>
          ) : (
            <span className="text-2xl font-bold text-gray-800">${product.price}</span>
          )}
        </div>

        <div className="mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
            product.stock <= 10
              ? 'bg-red-100 text-red-800'
              : 'bg-green-100 text-green-800'
          }`}>
            Stock: {product.stock}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            onClick={() => onEdit(product)}
          >
            Edit
          </button>
          <button
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            onClick={() => onDelete(product.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
