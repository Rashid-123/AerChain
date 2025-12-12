
import { Link, useLocation } from "react-router-dom";
import AddTaskModel from "./tasks/AddTaskModel";
import { useState } from "react";
import { LayoutGrid, List, Plus } from "lucide-react";

export default function Navbar() {
    const [addTask, setAddTask] = useState<boolean>(false);
    const location = useLocation();
    
    const isActive = (path: string) => location.pathname === path;
    
    return (
        <nav className="bg-white py-4 border border-b-border-1 shadow-sm sticky top-0 z-50">
            <div className="max-w-[1200px]  mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl text-text1 font-bold">Track</Link>

                <div className="flex gap-2">
                    <Link 
                        to="/" 
                        className={`flex items-center gap-2 px-4 py-1 rounded-md transition-colors ${
                            isActive('/') 
                                ? 'bg-blue-50 text-blue-500 font-medium' 
                                : 'text-text2 hover:bg-blue-50'
                        }`}
                    >
                        <LayoutGrid size={18} />
                        Kanban
                    </Link>
                    <Link 
                        to="/list" 
                        className={`flex items-center gap-2 px-4 py-1 rounded-md transition-colors ${
                            isActive('/list') 
                                ? 'bg-blue-50 text-blue-500 font-medium' 
                                : 'text-gray-600 hover:bg-blue-50'
                        }`}
                    >
                        <List size={18} />
                        List
                    </Link>
                </div>
                
                <button 
                    onClick={() => setAddTask(!addTask)}
                    className="flex items-center gap-2 px-4 py-1 bg-[#f4e6cf] text-text2 font-medium rounded-md  shadow-sm hover:shadow-md transition "
                >
                    <Plus size={18} />
                    Add task
                </button>

                <AddTaskModel
                    open={addTask}
                    onClose={() => setAddTask(false)}
                />
            </div>
        </nav>
    );
}