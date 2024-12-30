interface BaseTask {
  room_name: string;
  name?: string;
  text?: string;
  task_type:
    | "multichoice"
    | "numbers_task"
    | "short_task"
    | "description"
    | "table_task"
    | "map_task";
  order_number: number;
  id: string;
}

interface BaseAnswer {
  username: string;
}

export type SubmissionValue =
  | string
  | string[]
  | number
  | string[][]
  | Array<{ lat: number; lng: number }>
  | null;

export interface MultipleChoiceAnswer extends BaseAnswer {
  answer: string;
}

export interface NumberAnswer extends BaseAnswer {
  answer: string;
}

export interface ShortAnswer extends BaseAnswer {
  answer: string;
}

export interface TableAnswer extends BaseAnswer {
  answer: string[][];
}

export interface MapAnswer extends BaseAnswer {
  answer: string;
}

export interface MultipleChoiceTask extends BaseTask {
  task_type: "multichoice";
  multiple_answers: boolean;
  options: string[];
  answers: MultipleChoiceAnswer[];
}

export interface NumberTask extends BaseTask {
  task_type: "numbers_task";
  min_num: number;
  max_num: number;
  answers: NumberAnswer[];
}

export interface ShortTask extends BaseTask {
  task_type: "short_task";
  max_characters_allowed: number;
  answers: ShortAnswer[];
}

export interface DescriptionTask extends BaseTask {
  task_type: "description";
  description: string;
}

export interface TableTask extends BaseTask {
  task_type: "table_task";
  headers: string[];
  rows: number;
  columns: number;
  answers: TableAnswer[];
}

export interface MapTask extends BaseTask {
  task_type: "map_task";
  center_latitude?: number;
  center_longitude?: number;
  zoom_level?: number;
  allow_multiple_points?: boolean;
  answers: MapAnswer[];
}

export type Task =
  | MultipleChoiceTask
  | NumberTask
  | ShortTask
  | DescriptionTask
  | TableTask
  | MapTask;

// Type guard functions with proper typing
export const isMultipleChoiceTask = (
  task: Task
): task is MultipleChoiceTask => {
  return task.task_type === "multichoice";
};

export const isNumberTask = (task: Task): task is NumberTask => {
  return task.task_type === "numbers_task";
};

export const isShortTask = (task: Task): task is ShortTask => {
  return task.task_type === "short_task";
};

export const isDescriptionTask = (task: Task): task is DescriptionTask => {
  return task.task_type === "description";
};

export const isTableTask = (task: Task): task is TableTask => {
  return task.task_type === "table_task";
};

export const isMapTask = (task: Task): task is MapTask => {
  return task.task_type === "map_task";
};

// Form state with all fields optional
export type TaskFormState = Partial<Task> & {
  options?: string[];
  headers?: string[];
  multiple_answers?: boolean;
  min_num?: number;
  max_num?: number;
  max_characters_allowed?: number;
  rows?: number;
  columns?: number;
  center_latitude?: number;
  center_longitude?: number;
  zoom_level?: number;
  allow_multiple_points?: boolean;
};
