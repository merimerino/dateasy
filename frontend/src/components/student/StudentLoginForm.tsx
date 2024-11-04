import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

interface FormData {
  room_name: string;
  nickname: string;
}

interface StudentLoginFormProps {
  formData: FormData;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: keyof FormData, value: string) => void;
}

const StudentLoginForm: React.FC<StudentLoginFormProps> = ({
  formData,
  isLoading,
  onSubmit,
  onChange,
}) => {
  return (
    <Box
      as="form"
      onSubmit={onSubmit}
      borderWidth="1px"
      borderRadius="lg"
      p={6}
    >
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Room Name</FormLabel>
          <Input
            value={formData.room_name}
            onChange={(e) => onChange("room_name", e.target.value)}
            placeholder="Enter room name"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Your Nickname</FormLabel>
          <Input
            value={formData.nickname}
            onChange={(e) => onChange("nickname", e.target.value)}
            placeholder="Enter your nickname"
          />
        </FormControl>

        <Button
          width="100%"
          colorScheme="teal"
          type="submit"
          isLoading={isLoading}
        >
          Join Room
        </Button>
      </VStack>
    </Box>
  );
};

export default StudentLoginForm;
