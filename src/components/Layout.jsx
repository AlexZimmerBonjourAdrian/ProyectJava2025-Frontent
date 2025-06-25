import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      {!isHomePage && <Navbar />}
      <main className="min-h-screen bg-gray-50">
        <Outlet />
      </main>
    </>
  );
};

export default Layout; 