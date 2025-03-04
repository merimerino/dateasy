import { Flex, VStack, Text, Button } from "@chakra-ui/react";
import TaskWrapper from "../TaskWrapper";
import { ArrowBigLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface ProfessorMultiChoiceTaskProps {
  title: string;
  description: string;
  options?: string[];
}

const ProfessorMultiChoiceTask = ({
  title,
  description,
  options,
}: ProfessorMultiChoiceTaskProps) => {
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
        <VStack align="stretch" spacing={3}>
          {options?.map((option, index) => (
            <Flex
              key={index}
              p={3}
              borderRadius="md"
              alignItems="center"
              border="1px solid"
              borderColor="gray.200"
              bg="gray.50"
            >
              <Text fontSize="md">{option}</Text>
            </Flex>
          ))}
        </VStack>
      </TaskWrapper>
    </>
  );
};

export default ProfessorMultiChoiceTask;
