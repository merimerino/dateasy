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
          method: "GET",
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

        let data: Task[] = await response.json();
        data = [
          {
            room_name: "testing",
            name: "Geography Quiz",
            task_type: "multichoice",
            order_number: 1,
            multiple_answers: false,
            text: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            answers: [
              { username: "Pero", answer: "Paris" },
              { username: "Luka", answer: "London" },
              { username: "Ivan", answer: "Paris" },
              { username: "Mia", answer: "Berlin" },
              { username: "Mate", answer: "Paris" },
              { username: "Ante", answer: "Madrid" },
              { username: "Luce", answer: "Madrid" },
              { username: "Una", answer: "Paris" },
              { username: "Luna", answer: "Madrid" },
              { username: "Kuna", answer: "Paris" },
              { username: "Duna", answer: "Berlin" },
            ],
          },
          {
            room_name: "testing",
            name: "Short Task 1",
            task_type: "short_task",
            order_number: 2,
            text: "Write a short description of your favorite book.",
            max_characters_allowed: 250,
            answers: [
              { username: "Pero", answer: "Paris" },
              { username: "Luka", answer: "London" },
              { username: "Ivan", answer: "Paris" },
              { username: "Mia", answer: "Berlin" },
              { username: "Mate", answer: "Paris" },
              { username: "Ante", answer: "Madrid" },
              { username: "Luce", answer: "Madrid" },
              { username: "Una", answer: "Paris" },
              { username: "Luna", answer: "Madrid" },
              { username: "Kuna", answer: "Paris" },
              { username: "Duna", answer: "Berlin" },
            ],
          },
          {
            room_name: "testing",
            name: "Big testtt",
            task_type: "numbers_task",
            order_number: 4,
            text: "something i need to write about something",
            min_num: 1,
            max_num: 1900,
            answers: [
              { username: "Pero", answer: "1" },
              { username: "Luka", answer: "2" },
              { username: "Ivan", answer: "3" },
              { username: "Mia", answer: "4" },
              { username: "Mate", answer: "1" },
              { username: "Ante", answer: "2" },
              { username: "Luce", answer: "3" },
              { username: "Una", answer: "4" },
              { username: "Luna", answer: "1" },
              { username: "Kuna", answer: "2" },
              { username: "Duna", answer: "3" },
            ],
          },
        ];

        console.log(data);
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
