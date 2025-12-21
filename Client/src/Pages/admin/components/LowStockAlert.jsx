import React from 'react';
import { salesData } from '../data/dummyData';

const LowStockAlert = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 m-0 mb-5">Low Stock Alerts</h3>

      <div className="flex flex-col gap-4">
        {salesData.lowStockProducts.map(product => (
          <div key={product.id} className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="text-2xl mr-3">⚠️</div>

            <div className="flex-1">
              <h4 className="text-base font-semibold text-gray-800 m-0 mb-1">{product.title}</h4>
              <p className="text-sm text-yellow-700 m-0">
                Only {product.stock} items remaining in stock
              </p>
            </div>

            <div className="text-right">
              <span className="text-lg font-bold text-red-600 bg-red-100 px-2 py-1 rounded">
                {product.stock}
              </span>
            </div>
          </div>
        ))}
      </div>

      {salesData.lowStockProducts.length === 0 && (
        <div className="text-center py-8 px-4 text-green-600">
          <p className="text-base font-medium m-0">🎉 All products are well stocked!</p>
        </div>
      )}
    </div>
  );
};

export default LowStockAlert;
