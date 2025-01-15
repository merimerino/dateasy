import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon, DragHandleIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { TvIcon } from "lucide-react";
import { ExtendedTask } from "../tasks/TaskForm/types";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableTaskItem from "./SortableTaskItem";

interface ProfessorTaskListProps {
  tasks: ExtendedTask[] | null;
  roomName?: string;
  onEdit: (task: ExtendedTask) => void;
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
  const toast = useToast();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const [isReorderMode, setIsReorderMode] = useState<boolean>(false);
  const [orderedTasks, setOrderedTasks] = useState<ExtendedTask[] | null>(
    tasks
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleEditClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    task: ExtendedTask
  ): void => {
    e.stopPropagation();
    onEdit(task);
  };

  const handleDeleteClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ): void => {
    e.stopPropagation();
    onDelete(id);
  };

  const showTask = (orderNumber: number): void => {
    if (!isReorderMode) {
      navigate(`/room/${roomName}/view/${orderNumber}`);
    }
  };

  const handlePresentResults = (): void => {
    navigate(`/room/${roomName}/present`);
  };

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;

    if (!over || !orderedTasks) return;

    if (active.id !== over.id) {
      const oldIndex = orderedTasks.findIndex(
        (task) => task.id.toString() === active.id
      );
      const newIndex = orderedTasks.findIndex(
        (task) => task.id.toString() === over.id
      );

      const newOrderedTasks = arrayMove(orderedTasks, oldIndex, newIndex).map(
        (task, index) => ({
          ...task,
          order_number: index + 1,
        })
      );

      setOrderedTasks(newOrderedTasks);
    }
  };

  const handleSaveOrder = async (): Promise<void> => {
    if (!orderedTasks) return;

    interface OrderPayload {
      id: string;
      order_number: number;
    }

    const orderPayload: OrderPayload[] = orderedTasks.map((task) => ({
      id: task.id.toString(),
      order_number: task.order_number,
    }));
    console.log(orderPayload);
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      navigate("/");
      throw new Error("Not authenticated");
    }

    try {
      const response = await fetch("http://localhost:3000/changeOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-jwt-token": authToken,
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) throw new Error("Failed to update order");

      toast({
        title: t("orderUpdated"),
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setIsReorderMode(false);
    } catch {
      toast({
        title: t("errorUpdatingOrder"),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const toggleReorderMode = (): void => {
    if (isReorderMode) {
      setOrderedTasks(tasks);
    }
    setIsReorderMode(!isReorderMode);
  };

  return (
    <Box maxW="800px" mx="auto" p={4}>
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between" mb={4}>
          <Heading size="lg" color="teal.600">
            {t("tasksList")}
          </Heading>
          <Box display="flex" gap={2}>
            <IconButton
              icon={isReorderMode ? <CloseIcon /> : <DragHandleIcon />}
              colorScheme={isReorderMode ? "gray" : "teal"}
              size="md"
              onClick={toggleReorderMode}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              transition="all 0.2s"
              aria-label={""}
            ></IconButton>
            {isReorderMode && (
              <Button
                colorScheme="teal"
                size="md"
                onClick={handleSaveOrder}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                transition="all 0.2s"
                aria-label={""}
              >
                {t("saveOrder")}
              </Button>
            )}
            {!isReorderMode && (
              <>
                <IconButton
                  icon={<TvIcon />}
                  colorScheme="teal"
                  size="md"
                  onClick={handlePresentResults}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  transition="all 0.2s"
                  aria-label={""}
                ></IconButton>
                <IconButton
                  icon={<AddIcon />}
                  colorScheme="teal"
                  size="md"
                  onClick={onAdd}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  transition="all 0.2s"
                  aria-label={""}
                ></IconButton>
              </>
            )}
          </Box>
        </HStack>

        {!orderedTasks || orderedTasks.length === 0 ? (
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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={orderedTasks.map((task) => task.id.toString())}
              strategy={verticalListSortingStrategy}
            >
              <VStack spacing={4} align="stretch">
                {orderedTasks
                  .sort((a, b) => a.order_number - b.order_number)
                  .map((task) => (
                    <SortableTaskItem
                      key={task.id}
                      task={task}
                      isReorderMode={isReorderMode}
                      onEdit={handleEditClick}
                      onDelete={handleDeleteClick}
                      onShow={showTask}
                      bgColor={bgColor}
                    />
                  ))}
              </VStack>
            </SortableContext>
          </DndContext>
        )}
      </VStack>
    </Box>
  );
};

export default ProfessorTaskList;
