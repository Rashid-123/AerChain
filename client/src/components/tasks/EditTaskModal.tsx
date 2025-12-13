
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

    console.log(task);
    const dispatch = useDispatch<AppDispatch>();

    const [form, setForm] = useState({
        title: task?.title || "",
        description: task?.description || "",
        priority: task?.priority || "medium",
        status: task?.status || "To Do",
        dueDate: task?.dueDate || ""
    });

    const formatForInput = (date: string) => {
        return new Date(date).toISOString().slice(0, 16);
    };

    useEffect(() => {
        if (task) {
            setForm({
                title: task.title || "",
                description: task.description || "",
                priority: task.priority || "medium",
                status: task.status || "To Do",
                dueDate: task.dueDate ? formatForInput(task.dueDate) : ""
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
            <h3 className="text-xl font-semibold text-text1 mb-6">Edit Task</h3>

            <div className="flex flex-col gap-4 mb-6">

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="title" className="text-sm font-medium text-text1">
                        Title
                    </label>
                    <input
                        id="title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder="Enter task title"
                        className="px-3 py-2  text-text1 border border-border1 rounded-lg focus:outline-none focus:border-border2 focus:ring-1 focus:ring-border2 transition-colors"
                    />
                </div>


                <div className="flex flex-col gap-1.5">
                    <label htmlFor="description" className="text-sm font-medium text-text1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        placeholder="Enter task description"
                        rows={3}
                        className="px-3 py-2  text-text1 border border-border1 rounded-lg focus:outline-none focus:border-border2 focus:ring-1 focus:ring-border2 resize-none transition-colors"
                    />
                </div>


                <div className="flex flex-col gap-1.5">
                    <label htmlFor="priority" className="text-sm font-medium text-text1">
                        Priority
                    </label>
                    <select
                        id="priority"
                        value={form.priority}
                        onChange={(e) => setForm({ ...form, priority: e.target.value })}
                        className="px-3 py-2  text-text1 border border-border1 rounded-lg focus:outline-none focus:border-border2 focus:ring-1 focus:ring-border2 transition-colors"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>


                <div className="flex flex-col gap-1.5">
                    <label htmlFor="status" className="text-sm font-medium text-text1">
                        Status
                    </label>
                    <select
                        id="status"
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                        className="px-3 py-2  text-text1 border border-border1 rounded-lg focus:outline-none focus:border-border2 focus:ring-1 focus:ring-border2 transition-colors"
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="duedate" className="text-sm font-medium text-text1">
                        Due Date
                    </label>
                    <input
                        id="duedate"
                        type="datetime-local"
                        value={form.dueDate}
                        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                        className="px-3 py-2 text-text1 border border-border1 rounded-lg focus:outline-none focus:border-border2 focus:ring-1 focus:ring-border2 transition-colors bg-white"
                    />

                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={update}
                    className="flex-1 px-4 py-2.5 bg-g1 text-white rounded-lg hover:bg-g2 transition-colors font-medium"
                >
                    Update Task
                </button>
                <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 bg-gray-100  text-text1 rounded-lg hover:bg-bg2 transition-colors border border-border1 font-medium"
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
};

export default EditTaskModal;