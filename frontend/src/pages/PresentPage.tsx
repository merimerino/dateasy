import { useTasks } from "../hooks/useTasks";
import Header from "../modules/Header";
import PresentTasks from "../modules/PresentTasks";

const PresentPage: React.FC = () => {
  const { tasks } = useTasks();

  return (
    <>
      <Header />
      <PresentTasks tasks={tasks} />
    </>
  );
};

export default PresentPage;
