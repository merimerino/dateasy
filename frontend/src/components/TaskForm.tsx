// components/TaskForm.tsx
import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { TaskCreateDTO } from "../types/Tasks";

interface TaskFormProps {
  onSubmit: (task: TaskCreateDTO) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState<TaskCreateDTO>({
    type: "kratki_tekst",
    title: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} pt={4} pl={16} pr={16}>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>{t("taskType")}</FormLabel>
          <Select
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value as "kratki_tekst" | "dugi_tekst",
              })
            }
          >
            <option value="kratki_tekst">{t("shortText")}</option>
            <option value="dugi_tekst">{t("longText")}</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>{t("taskTitle")}</FormLabel>
          <Input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>{t("taskDescription")}</FormLabel>
          <Textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </FormControl>

        <Box w="100%" display="flex" justifyContent="flex-end" gap={4}>
          <Button onClick={onCancel}>{t("cancel")}</Button>
          <Button type="submit" colorScheme="teal">
            {t("save")}
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default TaskForm;
