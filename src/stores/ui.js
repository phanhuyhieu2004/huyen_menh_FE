import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUiStore = defineStore('ui', () => {
    const isGlobalLoading = ref(false);

    const setGlobalLoading = (status) => {
        isGlobalLoading.value = status;
    };

    return {
        isGlobalLoading,
        setGlobalLoading
    };
});