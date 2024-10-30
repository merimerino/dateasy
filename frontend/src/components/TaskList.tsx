// components/TaskList.tsx
import React from "react";
import { Box, Heading, VStack, Button, useDisclosure } from "@chakra-ui/react";
import { TaskHandler } from "../utils/taskHandle";
import TaskForm from "./TaskForm";
import { Task, TaskCreateDTO } from "../types/Task";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  React.useEffect(() => {
    setTasks(TaskHandler.getTasks());
  }, []);

  const handleCreateTask = (taskData: TaskCreateDTO) => {
    const newTask = TaskHandler.createTask(taskData);
    setTasks([...tasks, newTask]);
    onClose();
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        {tasks.map((task) => (
          <Box key={task.id} p={4} borderWidth="1px" borderRadius="lg">
            <Heading size="sm">{task.title}</Heading>
            <Box mt={2}>{task.description}</Box>
          </Box>
        ))}

        <Button
          onClick={onOpen}
          size="lg"
          width="100%"
          variant="ghost"
          bg="gray.100"
        >
          +
        </Button>
      </VStack>

      {isOpen && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="white"
          zIndex={1000}
          p={4}
        >
          <TaskForm onSubmit={handleCreateTask} onCancel={onClose} />
        </Box>
      )}
    </Box>
  );
};

export default TaskList;
