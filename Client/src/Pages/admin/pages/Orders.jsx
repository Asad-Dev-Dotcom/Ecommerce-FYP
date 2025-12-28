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
    const matchesStatus =
      filterStatus === 'all' || order.status === filterStatus;

    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getCustomerName(order.customerId)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (orderId, newStatus) => {
    setOrderList(orderList.map(order =>
      order.id === orderId
        ? {
            ...order,
            status: newStatus,
            ...(newStatus === 'shipped' && {
              shippedDate: new Date().toISOString().split('T')[0],
            }),
            ...(newStatus === 'delivered' && {
              deliveredDate: new Date().toISOString().split('T')[0],
            }),
          }
        : order
    ));
  };

  const statusOptions = ['all', 'pending', 'processing', 'shipped', 'delivered'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Orders Management
        </h1>
      </div>

      {/* Search + Status Buttons */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 mb-6 items-center">

        {/* Search */}
        <div className="w-full lg:w-auto lg:mr-3">
          <input
            type="text"
            placeholder="Search by order ID or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
              w-full lg:w-80
              px-4 py-2 text-base
              border border-gray-300 rounded-lg
              transition-all duration-200
              hover:border-red-500
              focus:outline-none
              focus:border-red-500
              focus:ring-1 focus:ring-red-500
            "
          />
        </div>

        {/* Status Buttons */}
        <div className="flex items-center gap-2 flex-wrap lg:ml-0">
          {statusOptions.map(status => {
            const isActive = status === filterStatus;

            return (
            <button
  key={status}
  onClick={() => setFilterStatus(status)}
  className={`
    px-6 py-2 rounded-lg text-sm font-medium
    transition-all duration-200
    whitespace-nowrap
    ${
      isActive
        ? 'bg-red-600 text-white'
        : 'bg-gray-200 text-black hover:ring-2 hover:ring-red-500 hover:bg-transparent'
    }
  `}
>
  {status === 'all'
    ? 'All Status'
    : status.charAt(0).toUpperCase() + status.slice(1)
  }
</button>

            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Stat title="Total Orders" value={orderList.length} />
        <Stat
          title="Pending Orders"
          value={orderList.filter(o => o.status === 'pending').length}
        />
        <Stat
          title="Processing"
          value={orderList.filter(o => o.status === 'processing').length}
        />
        <Stat
          title="Shipped"
          value={orderList.filter(o => o.status === 'shipped').length}
        />
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOrders.map(order => (
          <OrderCard
            key={order.id}
            order={order}
            customerName={getCustomerName(order.customerId)}
            onStatusChange={handleStatusChange}
            onViewDetails={() => setSelectedOrder(order)}
          />
        ))}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          customer={users.find(
            user => user.id === selectedOrder.customerId
          )}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

const Stat = ({ title, value }) => (
  <div className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-200">
    <h3 className="text-xs sm:text-sm font-medium text-gray-500 uppercase mb-2">
      {title}
    </h3>
    <p className="text-2xl sm:text-3xl font-bold text-gray-900 m-0">
      {value}
    </p>
  </div>
);

export default Orders;
