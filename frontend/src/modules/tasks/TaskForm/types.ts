// Define all possible task types
export type TaskType =
  | "short_task"
  | "numbers_task"
  | "multichoice"
  | "description"
  | "table_task"
  | "map_task";

export interface ExtendedTask {
  id: string;
  task_type: TaskType;
  name: string;
  text: string;
  room_name: string;
  order_number: number;

  // Short task fields
  max_characters_allowed?: number;

  // Numbers task fields
  min_num?: number;
  max_num?: number;

  // Multiple choice fields
  options?: string[];
  multiple_answers?: boolean;

  // Table task fields
  columns?: string;
  rows?: number;
  show_graf?: boolean;
  allow_adding_of_rows?: boolean;
  new_row_name?: string;

  // Map task fields
  center_latitude?: number;
  center_longitude?: number;
  zoom_level?: number;
  allow_multiple_points?: boolean;
  coord_x?: number;
  coord_y?: number;
  add_mark?: boolean;
}

export interface FormErrors {
  name?: string;
  text?: string;
  min_num?: string;
  max_num?: string;
  max_characters_allowed?: string;
  options?: string;
  columns?: string;
  rows?: string;
  center_latitude?: string;
  center_longitude?: string;
}
