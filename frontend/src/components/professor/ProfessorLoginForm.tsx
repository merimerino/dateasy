import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

interface FormData {
  room_name: string;
  password: string;
}

interface ProfessorLoginFormProps {
  formData: FormData;
  isLoading: boolean;
  onSubmit: () => void;
  onChange: (field: keyof FormData, value: string) => void;
  submitButtonText: string;
}

const ProfessorLoginForm: React.FC<ProfessorLoginFormProps> = ({
  formData,
  isLoading,
  onSubmit,
  onChange,
  submitButtonText,
}) => {
  return (
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
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={formData.password}
          onChange={(e) => onChange("password", e.target.value)}
          placeholder="Enter password"
        />
      </FormControl>

      <Button
        width="100%"
        colorScheme="teal"
        onClick={onSubmit}
        isLoading={isLoading}
      >
        {submitButtonText}
      </Button>
    </VStack>
  );
};

export default ProfessorLoginForm;
