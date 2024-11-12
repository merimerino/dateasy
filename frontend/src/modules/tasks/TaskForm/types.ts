import { Task } from "../../../types/Tasks";

export interface TaskFormProps {
  mode: "create" | "edit";
  initialData?: Task;
}

export interface TaskFormData {
  name: string;
  order_number?: number;
  room_name?: string;
  task_type: Task["task_type"];
  text: string;
  // Optional fields based on task type
  options?: string[];
  multiple_answers?: boolean;
  min_num?: number;
  max_num?: number;
  max_characters_allowed?: number;
  headers?: string[];
  rows?: number;
  columns?: number;
  center_latitude?: number;
  center_longitude?: number;
  zoom_level?: number;
  allow_multiple_points?: boolean;
}

export interface FormErrors {
  name?: string;
  text?: string;
  options?: string;
  headers?: string;
  min_num?: string;
  max_num?: string;
  max_characters_allowed?: string;
  rows?: string;
  columns?: string;
  center_latitude?: string;
  center_longitude?: string;
  zoom_level?: string;
}

export type TaskFieldProps = {
  formData: TaskFormData;
  errors: FormErrors;
  isSubmitting: boolean;
  onChange: <K extends keyof TaskFormData>(
    field: K,
    value: TaskFormData[K]
  ) => void;
};
