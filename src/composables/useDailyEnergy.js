import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

export function useDailyEnergy() {
    const authStore = useAuthStore();


    const userElement = computed(() => {
        try {
            if (typeof authStore.user?.elements === 'string') {
                return JSON.parse(authStore.user.elements).nguHanh || 'Thủy';
            }
            return authStore.user?.elements?.nguHanh || 'Thủy';
        } catch {
            return 'Thủy';
        }
    });


    const getDailySeed = () => {
        const today = new Date();
        const dateStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
        const dob = authStore.user?.dob || '2000-01-01';

        const str = dateStr + dob;
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    };

    const ELEMENT_NAMES = ['Kim', 'Mộc', 'Hỏa', 'Thủy', 'Thổ'];


    const baseEnergy = computed(() => {
        const seed = getDailySeed();
        const arr = [];
        for (let i = 0; i < 5; i++) {

            const val = 40 + ((seed + i * 17) % 40);
            arr.push(val);
        }


        const mainIdx = ELEMENT_NAMES.indexOf(userElement.value);
        if (mainIdx !== -1) {
            arr[mainIdx] = Math.min(100, arr[mainIdx] + 20);
        }

        return arr;
    });

    return {
        userElement,
        baseEnergy
    };
}