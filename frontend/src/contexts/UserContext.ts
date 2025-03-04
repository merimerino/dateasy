import { createContext } from "react";

interface UserContextType {
  role: "student" | "professor" | null;
  updateRole: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
