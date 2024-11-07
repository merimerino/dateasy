import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface FormData {
  room_name: string;
  username: string;
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
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>{t("roomName")}</FormLabel>
          <Input
            value={formData.room_name}
            onChange={(e) => onChange("room_name", e.target.value)}
            placeholder={t("roomName")}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>{t("username")}</FormLabel>
          <Input
            value={formData.username}
            onChange={(e) => onChange("username", e.target.value)}
            placeholder={t("username")}
          />
        </FormControl>

        <Button
          width="100%"
          colorScheme="teal"
          type="submit"
          isLoading={isLoading}
        >
          {t("joinRoom")}
        </Button>
      </VStack>
    </form>
  );
};

export default StudentLoginForm;
