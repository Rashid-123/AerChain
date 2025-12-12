
import Modal from "../ui/Modal";
import { Task } from "../../redux/tasks/tasksTypes";
import { useDispatch } from "react-redux";
import { deleteTask, fetchTasks } from "../../redux/tasks/tasksThunks";
import { AppDispatch } from "../../redux/store";

interface Props {
    open: boolean;
    onClose: () => void;
    task: Task | null;
}

const DeleteTaskModal = ({ open, onClose, task }: Props) => {
    const dispatch = useDispatch<AppDispatch>();

    const remove = () => {
        if (!task) return;

        dispatch(deleteTask(task._id))
            .then(() => dispatch(fetchTasks()))
            .then(onClose);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <h3 className="text-lg text-text1 mb-4">Delete Task?</h3>
            <p className="text-text2 mb-6">
                Are you sure you want to delete : <strong className="text-text1">{task?.title}</strong>?
            </p>

            <div className="flex gap-3">
                <button 
                    onClick={remove}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                    Yes, Delete
                </button>
                <button 
                    onClick={onClose}
                    className="px-4 py-2 bg-bg3 text-text1 rounded hover:bg-opacity-80 transition-colors border border-gray-200"
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
};

export default DeleteTaskModal;