import TaskForm from "../modules/tasks/TaskForm/TaskForm";
import Header from "../modules/Header";
import { useTasks } from "../hooks/useTasks";
import { useParams } from "react-router-dom";

const EditTaskPage = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const { tasks } = useTasks();

  console.log("Tasksss", tasks);

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

  return (
    <>
      <Header />
      <TaskForm mode="edit" initialData={selectedTask} />
    </>
  );
};

export default EditTaskPage;
