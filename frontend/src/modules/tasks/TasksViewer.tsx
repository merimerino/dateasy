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
} from "@chakra-ui/react";
import { useTasks } from "../../hooks/useTasks";
import TaskDisplay from "./TaskDisplay";
import { useTranslation } from "react-i18next";
import { Task } from "../../types/Tasks";

type SubmissionValue =
  | string
  | number
  | string[][]
  | { latitude: number; longitude: number }
  | null;

interface TaskAnswer {
  taskId: number;
  taskName: string | undefined;
  taskType: Task["task_type"];
  value: SubmissionValue;
}

const TasksViewer: React.FC = () => {
  const { tasks, loading } = useTasks();
  const { t } = useTranslation();
  const taskRefs = useRef<Record<number, SubmissionValue>>({});

  const handleSubmitAll = () => {
    if (!tasks) return;

    const allAnswers: TaskAnswer[] = tasks
      .sort((a, b) => a.order_number - b.order_number)
      .map((task) => ({
        taskId: task.order_number,
        taskName: task.name,
        taskType: task.task_type,
        value: taskRefs.current[task.order_number] || null,
      }));

    console.log("All form inputs:", allAnswers);
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
