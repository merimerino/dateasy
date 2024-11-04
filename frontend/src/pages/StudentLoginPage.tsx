// pages/StudentLoginPage.tsx
import React from "react";
import { Container } from "@chakra-ui/react";
import Header from "../components/Header";
import StudentLoginForm from "../components/student/StudentLoginForm";
import { useStudentLogin } from "../components/student/hooks/useStudentLogin";

const StudentLoginPage: React.FC = () => {
  const { formData, isLoading, handleChange, handleSubmit } = useStudentLogin();

  return (
    <>
      <Header />
      <Container maxW="md" py={10}>
        <StudentLoginForm
          formData={formData}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
      </Container>
    </>
  );
};

export default StudentLoginPage;
