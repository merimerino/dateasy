import { Box } from "@chakra-ui/react";
import Header from "../components/Header";
import TasksContainer from "../components/tasks/TasksContainer";
import { useTasks } from "../hooks/useTasks";
import LoadingSpinner from "../components/LoadingSpinner";

const RoomViewPage: React.FC = () => {
  const { tasks, loading } = useTasks();

  return (
    <Box maxW="600px" mx="auto" p={4}>
      <Header />
      {loading ? <LoadingSpinner /> : <TasksContainer tasks={tasks} />}
    </Box>
  );
};

export default RoomViewPage;
