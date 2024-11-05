import { Box } from "@chakra-ui/react";
import Header from "../components/Header";
import TaskList from "../components/TaskList";

const RoomViewPage: React.FC = () => {
  return (
    <Box>
      <Header />
      <TaskList />
    </Box>
  );
};

export default RoomViewPage;
