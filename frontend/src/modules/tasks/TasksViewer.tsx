import {
  VStack,
  Box,
  Heading,
  Text,
  Spinner,
  Center,
  Container,
  useToast,
} from "@chakra-ui/react";
import { useTasks } from "../../hooks/useTasks";
import TaskDisplay from "./TaskDisplay";
import { useTranslation } from "react-i18next";

// Define the submission value type to match TaskDisplay's SubmissionValue
type SubmissionValue =
  | string
  | number
  | string[][]
  | { latitude: number; longitude: number }
  | null;

interface TaskSubmission {
  roomName: string;
  value: SubmissionValue;
}

const TasksViewer: React.FC = () => {
  const { tasks, loading } = useTasks();
  const { t } = useTranslation();
  const toast = useToast();

  const handleTaskSubmit = async (roomName: string, value: SubmissionValue) => {
    try {
      const authToken = localStorage.getItem("token");

      if (!authToken) {
        throw new Error("Not authenticated");
      }

      const submission: TaskSubmission = {
        roomName,
        value,
      };

      const response = await fetch("http://localhost:3000/submit-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-jwt-token": authToken,
        },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        throw new Error("Failed to submit task");
      }

      toast({
        title: t("taskSubmitted"),
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error submitting task:", error);
      toast({
        title: t("errorSubmittingTask"),
        description: error instanceof Error ? error.message : t("unknownError"),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Center h="50vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
      </Center>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <Center h="50vh">
        <Box textAlign="center">
          <Heading size="md" color="gray.600">
            {t("noTasksAvailable")}
          </Heading>
          <Text color="gray.500" mt={2}>
            {t("checkBackLater")}
          </Text>
        </Box>
      </Center>
    );
  }

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={6} align="stretch">
        {tasks
          .sort((a, b) => a.order_number - b.order_number)
          .map((task) => (
            <Box key={`${task.room_name}-${task.order_number}`}>
              <TaskDisplay task={task} onSubmit={handleTaskSubmit} />
            </Box>
          ))}
      </VStack>
    </Container>
  );
};

export default TasksViewer;
