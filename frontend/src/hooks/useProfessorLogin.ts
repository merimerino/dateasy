import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { roomHandler } from "../utils/roomHandler";

interface FormData {
  room_name: string;
  password: string;
}

export const useProfessorLogin = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    room_name: "",
    password: "",
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (action: "create" | "join") => {
    setIsLoading(true);
    try {
      const response = await (action === "create"
        ? roomHandler.professorCreateRoom(formData)
        : roomHandler.professorJoinRoom(formData));

      localStorage.setItem("userRole", "professor");
      navigate(`/room/${response.room_name}/edit`, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: t("error.failedLogin"),
        description:
          error instanceof Error ? error.message : t("error.failedRequest"),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    handleChange,
    handleCreateRoom: () => handleSubmit("create"),
    handleJoinRoom: () => handleSubmit("join"),
  };
};
