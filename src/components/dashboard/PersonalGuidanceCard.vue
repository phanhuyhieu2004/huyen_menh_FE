<template>
    <DashboardCard title="Lời Khuyên Cá Nhân Hôm Nay" contentClass="w-full flex flex-col items-center">

        <div class="relative w-full flex-1 flex flex-col items-center justify-center mt-6">

            <div class="relative w-24 h-24 mb-6">

                 <img src="https://res.cloudinary.com/drac9ko3l/image/upload/v1772092193/ChatGPT_Image_14_49_43_26_thg_2_2026_xryj4i.png"
                      alt="Moon"
                      class="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,184,0,0.5)] z-10 relative"
                      loading="lazy">


                 <div class="absolute inset-0 bg-transparent animate-pulse rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)]"></div>
            </div>


            <div class="w-full max-w-md px-4 text-center min-h-[150px] flex items-center justify-center">
                <p v-if="energyData && energyData.guidance" class="text-white/90 font-serif text-base md:text-lg leading-relaxed drop-shadow-md transition-opacity duration-1000" :class="animating ? 'opacity-100' : 'opacity-0'">
                    {{ energyData.guidance }}
                </p>
                <div v-else class="flex flex-col items-center gap-2">
                     <i class="fi fi-rr-spinner animate-spin text-2xl text-gold"></i>
                     <p class="text-white/60 text-sm font-serif italic">Vũ trụ đang gửi thông điệp...</p>
                </div>
            </div>


            <div class="mt-8 opacity-0 transition-opacity duration-1000 delay-500" :class="{'opacity-100': animating}">
                <button class="px-6 py-2 border border-gold/50 rounded-full font-serif text-gold text-sm hover:bg-gold/10 hover:shadow-[0_0_15px_rgba(255,184,0,0.3)] transition-all">
                    Xem thêm <i>›</i>
                </button>
            </div>

        </div>

        <template #info>
            <div class="text-center">
                <h4 class="text-lg font-bold text-white mb-4 flex items-center justify-center gap-2">
                    <span class="text-2xl">🔮</span> Lời Khuyên Cá Nhân
                </h4>
                <p class="text-sm text-white/80 leading-relaxed mb-4">
                    Vũ trụ gửi đến bạn một thông điệp dựa trên <span class="text-gold font-bold">ngũ hành bản mệnh</span> và <span class="text-gold font-bold">nhịp điệu năng lượng</span> của ngày hôm nay.
                </p>
                <div class="bg-white/5 p-4 rounded-xl border border-white/10 text-left space-y-2">
                    <p class="text-sm"><strong class="text-accent-purple">Mental & Focus:</strong> Chỉ đạo trí tuệ và sự nhạy bén.</p>
                    <p class="text-sm"><strong class="text-pink-400">Emotional Balance:</strong> Kiểm soát cảm xúc, tránh xung đột vô cớ.</p>
                    <p class="text-sm"><strong class="text-yellow-400">Action Readiness:</strong> Sự tự tin để đưa ra các quyết định quan trọng.</p>
                </div>
                <p class="text-sm text-gold/80 italic mt-6">
                    Hãy xem đây như một lời nhắn nhủ yêu thương, một ngọn hải đăng nhỏ để bạn dễ dàng định hướng trong ngày.
                </p>
            </div>
        </template>
    </DashboardCard>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import DashboardCard from '@/components/common/DashboardCard.vue';
import api from '@/services/api';

const energyData = ref(null);
const animating = ref(false);

const checkEnergy = async () => {
    animating.value = false;
    try {
        const response = await api.getDailyEnergy();
        energyData.value = response.data;
        setTimeout(() => animating.value = true, 300);
    } catch (e) {
        console.error("Không thể tải lời khuyên dẫn dắt");
    }
}

onMounted(() => {
    checkEnergy();
});

</script>

<style scoped>

</style>