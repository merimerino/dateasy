import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { Task } from "../types/Tasks";
import { roomHandler } from "../utils/roomHandler";
import { useNavigate } from "react-router-dom";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
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
          method: "POST",
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

        const data: Task[] = await response.json();
        setTasks(data);
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
    };

    fetchTasks();
  }, [toast, navigate]);

  return { tasks, loading };
};
