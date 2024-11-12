import { Container } from "@chakra-ui/react";
import Header from "../modules/Header";
import StudentLoginForm from "../modules/student/StudentLoginForm";
import { useStudentLogin } from "../hooks/useStudentLogin";

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
