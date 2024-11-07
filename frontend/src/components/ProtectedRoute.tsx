import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const roomName = localStorage.getItem("roomName");

    if (!token || !roomName) {
      return false;
    }

    try {
      // Decode the JWT token
      const payload = JSON.parse(atob(token.split(".")[1]));

      // Check if token is expired
      if (payload.expiresAt && Date.now() >= payload.expiresAt * 1000) {
        localStorage.removeItem("token");
        localStorage.removeItem("roomName");
        return false;
      }

      // Check if trying to access a different room
      const currentPath = location.pathname;
      const roomPathMatch = currentPath.match(/\/room\/(.+?)(\/|$)/);

      if (roomPathMatch) {
        const requestedRoom = roomPathMatch[1];
        if (requestedRoom !== roomName) {
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error("Auth check error:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("roomName");
      return false;
    }
  };

  const isAuthorized = checkAuth();

  if (!isAuthorized) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
