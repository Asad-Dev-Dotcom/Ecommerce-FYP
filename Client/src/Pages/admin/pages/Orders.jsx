import React, { useState } from 'react';
import { orders, users } from '../data/dummyData';
import OrderCard from '../components/OrderCard';
import OrderDetails from '../components/OrderDetails';

const Orders = () => {
  const [orderList, setOrderList] = useState(orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getCustomerName = (customerId) => {
    const customer = users.find(user => user.id === customerId);
    return customer ? customer.name : 'Unknown Customer';
  };

  const filteredOrders = orderList.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getCustomerName(order.customerId).toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (orderId, newStatus) => {
    setOrderList(orderList.map(order =>
      order.id === orderId
        ? {
            ...order,
            status: newStatus,
            ...(newStatus === 'shipped' && { shippedDate: new Date().toISOString().split('T')[0] }),
            ...(newStatus === 'delivered' && { deliveredDate: new Date().toISOString().split('T')[0] })
          }
        : order
    ));
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseOrderDetails = () => {
    setSelectedOrder(null);
  };

  const statusOptions = ['all', 'pending', 'processing', 'shipped', 'delivered'];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900 m-0">Orders Management</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by order ID or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="sm:w-48">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-field"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-900 m-0">{orderList.length}</p>
        </div>
        <div className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Pending Orders</h3>
          <p className="text-3xl font-bold text-gray-900 m-0">{orderList.filter(o => o.status === 'pending').length}</p>
        </div>
        <div className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Processing</h3>
          <p className="text-3xl font-bold text-gray-900 m-0">{orderList.filter(o => o.status === 'processing').length}</p>
        </div>
        <div className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Shipped</h3>
          <p className="text-3xl font-bold text-gray-900 m-0">{orderList.filter(o => o.status === 'shipped').length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOrders.map(order => (
          <OrderCard
            key={order.id}
            order={order}
            customerName={getCustomerName(order.customerId)}
            onStatusChange={handleStatusChange}
            onViewDetails={handleViewOrder}
          />
        ))}
      </div>

      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          customer={users.find(user => user.id === selectedOrder.customerId)}
          onClose={handleCloseOrderDetails}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default Orders;
