import { VStack } from "@chakra-ui/react";
import { Task } from "../../types/Tasks";
import TaskCard from "./TaskCard";

interface TasksContainerProps {
  tasks: Task[] | null;
}

const TasksContainer: React.FC<TasksContainerProps> = ({ tasks }) => {
  if (!tasks || !tasks.length) return null;

  // Sort tasks by order_number
  const sortedTasks = [...tasks].sort(
    (a, b) => a.order_number - b.order_number
  );

  return (
    <VStack spacing={4} align="stretch" mt={4}>
      {sortedTasks.map((task) => (
        <TaskCard key={`${task.task_type}-${task.order_number}`} task={task} />
      ))}
    </VStack>
  );
};

export default TasksContainer;
