<template>
    <div class="animated-border-card group cursor-pointer h-full">
        <div class="inner-card-content !border-emerald-500/30 !bg-[#0D1612]/60 !shadow-[0_0_20px_rgba(16,185,129,0.1)] relative flex flex-col p-6 overflow-hidden h-full">

            <h2 class="text-xl font-serif text-emerald-400 tracking-wider mb-2 drop-shadow-md">
                Đông Tây Hội Ngộ
            </h2>
            <p class="text-white/50 text-xs mb-4">Mệnh (Đông) x Cung (Tây)</p>

            <div class="flex-1 flex flex-col justify-center space-y-5 relative z-10 w-full mt-2">

                <div class="flex justify-between items-center bg-black/40 rounded-full p-2 border border-emerald-500/20 shadow-[0_5px_15px_rgba(0,0,0,0.5)]">

                    <div class="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-emerald-900/50 border border-emerald-500/50 relative overflow-hidden">
                        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                        <span class="text-xs text-emerald-300 font-bold z-10">MỆNH</span>
                        <span class="text-lg text-white font-black z-10">{{ mainElementCore }}</span>
                    </div>


                    <div class="flex-1 flex flex-col items-center px-2">
                        <svg class="w-full h-8 px-2" viewBox="0 0 100 20" preserveAspectRatio="none">
                            <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(16,185,129,0.3)" stroke-width="2" stroke-dasharray="4,4" class="dash-anim" />
                            <circle cx="50" cy="10" r="4" fill="#10B981" filter="url(#glow-green)" />
                        </svg>
                        <span class="text-[10px] text-emerald-200 mt-1 uppercase tracking-widest bg-emerald-900/40 px-2 py-0.5 rounded-full border border-emerald-500/20">Kết hợp</span>
                    </div>


                    <div class="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-purple-900/50 border border-purple-500/50 relative overflow-hidden">
                        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                        <span class="text-xs text-purple-300 font-bold z-10">CUNG</span>
                        <span class="text-lg text-white font-black z-10" :title="zodiacInfo.name">{{ zodiacInfo.icon }}</span>
                    </div>
                </div>


                <div class="relative bg-gradient-to-br from-emerald-900/40 to-black p-4 rounded-xl border border-emerald-500/30 overflow-hidden mt-4">

                    <div class="absolute inset-0 pointer-events-none opacity-20">
                        <div class="star-fall absolute left-[10%] -top-2 w-[1px] h-10 bg-gradient-to-b from-transparent to-emerald-400"></div>
                        <div class="star-fall absolute left-[40%] -top-10 w-[1px] h-14 bg-gradient-to-b from-transparent to-purple-400" style="animation-delay: 1.2s"></div>
                        <div class="star-fall absolute left-[80%] -top-4 w-[1px] h-8 bg-gradient-to-b from-transparent to-white" style="animation-delay: 2.5s"></div>
                    </div>

                    <h3 class="text-emerald-300 font-medium text-sm mb-1">Affirmation Giao Thoa:</h3>
                    <p class="text-white/80 text-sm italic font-serif leading-relaxed">
                        "Mang trong mình tính kiên định của {{ mainElementCore }} (Đông) và ngọn lửa đam mê của {{ zodiacInfo.name }} (Tây), hôm nay hãy để trực giác dẫn lối khát vọng vươn lên của bạn."
                    </p>
                </div>

            </div>


            <svg class="w-0 h-0 absolute">
                <defs>
                    <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
            </svg>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { getZodiacSign } from '@/utils/spiritualCalc';

const authStore = useAuthStore();

const zodiacInfo = computed(() => {
    if (!authStore.user?.dateOfBirth) return { name: "Bí ẩn" };
    const dob = new Date(authStore.user.dateOfBirth);
    return getZodiacSign(dob.getDate(), dob.getMonth() + 1);
});


const mainElementCore = computed(() => {
    const full = authStore.user?.elements || '';
    const cores = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];
    return cores.find(c => full.toLowerCase().includes(c.toLowerCase())) || 'Khuyết';
});
</script>

<style scoped>
.dash-anim {
    animation: dashMove 2s linear infinite;
}
@keyframes dashMove {
    to { stroke-dashoffset: -8; }
}

.star-fall {
    animation: fall 3s infinite linear;
    opacity: 0;
}
@keyframes fall {
    0% { transform: translateY(-20px); opacity: 0; }
    10% { opacity: 1; }
    50% { opacity: 0; }
    100% { transform: translateY(100px); opacity: 0; }
}
</style>