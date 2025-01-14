import React, { useState } from "react";
import {
  Box,
  IconButton,
  Text,
  Flex,
  Heading,
  HStack,
  Badge,
  VStack,
  Button,
  Switch,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import TaskAnswers from "./tasks/TaskAnswers";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBigLeft } from "lucide-react";
import { ExtendedTask } from "./tasks/TaskForm/types";
import { AnonymityProvider, useAnonymity } from "../contexts/AnonimityProvider";

interface PresentTasksProps {
  tasks: ExtendedTask[] | null;
}

// Separate component for the anonymity toggle
const AnonymityToggle = () => {
  const { isAnonymous, toggleAnonymity } = useAnonymity();
  const { t } = useTranslation();

  return (
    <HStack spacing={2}>
      <Switch
        colorScheme="teal"
        isChecked={isAnonymous}
        onChange={toggleAnonymity}
        id="anonymous-mode"
      />
      <Text fontSize="sm" color="gray.600">
        {isAnonymous ? t("anonymous") : t("showUsernames")}
      </Text>
    </HStack>
  );
};

// Main component content
const PresentTasksContent: React.FC<PresentTasksProps> = ({ tasks }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  if (!tasks || tasks.length === 0) {
    return (
      <Box maxW="800px" mx="auto" p={4}>
        <Text>{t("noTasksToPresent")}</Text>
      </Box>
    );
  }

  const currentTask = tasks[currentTaskIndex];

  const handlePrevious = () => {
    setCurrentTaskIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentTaskIndex((prev) =>
      prev < (tasks?.length ?? 1) - 1 ? prev + 1 : prev
    );
  };

  const getTaskTypeInfo = (type: string): { color: string; label: string } => {
    switch (type) {
      case "multichoice":
        return { color: "purple", label: t("taskTypes.multichoice") };
      case "numbers_task":
        return { color: "blue", label: t("taskTypes.numbers_task") };
      case "short_task":
        return { color: "green", label: t("taskTypes.short_task") };
      case "table_task":
        return { color: "orange", label: t("taskTypes.table_task") };
      case "map_task":
        return { color: "red", label: t("taskTypes.map_task") };
      case "description":
        return { color: "gray", label: t("taskTypes.description") };
      default:
        return { color: "gray", label: type };
    }
  };

  const typeInfo = getTaskTypeInfo(currentTask.task_type);

  return (
    <Box maxW="800px" mx="auto" p={4}>
      {/* Header with Back Button and Anonymity Toggle */}
      <Flex justify="space-between" align="center" mb={4}>
        <Button
          backgroundColor={"teal.500"}
          onClick={() => navigate(`/room/${params.roomName}/edit`)}
        >
          <ArrowBigLeft color="white" />
        </Button>
        <AnonymityToggle />
      </Flex>

      {/* Main Content */}
      <VStack spacing={6} align="stretch">
        <Flex justify="space-between" align="center">
          <VStack align="start" spacing={2}>
            <HStack>
              <Badge
                colorScheme={typeInfo.color}
                px={2}
                py={1}
                borderRadius="full"
              >
                {typeInfo.label}
              </Badge>
            </HStack>
            <Heading size="lg">{currentTask.name}</Heading>
          </VStack>
          <Text color="gray.500">
            {currentTaskIndex + 1} / {tasks.length}
          </Text>
        </Flex>

        {/* Task Content */}
        <Box p={6} borderWidth="1px" borderRadius="lg" bg="white" shadow="sm">
          <Text mb={4} color="gray.700">
            {currentTask.text}
          </Text>
          <TaskAnswers task={currentTask} />
        </Box>

        {/* Navigation Controls */}
        <Flex justify="space-between" pt={4}>
          <IconButton
            icon={<ChevronLeftIcon boxSize={8} />}
            aria-label="Previous task"
            onClick={handlePrevious}
            isDisabled={currentTaskIndex === 0}
            size="lg"
            colorScheme="teal"
            variant="ghost"
          />
          <IconButton
            icon={<ChevronRightIcon boxSize={8} />}
            aria-label="Next task"
            onClick={handleNext}
            isDisabled={currentTaskIndex === tasks.length - 1}
            size="lg"
            colorScheme="teal"
            variant="ghost"
          />
        </Flex>
      </VStack>
    </Box>
  );
};

// Wrapper component with Provider
const PresentTasks: React.FC<PresentTasksProps> = (props) => {
  return (
    <AnonymityProvider>
      <PresentTasksContent {...props} />
    </AnonymityProvider>
  );
};

export default PresentTasks;
