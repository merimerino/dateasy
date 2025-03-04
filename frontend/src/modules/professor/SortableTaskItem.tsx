import React from "react";
import {
  Box,
  VStack,
  IconButton,
  HStack,
  Text,
  Badge,
  Tooltip,
  Heading,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, DragHandleIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ExtendedTask } from "../tasks/TaskForm/types";
import { TaskType } from "../tasks/TaskForm/types";

interface TaskTypeInfo {
  color: string;
}

interface SortableTaskItemProps {
  task: ExtendedTask;
  isReorderMode: boolean;
  onEdit: (e: React.MouseEvent<HTMLButtonElement>, task: ExtendedTask) => void;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  onShow: (orderNumber: number) => void;
  bgColor: string;
}

const getTaskTypeInfo = (type: TaskType): TaskTypeInfo => {
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
    case "map_task_gpx":
      return { color: "teal" };
    case "description":
      return { color: "gray" };
    default:
      return { color: "gray" };
  }
};

const SortableTaskItem: React.FC<SortableTaskItemProps> = ({
  task,
  isReorderMode,
  onEdit,
  onDelete,
  onShow,
  bgColor,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id.toString() });

  const { t } = useTranslation();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const typeInfo = getTaskTypeInfo(task.task_type as TaskType);

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      p={5}
      borderWidth="1px"
      borderRadius="lg"
      bg={bgColor}
      shadow={isDragging ? "lg" : "sm"}
      _hover={{
        shadow: "md",
        transform: isReorderMode ? "none" : "translateY(-2px)",
        borderColor: "teal.200",
      }}
      transition="all 0.2s"
      onClick={() => !isReorderMode && onShow(task.order_number)}
      cursor={isReorderMode ? "grab" : "pointer"}
      position="relative"
    >
      <HStack justify="space-between" align="start">
        {isReorderMode && (
          <Box
            {...listeners}
            position="absolute"
            left="-8px"
            top="50%"
            transform="translateY(-50%)"
            color="gray.400"
            _hover={{ color: "teal.500" }}
          >
            <DragHandleIcon boxSize={5} />
          </Box>
        )}
        <VStack align="start" spacing={2} flex={1} ml={isReorderMode ? 4 : 0}>
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
              {task.text}
            </Heading>
          ) : (
            <Text color="gray.600" fontSize="sm" noOfLines={2}>
              {task.text}
            </Text>
          )}
        </VStack>
        {!isReorderMode && (
          <HStack spacing={2}>
            <Tooltip label={t("editTask")} placement="top">
              <IconButton
                icon={<EditIcon />}
                aria-label={t("editTask")}
                size="sm"
                colorScheme="teal"
                variant="ghost"
                onClick={(e) => onEdit(e, task)}
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
                onClick={(e) => onDelete(e, task.id.toString())}
                _hover={{ bg: "red.50" }}
              />
            </Tooltip>
          </HStack>
        )}
      </HStack>
    </Box>
  );
};

export default SortableTaskItem;
