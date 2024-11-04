import { Navigate, useLocation } from "react-router-dom";
import { roomHandler } from "../utils/roomHandler";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("professor" | "student")[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = ["professor", "student"],
}) => {
  const location = useLocation();
  const session = roomHandler.getSession();

  if (!roomHandler.isLoggedIn()) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (session.role && !allowedRoles.includes(session.role)) {
    // Redirect to appropriate home page based on role
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
