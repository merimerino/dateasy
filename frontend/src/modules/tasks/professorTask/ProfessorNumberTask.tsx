import { Box } from "@chakra-ui/react";
import TaskWrapper from "../TaskWrapper";

interface NumbersTaskProps {
  title: string;
  description: string;
}

const ProfessorNumberTask: React.FC<NumbersTaskProps> = ({
  title,
  description,
}) => {
  return (
    <TaskWrapper title={title} description={description}>
      <Box></Box>
    </TaskWrapper>
  );
};

export default ProfessorNumberTask;
