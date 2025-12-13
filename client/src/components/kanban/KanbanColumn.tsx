
import { Task } from "../../redux/tasks/tasksTypes";
import TaskCard from "./TaskCard";

interface Props {
  title: string;
  tasks: Task[];
  onDropTask: (status: string) => void;
  onDragStart: (task: Task) => void;
}

const KanbanColumn = ({ title, tasks, onDropTask, onDragStart }: Props) => {
  const allowDrop = (e: React.DragEvent) => e.preventDefault();

  return (
    <div
      onDrop={() => onDropTask(title)}
      onDragOver={allowDrop}
      className="flex-1 px-5"
    >

      <div className="py-2 px-4 flex justify-between border border-slate-200 border-l-8 border-l-gray-400 rounded-tr-lg rounded-br-lg shadow-sm mb-6">
        <div></div>
        <h3 className="text-lg text-text2 text-center font-medium ">
          {title}
        </h3>
        <p className="px-2.5 py-0.5 text-sm text-slate-600 font-medium  rounded-lg bg-[#f4e6cf]">{tasks.length}</p>
      </div>


      {tasks.length === 0 && (
        <p className="text-text2 text-center py-8">No tasks</p>
      )}

      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onDragStart={onDragStart} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
