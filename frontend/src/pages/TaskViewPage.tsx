import React from "react";
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Spinner,
  Center,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTasks } from "../hooks/useTasks";
import TaskAnswers from "../modules/tasks/TaskAnswers";
import Header from "../modules/Header";
import ProfessorTaskDisplay from "../modules/tasks/ProfessorTaskDisplay";

type SubmissionValue =
  | string
  | number
  | string[][]
  | { latitude: number; longitude: number }
  | null;

const TaskViewPage: React.FC = () => {
  const { orderNumber, roomName } = useParams();
  const { tasks, loading } = useTasks({ filterByRoom: false });
  const { t } = useTranslation();
  const toast = useToast();

  if (loading) {
    return (
      <Center h="100vh">
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

  const task = tasks?.find(
    (t) => t.order_number === Number(orderNumber) && t.room_name === roomName
  );

  if (!task) {
    return (
      <Center h="100vh">
        <Text>{t("taskNotFound")}</Text>
      </Center>
    );
  }

  const handleSubmit = async (value: SubmissionValue) => {
    try {
      const authToken = localStorage.getItem("token");
      if (!authToken) throw new Error("Not authenticated");

      const response = await fetch(
        `http://localhost:3000/tasks/${task.order_number}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-jwt-token": authToken,
          },
          body: JSON.stringify({ value }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit answer");

      toast({
        title: t("answerSubmitted"),
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: t("error.submissionFailed"),
        description:
          error instanceof Error ? error.message : t("error.unknownError"),
        status: "error",
        duration: 5000,
      });
    }
  };

  return (
    <Box>
      <Header />
      <Container maxW="container.lg" py={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <ProfessorTaskDisplay task={task} onSubmit={handleSubmit} />
          </Box>
          <Divider />
          <Box>
            <Heading size="md" mb={4} color={"teal.500"}>
              {t("answers")}
            </Heading>
            <TaskAnswers task={task} />
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default TaskViewPage;
