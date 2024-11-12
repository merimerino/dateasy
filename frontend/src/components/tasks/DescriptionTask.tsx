// src/components/tasks/DescriptionTask.tsx
import React from "react";
import { Box, VStack, Text } from "@chakra-ui/react";

interface DescriptionTaskProps {
  title: string;
  description: string;
}

const DescriptionTask: React.FC<DescriptionTaskProps> = ({
  title,
  description,
}) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      bg="teal.50"
      shadow="sm"
      borderColor="teal.200"
    >
      <VStack align="stretch" spacing={3}>
        <Text fontWeight="bold" fontSize="lg" color="teal.600">
          {title}
        </Text>
        <Text color="gray.600" fontSize="md">
          {description}
        </Text>
      </VStack>
    </Box>
  );
};

export default DescriptionTask;
