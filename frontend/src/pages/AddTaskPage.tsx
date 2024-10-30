import React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import { TaskHandler } from "../utils/taskHandle";
import { TaskCreateDTO } from "../types/Task";

const AddTaskPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (taskData: TaskCreateDTO) => {
    TaskHandler.createTask(taskData);
    navigate("/tasks");
  };

  const handleCancel = () => {
    navigate("/main");
  };

  return (
    <>
      <Header />
      <Box p={4}>
        <TaskForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </Box>
    </>
  );
};

export default AddTaskPage;
