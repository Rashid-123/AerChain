
import Modal from "../ui/Modal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { createTask, fetchTasks } from "../../redux/tasks/tasksThunks";
import VoiceRecorder from "../VoiceRecorder";
import { Mic, Loader } from "lucide-react";

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
            <h3 className="text-xl font-semibold text-text1 mb-6">Add New Task</h3>

            <div className="relative mb-6">
                 {/* overlay to hide the form  */}
                {(recording || loading) && (
                    <div className="absolute inset-0 bg-bg1 flex flex-col justify-center items-center z-10 gap-3">
                        {recording && (
                            <>
                                <div className="relative">
                                    <Mic size={48} className="text-gray-500 animate-pulse" />
                                    <div className="absolute inset-0 animate-ping">
                                        <Mic size={48} className="text-gray-500 opacity-75" />
                                    </div>
                                </div>
                                <p className="text-gray-500 font-medium">Recording...</p>
                            </>
                        )}
                        {loading && (
                            <>
                                <Loader size={48} className="text-gray-500 animate-spin" />
                                <p className="text-gray-500 font-medium">Processing...</p>
                            </>
                        )}
                    </div>
                )}

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="title" className="text-sm font-medium text-text1">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="title"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="Enter task title"
                            className="px-3 py-2 text-text1 border border-border1 rounded-lg focus:outline-none focus:border-border2 focus:ring-1 focus:ring-border2 transition-colors bg-white"
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
                            className="px-3 py-2 text-text1 border border-border1 rounded-lg focus:outline-none focus:border-border2 focus:ring-1 focus:ring-border2 resize-none transition-colors bg-white"
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
                            className="px-3 py-2 text-text1 border border-border1 rounded-lg focus:outline-none focus:border-border2 focus:ring-1 focus:ring-border2 transition-colors bg-white"
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
                            className="px-3 py-2 text-text1 border border-border1 rounded-lg focus:outline-none focus:border-border2 focus:ring-1 focus:ring-border2 transition-colors bg-white"
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="dueDate" className="text-sm font-medium text-text1">
                            Due Date
                        </label>
                        <input
                            id="dueDate"
                            type="datetime-local"
                            value={form.dueDate}
                            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                            className="px-3 py-2 text-text1 border border-border1 rounded-lg focus:outline-none focus:border-border2 focus:ring-1 focus:ring-border2 transition-colors bg-white"
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={addTask}
                    disabled={!form.title.trim() || recording || loading}
                    className="flex-1 px-4 py-2.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Add Task
                </button>
                <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 text-text2 rounded-md hover:bg-bg2 transition-colors border border-slate-300 font-medium"
                >
                    Cancel
                </button>
                <VoiceRecorder
                    setRecording={setRecording}
                    setLoading={setLoading}
                    loading={loading}
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