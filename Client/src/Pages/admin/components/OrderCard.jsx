import React from 'react';

const OrderCard = ({ order, customerName, onStatusChange, onViewDetails }) =>
{
  const getStatusColor = (status) =>
  {
    switch (status)
    {
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

  const handleStatusChange = (e) =>
  {
    onStatusChange(order.id, e.target.value);
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-800 m-0 mb-1">{order.id}</h3>
          <p className="text-sm text-gray-600 m-0">{customerName}</p>
        </div>

        <div className="flex-shrink-0">
          <select
            value={order?.status}
            onChange={handleStatusChange}
            className={`px-3 py-1 rounded-full text-white text-xs font-semibold border-none cursor-pointer ${getStatusColor(order?.status)}`}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <span className="text-sm text-gray-500">{order?.orderDate}</span>
          <span className="text-sm text-gray-500">{order?.items?.length} items</span>
        </div>

        <div className="text-right">
          <span className="text-lg font-semibold text-gray-800">${order?.total?.toFixed(2) || order?.totalAmount?.toFixed(2)}</span>
        </div>
      </div>

      <div className="mb-4">
        {order?.items?.slice(0, 2).map((item, index) => (
          <div key={index} className="flex justify-between py-1">
            <span className="text-sm text-gray-700">{item?.productName}</span>
            <span className="text-sm text-gray-500">×{item?.quantity}</span>
          </div>
        ))}
        {order?.items?.length > 2 && (
          <span className="text-sm text-gray-400 italic">+{order?.items?.length - 2} more</span>
        )}
      </div>

      <div className="text-center">
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          onClick={() => onViewDetails(order)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
