import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { TaskProvider } from './context/TaskContext';
import { ToastProvider } from './components/common/ToastContainer';
import DashboardLayout from './components/Layout/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <UserProvider>
      <TaskProvider>
        <ToastProvider>
          <Router>
            <Routes>
              <Route path="/" element={
                <DashboardLayout>
                  <DashboardPage />
                </DashboardLayout>
              } />
              <Route path="/dashboard" element={
                <DashboardLayout>
                  <DashboardPage />
                </DashboardLayout>
              } />
              <Route path="/about" element={
                <DashboardLayout>
                  <AboutPage />
                </DashboardLayout>
              } />
            </Routes>
          </Router>
        </ToastProvider>
      </TaskProvider>
    </UserProvider>
  );
}

export default App;
