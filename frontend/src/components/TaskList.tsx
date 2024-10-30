import React from "react";
import { Box, Heading, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { TaskHandler } from "../utils/taskHandle";
import { Task } from "../types/Task";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    setTasks(TaskHandler.getTasks());
  }, []);

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
          onClick={() => navigate("/addTask")}
          size="lg"
          width="100%"
          variant="ghost"
          bg="gray.100"
        >
          +
        </Button>
      </VStack>
    </Box>
  );
};

export default TaskList;
