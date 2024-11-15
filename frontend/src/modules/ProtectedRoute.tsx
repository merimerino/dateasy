import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { roomHandler } from "../utils/roomHandler";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: ("student" | "professor")[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const toast = useToast();

  if (!roomHandler.isAuthenticated()) {
    toast({
      title: t("error.unauthorized"),
      description: t("error.pleaseLogin"),
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  const userRole = roomHandler.getUserRole();

  if (!userRole || !allowedRoles.includes(userRole)) {
    toast({
      title: t("error.accessDenied"),
      description: t("error.insufficientPermissions"),
      status: "error",
      duration: 3000,
      isClosable: true,
    });

    // If student tries to access professor routes, redirect to view
    if (userRole === "student") {
      const roomName = location.pathname.split("/")[2];
      return <Navigate to={`/room/${roomName}/view`} replace />;
    }

    // Otherwise, redirect to home
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
