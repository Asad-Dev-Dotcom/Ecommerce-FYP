import React from 'react';

const OrderDetails = ({ order, customer, onClose, onStatusChange }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500';
      case 'shipped':
        return 'bg-blue-500';
      case 'processing':
        return 'bg-orange-500';
      case 'pending':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  const handleStatusChange = (e) => {
    onStatusChange(order.id, e.target.value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 m-0">Order Details - {order.id}</h2>
          <button
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none focus:outline-none"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex justify-between">
                  <label className="font-medium text-gray-700">Order Date:</label>
                  <span className="text-gray-900">{order.orderDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <label className="font-medium text-gray-700">Status:</label>
                  <select
                    value={order.status}
                    onChange={handleStatusChange}
                    className={`px-3 py-1 rounded-full text-white text-xs font-semibold border-none cursor-pointer ${getStatusColor(order.status)}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
                <div className="flex justify-between">
                  <label className="font-medium text-gray-700">Payment Method:</label>
                  <span className="text-gray-900">{order.paymentMethod}</span>
                </div>
                {order.shippedDate && (
                  <div className="flex justify-between">
                    <label className="font-medium text-gray-700">Shipped Date:</label>
                    <span className="text-gray-900">{order.shippedDate}</span>
                  </div>
                )}
                {order.deliveredDate && (
                  <div className="flex justify-between">
                    <label className="font-medium text-gray-700">Delivered Date:</label>
                    <span className="text-gray-900">{order.deliveredDate}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
              <div className="flex gap-4">
                <img
                  src={customer.avatar}
                  alt={customer.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 m-0 mb-2">{customer.name}</h4>
                  <p className="text-gray-600 m-0 mb-1">{customer.email}</p>
                  <p className="text-gray-600 m-0 mb-1">{customer.phone}</p>
                  <p className="text-gray-600 m-0">{customer.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-gray-900 m-0 mb-1">{item.productName}</h4>
                    <p className="text-sm text-gray-600 m-0 mb-1">Quantity: {item.quantity}</p>
                    {item.variant && Object.keys(item.variant).length > 0 && (
                      <p className="text-sm text-gray-600 m-0">
                        Variant: {Object.entries(item.variant).map(([key, value]) => `${key}: ${value}`).join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-600 block">${item.price.toFixed(2)} × {item.quantity}</span>
                    <span className="text-lg font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="max-w-xs ml-auto">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-900">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="text-gray-900">${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="text-gray-900">${order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-300">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-lg font-semibold text-gray-900">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
