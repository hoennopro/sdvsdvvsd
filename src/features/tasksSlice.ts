import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../app/store";

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

interface TasksState {
  tasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const apiUrl = "http://localhost:3001/tasks";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(apiUrl);
  return response.data as Task[];
});

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (newTask: Omit<Task, "id">) => {
    const response = await axios.post(apiUrl, newTask);
    return response.data as Task;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (updatedTask: Task) => {
    const response = await axios.put(
      `${apiUrl}/${updatedTask.id}`,
      updatedTask
    );
    return response.data as Task;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: number) => {
    await axios.delete(`${apiUrl}/${taskId}`);
    return taskId;
  }
);

const initialState: TasksState = {
  tasks: [],
  status: "idle",
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    toggleComplete: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        state.tasks[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export const { toggleComplete } = tasksSlice.actions;

export default tasksSlice.reducer;
