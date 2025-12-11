
interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-bg2 p-6 rounded-lg w-full max-w-md relative border border-border1">
                <button
                    className="absolute top-3 right-3 text-text2 hover:text-text1 text-xl w-6 h-6 flex items-center justify-center"
                    onClick={onClose}
                >
                    x
                </button>
                {children}
            </div>
        </div>
        

    );
};

export default Modal;