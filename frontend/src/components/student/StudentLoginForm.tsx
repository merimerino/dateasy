import {
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
  onSubmit: () => void;
  onChange: (field: keyof FormData, value: string) => void;
}

const StudentLoginForm: React.FC<StudentLoginFormProps> = ({
  formData,
  isLoading,
  onSubmit,
  onChange,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Room Name</FormLabel>
          <Input
            value={formData.room_name}
            onChange={(e) => {
              console.log("Room name changed:", e.target.value);
              onChange("room_name", e.target.value);
            }}
            placeholder="Enter room name"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Nickname</FormLabel>
          <Input
            value={formData.nickname}
            onChange={(e) => {
              console.log("Nickname changed:", e.target.value);
              onChange("nickname", e.target.value);
            }}
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
    </form>
  );
};

export default StudentLoginForm;
