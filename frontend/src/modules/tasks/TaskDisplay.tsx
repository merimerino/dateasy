import { Task } from "../../types/Tasks";
import ShortTextTask from "./questions/ShortTextTask";
import NumbersTask from "./questions/NumbersTask";
import MultiChoiceTask from "./questions/MultiChoiceTask";
import DescriptionTask from "./questions/DescriptionTask";
import TableTask from "./questions/TableTask";
import MapTask from "./questions/MapTask";
import { SubmissionValue } from "../../types/Tasks";

interface TaskDisplayProps {
  task: Task;
  onSubmit: (roomName: string, value: SubmissionValue) => void;
}

const TaskDisplay: React.FC<TaskDisplayProps> = ({ task, onSubmit }) => {
  if (!task) return null;

  const handleTaskSubmit = (value: SubmissionValue): void => {
    onSubmit(task.room_name, value);
  };

  switch (task.task_type) {
    case "short_task": {
      return (
        <ShortTextTask
          title={task.name ?? ""}
          description={task.text ?? ""}
          maxLength={task.max_characters_allowed}
          onChange={(value: string) => handleTaskSubmit(value)}
        />
      );
    }

    case "numbers_task": {
      return (
        <NumbersTask
          title={task.name ?? ""}
          description={task.text ?? ""}
          min={task.min_num}
          max={task.max_num}
          onChange={(value: string) => handleTaskSubmit(Number(value))}
        />
      );
    }

    case "multichoice": {
      return (
        <MultiChoiceTask
          title={task.name ?? ""}
          description={task.text ?? ""}
          options={task.options}
          multiple_answers={task.multiple_answers}
          onChange={(value: string | string[]) => handleTaskSubmit(value)}
        />
      );
    }

    case "description": {
      return (
        <DescriptionTask description={task.description ?? task.text ?? ""} />
      );
    }

    case "table_task": {
      if ("headers" in task && "rows" in task) {
        return (
          <TableTask
            title={task.name ?? ""}
            description={task.text ?? ""}
            headers={task.headers}
            rows={task.rows}
            onChange={(value: string[][]) => handleTaskSubmit(value)}
          />
        );
      }
      return null;
    }

    case "map_task": {
      return (
        <MapTask
          title={task.name ?? ""}
          description={task.text ?? ""}
          onLocationSelect={(
            positions: Array<{ lat: number; lng: number }>
          ) => {
            const coordinatesString = positions
              .map((pos) => `${pos.lat},${pos.lng}`)
              .join(";");
            console.log(coordinatesString);
            handleTaskSubmit(coordinatesString);
          }}
        />
      );
    }

    default: {
      throw new Error(`Unhandled task type`);
    }
  }
};

export default TaskDisplay;
