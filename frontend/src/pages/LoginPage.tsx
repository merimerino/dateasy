import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (roomName: string, password: string) => {
    console.log(roomName, password);
    navigate("/tasks");
  };

  return (
    <>
      <Header />
      <LoginForm onSubmit={handleSubmit} />
    </>
  );
};

export default LoginPage;
