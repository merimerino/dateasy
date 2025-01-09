import { useState, useEffect, useCallback } from "react";
import { useToast } from "@chakra-ui/react";
import { roomHandler } from "../utils/roomHandler";
import { useNavigate, useParams } from "react-router-dom";
import { ExtendedTask } from "../modules/tasks/TaskForm/types";

export interface UseTasksOptions {
  filterByRoom?: boolean;
}

export const useTasks = (options: UseTasksOptions = { filterByRoom: true }) => {
  const [tasks, setTasks] = useState<ExtendedTask[] | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const { roomName } = useParams();

  const fetchTasks = useCallback(async () => {
    try {
      if (!roomHandler.isAuthenticated()) {
        navigate("/");
        throw new Error("Not authenticated");
      }

      const authToken = localStorage.getItem("token");
      if (!authToken) {
        navigate("/");
        throw new Error("Not authenticated");
      }

      const response = await fetch("http://localhost:3000/tasks", {
        headers: {
          "Content-Type": "application/json",
          "x-jwt-token": authToken,
        },
      });

      if (!response.ok) {
        const error = await response.text();
        try {
          const parsedError = JSON.parse(error);
          throw new Error(parsedError.error || "Failed to fetch tasks");
        } catch {
          throw new Error("Failed to fetch tasks");
        }
      }

      const data: ExtendedTask[] = await response.json();
      if (data) {
        const filteredTasks =
          options.filterByRoom && roomName
            ? data.filter((task) => task.room_name === roomName)
            : data;
        setTasks(filteredTasks);
      }
    } catch (error) {
      console.error("Error details:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to load tasks",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [toast, navigate, roomName, options.filterByRoom]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, loading, refetch: fetchTasks };
};
