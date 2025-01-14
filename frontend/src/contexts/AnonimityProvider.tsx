import React, { createContext, useContext, useState } from "react";

interface AnonymityContextType {
  isAnonymous: boolean;
  toggleAnonymity: () => void;
}

const AnonymityContext = createContext<AnonymityContextType | undefined>(
  undefined
);

export const AnonymityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAnonymous, setIsAnonymous] = useState(false);

  const toggleAnonymity = () => {
    setIsAnonymous((prev) => !prev);
  };

  return (
    <AnonymityContext.Provider value={{ isAnonymous, toggleAnonymity }}>
      {children}
    </AnonymityContext.Provider>
  );
};

export const useAnonymity = () => {
  const context = useContext(AnonymityContext);
  if (context === undefined) {
    throw new Error("useAnonymity must be used within an AnonymityProvider");
  }
  return context;
};
