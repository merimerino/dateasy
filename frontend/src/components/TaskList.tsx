import React from "react";
import {
  Box,
  Heading,
  VStack,
  Button,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import { roomHandler } from "../utils/roomHandler";

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

  return (
    <Box pt={4} px={4} maxW="800px" mx="auto">
      <VStack spacing={4} align="stretch">
        {tasks?.tasks.map((task) => (
          <Box
            key={`${task.taskType}-${task.taskOrderNumber}`}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
            shadow="sm"
          >
            <Heading size="sm">{task.name}</Heading>
            <Box mt={2} color="gray.600">
              {task.text}
            </Box>

            {/* Display additional info based on task type */}
            {task.taskType === "multiple_choice" && (
              <Box mt={2}>
                <Box color="gray.500" fontSize="sm">
                  Options:
                </Box>
                <VStack align="start" pl={4} mt={1}>
                  {task.options.map((option, index) => (
                    <Box key={index}>{option}</Box>
                  ))}
                </VStack>
              </Box>
            )}

            {task.taskType === "number_tasks" && (
              <Box mt={2} color="gray.500" fontSize="sm">
                Range: {task.min_num} - {task.max_num}
              </Box>
            )}

            {task.taskType === "short_tasks" && (
              <Box mt={2} color="gray.500" fontSize="sm">
                Max characters: {task.max_characters_allowed}
              </Box>
            )}
          </Box>
        ))}

        {/* Only show add button for professors */}
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
