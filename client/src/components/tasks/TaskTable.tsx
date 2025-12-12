
import TaskRow from "./TaskRow";
import { Task } from "../../redux/tasks/tasksTypes";

interface Props {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (task: Task) => void;
}

const TaskTable = ({ tasks, onEdit, onDelete }: Props) => {
    return (
        <div className="bg-bg2 rounded-lg border border-border1 overflow-hidden">
            <table className="w-full">
                <thead>
                    <tr className="bg-bg3 border-b border-border1">
                        <th className="py-3 px-4 text-left text-text1 font-medium w-1/4">Title</th>
                        <th className="py-3 px-4 text-left text-text1 font-medium w-2/6">Description</th>
                        <th className="py-3 px-4 text-left text-text1 font-medium w-1/12">Priority</th>
                        <th className="py-3 px-4 text-left text-text1 font-medium w-1/7">Status</th>
                        <th className="py-3 px-4 text-left text-text1 font-medium w-1/7">Due Date</th>
                        <th className="py-3 px-4 text-left text-text1 font-medium w-1/7">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {tasks.map((task) => (
                        <TaskRow 
                            key={task._id} 
                            task={task} 
                            onEdit={onEdit} 
                            onDelete={onDelete} 
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskTable;