import ProfessorMultiChoiceTask from "./professorTask/ProfessorMultiChoiceTask";
import ProfessorShortTextTask from "./professorTask/ProfessorShortTextTask";
import ProfessorNumberTask from "./professorTask/ProfessorNumberTask";
import ProfessorMapTask from "./professorTask/ProfessorMapTask";
import ProfessorDescription from "./professorTask/ProfessorDescription";
import ProfessorTableTask from "./professorTask/ProfessorTableTask";
import { ExtendedTask } from "./TaskForm/types";

type SubmissionValue =
  | string
  | string[]
  | number
  | string[][]
  | { latitude: number; longitude: number }
  | null;

interface ProfessorTaskDisplayProps {
  task: ExtendedTask;
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
        <ProfessorNumberTask
          title={task.name ?? ""}
          description={task.text ?? ""}
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
        <ProfessorDescription description={task.text ?? task.text ?? ""} />
      );
    }

    case "table_task": {
      console.log(task);
      return (
        <ProfessorTableTask
          name={task.name ?? ""}
          text={task.text ?? ""}
          columns={task.columns}
        />
      );

      return null;
    }

    case "map_task": {
      return (
        <ProfessorMapTask
          title={task.name ?? ""}
          description={task.text ?? ""}
        />
      );
    }

    default: {
      throw new Error(`Unhandled task type`);
    }
  }
};

export default ProfessorTaskDisplay;
