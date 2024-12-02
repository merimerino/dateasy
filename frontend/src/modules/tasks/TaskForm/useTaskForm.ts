import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Task } from "../../../types/Tasks";
import { TaskFormProps, TaskFormData, FormErrors } from "./types";

export const useTaskForm = ({ mode, initialData }: TaskFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { roomName } = useParams();
  const toast = useToast();

  const [formData, setFormData] = useState<TaskFormData>(() => {
    const taskType = initialData?.task_type || "short_task";
    return {
      id: initialData?.id || "",
      name: initialData?.name || "",
      text: initialData?.text || "",
      task_type: taskType,
      room_name: roomName || "",
      order_number: initialData?.order_number,
      ...(initialData && {
        ...(taskType === "multichoice" && {
          options: initialData.options,
          multiple_answers: initialData.multiple_answers,
        }),
        ...(taskType === "numbers_task" && {
          min_num: initialData.min_num,
          max_num: initialData.max_num,
        }),
        ...(taskType === "short_task" && {
          max_characters_allowed: initialData.max_characters_allowed,
        }),
        ...(taskType === "table_task" && {
          headers: initialData.headers,
          rows: initialData.rows,
          columns: initialData.columns,
        }),
        ...(taskType === "map_task" && {
          center_latitude: initialData.center_latitude,
          center_longitude: initialData.center_longitude,
          zoom_level: initialData.zoom_level,
          allow_multiple_points: initialData.allow_multiple_points,
        }),
      }),
    };
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = <K extends keyof TaskFormData>(
    field: K,
    value: TaskFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field in errors) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleTypeChange = (newType: Task["task_type"]) => {
    setFormData((prev) => ({
      id: prev.id,
      name: prev.name,
      text: prev.text,
      task_type: newType,
      room_name: prev.room_name,
    }));
    setErrors({});
  };

  const formatPayloadByType = (data: TaskFormData) => {
    const basePayload = {
      name: data.name,
      text: data.text,
      room_name: roomName,
    };

    switch (data.task_type) {
      case "multichoice":
        return {
          ...basePayload,
          multiple_answers: data.multiple_answers ?? false,
          options: data.options || [],
        };

      case "description":
        return {
          description: data.text,
        };

      case "short_task":
        return {
          ...basePayload,
          max_characters_allowed: data.max_characters_allowed ?? 100,
        };

      case "table_task":
        return {
          ...basePayload,
          columns: data.columns || "",
          rows: data.rows || "",
          show_graf: true,
          allow_adding_of_rows: true,
          new_row_name: data.name,
        };

      case "map_task":
        return {
          ...basePayload,
          add_mark: true,
          coord_x: data.center_latitude ?? 0,
          coord_y: data.center_longitude ?? 0,
        };

      case "numbers_task":
        return {
          ...basePayload,
          min_num: data.min_num ?? 0,
          max_num: data.max_num ?? 100,
        };

      default:
        throw new Error(`Unknown task type: ${data.task_type}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);

    const validationErrors: FormErrors = {};
    if (!formData.name) validationErrors.name = "Name is required";
    if (!formData.text) validationErrors.text = "Text is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast({
        title: t("error.validationFailed"),
        status: "error",
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const url =
        mode === "create"
          ? `http://localhost:3000/addTask/${formData.task_type}`
          : `http://localhost:3000/tasks`;

      console.log("Making request to:", url);
      const payload = formatPayloadByType(formData);
      console.log("With payload:", payload);

      const response = await fetch(url, {
        method: mode === "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-jwt-token": localStorage.getItem("token") || "",
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(errorText || "Failed to save task");
      }

      const responseData = await response.json();
      console.log("Success response:", responseData);

      toast({
        title: t("success.taskSaved"),
        status: "success",
        duration: 3000,
      });

      navigate(`/room/${roomName}/edit`);
    } catch (error) {
      console.error("Error saving task:", error);
      toast({
        title: t("error.failedToSave"),
        status: "error",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/room/${roomName}/edit`);
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleTypeChange,
    handleSubmit,
    handleCancel,
  };
};
