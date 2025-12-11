
import Modal from "../ui/Modal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { createTask, fetchTasks } from "../../redux/tasks/tasksThunks";
import VoiceRecorder from "../VoiceRecorder";

interface Props {
    open: boolean;
    onClose: () => void;
}

const AddTaskModal = ({ open, onClose }: Props) => {
    const dispatch = useDispatch<AppDispatch>();

    const [recording, setRecording] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "medium",
        status: "To Do",
        dueDate: ""
    });

    useEffect(() => {
        if (open) {
            setForm({
                title: "",
                description: "",
                priority: "medium",
                status: "To Do",
                dueDate: ""
            });
            setLoading(false);
            setRecording(false);
        }
    }, [open]);

    const addTask = () => {
        if (!form.title.trim()) return;

        dispatch(createTask(form))
            .then(() => dispatch(fetchTasks()))
            .then(onClose);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <h3 className="text-lg text-text1 mb-4">Add Task</h3>

            <div className="relative mb-6">
                {(recording || loading) && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center text-white text-xl z-10 rounded">
                        {recording && <div>🎤 Listening...</div>}
                        {loading && <div>⏳ Processing voice...</div>}
                    </div>
                )}

                <div className="flex flex-col gap-3">
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

                    <input
                        type="datetime-local"
                        value={form.dueDate}
                        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                        className="px-3 py-2 bg-bg3 text-text1 border border-border1 rounded focus:outline-none focus:border-text2"
                    />
                </div>
            </div>

            <div className="flex gap-3">
                <button 
                    onClick={addTask} 
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                    Add
                </button>
                <button 
                    onClick={onClose} 
                    className="px-4 py-2 bg-bg3 text-text1 rounded hover:bg-opacity-80 transition-colors border border-border1"
                >
                    Cancel
                </button>
                <VoiceRecorder
                    setRecording={setRecording}
                    setLoading={setLoading}
                    onData={(data) => setForm({
                        title: data.title || "",
                        description: data.description || "",
                        priority: data.priority || "medium",
                        status: data.status || "To Do",
                        dueDate: data.dueDate ? data.dueDate.slice(0, 16) : ""
                    })}
                />
            </div>
        </Modal>
    );
};

export default AddTaskModal;