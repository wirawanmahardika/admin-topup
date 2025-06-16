import { Bounce, toast, type Id } from "react-toastify";

export function loadingToast(text: string = "Sedang Proses") {
    return toast.loading(text, {position: "bottom-center", theme: "dark"})
}

export function loadingSuccessToast(id: Id, text:string) {
    toast.update(id, {
        isLoading: false,
        type:"success",
        render: text,
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    })
}

export function loadingErrorToast(id: Id, text:string) {
    toast.update(id, {
        isLoading: false,
        render: text,
        type: "error",
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    })
}

export function successToast(text: string) {
    toast.success(text, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });
}

export function errorToast(text: string) {
    toast.error(text, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });
}