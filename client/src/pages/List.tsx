
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskFilters from "../components/tasks/TaskFilters";
import DeleteTaskModal from "../components/tasks/DeleteTaskModel";
import EditTaskModal from "../components/tasks/EditTaskModal";
import TaskTable from "../components/tasks/TaskTable";

import { AppDispatch, RootState } from "../redux/store";
import { fetchTasks, deleteTask } from "../redux/tasks/tasksThunks";
import { resetFilters } from "../redux/tasks/tasksSlice";
import { Task } from "../redux/tasks/tasksTypes";

export default function ListPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, loading } = useSelector((state: RootState) => state.tasks);

    const [editTask, setEditTask] = useState<Task | null>(null);
    const [deleteTaskState, setDeleteTaskState] = useState<Task | null>(null);

    useEffect(() => {
        dispatch(resetFilters());
        dispatch(fetchTasks());
    }, []);

    if (loading) return <p className="text-text1 p-10">Loading...</p>

    return (
        <div className="p-10 min-h-screen ">
            <h2 className="text-2xl text-text1 mb-6">Task List</h2>

            <TaskFilters />

            <TaskTable
                tasks={tasks}
                onEdit={(task) => setEditTask(task)}
                onDelete={(task) => setDeleteTaskState(task)}
            />

            <EditTaskModal
                open={!!editTask}
                task={editTask}
                onClose={() => setEditTask(null)}
            />

            <DeleteTaskModal
                open={!!deleteTaskState}
                task={deleteTaskState}
                onClose={() => setDeleteTaskState(null)}
            />
        </div>
    )
}