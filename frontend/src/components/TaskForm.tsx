import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  NumberInput,
  NumberInputField,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Task } from "../types/Tasks";
import { useNavigate, useParams } from "react-router-dom";

interface TaskFormProps {
  mode: "create" | "edit";
  initialData?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ mode, initialData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { roomName } = useParams();

  const [formData, setFormData] = useState<Partial<Task>>(
    initialData || {
      task_type: "short_task",
      name: "",
      text: "",
      max_characters_allowed: 250,
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url =
        mode === "create"
          ? `http://localhost:3000/tasks`
          : `http://localhost:3000/tasks/${formData.order_number}`;

      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
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

      navigate(`/room/${roomName}/edit`);
    } catch (error) {
      console.error("Error saving task:", error);
      // You might want to add error handling/toast here
    }
  };

  const handleCancel = () => {
    navigate(`/room/${roomName}/edit`);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} pt={4} pl={16} pr={16}>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>{t("taskType")}</FormLabel>
          <Select
            value={formData.task_type}
            onChange={(e) => {
              const newType = e.target.value as Task["task_type"];
              let newFormData: Partial<Task> = {
                ...formData,
                task_type: newType,
              };

              // Reset type-specific fields
              if (newType === "multichoice") {
                newFormData = {
                  ...newFormData,
                  options: [],
                  multiple_answers: false,
                };
              } else if (newType === "numbers_task") {
                newFormData = {
                  ...newFormData,
                  min_num: 0,
                  max_num: 100,
                };
              } else if (newType === "short_task") {
                newFormData = {
                  ...newFormData,
                  max_characters_allowed: 250,
                };
              }

              setFormData(newFormData);
            }}
          >
            <option value="short_task">{t("shortText")}</option>
            <option value="multichoice">{t("multipleChoice")}</option>
            <option value="numbers_task">{t("numberTask")}</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>{t("taskName")}</FormLabel>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </FormControl>

        <FormControl>
          <FormLabel>{t("taskText")}</FormLabel>
          <Textarea
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          />
        </FormControl>

        {/* Type-specific fields */}
        {formData.task_type === "short_task" && (
          <FormControl>
            <FormLabel>{t("maxCharacters")}</FormLabel>
            <NumberInput
              value={formData.max_characters_allowed}
              onChange={(_, value) =>
                setFormData({ ...formData, max_characters_allowed: value })
              }
              min={1}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>
        )}

        {formData.task_type === "numbers_task" && (
          <>
            <FormControl>
              <FormLabel>{t("minNumber")}</FormLabel>
              <NumberInput
                value={formData.min_num}
                onChange={(_, value) =>
                  setFormData({ ...formData, min_num: value })
                }
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>{t("maxNumber")}</FormLabel>
              <NumberInput
                value={formData.max_num}
                onChange={(_, value) =>
                  setFormData({ ...formData, max_num: value })
                }
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
          </>
        )}

        <Box w="100%" display="flex" justifyContent="flex-end" gap={4}>
          <Button onClick={handleCancel}>{t("cancel")}</Button>
          <Button type="submit" colorScheme="teal">
            {t("save")}
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default TaskForm;
