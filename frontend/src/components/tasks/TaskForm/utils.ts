import { TaskFormData } from "./types";

export const getDefaultValuesForType = (
  type: TaskFormData["task_type"]
): Partial<TaskFormData> => {
  switch (type) {
    case "multichoice":
      return {
        options: [],
        multiple_answers: false,
      };
    case "numbers_task":
      return {
        min_num: 0,
        max_num: 100,
      };
    case "short_task":
      return {
        max_characters_allowed: 250,
      };
    case "table":
      return {
        headers: [],
        rows: 3,
        columns: 3,
      };
    case "map":
      return {
        center_latitude: 0,
        center_longitude: 0,
        zoom_level: 13,
        allow_multiple_points: false,
      };
    default:
      return {};
  }
};

export const sanitizeFormData = (data: TaskFormData) => {
  const cleanData = { ...data };

  // Remove fields that don't belong to the current task type
  Object.keys(cleanData).forEach((key) => {
    if (!isFieldRelevantForType(key as keyof TaskFormData, data.task_type)) {
      delete cleanData[key as keyof TaskFormData];
    }
  });

  return cleanData;
};

const isFieldRelevantForType = (
  field: keyof TaskFormData,
  type: TaskFormData["task_type"]
): boolean => {
  const commonFields = [
    "name",
    "text",
    "task_type",
    "room_name",
    "order_number",
  ];
  if (commonFields.includes(field)) return true;

  switch (type) {
    case "multichoice":
      return ["options", "multiple_answers"].includes(field);
    case "numbers_task":
      return ["min_num", "max_num"].includes(field);
    case "short_task":
      return ["max_characters_allowed"].includes(field);
    case "table":
      return ["headers", "rows", "columns"].includes(field);
    case "map":
      return [
        "center_latitude",
        "center_longitude",
        "zoom_level",
        "allow_multiple_points",
      ].includes(field);
    default:
      return false;
  }
};
