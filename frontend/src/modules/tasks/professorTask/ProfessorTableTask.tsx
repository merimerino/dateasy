import { Flex, Text, Button, HStack } from "@chakra-ui/react";
import TaskWrapper from "../TaskWrapper";
import { ArrowBigLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface ProfessorTableTaskProps {
  name: string;
  text: string;
  columns?: string;
}

const ProfessorTableTask = ({
  name,
  text,
  columns,
}: ProfessorTableTaskProps) => {
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
      <TaskWrapper title={name} description={text}>
        <HStack align="stretch" spacing={0} width="100%">
          {columns?.split(",")?.map((option, index) => (
            <Flex
              key={index}
              p={3}
              flex={1}
              alignItems="center"
              justifyContent="center"
              border="2px solid"
              borderRadius="4"
              borderColor="teal.100"
              bg="teal.50"
              fontWeight="bold"
            >
              <Text fontSize="md" color="gray.700">
                {option}
              </Text>
            </Flex>
          ))}
        </HStack>
      </TaskWrapper>
    </>
  );
};

export default ProfessorTableTask;
