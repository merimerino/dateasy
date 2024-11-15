import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { roomHandler } from "../utils/roomHandler";

interface FormData {
  room_name: string;
  username: string;
}

export const useStudentLogin = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    room_name: "",
    username: "",
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await roomHandler.studentJoinRoom(formData);

      localStorage.setItem("userRole", "student");
      navigate(`/room/${response.room_name}/view`, { replace: true });
    } catch (error) {
      console.error("Student login error:", error);
      let errorMessage = t("error.failedToJoin");

      try {
        if (error instanceof Error) {
          const parsedError = JSON.parse(error.message);
          errorMessage = parsedError.error || errorMessage;
        }
      } catch {
        errorMessage = error instanceof Error ? error.message : errorMessage;
      }

      toast({
        title: t("error.loginFailed"),
        description: errorMessage,
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
    handleSubmit,
  };
};
