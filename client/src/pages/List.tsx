
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskFilters from "../components/tasks/TaskFilters";
import DeleteTaskModal from "../components/tasks/DeleteTaskModel";
import EditTaskModal from "../components/tasks/EditTaskModal";
import TaskTable from "../components/tasks/TaskTable";

import { AppDispatch, RootState } from "../redux/store";
import { fetchTasks } from "../redux/tasks/tasksThunks";
import { resetFilters } from "../redux/tasks/tasksSlice";
import { Task } from "../redux/tasks/tasksTypes";

export default function ListPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, loading } = useSelector((state: RootState) => state.tasks);

    const [editTask, setEditTask] = useState<Task | null>(null);
    const [deleteTaskState, setDeleteTaskState] = useState<Task | null>(null);

    const handleEdit = useCallback((task: Task) => {
        setEditTask(task);
    } , []);

    const handleDelete = useCallback((task: Task) => {
        setDeleteTaskState(task);
    }, []);

    useEffect(() => {
        dispatch(resetFilters());
        dispatch(fetchTasks());
    }, [dispatch]);

    if (loading) return <p className=" flex alight-center text-center text-text1 p-10"></p>

    return (
        <div className="max-w-[1200px] mx-auto py-10  ">
            <h2 className="text-2xl text-text1 mb-6">Task List</h2>

            <TaskFilters />

            <TaskTable
                tasks={tasks}
                // onEdit={(task) => setEditTask(task)}
                onEdit={handleEdit}
                // onDelete={(task) => setDeleteTaskState(task)}
                onDelete={handleDelete}
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

