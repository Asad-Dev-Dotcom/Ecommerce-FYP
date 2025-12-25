import React, { useState } from 'react';
import { users } from '../data/dummyData';
import UserCard from '../components/UserCard';

const Users = () => {
  const [userList] = useState(users);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = userList.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900 m-0">Users Management</h1>
      </div>

      <div className="mb-6 max-w-md">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=" w-full lg:w-80
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-gray-900 m-0">{userList.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-900 m-0">{userList.reduce((sum, user) => sum + user.totalOrders, 0)}</p>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-900 m-0">${userList.reduce((sum, user) => sum + user.totalSpent, 0).toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Avg Order Value</h3>
          <p className="text-3xl font-bold text-gray-900 m-0">
            ${userList.length > 0
              ? (userList.reduce((sum, user) => sum + user.totalSpent, 0) / userList.reduce((sum, user) => sum + user.totalOrders, 0)).toFixed(2)
              : '0.00'
            }
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;
