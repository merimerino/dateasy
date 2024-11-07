// components/TaskList.tsx
import React from "react";
import { Box, VStack, Button, Spinner, Center, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import { roomHandler } from "../utils/roomHandler";
import { Task } from "../types/Tasks";
import TaskCard from "./tasks/TaskCard";

const TaskList: React.FC = () => {
  const navigate = useNavigate();
  const { tasks, loading } = useTasks();
  const isProfessor = roomHandler.isProfessor();
  const currentRoom = roomHandler.getCurrentRoom();

  if (loading) {
    return (
      <Center pt={4}>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <Box pt={4} px={4} maxW="800px" mx="auto">
        <Center>
          <Text>No tasks available</Text>
        </Center>
        {isProfessor && (
          <Button
            onClick={() => navigate(`/room/${currentRoom}/addTask`)}
            size="lg"
            width="100%"
            variant="ghost"
            bg="gray.100"
            _hover={{ bg: "gray.200" }}
            mt={4}
          >
            +
          </Button>
        )}
      </Box>
    );
  }

  // Type guard to ensure task has required properties
  const isValidTask = (task: Task): task is Task => {
    return (
      task &&
      typeof task.task_type === "string" &&
      typeof task.order_number === "number" &&
      typeof task.name === "string" &&
      typeof task.text === "string"
    );
  };

  return (
    <Box pt={4} px={4} maxW="800px" mx="auto">
      <VStack spacing={4} align="stretch">
        {tasks.map((task) => {
          if (!isValidTask(task)) {
            console.error("Invalid task data:", task);
            return null;
          }

          return (
            <TaskCard
              key={`${task.task_type}-${task.order_number}`}
              task={task}
            />
          );
        })}

        {isProfessor && (
          <Button
            onClick={() => navigate(`/room/${currentRoom}/addTask`)}
            size="lg"
            width="100%"
            variant="ghost"
            bg="gray.100"
            _hover={{ bg: "gray.200" }}
          >
            +
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default TaskList;
