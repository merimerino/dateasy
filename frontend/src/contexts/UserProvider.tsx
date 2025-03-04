// src/contexts/UserProvider.tsx
import React, { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { roomHandler } from "../utils/roomHandler";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [role, setRole] = useState<"student" | "professor" | null>(null);

  const updateRole = () => {
    const currentRole = roomHandler.getUserRole();
    setRole(currentRole);
  };

  useEffect(() => {
    updateRole();
  }, []);

  const value = {
    role,
    updateRole,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
