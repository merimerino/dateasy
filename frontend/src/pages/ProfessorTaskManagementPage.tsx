import { Box, useToast } from "@chakra-ui/react";
import { useTasks } from "../hooks/useTasks";
import ProfessorTaskList from "../modules/professor/ProfessorTaskList";
import LoadingSpinner from "../modules/LoadingSpinner";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Header from "../modules/Header";
import { useEffect } from "react";
import { ExtendedTask } from "../modules/tasks/TaskForm/types";

const ProfessorTaskManagementPage: React.FC = () => {
  const { tasks, loading, refetch } = useTasks();
  const toast = useToast();
  const navigate = useNavigate();
  const { roomName } = useParams();
  const location = useLocation();

  useEffect(() => {
    refetch();
  }, [location.pathname, refetch]);

  const handleEditTask = (task: ExtendedTask) => {
    navigate(`/room/${roomName}/edit-task/${task.order_number}`, {
      state: { task },
    });
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/deleteTask`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-jwt-token": localStorage.getItem("token") || "",
        },
        body: JSON.stringify({
          id: taskId,
        }),
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

      refetch();
      console.log("RU aaaa");
    } catch (error) {
      console.error(error);
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
        roomName={roomName}
      />
    </Box>
  );
};

export default ProfessorTaskManagementPage;
