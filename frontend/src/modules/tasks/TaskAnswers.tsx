import React from "react";
import MultiChoiceAnswers from "./answers/MultiChoiceAnswers";
import ShortTaskAnswers from "./answers/ShortTaskAnswers";
import NumberTaskAnswers from "./answers/NumberTaskAnswers";
import TableTaskAnswers from "./answers/TableTaskAnswers";
import MapTaskAnswers from "./answers/MapTaskAnswers";
import { ExtendedTask } from "./TaskForm/types";
import GpxTaskAnswers from "./answers/GpxTaskAnswers";

interface TaskAnswersProps {
  task: ExtendedTask;
}

const TaskAnswers: React.FC<TaskAnswersProps> = ({ task }) => {
  switch (task.task_type) {
    case "multichoice":
      return (
        <MultiChoiceAnswers answers={task.answers} options={task.options} />
      );

    case "short_task":
      return <ShortTaskAnswers taskId={task.id} answers={task.answers} />;

    case "numbers_task":
      return (
        <NumberTaskAnswers
          taskId={task.id}
          answers={task.answers}
          min={task.min_num}
          max={task.max_num}
        />
      );

    case "table_task":
      return (
        <TableTaskAnswers
          answers={task.answers}
          headers={task.columns.toString()}
        />
      );

    case "map_task":
      return <MapTaskAnswers answers={task.answers} />;
    case "map_task_gpx":
      return <GpxTaskAnswers answers={task.answers} />;

    case "description":
      return null;

    default: {
      throw new Error(`Unhandled task type: ${task}`);
    }
  }
};

export default TaskAnswers;
