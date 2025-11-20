import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type NotifyType = "success" | "error" | "info" | "warning";

export const notify = {
    success: (msg: string, options = {}) => toast.success(msg, options),
    error: (msg: string, options = {}) => toast.error(msg, options),
    info: (msg: string, options = {}) => toast.info(msg, options),
    warn: (msg: string, options = {}) => toast.warn(msg, options),
};

interface Props {
    children: React.ReactNode;
}

export default function NotificationProvider({ children }: Props) {
    return (
        <>
            {children}
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                transition={Slide}
            />
        </>
    );
}
