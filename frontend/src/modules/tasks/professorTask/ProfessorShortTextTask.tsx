import { Box } from "@chakra-ui/react";
import TaskWrapper from "../TaskWrapper";

interface ProfessorShortTextTaskProps {
  title: string;
  description: string;
  maxLength: number;
  onChange: (value: string) => void;
}

const ProfessorShortTextTask: React.FC<ProfessorShortTextTaskProps> = ({
  title,
  description,
}) => {
  return (
    <TaskWrapper title={title} description={description}>
      <Box></Box>
    </TaskWrapper>
  );
};

export default ProfessorShortTextTask;
