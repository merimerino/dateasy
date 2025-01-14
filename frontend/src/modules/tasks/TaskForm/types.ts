// Define all possible task types
export type TaskType =
  | "short_task"
  | "numbers_task"
  | "multichoice"
  | "description"
  | "table_task"
  | "map_task";

export interface GenericAnswer {
  username: string;
  answer: string;
}
export interface ExtendedTask {
  id: string | "";
  task_type: TaskType;
  name: string | "";
  text: string | "";
  room_name: string | "";
  order_number: number | 0;
  answers: GenericAnswer[];

  // Short task fields
  max_characters_allowed: number | 0;

  // Numbers task fields
  min_num: number | 0;
  max_num: number | 0;

  // Multiple choice fields
  options: string[] | [];
  multiple_answers: boolean | false;

  // Table task fields
  columns: string | "";
  rows: number | 0;
  show_graf: boolean | false;
  allow_adding_of_rows: boolean | false;
  new_row_name: string | "";

  // Map task fields
  center_latitude: number | 0;
  center_longitude: number | 0;
  zoom_level: number | 0;
  allow_multiple_points?: boolean | false;
  coord_x: number | 0;
  coord_y: number | 0;
  add_mark: boolean | false;
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
