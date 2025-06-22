
import { Navigate, Outlet } from "react-router-dom";

/**
 * PrivateRoute protects nested routes from unauthenticated access.
 * If the user is authenticated, renders the nested route (Outlet).
 * Otherwise, redirects to the login page (or a custom path).
 *
 * @param {boolean} isAuthenticated - Whether the user is logged in
 * @param {string} redirectTo - Path to redirect if not authenticated (default: "/login")
 */
const PrivateRoute = ({ isAuthenticated, redirectTo = "/login" }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
