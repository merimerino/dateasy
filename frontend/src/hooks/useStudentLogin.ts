import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { roomHandler } from "../utils/roomHandler";

interface FormData {
  room_name: string;
  username: string;
}

export const useStudentLogin = () => {
  const navigate = useNavigate();
  const toast = useToast();
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
      console.log("Attempting to join room with data:", formData);
      await roomHandler.studentJoinRoom(formData);
      console.log("Successfully joined room");

      // Add a small delay to ensure localStorage is set
      setTimeout(() => {
        const roomName = roomHandler.getCurrentRoom();
        console.log("Current room from storage:", roomName);

        if (roomName) {
          navigate(`/room/${roomName}/view`, { replace: true });
        } else {
          throw new Error("Room name not found after login");
        }
      }, 100);
    } catch (error) {
      console.error("Student login error:", error);
      let errorMessage = "Failed to join room";

      // Try to parse error message from JSON
      try {
        if (error instanceof Error) {
          const parsedError = JSON.parse(error.message);
          errorMessage = parsedError.error || errorMessage;
        }
      } catch {
        errorMessage = error instanceof Error ? error.message : errorMessage;
      }

      toast({
        title: "Error",
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
