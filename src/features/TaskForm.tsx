import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "./tasksSlice";
import { RootState, AppDispatch } from "../app/store";

const TaskForm: React.FC = () => {
  const [taskName, setTaskName] = useState("");
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim() === "") {
      alert("Tên công việc không được để trống");
      return;
    }
    if (tasks.some((task) => task.name === taskName.trim())) {
      alert("Tên công việc không được phép trùng");
      return;
    }
    dispatch(addTask({ name: taskName.trim(), completed: false }));
    setTaskName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Tên công việc"
      />
      <button type="submit">Thêm</button>
    </form>
  );
};

export default TaskForm;
