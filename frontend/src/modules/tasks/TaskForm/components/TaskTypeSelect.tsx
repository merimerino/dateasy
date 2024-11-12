import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { TaskFormData } from "../types";

interface TaskTypeSelectProps {
  value: TaskFormData["task_type"];
  onChange: (type: TaskFormData["task_type"]) => void;
  isSubmitting: boolean;
}

const TaskTypeSelect: React.FC<TaskTypeSelectProps> = ({
  value,
  onChange,
  isSubmitting,
}) => {
  const { t } = useTranslation();

  return (
    <FormControl isRequired>
      <FormLabel>{t("taskType")}</FormLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value as TaskFormData["task_type"])}
        size="lg"
        bg="white"
        isDisabled={isSubmitting}
      >
        <option value="short_task">{t("taskTypes.short_task")}</option>
        <option value="multichoice">{t("taskTypes.multichoice")}</option>
        <option value="numbers_task">{t("taskTypes.numbers_task")}</option>
        <option value="description">{t("taskTypes.description")}</option>
        <option value="table">{t("taskTypes.table")}</option>
        <option value="map">{t("taskTypes.map")}</option>
      </Select>
    </FormControl>
  );
};

export default TaskTypeSelect;
