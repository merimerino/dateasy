import { TaskFormData } from "./types";

export const getDefaultValuesForType = (
  taskType: TaskFormData["task_type"]
) => {
  switch (taskType) {
    case "multichoice":
      return {
        options: ["", ""],
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
    case "table_task":
      return {
        headers: [""],
        rows: 3,
        columns: 1,
      };
    case "map_task":
      return {
        center_latitude: 45.815,
        center_longitude: 15.982,
        zoom_level: 13,
        allow_multiple_points: false,
      };
    default:
      return {};
  }
};
