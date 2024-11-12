// src/components/tasks/TaskWrapper.tsx
import React from "react";
import { Box, VStack, Text } from "@chakra-ui/react";

interface TaskWrapperProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const TaskWrapper: React.FC<TaskWrapperProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} bg="white" shadow="sm">
      <VStack align="stretch" spacing={3}>
        <Text fontWeight="bold" fontSize="lg" color="teal.600">
          {title}
        </Text>
        <Text color="gray.600" fontSize="md">
          {description}
        </Text>
        {children}
      </VStack>
    </Box>
  );
};

export default TaskWrapper;
