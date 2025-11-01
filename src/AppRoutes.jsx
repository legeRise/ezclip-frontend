import { Routes, Route } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MyCreationsPage from './pages/MyCreationsPage';
import GenerateVideoPage from './pages/GenerateVideoPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import HomePage from './pages/HomePage';
import ActivateAccount from './pages/ActivateAccount';
import FeedbackListPage from './pages/FeedbackListPage';

import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

const AppRoutes = ({ isAuthenticated, setIsAuthenticated }) => (
  <Routes>
    <Route
      path="/"
      element={
        <MainLayout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      }
    >
      {/* Home page route */}
      <Route index element={<HomePage isAuthenticated={isAuthenticated} />} />

      {/* Public routes */}
      <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
        <Route path="login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="activate/:uid/:token" element={<ActivateAccount />} />
        <Route path="reset-password/:uid/:token" element={<ResetPasswordPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Feedbacks route (accessible to all) */}
      <Route path="feedbacks" element={<FeedbackListPage />} />

      {/* Protected routes */}
      <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
        <Route path="generate-video" element={<GenerateVideoPage />} />
        <Route path="my-creations" element={<MyCreationsPage />} />
      </Route>

      {/* Catch-all 404 route */}
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
