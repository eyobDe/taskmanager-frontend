import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import DocumentationPage from './pages/DocumentationPage';
import AboutPage from './pages/AboutPage';
import { TaskProvider } from './context/TaskContext';
import { UserProvider } from './context/UserContext';
import { ToastProvider } from './components/common/ToastContainer';
import './styles/globals.css';

export default function App() {
  // Light mode only - no dark mode functionality

  return (
    <Router>
      <UserProvider>
        <TaskProvider>
          <ToastProvider>
            <div className="flex flex-col h-screen bg-white">
              {/* Navbar - Full Width, Sticky Top */}
              <Navbar />

              {/* Main Layout - Sidebar + Content */}
              <div className="flex flex-1 overflow-hidden">
                {/* Sidebar - Fixed Width, Scrollable */}
                <Sidebar />

                {/* Main Content - Scrollable */}
                <main className="flex-1 overflow-y-auto bg-white">
                  <Routes>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/documentation" element={<DocumentationPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/" element={<DashboardPage />} />
                  </Routes>
                </main>
              </div>
            </div>
          </ToastProvider>
        </TaskProvider>
      </UserProvider>
    </Router>
  );
}
