interface BaseTask {
  room_name: string;
  name: string;
  task_type: string;
  order_number: number;
  text: string;
}

export interface MultipleChoiceTask extends BaseTask {
  task_type: "multichoice";
  multiple_answers: boolean;
  options: string[];
}

export interface NumberTask extends BaseTask {
  task_type: "numbers_task";
  min_num: number;
  max_num: number;
}

export interface ShortTask extends BaseTask {
  task_type: "short_task";
  max_characters_allowed: number;
}

export type Task = MultipleChoiceTask | NumberTask | ShortTask;
