import { useToast } from "vue-toastification";

const toast = useToast();


export const cosmicToast = {
    success: (message) => {
        return toast.success(message);
    },

    error: (message) => {
        console.error('[Toast Error]:', message);
        return toast.error(message);
    },

    warning: (message) => {
        return toast.warning(message);
    },

    info: (message) => {
        return toast.info(message);
    },

    loading: (message) => {

        return toast.info(message, { timeout: 0 });
    },

    dismiss: (id) => {
        toast.clear();
    }
};