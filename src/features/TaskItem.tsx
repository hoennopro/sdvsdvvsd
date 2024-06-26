import React from "react";
import { useDispatch } from "react-redux";
import { toggleComplete, deleteTask } from "./tasksSlice";
import { AppDispatch } from "../../app/store";

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleToggleComplete = () => {
    dispatch(toggleComplete(task.id));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggleComplete}
      />
      <span
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {task.name}
      </span>
      <button onClick={handleDelete}>Xóa</button>
    </li>
  );
};

export default TaskItem;
