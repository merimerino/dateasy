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
  const { t } = useTranslation();

  return (
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
        <FormLabel>{t("password")}</FormLabel>
        <Input
          type="password"
          value={formData.password}
          onChange={(e) => onChange("password", e.target.value)}
          placeholder={t("password")}
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
