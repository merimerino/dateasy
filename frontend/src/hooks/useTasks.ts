import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { TasksResponse } from "../types/Tasks";
import { roomHandler } from "../utils/roomHandler";
import { useNavigate } from "react-router-dom";

export const useTasks = () => {
  const [tasks, setTasks] = useState<TasksResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // First check if we're actually authenticated
        if (!roomHandler.isAuthenticated()) {
          console.log("Not authenticated according to roomHandler");
          navigate("/");
          throw new Error("Not authenticated");
        }

        const token = localStorage.getItem("token");
        console.log("Token exists:", !!token);

        if (!token) {
          navigate("/");
          throw new Error("Not authenticated");
        }

        // Log the token payload for debugging
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          console.log("Token payload:", payload);
          console.log(
            "Token expiry:",
            new Date(payload.expiresAt * 1000).toLocaleString()
          );
          console.log("Current time:", new Date().toLocaleString());
        } catch (e) {
          console.error("Error decoding token:", e);
        }

        console.log("Making request to /tasks");
        const response = await fetch("http://localhost:3000/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        console.log("Response status:", response.status);

        if (response.status === 403) {
          const errorText = await response.text();
          console.log("403 error details:", errorText);
          localStorage.clear();
          navigate("/");
          throw new Error("Session expired. Please login again.");
        }

        if (!response.ok) {
          const error = await response.text();
          console.log("Error response:", error);
          try {
            const parsedError = JSON.parse(error);
            throw new Error(parsedError.error || "Failed to fetch tasks");
          } catch {
            throw new Error("Failed to fetch tasks");
          }
        }

        const data = await response.json();
        console.log("Received data:", data);
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
