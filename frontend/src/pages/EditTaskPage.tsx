import TaskForm from "../modules/tasks/TaskForm/TaskForm";
import Header from "../modules/Header";
import { useTasks } from "../hooks/useTasks";
import { useParams } from "react-router-dom";
import { TaskFormData } from "../modules/tasks/TaskForm/types";

const EditTaskPage = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const { tasks } = useTasks();

  if (!taskId) {
    return <div>Task ID is required</div>;
  }

  const taskIdNum = parseInt(taskId, 10);
  const selectedTask = tasks?.find((task) => task.order_number === taskIdNum);

  if (!selectedTask) {
    return <div>Task not found</div>;
  }

  const initialData: TaskFormData = {
    task_type: selectedTask.task_type,
    name: selectedTask.name || "",
    text: selectedTask.text || "",
    room_name: selectedTask.room_name,
    order_number: selectedTask.order_number,
  };

  return (
    <>
      <Header />
      <TaskForm mode="edit" initialData={initialData} />
    </>
  );
};

export default EditTaskPage;
