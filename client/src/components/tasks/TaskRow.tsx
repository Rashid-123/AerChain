
import { Task } from "../../redux/tasks/tasksTypes";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (task: Task) => void;
}

const TaskRow = ({ task, onEdit, onDelete }: Props) => {
    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + "...";
    };

    const getPriorityColors = (priority: string) => {
        switch (priority.toLowerCase()) {
            case 'high':
                return {
                    bg: 'bg-r3',
                    text: 'text-r1',
                    border: 'border-r2'
                };
            case 'medium':
                return {
                    bg: 'bg-y3',
                    text: 'text-y1',
                    border: 'border-y2'
                };
            case 'low':
                return {
                    bg: 'bg-g3',
                    text: 'text-g1',
                    border: 'border-g2'
                };
            default:
                return {
                    bg: 'bg-gray-100',
                    text: 'text-gray-700',
                    border: 'border-gray-300'
                };
        }
    };

    const colors = getPriorityColors(task.priority);

    return (
        <tr className="border-b border-slate-200 hover:bg-bg2 transition-colors">
         
            <td className="py-3 px-4">
                <span className="text-text1 font-medium text-sm">{task.title ? truncateText(task.title, 40) : "-"}</span>
            </td>

           
            <td className="py-3 px-4">
                <span className="text-text2 text-sm">
                    {task.description ? truncateText(task.description, 50) : "-"}
                </span>
            </td>

          
            <td className="py-3 px-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} border ${colors.border}`}>
                    {task.priority}
                </span>
            </td>

         
            <td className="py-3 px-4">
                <span className="text-text1 text-sm capitalize">{task.status}</span>
            </td>

           
            <td className="py-3 px-4">
                <span className="text-text2 text-sm">
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}
                </span>
            </td>

           
            <td className="py-3 px-4">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 hover:bg-b3 text-text3 hover:text-b1 rounded-lg transition-colors"
                        title="Edit task"
                    >
                        <Pencil size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(task)}
                        className="p-2 hover:bg-r3 text-text3 hover:text-r1 rounded-lg transition-colors"
                        title="Delete task"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default TaskRow;