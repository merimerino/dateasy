interface BaseTask {
  taskType: string;
  taskOrderNumber: number;
  id: string;
  description: string;
  room_name: string;
  title: string;
  name: string;
  text: string;
}

export interface MultipleChoiceTask extends BaseTask {
  taskType: "multiple_choice";
  multiple_answers: boolean;
  options: string[];
}

export interface NumberTask extends BaseTask {
  taskType: "number_tasks";
  min_num: number;
  max_num: number;
}

export interface ShortTask extends BaseTask {
  taskType: "short_tasks";
  max_characters_allowed: number;
}

export type Task = MultipleChoiceTask | NumberTask | ShortTask;

export interface TasksResponse {
  tasks: Task[];
}

export interface TasksResponse {
  descriptions: unknown[] | null;
  map_tasks: unknown[] | null;
  multiple_choice: MultipleChoiceTask[] | null;
  number_tasks: NumberTask[] | null;
  short_tasks: ShortTask[] | null;
  table_tasks: unknown[] | null;
}
