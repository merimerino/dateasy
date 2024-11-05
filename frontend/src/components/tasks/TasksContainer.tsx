import { VStack } from "@chakra-ui/react";
import { TasksResponse } from "../../types/Tasks";
import TaskCard from "./TaskCard";

interface TasksContainerProps {
  tasks: TasksResponse | null;
}

const TasksContainer: React.FC<TasksContainerProps> = ({ tasks }) => {
  if (!tasks || !tasks.tasks.length) return null;

  // Sort tasks by taskOrderNumber
  const sortedTasks = [...tasks.tasks].sort(
    (a, b) => a.taskOrderNumber - b.taskOrderNumber
  );

  return (
    <VStack spacing={4} align="stretch" mt={4}>
      {sortedTasks.map((task) => (
        <TaskCard
          key={`${task.taskType}-${task.taskOrderNumber}`}
          task={task}
        />
      ))}
    </VStack>
  );
};

export default TasksContainer;
