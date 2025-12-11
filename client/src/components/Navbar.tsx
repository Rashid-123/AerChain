import { Link } from "react-router-dom";
import AddTaskModel from "./tasks/AddTaskModel";
import { useState } from "react";
export default function Navbar() {

const [addTask , setAddTask] = useState<boolean>(false);
    return (
        <nav className="w-full bg-white  px-6 py-4 flex justify-between items-center border border-b-border-1 shadow-sm sticky top-0 z-50">
            <Link to="/" className="text-xl text-text1 font-bold">MyLogo</Link>
            
            <button onClick={() =>setAddTask(!addTask) } >+ Add task</button>
            <Link to="/list" className="bg-bg2 px-4 py-2 rounded-lg hover:bg-bg1 transition">
                 List
            </Link>
             
             <AddTaskModel 
              open={addTask}
              onClose={() => setAddTask(false)}
            />

        </nav>
    );
}