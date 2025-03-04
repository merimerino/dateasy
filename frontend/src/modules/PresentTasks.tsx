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
  Select,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import TaskAnswers from "./tasks/TaskAnswers";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBigLeft, ChevronDownIcon } from "lucide-react";
import { ExtendedTask } from "./tasks/TaskForm/types";
import { AnonymityProvider, useAnonymity } from "../contexts/AnonimityProvider";

interface PresentTasksProps {
  tasks: ExtendedTask[] | null;
}

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

  const handleTaskSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentTaskIndex(parseInt(event.target.value, 10));
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
      case "map_task_gpx":
        return { color: "teal", label: t("taskTypes.map_task_gpx") };
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

        {/* Navigation Controls with Dropdown */}
        <Flex justify="space-between" align="center" pt={4}>
          <IconButton
            icon={<ChevronLeftIcon boxSize={8} />}
            aria-label="Previous task"
            onClick={handlePrevious}
            isDisabled={currentTaskIndex === 0}
            size="lg"
            colorScheme="teal"
            variant="ghost"
          />

          <Box width="250px">
            <Select
              value={currentTaskIndex}
              onChange={handleTaskSelect}
              size="md"
              variant="filled"
              bg="teal.500"
              color="white"
              _hover={{
                bg: "teal.600",
              }}
              _focus={{
                bg: "teal.500",
                borderColor: "teal.300",
                boxShadow: "0 0 0 1px var(--chakra-colors-teal-300)",
              }}
              icon={<ChevronDownIcon />}
              sx={{
                "& option": {
                  bg: "white",
                  color: "teal.800",
                  fontWeight: "500",
                  _hover: {
                    bg: "teal.50",
                  },
                },
                transition: "all 0.2s ease-in-out",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              {tasks.map((task, index) => (
                <option key={index} value={index}>
                  {index + 1}: {task.name}
                </option>
              ))}
            </Select>
          </Box>

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
