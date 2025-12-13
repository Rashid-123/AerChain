import { useState } from "react";
import { Task } from "../../redux/tasks/tasksTypes";
import { Pencil, Trash2 } from "lucide-react";
import DeleteTaskModal from "../tasks/DeleteTaskModel";
import EditTaskModal from "../tasks/EditTaskModal";
interface Props {
    task: Task;
    onDragStart: (task: Task) => void;
}

const TaskCard = ({ task, onDragStart }: Props) => {
    
    const[editModalOpen , seteditModalOpen] = useState<boolean > (false);
    const [deleteModalOpen , setDeleteModalOpen] = useState<boolean> (false);

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + "...";
    };

    // Get priority-based colors
    const getPriorityColors = (priority: string) => {
        switch (priority.toLowerCase()) {
            case 'high':
                return {
                    border: 'border-l-r1',
                    bg: 'bg-r2',
                    light: 'bg-r3',
                  
                };
            case 'medium':
                return {
                    border: 'border-l-y1',
                    bg: 'bg-y2',
                    light: 'bg-y3',
                  
                };
            case 'low':
                return {
                    border: 'border-l-g1',
                    bg: 'bg-g2',
                    light: 'bg-g3',
                  
                };
            default:
                return {
                    border: 'border-l-gray-400',
                    bg: 'bg-gray-100',
                    light: 'bg-gray-50'
                };
        }
    };

    const colors = getPriorityColors(task.priority);

    return (
        <div
            draggable
            onDragStart={() => onDragStart(task)}
            className={`cursor-move ${colors.light} transition-colors border border-dashed border-slate-300 rounded-bl-2xl rounded-br-2xl flex flex-col h-full shadow-md`}
        >
          
            <div className="flex w-full">
                <div className={`w-1/2 py-2 px-3 border-l-8 ${colors.border} ${colors.bg} rounded-br-lg flex items-center justify-center`}>
                    <h4 className= {`text-sm font-bold text-slate-700 `}>{task.priority}</h4>
                </div>

                <div className="w-1/2 flex items-center justify-end pr-3">
                    <button onClick={() => seteditModalOpen(true)} className="p-1.5 hover:bg-white/50 rounded transition-colors">
                        <Pencil size={14} className="text-text2" />
                    </button>
                </div>
            </div>

         
            <div className="p-3 border-b border-gray-300 flex-grow">
                <strong className="text-text2 block mb-2 text-sm leading-snug">{task.title}</strong>

                {task.description && (
                    <p className="text-text2 text-xs leading-relaxed">
                        {truncateText(task.description, 60)}
                    </p>
                )}
            </div>

           
            <div className="p-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="text-text2 text-xs font-medium">Due:</span>
                    <span className="text-text1 text-xs">
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}
                    </span>
                </div>
                <button onClick={() => setDeleteModalOpen(true)} className="p-1.5 hover:bg-white/50 rounded transition-colors">
                    <Trash2 size={14} className="text-text2" />
                </button>
            </div>

           {/* Modals for editing and deleting  */}
          
          <EditTaskModal open={editModalOpen} onClose={() => seteditModalOpen(!seteditModalOpen)} task={task} />
          <DeleteTaskModal open={deleteModalOpen} onClose={() => setDeleteModalOpen(!setDeleteModalOpen) } task={task} />

        </div>
    );
};

export default TaskCard;

