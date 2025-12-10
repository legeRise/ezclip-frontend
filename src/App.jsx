import { useState, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { UserProvider } from './contexts/UserContext';
import { Card, CardContent } from '@/components/shadcn/card';
import { Loader2 } from 'lucide-react';

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
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <Card className="shadow-xl border-primary/10">
          <CardContent className="flex flex-col items-center p-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
            <span className="text-muted-foreground font-medium animate-pulse">
              Authenticating...
            </span>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <UserProvider>
      <Router>
        <AppRoutes isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      </Router>
    </UserProvider>
  );
};

export default App;
