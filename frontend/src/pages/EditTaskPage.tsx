import TaskForm from "../modules/tasks/TaskForm/TaskForm";
import Header from "../modules/Header";
import { useTasks } from "../hooks/useTasks";
import { useParams } from "react-router-dom";
import { TaskFormData } from "../modules/tasks/TaskForm/types";

const EditTaskPage = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const { tasks } = useTasks();

  if (!orderNumber) {
    return <div>Task ID is required</div>;
  }

  const orderNumberNum = parseInt(orderNumber, 10);
  const selectedTask = tasks?.find(
    (task) => task.order_number === orderNumberNum
  );

  if (!selectedTask) {
    return <div>Task not found</div>;
  }

  const initialData: TaskFormData = {
    id: selectedTask.id,
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
