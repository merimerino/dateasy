import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { roomHandler } from "../../../utils/roomHandler";

interface FormData {
  room_name: string;
  password: string;
}

export const useProfessorLogin = () => {
  const navigate = useNavigate();
  const toast = useToast();
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
      if (action === "create") {
        await roomHandler.professorCreateRoom(formData);
        console.log(
          "Room created successfully, navigating to:",
          `/room/${formData.room_name}/edit`
        );
      } else {
        await roomHandler.professorJoinRoom(formData);
        console.log(
          "Joined room successfully, navigating to:",
          `/room/${formData.room_name}/edit`
        );
      }

      // Add a small delay to ensure localStorage is set
      setTimeout(() => {
        const roomName = roomHandler.getCurrentRoom();
        console.log("Current room from storage:", roomName);
        if (roomName) {
          navigate(`/room/${roomName}/edit`, { replace: true });
        } else {
          console.error("Room name not found in storage after login");
          toast({
            title: "Navigation Error",
            description: "Could not find room information",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }, 100);
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to process request",
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
