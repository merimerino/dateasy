import { Task } from "../../../types/Tasks";

export interface TaskFormProps {
  mode: "create" | "edit";
  initialData?: TaskFormData;
}

export interface TaskFormData {
  id: string;
  task_type: Task["task_type"];
  name: string;
  text: string;
  room_name?: string;
  order_number?: number;
  options?: string[];
  multiple_answers?: boolean;
  min_num?: number;
  max_num?: number;
  max_characters_allowed?: number;
  headers?: string[];
  rows?: number;
  columns?: string[];
  center_latitude?: number;
  center_longitude?: number;
  zoom_level?: number;
  allow_multiple_points?: boolean;
}

export interface FormErrors {
  name?: string;
  text?: string;
  options?: string;
  min_num?: string;
  max_num?: string;
  max_characters_allowed?: string;
  headers?: string;
  rows?: string;
  columns?: string;
  center_latitude?: string;
  center_longitude?: string;
  zoom_level?: string;
}
