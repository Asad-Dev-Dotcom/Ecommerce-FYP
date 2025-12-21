import React from 'react';

const Sidebar = ({ currentPage, setCurrentPage }) =>
{
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'orders', label: 'Orders', icon: '🛒' },
    { id: 'categories', label: 'Categories', icon: '🏷️' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <aside className="fixed  left-0 w-70 h-screen bg-gradient-primary text-black flex flex-col shadow-lg z-50">
      <div className="p-5 pb-4 border-b border-black/10">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-black to-gray-800 bg-clip-text text-transparent">
          Admin Panel
        </h2>
      </div>

      <nav className="flex-1 py-10">
        <ul className="list-none m-0 p-0">
          {menuItems.map(item => (
            <li key={item.id} className="mb-1">
              <button
                className={`flex items-center w-full px-5 py-3 text-left text-black/80 hover:text-black hover:bg-black/10 hover:translate-x-1 transition-all duration-300 rounded-r-2xl mr-2 focus:outline-none ${currentPage === item.id ? 'bg-black/15 text-black shadow-lg' : ''
                  }`}
                onClick={() => setCurrentPage(item.id)}
              >
                <span className="mr-3 text-lg w-5 text-center">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-5 border-t border-black/10">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center text-lg mr-3">
            👤
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-black m-0 mb-1">Admin User</p>
            <p className="text-xs text-black/70 m-0">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
