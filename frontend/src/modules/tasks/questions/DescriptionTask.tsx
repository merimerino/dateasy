import { Box, VStack, Text } from "@chakra-ui/react";

interface DescriptionTaskProps {
  description: string;
}

const DescriptionTask: React.FC<DescriptionTaskProps> = ({ description }) => {
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
          {description}
        </Text>
      </VStack>
    </Box>
  );
};

export default DescriptionTask;
