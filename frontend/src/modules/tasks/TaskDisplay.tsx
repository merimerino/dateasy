import React from "react";
import { Task } from "../../types/Tasks";
import ShortTextTask from "./ShortTextTask";
import NumbersTask from "./NumbersTask";
import MultiChoiceTask from "./MultiChoiceTask";
import DescriptionTask from "./DescriptionTask";
import TableTask from "./TableTask";
import MapTask from "./MapTask";

type SubmissionValue =
  | string
  | number
  | string[][]
  | { latitude: number; longitude: number }
  | null;

interface TaskDisplayProps {
  task: Task;
  onSubmit: (roomName: string, value: SubmissionValue) => void;
}

const TaskDisplay: React.FC<TaskDisplayProps> = ({ task, onSubmit }) => {
  if (!task) {
    return null;
  }

  const handleTaskSubmit = (value: SubmissionValue): void => {
    onSubmit(task.room_name, value);
  };

  switch (task.task_type) {
    case "short_task": {
      return (
        <ShortTextTask
          title={task.name}
          description={task.text}
          maxLength={task.max_characters_allowed}
          onChange={(value: string) => handleTaskSubmit(value)}
        />
      );
    }

    case "numbers_task": {
      return (
        <NumbersTask
          title={task.name}
          description={task.text}
          min={task.min_num}
          max={task.max_num}
          onChange={(value: string) => handleTaskSubmit(Number(value))}
        />
      );
    }

    case "multichoice": {
      return (
        <MultiChoiceTask
          title={task.name}
          description={task.text}
          options={task.options}
          onChange={(value: string) => handleTaskSubmit(value)}
        />
      );
    }

    case "description": {
      return <DescriptionTask title={task.name} description={task.text} />;
    }

    case "table": {
      if ("headers" in task && "rows" in task) {
        return (
          <TableTask
            title={task.name}
            description={task.text}
            headers={task.headers}
            rows={task.rows}
            onChange={(value: string[][]) => handleTaskSubmit(value)}
          />
        );
      }
      return null;
    }

    case "map": {
      return (
        <MapTask
          title={task.name}
          description={task.text}
          onLocationSelect={(lat: number, lng: number) =>
            handleTaskSubmit({ latitude: lat, longitude: lng })
          }
        />
      );
    }

    default: {
      throw new Error(`Unhandled task type`);
    }
  }
};

export default TaskDisplay;
