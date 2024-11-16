import Header from "../modules/Header";
import TaskForm from "../modules/tasks/TaskForm/TaskForm";

const AddTaskPage: React.FC = () => {
  return (
    <>
      <Header />
      <TaskForm mode="edit" />
    </>
  );
};

export default AddTaskPage;
