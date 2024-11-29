import { Flex, VStack, Text } from "@chakra-ui/react";
import TaskWrapper from "../TaskWrapper";

interface ProfessorMultiChoiceTaskProps {
  title: string;
  description: string;
  options: string[];
}

const ProfessorMultiChoiceTask = ({
  title,
  description,
  options,
}: ProfessorMultiChoiceTaskProps) => {
  return (
    <TaskWrapper title={title} description={description}>
      <VStack align="stretch" spacing={3}>
        {options.map((option, index) => (
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
  );
};

export default ProfessorMultiChoiceTask;
