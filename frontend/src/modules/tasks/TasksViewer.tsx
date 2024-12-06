import { useRef } from "react";
import {
  VStack,
  Box,
  Button,
  Container,
  Center,
  Heading,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useTasks } from "../../hooks/useTasks";
import TaskDisplay from "./TaskDisplay";
import { useTranslation } from "react-i18next";
import { SubmissionValue } from "../../types/Tasks";
//import { useNavigate } from "react-router-dom";

const TasksViewer: React.FC = () => {
  const { tasks, loading } = useTasks();
  const { t } = useTranslation();
  const taskRefs = useRef<Record<number, SubmissionValue>>({});
  const toast = useToast();
  //const navigate = useNavigate();

  const convertToString = (value: SubmissionValue): string => {
    if (value === null || value === undefined) return "";
    if (Array.isArray(value)) {
      return value.map(String).join(",");
    }
    return String(value);
  };

  const handleSubmitAll = async () => {
    if (!tasks) return;

    const allAnswers = tasks
      .sort((a, b) => a.order_number - b.order_number)
      .map((task) => ({
        id: task.id,
        answer: convertToString(taskRefs.current[task.order_number] || null),
      }));

    try {
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        throw new Error("Not authenticated");
      }

      const response = await fetch("http://localhost:3000/giveAnswer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-jwt-token": authToken,
        },
        body: JSON.stringify(allAnswers),
      });

      if (!response.ok) {
        const error = await response.text();
        try {
          const parsedError = JSON.parse(error);
          throw new Error(parsedError.error || "Failed to submit answers");
        } catch {
          throw new Error("Failed to submit answers");
        }
      }

      toast({
        title: t("submissionSuccessful"),
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: t("submissionFailed"),
        status: "error",
        duration: 3000,
      });
      console.error("Error submitting answers:", error);
    }
    //navigate("/");
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

  if (!tasks?.length) {
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
              <TaskDisplay
                task={task}
                onSubmit={(_: string, value: SubmissionValue) => {
                  taskRefs.current[task.order_number] = value;
                }}
              />
            </Box>
          ))}
        <Button colorScheme="teal" size="lg" onClick={handleSubmitAll}>
          {t("submitAllAnswers")}
        </Button>
      </VStack>
    </Container>
  );
};

export default TasksViewer;
