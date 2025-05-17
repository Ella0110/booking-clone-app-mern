import { useEffect } from "react";

type ToastProps = {
    message: string;
    type: "SUCCESS" | "ERROR";
    onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
    // 这里是为了让这个组件 5 秒后自动关闭
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);
        return () => {
            clearTimeout(timer);
        }; // 在这个组件关闭或重新打开时会重置新 timer
    }, [onClose]); // [onClose] 意味着这个 hook 只在 首次渲染组件以及当 onClose 函数更改时生效

    // TailwindCSS 的条件判断
    const styles =
        type === "SUCCESS"
            ? "fixed top-24 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-x-md"
            : "fixed top-24 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-x-md";
    return (
        <div className={styles}>
            <div className="flex justify-center items-center">
                <span className="text-lg font-semibold">{message}</span>
            </div>
        </div>
    );
};

export default Toast;
