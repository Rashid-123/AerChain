import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import { TasksState , Task } from "./tasksTypes";
import { fetchTasks ,createTask , updateTask , deleteTask, updateTaskStatus } from "./tasksThunks";

const initialState: TasksState = {
    tasks: [],
    loading: false,
    error: null,
    filters: {
        search:"",
        status:"",
        priority: "",
    }
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers:{
        setFilters(state , action: PayloadAction<{search?: string; status?: string; priority?: string} >) {
            state.filters= {...state.filters, ...action.payload};
        },

        resetFilters(state) {
            state.filters = {search: "" , status:"" , priority: ""}; 
        }
    },
    
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading= false;
            state.tasks = action.payload;
        });

        builder.addCase(fetchTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch tasks"
        });

        // create Task
        builder.addCase(createTask.fulfilled, (state , action) => {
            state.tasks.push(action.payload);
        });

        // update Task
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const idx = state.tasks.findIndex((t) => t._id === action.payload._id);
            if(idx !== -1) state.tasks[idx] = action.payload;
        });
          
        // update task status
        builder.addCase(updateTaskStatus.fulfilled , (state, action) => {
            const idx = state.tasks.findIndex((t) => t._id === action.payload._id);
            if(idx !== -1) state.tasks[idx] = action.payload;
        })
        
        // delete task
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.filter((t) => t._id !== action.payload);
        });
    }

});

 export const {setFilters, resetFilters} = tasksSlice.actions;
 export default tasksSlice.reducer;

