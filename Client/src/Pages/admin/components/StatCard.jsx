import React from 'react';

const StatCard = ({ title, value, icon, change, changeType }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl">{icon}</span>
        <div className={`text-xs font-semibold px-2 py-1 rounded uppercase ${
          changeType === 'positive'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {change}
        </div>
      </div>

      <div className="text-left">
        <h3 className="text-3xl font-bold text-gray-900 m-0 mb-1">{value}</h3>
        <p className="text-sm text-gray-500 font-medium m-0">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;
