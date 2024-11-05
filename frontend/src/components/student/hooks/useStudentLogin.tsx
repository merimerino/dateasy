import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { roomHandler } from "../../../utils/roomHandler";

interface FormData {
  room_name: string;
  nickname: string;
}

export const useStudentLogin = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    room_name: "",
    nickname: "",
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      console.log("Attempting to join room with data:", formData);
      await roomHandler.studentJoinRoom(formData);
      console.log(
        "Successfully joined room, navigating to:",
        `/room/${formData.room_name}/view`
      );

      // Add a small delay to ensure localStorage is set
      setTimeout(() => {
        const roomName = roomHandler.getCurrentRoom();
        const nickname = roomHandler.getNickname();
        console.log("Storage after join:", { roomName, nickname });

        if (roomName) {
          navigate(`/room/${roomName}/view`, { replace: true });
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
      console.error("Student login error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to join room",
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
