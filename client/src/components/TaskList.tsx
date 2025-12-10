import { useEffect } from "react";

import { useDispatch,  useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchTasks } from "../redux/tasks/tasksThunks";


export default function TaskList() {
    const dispatch = useDispatch<AppDispatch>();

    const { tasks, loading, error } = useSelector(
        (state: RootState) => state.tasks
    );

    // fetch tasks when component loads
    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch])

    if (loading) return <p>Loading tasks ....</p>
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-5">
            <h2>All Tasks</h2>

            {tasks.length === 0 ? (<p>No tasks found.</p>) : (
                <ul>
                    {tasks.map(task => (
                        <li key={task._id} className="mp-2">
                            <strong>{task.title}</strong>
                            <br />
                            priority:{task.priority}
                            <br />
                            status: {task.status}
                            <br />
                            Due: {task.dueDate || "No due Date"}
                            <hr />
                        </li>
                    ))}
                </ul>
            )}

        </div>
    )


}