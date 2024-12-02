import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useUser } from "../../contexts/useUser";

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
  errors?: {
    room_name?: string;
    password?: string;
  };
}

const ProfessorLoginForm: React.FC<ProfessorLoginFormProps> = ({
  formData,
  isLoading,
  onSubmit,
  onChange,
  submitButtonText,
  errors = {},
}) => {
  const { t } = useTranslation();
  const { updateRole } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateRole();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={6} align="stretch">
        <FormControl isRequired isInvalid={!!errors.room_name}>
          <FormLabel>{t("roomName")}</FormLabel>
          <Input
            value={formData.room_name}
            onChange={(e) => onChange("room_name", e.target.value)}
            placeholder={t("enterRoomName")}
            size="lg"
            bg="white"
            borderColor="teal.200"
            _hover={{ borderColor: "teal.300" }}
            _focus={{
              borderColor: "teal.400",
              boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
            }}
            isDisabled={isLoading}
          />
          {errors.room_name && (
            <FormErrorMessage>{errors.room_name}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.password}>
          <FormLabel>{t("password")}</FormLabel>
          <Input
            type="password"
            value={formData.password}
            onChange={(e) => onChange("password", e.target.value)}
            placeholder={t("enterPassword")}
            size="lg"
            bg="white"
            borderColor="teal.200"
            _hover={{ borderColor: "teal.300" }}
            _focus={{
              borderColor: "teal.400",
              boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
            }}
            isDisabled={isLoading}
          />
          {errors.password && (
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          )}
        </FormControl>

        <Button
          type="submit"
          width="100%"
          colorScheme="teal"
          isLoading={isLoading}
          size="lg"
          height="50px"
          fontSize="md"
          _hover={{
            transform: "translateY(-1px)",
            boxShadow: "lg",
          }}
          _active={{
            transform: "translateY(0)",
            boxShadow: "md",
          }}
          transition="all 0.2s"
        >
          {submitButtonText}
        </Button>
      </VStack>
    </form>
  );
};

export default ProfessorLoginForm;
