import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { TasksResponse } from "../types/Tasks";
import { useNavigate } from "react-router-dom";

export const useTasks = () => {
  const [tasks, setTasks] = useState<TasksResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/");
          throw new Error("Not authenticated");
        }

        const response = await fetch("http://localhost:3000/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-jwt-token": token, // Changed to x-jwt-token header
          },
          redirect: "follow",
        });

        if (response.status === 403) {
          localStorage.clear();
          navigate("/");
          throw new Error("Session expired. Please login again.");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();
        setTasks(data);
      } catch (error) {
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
    };

    fetchTasks();
  }, [toast, navigate]);

  return { tasks, loading };
};
