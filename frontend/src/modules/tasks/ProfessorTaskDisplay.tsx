import { Task } from "../../types/Tasks";
import NumbersTask from "./questions/NumbersTask";
import DescriptionTask from "./questions/DescriptionTask";
import TableTask from "./questions/TableTask";
import MapTask from "./questions/MapTask";
import ProfessorMultiChoiceTask from "./professorTask/ProfessorMultiChoiceTask";
import ProfessorShortTextTask from "./professorTask/ProfessorShortTextTask";

type SubmissionValue =
  | string
  | string[]
  | number
  | string[][]
  | { latitude: number; longitude: number }
  | null;

interface ProfessorTaskDisplayProps {
  task: Task;
  onSubmit: (roomName: string, value: SubmissionValue) => void;
}

const ProfessorTaskDisplay: React.FC<ProfessorTaskDisplayProps> = ({
  task,
  onSubmit,
}) => {
  if (!task) return null;

  const handleTaskSubmit = (value: SubmissionValue): void => {
    onSubmit(task.room_name, value);
  };

  switch (task.task_type) {
    case "short_task": {
      return (
        <ProfessorShortTextTask
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
        <ProfessorMultiChoiceTask
          title={task.name ?? ""}
          description={task.text ?? ""}
          options={task.options}
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

export default ProfessorTaskDisplay;
