import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Task } from "./tasksTypes";
import { RootState } from "../store";

const API = "http://localhost:5000/api/task";

// fetch tasks ( with backend filter)
export const fetchTasks = createAsyncThunk<Task[] , void , {state: RootState }> (
   "tasks/fetchTasks",
   async(_, thunkAPI) => {
      const filters = thunkAPI.getState().tasks.filters;

      const params: any = {};
      if(filters.search) params.search = filters.search;
      if(filters.status) params.status = filters.status;
      if(filters.priority) params.priority = filters.priority;

      const res = await axios.get(API , {params});
      return res.data;
   }
);

// create task
export const createTask = createAsyncThunk(
    "tasks/createTask",
    async (data: Partial<Task>) => {
        const res = await axios.post (API , data);
        return res.data;
    }
);

// update task
export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async({id, data} : {id: string , data: Partial<Task> }) => {
        const res = await axios.put (`${API}/${id}`,data);
          return res.data;
    }
);



export const updateTaskStatus = createAsyncThunk(
  "tasks/updateTaskStatus",
  async ({ id, status }: { id: string; status: string }) => {
    const res = await axios.patch(`${API}/${id}/status`, { status });
    return res.data;
  }
);

// Delete task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => {
    await axios.delete(`${API}/${id}`);
    return id; 
  }
);