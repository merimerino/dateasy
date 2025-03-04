import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Box,
  Image,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import TaskWrapper from "../tasks/TaskWrapper";
import { useUser } from "../../contexts/useUser";

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
  const { updateRole } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateRole();
    onSubmit();
  };

  return (
    <TaskWrapper>
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          <Image src="/logo.png" alt="Logo" height="42px" objectFit="contain" />

          <FormControl isRequired>
            <FormLabel color="teal.700" fontSize="md" fontWeight="medium">
              {t("roomName")}
            </FormLabel>
            <Input
              value={formData.room_name}
              onChange={(e) => onChange("room_name", e.target.value)}
              placeholder={t("enterRoomName")}
              size="lg"
              borderColor="teal.200"
              _hover={{ borderColor: "teal.300" }}
              _focus={{
                borderColor: "teal.400",
                boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
              }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="teal.700" fontSize="md" fontWeight="medium">
              {t("username")}
            </FormLabel>
            <Input
              value={formData.username}
              onChange={(e) => onChange("username", e.target.value)}
              placeholder={t("enterUsername")}
              size="lg"
              borderColor="teal.200"
              _hover={{ borderColor: "teal.300" }}
              _focus={{
                borderColor: "teal.400",
                boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
              }}
            />
          </FormControl>

          <Box pt={2}>
            <Button
              width="100%"
              colorScheme="teal"
              type="submit"
              isLoading={isLoading}
              size="lg"
              fontSize="md"
              height="50px"
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
              {t("joinRoom")}
            </Button>
          </Box>
        </VStack>
      </form>
    </TaskWrapper>
  );
};

export default StudentLoginForm;
