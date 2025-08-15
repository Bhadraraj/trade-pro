import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import EmailVerification from './pages/EmailVerification';
import DashboardOverview from './pages/DashboardOverview';
import Portfolio from './pages/Portfolio';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import MarketDate from './pages/MarketDate';
import Education from './pages/Education';
import Notifications from './pages/Notifications';
import Positions from './pages/Positions';
import RiskManagement from './pages/RiskManagement';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import HelpCenter from './pages/HelpCenter';

function App() {
  return (
    <AuthProvider>
      <Router basename='/trade-pro/'>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email/:token" element={<EmailVerification />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardOverview />} />
              <Route path="trading" element={<Dashboard />} />
              <Route path="portfolio" element={<Portfolio/>} />
              <Route path="orders" element={<Orders/>} />
              <Route path="market" element={<MarketDate/>} />
              <Route path="positions" element={<Positions/>} />
              <Route path="statistics" element={<Statistics/>} />
              <Route path="risk" element={<RiskManagement/>} />
              <Route path="education" element={<Education/>} />
              <Route path="notifications"element={<Notifications/>} />
              <Route path="settings" element={<Settings/>} />
              <Route path="help" element={<HelpCenter/>} />
            </Route>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;