import React, { useState } from 'react';
import { salesData, orders } from '../data/dummyData';
import StatCard from '../components/StatCard';
import Chart from '../components/Chart';
import RecentOrders from '../components/RecentOrders';
import LowStockAlert from '../components/LowStockAlert';

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState('daily');

  const getFilteredData = () => {
    switch (timeFilter) {
      case 'daily':
        return salesData.dailySales;
      case 'weekly':
        return salesData.weeklySales;
      case 'monthly':
        return salesData.monthlySales;
      case 'yearly':
        return salesData.yearlySales;
      default:
        return salesData.dailySales;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900 m-0">Dashboard Overview</h1>
        <div className="flex items-center">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          title="Total Sales"
          value={`$${salesData.totalSales.toLocaleString()}`}
          icon="💰"
          change="+12.5%"
          changeType="positive"
        />
        <StatCard
          title="Total Revenue"
          value={`$${salesData.totalRevenue.toLocaleString()}`}
          icon="📈"
          change="+8.2%"
          changeType="positive"
        />
        <StatCard
          title="Total Orders"
          value={salesData.totalOrders}
          icon="🛒"
          change="+15.3%"
          changeType="positive"
        />
        <StatCard
          title="Average Order Value"
          value={`$${salesData.averageOrderValue.toFixed(2)}`}
          icon="📊"
          change="+5.1%"
          changeType="positive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 m-0 mb-5">Sales Overview</h2>
          <Chart data={getFilteredData()} type="line" filter={timeFilter} />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 m-0 mb-5">Revenue Trends</h2>
          <Chart data={getFilteredData()} type="bar" filter={timeFilter} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrders orders={orders.slice(0, 5)} />
        </div>

        <div className="lg:col-span-1">
          <LowStockAlert />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
