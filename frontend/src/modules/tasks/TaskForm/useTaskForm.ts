import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { TaskFormProps, TaskFormData, FormErrors } from "./types";
import { validateForm } from "./formValidation";
import { getDefaultValuesForType } from "./utils";

export const useTaskForm = ({ mode, initialData }: TaskFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { roomName } = useParams();
  const toast = useToast();

  const [formData, setFormData] = useState<TaskFormData>(() => {
    const taskType = initialData?.task_type || "short_task";
    return {
      name: initialData?.name || "",
      text: initialData?.text || "",
      task_type: taskType,
      room_name: roomName || "",
      order_number: initialData?.order_number,
      ...getDefaultValuesForType(taskType),
      ...(initialData
        ? {
            // Spread only the task-type specific fields from initialData
            ...(initialData.task_type === "multichoice" && {
              options: initialData.options,
              multiple_answers: initialData.multiple_answers,
            }),
            ...(initialData.task_type === "numbers_task" && {
              min_num: initialData.min_num,
              max_num: initialData.max_num,
            }),
            ...(initialData.task_type === "short_task" && {
              max_characters_allowed: initialData.max_characters_allowed,
            }),
            ...(initialData.task_type === "table" && {
              headers: initialData.headers,
              rows: initialData.rows,
              columns: initialData.columns,
            }),
            ...(initialData.task_type === "map" && {
              center_latitude: initialData.center_latitude,
              center_longitude: initialData.center_longitude,
              zoom_level: initialData.zoom_level,
              allow_multiple_points: initialData.allow_multiple_points,
            }),
          }
        : {}),
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
    // Clear error when field is modified
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleTypeChange = (newType: TaskFormData["task_type"]) => {
    setFormData((prev) => ({
      ...prev,
      task_type: newType,
      // Only spread the new default values, don't spread the entire previous state
      ...getDefaultValuesForType(newType),
    }));
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData, t);
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
      const url = `http://localhost:3000/tasks${
        mode === "edit" ? `/${formData.order_number}` : ""
      }`;

      const response = await fetch(url, {
        method: mode === "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-jwt-token": localStorage.getItem("token") || "",
        },
        body: JSON.stringify({
          ...formData,
          room_name: roomName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save task");
      }

      toast({
        title: t("success.taskSaved"),
        status: "success",
        duration: 3000,
      });

      navigate(`/room/${roomName}/edit`);
    } catch (error) {
      toast({
        title: t("error.failedToSave"),
        status: "error",
        duration: 5000,
      });
      console.error("Error saving task:", error);
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
