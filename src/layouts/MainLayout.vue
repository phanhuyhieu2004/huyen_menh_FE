<template>
    <div class="main-layout flex flex-col min-h-screen bg-transparent text-primary relative">
        <GlobalHeader @show-profile-info="showProfileInfo = true" />

        <main class="p-4 md:py-6 md:px-8 flex-1 w-full relative z-10 mx-auto">
            <router-view />
        </main>

        <InfoModal v-model:show="showProfileInfo" title="Tại sao cần Hồ sơ Sinh mệnh?">
            <div class="space-y-4 text-sm md:text-base">
                <p class="text-white/70">
                    Mọi tính toán về **Ngũ Hành**, **Màu Sắc Đại Cát**, và **Bản Đồ Linh Hồn** trong ứng dụng đều dựa trên thông tin **Ngày, Giờ, Phút sinh** của bạn.
                </p>
                <ul class="space-y-3">
                    <li class="flex items-start gap-3">
                        <i class="fi fi-rr-star text-gold mt-1"></i>
                        <span><b class="text-gold">Độ chính xác:</b> Chỉ sai lệch 1 giờ cũng có thể thay đổi hoàn toàn lá số tử vi và bản đồ năng lượng.</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <i class="fi fi-rr-settings text-gold mt-1"></i>
                        <span><b class="text-gold">Tùy biến:</b> Sau khi cập nhật, toàn bộ các chỉ số trên Dashboard sẽ được tự động tính toán lại theo thông tin mới nhất.</span>
                    </li>
                </ul>
                <div class="bg-gold/10 p-4 border border-gold/20 rounded-xl text-center">
                    <p class="text-gold font-bold">Hãy đảm bảo thông tin của bạn là chính xác nhất!</p>
                </div>
            </div>
        </InfoModal>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import GlobalHeader from '@/components/layout/GlobalHeader.vue';
import InfoModal from '@/components/common/InfoModal.vue';

const router = useRouter();
const authStore = useAuthStore();
const showProfileInfo = ref(false);

onMounted(async () => {
    if (authStore.isAuthenticated) {
        await authStore.fetchUser();
        if (localStorage.getItem('hasOnboarded') !== 'true') {
            router.push('/onboarding');
        }
    } else {
        router.push('/login');
    }
});
</script>

<style scoped>
/* Scoped styles removed as they are now in GlobalHeader.vue */
</style>

<style scoped>
/* Main content layout styles */
.animate-fade-in {
    animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
