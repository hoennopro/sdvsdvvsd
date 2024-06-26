import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "./tasksSlice";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { RootState, AppDispatch } from "../../app/store";

const Tasks: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div>
      <TaskForm />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Tasks;
