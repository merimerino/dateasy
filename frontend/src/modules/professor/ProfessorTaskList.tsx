import React from "react";
import {
  Box,
  Button,
  VStack,
  Heading,
  IconButton,
  HStack,
  Text,
  Badge,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Task } from "../../types/Tasks";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface ProfessorTaskListProps {
  tasks: Task[] | null;
  roomName?: string;
  onEdit: (task: Task) => void;
  onDelete: (orderNumber: string) => void;
  onAdd: () => void;
}

const ProfessorTaskList: React.FC<ProfessorTaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  onAdd,
  roomName,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const getTaskTypeInfo = (type: string): { color: string } => {
    switch (type) {
      case "multichoice":
        return { color: "purple" };
      case "numbers_task":
        return { color: "blue" };
      case "short_task":
        return { color: "green" };
      case "table_task":
        return { color: "orange" };
      case "map_task":
        return { color: "red" };
      case "description":
        return { color: "gray" };
      default:
        return { color: "gray" };
    }
  };

  const handleEditClick = (e: React.MouseEvent, task: Task) => {
    e.stopPropagation();
    onEdit(task);
  };

  const handleDeleteClick = (e: React.MouseEvent, orderNumber: string) => {
    e.stopPropagation();
    onDelete(orderNumber);
  };

  const showTask = (orderNumber: number) => {
    navigate(`/room/${roomName}/view/${orderNumber}`);
  };

  return (
    <Box maxW="800px" mx="auto" p={4}>
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between" mb={4}>
          <Heading size="lg" color="teal.600">
            {t("tasksList")}
          </Heading>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="teal"
            size="md"
            onClick={onAdd}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            transition="all 0.2s"
          >
            {t("addNewTask")}
          </Button>
        </HStack>

        {!tasks || tasks.length === 0 ? (
          <Box
            p={8}
            borderWidth="1px"
            borderRadius="lg"
            borderStyle="dashed"
            borderColor={borderColor}
            textAlign="center"
            bg={bgColor}
          >
            <Text color="gray.500" fontSize="lg">
              {t("noTasksYet")}
            </Text>
            <Text color="gray.400" fontSize="md" mt={2}>
              {t("clickAddToCreate")}
            </Text>
          </Box>
        ) : (
          <VStack spacing={4} align="stretch">
            {tasks
              .sort((a, b) => a.order_number - b.order_number)
              .map((task) => {
                const typeInfo = getTaskTypeInfo(task.task_type);
                return (
                  <Box
                    key={`${task.task_type}-${task.order_number}`}
                    p={5}
                    borderWidth="1px"
                    borderRadius="lg"
                    bg={bgColor}
                    shadow="sm"
                    _hover={{
                      shadow: "md",
                      transform: "translateY(-2px)",
                      borderColor: "teal.200",
                    }}
                    transition="all 0.2s"
                    onClick={() => showTask(task.order_number)}
                    cursor="pointer"
                  >
                    <HStack justify="space-between" align="start">
                      <VStack align="start" spacing={2} flex={1}>
                        <HStack>
                          <Badge
                            colorScheme={typeInfo.color}
                            px={2}
                            py={1}
                            borderRadius="full"
                            textTransform="none"
                          >
                            {t(`taskTypes.${task.task_type}`)}
                          </Badge>
                          <Badge
                            colorScheme="teal"
                            variant="outline"
                            px={2}
                            py={1}
                            borderRadius="full"
                          >
                            #{task.order_number}
                          </Badge>
                        </HStack>
                        <Heading size="md" color="gray.700">
                          {task.name}
                        </Heading>
                        {task.task_type === "description" ? (
                          <Heading size="md" color="gray.700">
                            {task.description}
                          </Heading>
                        ) : (
                          <Text color="gray.600" fontSize="sm" noOfLines={2}>
                            {task.text}
                          </Text>
                        )}
                      </VStack>
                      <HStack spacing={2}>
                        <Tooltip label={t("editTask")} placement="top">
                          <IconButton
                            icon={<EditIcon />}
                            aria-label={t("editTask")}
                            size="sm"
                            colorScheme="teal"
                            variant="ghost"
                            onClick={(e) => handleEditClick(e, task)}
                            _hover={{ bg: "teal.50" }}
                          />
                        </Tooltip>
                        <Tooltip label={t("deleteTask")} placement="top">
                          <IconButton
                            icon={<DeleteIcon />}
                            aria-label={t("deleteTask")}
                            size="sm"
                            colorScheme="red"
                            variant="ghost"
                            onClick={(e) =>
                              handleDeleteClick(e, task.order_number.toString())
                            }
                            _hover={{ bg: "red.50" }}
                          />
                        </Tooltip>
                      </HStack>
                    </HStack>
                  </Box>
                );
              })}
          </VStack>
        )}
      </VStack>
    </Box>
  );
};

export default ProfessorTaskList;
