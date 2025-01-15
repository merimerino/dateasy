import { ExtendedTask } from "./TaskForm/types";
import ShortTextTask from "./questions/ShortTextTask";
import NumbersTask from "./questions/NumbersTask";
import MultiChoiceTask from "./questions/MultiChoiceTask";
import DescriptionTask from "./questions/DescriptionTask";
import TableTask from "./questions/TableTask";
import MapTask from "./questions/MapTask";
import GpxTask from "./questions/GpxTask";

interface TaskDisplayProps {
  task: ExtendedTask;
  onSubmit: (roomName: string, value: string | string[]) => void;
}

const TaskDisplay: React.FC<TaskDisplayProps> = ({ task, onSubmit }) => {
  if (!task) return null;

  const handleTaskSubmit = (value: string): void => {
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
          onChange={(value: string) => handleTaskSubmit(value)}
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
          onChange={(value: string) => handleTaskSubmit(value)}
        />
      );
    }

    case "description": {
      return <DescriptionTask description={task.text ?? task.text ?? ""} />;
    }

    case "table_task": {
      if ("columns" in task && "rows" in task) {
        return (
          <TableTask
            id={task.id}
            task_type="table_task"
            name={task.name ?? ""}
            text={task.text ?? ""}
            room_name={task.room_name ?? ""}
            order_number={task.order_number}
            columns={task.columns}
            rows={task.rows}
            onChange={(tableData) => {
              const stringifiedData = JSON.stringify(tableData);
              handleTaskSubmit(stringifiedData);
            }}
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
            handleTaskSubmit(coordinatesString);
          }}
        />
      );
    }
    case "map_task_gpx": {
      return (
        <GpxTask
          title={task.name ?? ""}
          description={task.text ?? ""}
          onChange={(value: string) => handleTaskSubmit(value)}
        />
      );
    }

    default: {
      throw new Error(`Unhandled task type`);
    }
  }
};

export default TaskDisplay;
