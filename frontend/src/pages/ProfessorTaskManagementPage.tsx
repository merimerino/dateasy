import React from "react";
import { Box, useToast } from "@chakra-ui/react";
import { useTasks } from "../hooks/useTasks";
import ProfessorTaskList from "../modules/professor/ProfessorTaskList";
import LoadingSpinner from "../modules/LoadingSpinner";
import { Task } from "../types/Tasks";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../modules/Header";

const ProfessorTaskManagementPage: React.FC = () => {
  const { tasks, loading } = useTasks();
  const toast = useToast();
  const navigate = useNavigate();
  const { roomName } = useParams();

  const handleEditTask = (task: Task) => {
    navigate(`/room/${roomName}/edit-task/${task.order_number}`, {
      state: { task },
    });
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-jwt-token": localStorage.getItem("token") || "",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      toast({
        title: "Task deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Refresh tasks list
      // You might want to implement a refetch function in your useTasks hook
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to delete task",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddTask = () => {
    navigate(`/room/${roomName}/add-task`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      <Header />
      <ProfessorTaskList
        tasks={tasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onAdd={handleAddTask}
      />
    </Box>
  );
};

export default ProfessorTaskManagementPage;
