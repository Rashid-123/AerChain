import { configureStore } from "@reduxjs/toolkit";
import TasksReducer from "./tasks/tasksSlice";

export const store = configureStore({
    reducer: {
        tasks: TasksReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;