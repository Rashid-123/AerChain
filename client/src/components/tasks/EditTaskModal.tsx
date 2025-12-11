
import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import { Task } from "../../redux/tasks/tasksTypes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { updateTask, fetchTasks } from "../../redux/tasks/tasksThunks";

interface Props {
    open: boolean;
    onClose: () => void;
    task: Task | null;
}

const EditTaskModal = ({ open, onClose, task }: Props) => {
    const dispatch = useDispatch<AppDispatch>();

    const [form, setForm] = useState({
        title: task?.title || "",
        description: task?.description || "",
        priority: task?.priority || "medium",
        status: task?.status || "To Do",
    });

    useEffect(() => {
        if (task) {
            setForm({
                title: task.title || "",
                description: task.description || "",
                priority: task.priority || "medium",
                status: task.status || "To Do",
            });
        }
    }, [task]);

    const update = () => {
        if (!task) return;

        dispatch(updateTask({ id: task._id, data: form }))
            .then(() => dispatch(fetchTasks()))
            .then(onClose);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <h3 className="text-lg text-text1 mb-4">Edit Task</h3>

            <div className="flex flex-col gap-3 mb-6">
                <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Title"
                    className="px-3 py-2 bg-bg3 text-text1 border border-border1 rounded focus:outline-none focus:border-text2"
                />

                <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Description"
                    rows={3}
                    className="px-3 py-2 bg-bg3 text-text1 border border-border1 rounded focus:outline-none focus:border-text2 resize-none"
                />

                <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    className="px-3 py-2 bg-bg3 text-text1 border border-border1 rounded focus:outline-none focus:border-text2"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="px-3 py-2 bg-bg3 text-text1 border border-border1 rounded focus:outline-none focus:border-text2"
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>

            <div className="flex gap-3">
                <button 
                    onClick={update}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                    Update
                </button>
                <button 
                    onClick={onClose}
                    className="px-4 py-2 bg-bg3 text-text1 rounded hover:bg-opacity-80 transition-colors border border-border1"
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
};

export default EditTaskModal;