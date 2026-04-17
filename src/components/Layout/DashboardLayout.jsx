import React from 'react';
import { useUser } from '../../context/UserContext';

const DashboardLayout = ({ children }) => {
  const { user } = useUser();

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Left Side Panel (Sidebar) */}
      <aside className="w-64 bg-slate-800 text-white flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-700 font-bold text-xl">
          TaskMaster Pro
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <a href="#" className="block px-4 py-2 bg-slate-700 rounded text-sm font-medium">
            Dashboard
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-slate-700 rounded text-sm font-medium transition-colors">
            About
          </a>
        </nav>
      </aside>

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700">Overview</h2>
          <div className="text-sm font-medium text-gray-600">
            {user ? `Logged in as: ${user.name}` : 'Loading...'}
          </div>
        </header>

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
