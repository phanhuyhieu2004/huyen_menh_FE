<template>
    <div class="animated-border-card group cursor-pointer w-full h-full min-h-[160px]">
        <div class="inner-card-content !border-gold/40 !bg-white/5 !shadow-[0_0_20px_rgba(255,215,0,0.3),inset_0_0_10px_rgba(255,255,255,0.1)] relative flex flex-col justify-center overflow-hidden p-6 flex-1 w-full relative">

        <div class="absolute inset-0 bg-gradient-to-tr from-accent-purple/0 via-amber-500/0 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>


        <div class="absolute -top-10 -left-10 w-32 h-32 bg-gold/20 rounded-full blur-3xl mix-blend-screen pointer-events-none transition-transform duration-700 group-hover:scale-150"></div>

        <h2 class="text-lg font-serif text-gold tracking-wider mb-4 border-b border-gold/20 pb-2 relative z-10 drop-shadow-[0_0_5px_rgba(255,215,0,0.5)]">Thần Số Học</h2>

        <div class="flex items-center space-x-6 relative z-10">
            <div class="relative flex items-center justify-center p-2">

                <div class="absolute inset-0 border border-gold/30 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none"></div>
                <div class="absolute inset-2 border-2 border-dashed border-gold/20 rounded-full animate-[spin_15s_linear_infinite_reverse] pointer-events-none"></div>


                <div class="absolute inset-4 bg-gold/10 rounded-full blur-xl mix-blend-screen pointer-events-none animate-pulse"></div>

                <div class="text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#fff8b0] via-[#ffd700] to-[#d97706] drop-shadow-[0_0_20px_#ffd700] relative z-10" style="text-shadow: 0 0 10px rgba(255,215,0,0.8), 0 0 20px rgba(255,215,0,0.4)">
                    {{ lifePathNumber }}
                </div>
            </div>

            <div class="flex-1 text-sm text-gold-light/90 leading-relaxed font-serif italic border-l border-gold/30 pl-4 py-2" v-html="meaningText">
            </div>
        </div>
    </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const lifePathNumber = computed(() => {
    return authStore.user?.godNumber || 7;
});

const numerologyMeanings = {
    1: 'Con số của người tiên phong,<br/>độc lập và lãnh đạo.',
    2: 'Con số của sự hòa bình,<br/>trực giác và hợp tác.',
    3: 'Con số của sự sáng tạo,<br/>giao tiếp và năng lượng.',
    4: 'Con số của sự kỷ luật,<br/>thực tế và nền tảng.',
    5: 'Con số của sự tự do,<br/>phiêu lưu và thay đổi.',
    6: 'Con số của trách nhiệm,<br/>và tình yêu thương.',
    7: 'Con số của trực giác,<br/>triết lý và khai sáng.',
    8: 'Con số của quyền lực,<br/>và thành tựu vật chất.',
    9: 'Con số của nhân đạo,<br/>và cái nhìn tổng thể.',
    11: 'Master Number:<br/>Trực giác tâm linh nhạy bén.',
    22: 'Master Number:<br/>Kiến trúc sư vĩ đại.',
    33: 'Master Number:<br/>Vị thầy của tình yêu thương.'
};

const meaningText = computed(() => {
    return numerologyMeanings[lifePathNumber.value] || numerologyMeanings[7];
});
</script>