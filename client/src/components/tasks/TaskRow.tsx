import { Task } from "../../redux/tasks/tasksTypes";

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

    return (
        <tr className="border-b border-border1 hover:bg-bg2 transition-colors">
            <td className="py-3 px-4 text-text1">{task.title}</td>
            <td className="py-3 px-4 text-text2">
                {task.description ? truncateText(task.description, 50) : "-"}
            </td>
            <td className="py-3 px-4 text-text1 capitalize">{task.priority}</td>
            <td className="py-3 px-4 text-text1">{task.status}</td>
            <td className="py-3 px-4 text-text2">
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}
            </td>
            <td className="py-3 px-4">
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(task)}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(task)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default TaskRow;