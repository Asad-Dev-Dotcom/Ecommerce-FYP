import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ currentPage, setCurrentPage, children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col ml-70 md:ml-70">
        <Header />
        <main className="flex-1 p-6 max-w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
