import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ExtendedTask } from "../types";

interface TaskTypeSelectProps {
  value: ExtendedTask["task_type"];
  onChange: (type: ExtendedTask["task_type"]) => void;
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
        onChange={(e) => onChange(e.target.value as ExtendedTask["task_type"])}
        size="lg"
        bg="white"
        isDisabled={isSubmitting}
      >
        <option value="short_task">{t("taskTypes.short_task")}</option>
        <option value="multichoice">{t("taskTypes.multichoice")}</option>
        <option value="numbers_task">{t("taskTypes.numbers_task")}</option>
        <option value="description">{t("taskTypes.description")}</option>
        <option value="table_task">{t("taskTypes.table_task")}</option>
        <option value="map_task">{t("taskTypes.map_task")}</option>
        <option value="map_task_gpx">{t("taskTypes.map_task_gpx")}</option>
      </Select>
    </FormControl>
  );
};

export default TaskTypeSelect;
