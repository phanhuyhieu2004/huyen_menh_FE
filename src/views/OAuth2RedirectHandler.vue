<template>
    <div class="min-h-screen bg-transparent flex flex-col items-center justify-center p-6 text-center">
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUiStore } from '@/stores/ui';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const uiStore = useUiStore();

onMounted(async () => {
    const token = route.query.token;
    uiStore.setGlobalLoading(true);

    if (token) {
        console.log("OAUTH2 DEBUG: Nhận token từ URL:", token);
        try {
            authStore.setToken(token);
            console.log("OAUTH2 DEBUG: Đã set token vào store, bắt đầu fetchUser...");
            await new Promise(resolve => setTimeout(resolve, 300));
            const success = await authStore.fetchUser();
            console.log("OAUTH2 DEBUG: Kết quả fetchUser:", success);

            const hasOnboarded = localStorage.getItem('hasOnboarded') === 'true';
            console.log("OAUTH2 DEBUG: Trạng thái Onboarded:", hasOnboarded);

            if (!hasOnboarded) {
                await router.push('/onboarding');
            } else {
                await router.push('/app');
            }
        } catch (error) {
            console.error("OAUTH2 ERROR:", error);
            uiStore.setGlobalLoading(false);
            router.push('/login');
        }
    } else {
        uiStore.setGlobalLoading(false);
        router.push('/login');
    }
});
</script>