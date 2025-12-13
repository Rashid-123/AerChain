
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setFilters, resetFilters } from "../../redux/tasks/tasksSlice";
import { fetchTasks } from "../../redux/tasks/tasksThunks";
import { Search, X  } from "lucide-react";

const TaskFilters = () => {
    const dispatch = useDispatch<AppDispatch>();
    const filters = useSelector((state: RootState) => state.tasks.filters);

    
    const updateFilter = (changes: any) => {
        dispatch(setFilters(changes));
    };

   
    const handleSearch = () => {
        dispatch(fetchTasks());
    };

    
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    
    const handleStatusChange = (value: string) => {
        dispatch(setFilters({ status: value }));
        dispatch(fetchTasks());
    };

    const handlePriorityChange = (value: string) => {
        dispatch(setFilters({ priority: value }));
        dispatch(fetchTasks());
    };

    const clearAll = () => {
        dispatch(resetFilters());
        dispatch(fetchTasks());
    };

    return (
        <div className="flex gap-3 mb-6 flex-wrap">
            {/* Search input with button */}
            <div className="relative flex-1 min-w-[250px] flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text2" size={18} />
                    <input
                        value={filters.search || ""}
                        placeholder="Search tasks..."
                        onChange={(e) => updateFilter({ search: e.target.value })}
                        onKeyPress={handleKeyPress}
                        className="w-full pl-10 pr-3 py-2 bg-bg2 text-text1 border border-border1 rounded-md focus:outline-none focus:border-border2 focus:ring-1 focus:ring-border2 transition-colors"
                    />
                </div>
                <button
                    onClick={handleSearch}
                    className="px-3 py-0.5 bg-g1 text-white rounded-md hover:bg-g2 transition-colors font-medium whitespace-nowrap"
                >
                    Search
                </button>
            </div>

         
            <select
                value={filters.status || ""}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="px-3 py-2 bg-bg2 text-text2 border border-border1 rounded-md focus:outline-none focus:border-border2 focus:ring-1 focus:ring-border2 transition-colors min-w-[140px]"
            >
                <option value="">All Status</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>

           
            <select
                value={filters.priority || ""}
                onChange={(e) => handlePriorityChange(e.target.value)}
                className="px-3 py-2 bg-bg2 text-text2 border border-border1 rounded-md focus:outline-none focus:border-border2 focus:ring-1 focus:ring-border2 transition-colors min-w-[140px]"
            >
                <option value="">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            {/* reset button */}
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