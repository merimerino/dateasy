import {
  Box,
  Button,
  VStack,
  Heading,
  IconButton,
  HStack,
  Text,
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Task } from "../../types/Tasks";

interface ProfessorTaskListProps {
  tasks: Task[] | null;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onAdd: () => void; // Changed to not require parameter
}

const ProfessorTaskList: React.FC<ProfessorTaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  onAdd,
}) => {
  const getTaskTypeLabel = (type: string) => {
    switch (type) {
      case "multichoice":
        return "Multiple Choice";
      case "numbers_task":
        return "Number Task";
      case "short_task":
        return "Short Answer";
      default:
        return type;
    }
  };

  return (
    <Box maxW="800px" mx="auto" p={4}>
      <VStack spacing={4} align="stretch">
        {!tasks || tasks.length === 0 ? (
          <Box p={4} borderWidth="1px" borderRadius="lg" textAlign="center">
            <Text color="gray.500">No tasks created yet</Text>
          </Box>
        ) : (
          tasks.map((task) => (
            <Box
              key={`${task.task_type}-${task.order_number}`}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              bg="white"
              shadow="sm"
            >
              <HStack justify="space-between">
                <VStack align="start" spacing={1}>
                  <Heading size="sm">{task.name}</Heading>
                  <Text color="gray.600" fontSize="sm">
                    {getTaskTypeLabel(task.task_type)}
                  </Text>
                  <Text color="gray.500" fontSize="sm">
                    Order: {task.order_number}
                  </Text>
                </VStack>
                <HStack>
                  <IconButton
                    icon={<EditIcon />}
                    aria-label="Edit task"
                    size="sm"
                    onClick={() => onEdit(task)}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    aria-label="Delete task"
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => onDelete(task.order_number.toString())}
                  />
                </HStack>
              </HStack>
            </Box>
          ))
        )}
        <Button
          leftIcon={<AddIcon />}
          colorScheme="teal"
          onClick={onAdd} // Changed to use onAdd prop
        >
          Add New Task
        </Button>
      </VStack>
    </Box>
  );
};

export default ProfessorTaskList;
