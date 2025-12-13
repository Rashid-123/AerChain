
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import KanbanColumn from "../components/kanban/KanbanColumn";

import { AppDispatch, RootState } from "../redux/store";
import { fetchTasks, updateTaskStatus } from "../redux/tasks/tasksThunks";
import { resetFilters } from "../redux/tasks/tasksSlice";

const KanbanPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading } = useSelector((state: RootState) => state.tasks);

  const [draggedTask, setDraggedTask] = useState<any>(null);

  useEffect(() => {
    dispatch(resetFilters()); 
    dispatch(fetchTasks());   
  }, []);

  const handleDragStart = (task: any) => {
    setDraggedTask(task);
  };

  const handleDrop = (newStatus: string) => {
    if (!draggedTask) return;

    dispatch(updateTaskStatus({ id: draggedTask._id, status: newStatus }))
      .then(() => dispatch(fetchTasks()));
  };

  if (loading) return <p className="text-text1 p-10"></p>;

  const toDoTasks = tasks.filter((t) => t.status === "To Do");
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress");
  const doneTasks = tasks.filter((t) => t.status === "Done");

  return (
    <div className="max-w-[1200px] mx-auto py-10 flex gap-5 min-h-screen">
      <KanbanColumn
        title="To Do"
        tasks={toDoTasks}
        onDropTask={handleDrop}
        onDragStart={handleDragStart}
      />

      <KanbanColumn
        title="In Progress"
        tasks={inProgressTasks}
        onDropTask={handleDrop}
        onDragStart={handleDragStart}
      />

      <KanbanColumn
        title="Done"
        tasks={doneTasks}
        onDropTask={handleDrop}
        onDragStart={handleDragStart}
      />
    </div>
  );
};

export default KanbanPage;


