import { Navigate, Outlet } from "react-router-dom";

/**
 * PublicRoute restricts access to public pages (like login/signup) for authenticated users.
 * If the user is NOT authenticated, renders the nested route (Outlet).
 * Otherwise, redirects to the dashboard or main page (default: "/generate-video").
 *
 * @param {boolean} isAuthenticated - Whether the user is logged in
 * @param {string} redirectTo - Path to redirect if authenticated (default: "/generate-video")
 */
const PublicRoute = ({ isAuthenticated, redirectTo = "/generate-video" }) => {
  return !isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default PublicRoute;
