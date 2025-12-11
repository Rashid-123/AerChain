
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setFilters, resetFilters } from "../../redux/tasks/tasksSlice";
import { fetchTasks } from "../../redux/tasks/tasksThunks";

const TaskFilters = () => {
    const dispatch = useDispatch<AppDispatch>();

    const applyFilter = (changes: any) => {
        dispatch(setFilters(changes));
        dispatch(fetchTasks());
    };
    
    const clearAll = () => {
        dispatch(resetFilters());
        dispatch(fetchTasks());
    }

    return (
        <div className="flex gap-3 mb-6">
            <input 
                placeholder="Search Tasks..."
                onChange={(e) => applyFilter({ search: e.target.value })}
                className="px-3 py-2 bg-bg2 text-text1 border border-border1 rounded focus:outline-none focus:border-text2 flex-1"
            />

            <select 
                onChange={(e) => applyFilter({status: e.target.value})}
                className="px-3 py-2 bg-bg2 text-text1 border border-border1 rounded focus:outline-none focus:border-text2"
            >
                <option value="">All Status</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
           
            <select 
                onChange={(e) => applyFilter({priority: e.target.value})}
                className="px-3 py-2 bg-bg2 text-text1 border border-border1 rounded focus:outline-none focus:border-text2"
            >
                <option value="">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
           
            <button 
                onClick={clearAll}
                className="px-4 py-2 bg-bg3 text-text1 border border-border1 rounded hover:bg-opacity-80 transition-colors"
            >
                Reset
            </button>
        </div>
    )
}

export default TaskFilters;