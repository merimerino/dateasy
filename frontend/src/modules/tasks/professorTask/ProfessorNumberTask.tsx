import { Box, Button } from "@chakra-ui/react";
import TaskWrapper from "../TaskWrapper";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBigLeft } from "lucide-react";

interface NumbersTaskProps {
  title: string;
  description: string;
}

const ProfessorNumberTask: React.FC<NumbersTaskProps> = ({
  title,
  description,
}) => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <>
      <Button
        marginY={2}
        backgroundColor={"teal.500"}
        onClick={() => navigate(`/room/${params.roomName}/edit`)}
      >
        <ArrowBigLeft color="white" />
      </Button>
      <TaskWrapper title={title} description={description}>
        <Box></Box>
      </TaskWrapper>
    </>
  );
};

export default ProfessorNumberTask;
