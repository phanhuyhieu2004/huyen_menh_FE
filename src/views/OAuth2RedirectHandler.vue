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
        try {
            authStore.setToken(token);
            await new Promise(resolve => setTimeout(resolve, 200));
            await authStore.fetchUser();

            const hasOnboarded = localStorage.getItem('hasOnboarded') === 'true';

            if (!hasOnboarded) {
                await router.push('/onboarding');
            } else {
                await router.push('/app');
            }
        } catch (error) {
            uiStore.setGlobalLoading(false);
            router.push('/login');
        }
    } else {
        uiStore.setGlobalLoading(false);
        router.push('/login');
    }
});
</script>