// pages/ProfessorLoginPage.tsx
import React from "react";
import { Container } from "@chakra-ui/react";
import Header from "../components/Header";
import ProfessorLoginTabs from "../components/professor/ProfessorLoginTabs";
import { useProfessorLogin } from "../components/professor/hooks/useProfessorLogin";

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
