import React, { useState, useEffect } from 'react'
import { HashRouter as Router } from 'react-router-dom';
import Spinner from './components/ui/Spinner';
import AppRoutes from './AppRoutes';
import { UserProvider } from './contexts/UserContext';
import OneTapLogin from './components/google/OneTapLogin';


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
    <UserProvider>
      {!isAuthenticated && (
        <OneTapLogin onAuth={setIsAuthenticated} />
      )}
      <Router>
        <AppRoutes isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      </Router>
    </UserProvider>
  );
};

export default App;