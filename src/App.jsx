import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainLayout from './Layouts/MainLayout';
import MyCreationsPage from './pages/MyCreationsPage';
import GenerateVideoPage from './pages/GenerateVideoPage';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Spinner from './components/ui/Spinner';
import AppRoutes from './AppRoutes';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkAuthLoading, setCheckAuthLoading] = useState(true);

  useEffect(() => {
    setCheckAuthLoading(true);
      const access = localStorage.getItem('access');
      setIsAuthenticated(Boolean(access));
      setCheckAuthLoading(false);

  }, []);

  if (checkAuthLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-green-200">
        <div className="flex flex-col items-center p-8 rounded-xl shadow-lg bg-white">
          <Spinner colorClass="text-green-500" />
          <span className="mt-4 text-gray-700 text-lg font-medium animate-pulse">
            Authenticating...
          </span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <AppRoutes isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    </Router>
  );
};

export default App;