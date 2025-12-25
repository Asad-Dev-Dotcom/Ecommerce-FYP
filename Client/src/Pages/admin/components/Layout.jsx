import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ currentPage, setCurrentPage, children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar fixed */}
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main content */}
      <div className="flex-1 ml-70 flex flex-col">
        {/* Header fixed at top of main content */}
        <Header />

        {/* Scrollable area */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
