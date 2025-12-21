import React from 'react';

const Header = () =>
{
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="flex justify-between items-center px-6 py-4 max-w-full">
        <div className="flex items-center">
          <h1 className="text-3xl font-semibold text-gray-900 m-0">Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="text-xl p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 relative">
              🔔
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-semibold">
                3
              </span>
            </button>
          </div>

          <div className="flex items-center">
            <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <img
                src="https://via.placeholder.com/32x32/4A90E2/FFFFFF?text=A"
                alt="Admin Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium text-gray-700">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
