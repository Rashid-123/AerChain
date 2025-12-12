
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setFilters, resetFilters } from "../../redux/tasks/tasksSlice";
import { fetchTasks } from "../../redux/tasks/tasksThunks";
import { Search, X } from "lucide-react";

const TaskFilters = () => {
    const dispatch = useDispatch<AppDispatch>();


    const filters = useSelector((state: RootState) => state.tasks.filters);

    const applyFilter = (changes: any) => {
        dispatch(setFilters(changes));
        dispatch(fetchTasks());
    };

    const clearAll = () => {
        dispatch(resetFilters());
        dispatch(fetchTasks());
    };

    return (
        <div className="flex gap-3 mb-6 flex-wrap">

            <div className="relative flex-1 min-w-[250px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text2" size={18} />
                <input
                    value={filters.search || ""}
                    placeholder="Search tasks..."
                    onChange={(e) => applyFilter({ search: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 bg-bg2 text-text1 border border-border1 rounded-md focus:outline-none focus:border-border2 focus:ring-1 focus:ring-border2 transition-colors"
                />
            </div>


            <select
                value={filters.status || ""}
                onChange={(e) => applyFilter({ status: e.target.value })}
                className="px-3 py-2 bg-bg2 text-text2 border border-border1 rounded-md focus:outline-none focus:border-border2 focus:ring-1 focus:ring-border2 transition-colors min-w-[140px]"
            >
                <option value="">All Status</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>


            <select
                value={filters.priority || ""}
                onChange={(e) => applyFilter({ priority: e.target.value })}
                className="px-3 py-2 bg-bg2 text-text2 border border-border1 rounded-md focus:outline-none focus:border-border2 focus:ring-1 focus:ring-border2 transition-colors min-w-[140px]"
            >
                <option value="">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>


            <button
                onClick={clearAll}
                className="px-4 py-2 bg-bg3 text-text2 border border-border1 rounded-md hover:bg-bg2 transition-colors font-medium flex items-center gap-2"
            >
                <X size={16} />
                Reset
            </button>
        </div>
    );
};

export default TaskFilters;