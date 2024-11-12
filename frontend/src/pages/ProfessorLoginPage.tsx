// pages/ProfessorLoginPage.tsx
import React from "react";
import { Container } from "@chakra-ui/react";
import Header from "../modules/Header";
import ProfessorLoginTabs from "../modules/professor/ProfessorLoginTabs";
import { useProfessorLogin } from "../hooks/useProfessorLogin";

const ProfessorLoginPage: React.FC = () => {
  const {
    formData,
    isLoading,
    handleChange,
    handleCreateRoom,
    handleJoinRoom,
  } = useProfessorLogin();

  return (
    <>
      <Header />
      <Container maxW="md" py={10}>
        <ProfessorLoginTabs
          formData={formData}
          isLoading={isLoading}
          onChange={handleChange}
          onCreateRoom={handleCreateRoom}
          onJoinRoom={handleJoinRoom}
        />
      </Container>
    </>
  );
};

export default ProfessorLoginPage;
