// utils/toast.ts
import { Bounce, toast, type Id, type ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
};

export function loadingToast(text = "Sedang Proses", toastId?: Id): Id {
    if (toastId && toast.isActive(toastId)) return toastId;
    return toast.loading(text, { ...defaultOptions, toastId });
}

export function loadingSuccessToast(id: Id, text: string) {
    toast.update(id, {
        ...defaultOptions,
        isLoading: false,
        type: "success",
        render: text,
    });
}

export function loadingErrorToast(id: Id, text: string) {
    toast.update(id, {
        ...defaultOptions,
        isLoading: false,
        type: "error",
        render: text,
    });
}

export function successToast(text: string, toastId?: Id) {
    if (toastId && toast.isActive(toastId)) return;
    toast.success(text, { ...defaultOptions, toastId });
}

export function errorToast(text: string, toastId?: Id) {
    if (toastId && toast.isActive(toastId)) return;
    toast.error(text, { ...defaultOptions, toastId });
}

export function warnToast(text: string, toastId?: Id) {
    if (toastId && toast.isActive(toastId)) return;
    toast.warn(text, { ...defaultOptions, toastId });
}
