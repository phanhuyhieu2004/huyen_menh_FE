<template>
    <div class="animated-border-card group cursor-pointer h-full">
        <div class="inner-card-content !border-accent-purple/30 !bg-[#1A1025]/60 !shadow-[0_0_20px_rgba(168,85,247,0.15)] relative flex flex-col p-6 overflow-hidden h-full">

            <h2 class="text-xl font-serif text-accent-purple tracking-wider mb-2 drop-shadow-md">
                Bản Đồ Sao (Natal Chart)
            </h2>
            <p class="text-white/50 text-xs mb-4">Mặt Trời & Vị Thế Mặt Trăng (lunarphase-js)</p>

            <div class="flex-1 flex items-center justify-center relative my-4">
                <svg viewBox="0 0 200 200" class="w-full max-w-[250px] aspect-square overflow-visible">
                    <defs>
                        <filter id="purple-glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>


                    <circle cx="100" cy="100" r="90" fill="none" stroke="#a855f7" stroke-width="1" stroke-opacity="0.2" class="spin-slow" />

                    <g transform="translate(100, 100)" stroke="rgba(168,85,247,0.1)" stroke-width="1">
                         <line v-for="i in 12" :key="i" x1="0" y1="0" :x2="90 * Math.cos(i * Math.PI/6)" :y2="90 * Math.sin(i * Math.PI/6)" />
                    </g>


                    <g v-if="sunAngle" :transform="`translate(100, 100) rotate(${sunAngle}) translate(0, -75)`">
                        <circle cx="0" cy="0" r="12" fill="#FBBF24" filter="url(#purple-glow)" />
                        <text x="0" y="4" font-size="12" fill="#000" text-anchor="middle" font-weight="bold">☀</text>
                    </g>


                    <g v-if="moonAngle" :transform="`translate(100, 100) rotate(${moonAngle}) translate(0, -60)`">
                        <circle cx="0" cy="0" r="12" fill="#E5E7EB" filter="url(#purple-glow)" />
                        <text x="0" y="4" font-size="14" fill="#111" text-anchor="middle" font-weight="bold">{{ moonEmoji }}</text>
                    </g>


                    <circle cx="100" cy="100" r="4" fill="#ffffff" filter="url(#purple-glow)" />
                </svg>
            </div>


            <div class="space-y-3 mt-4 text-sm relative z-10">
                <div class="flex justify-between items-center border-b border-white/5 pb-2">
                    <span class="text-white/50">Cung Mặt Trời (Bản Ngã)</span>
                    <span class="text-gold font-bold flex items-center gap-2">
                        {{ zodiacInfo.name }} <span class="text-xl">{{ zodiacInfo.icon }}</span>
                    </span>
                </div>
                <div class="flex justify-between items-center border-b border-white/5 pb-2">
                    <span class="text-white/50">Pha Mặt Trăng (Thực Tế)</span>
                    <span class="text-gray-300 font-bold flex items-center gap-2">
                         {{ moonName }} {{ moonEmoji }}
                    </span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-white/50">Tuổi Trăng (Moon Age)</span>
                    <span class="text-pink-400 font-bold">{{ moonAge }} ngày</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { getZodiacSign } from '@/utils/spiritualCalc';
import { Moon } from 'lunarphase-js';

const authStore = useAuthStore();

const zodiacInfo = computed(() => {
    if (!authStore.user?.dateOfBirth) return { name: "Bí ẩn", icon: "✨" };
    const dob = new Date(authStore.user.dateOfBirth);
    return getZodiacSign(dob.getDate(), dob.getMonth() + 1);
});

const sunAngle = computed(() => {
    if (!authStore.user?.dateOfBirth) return 0;
    const dob = new Date(authStore.user.dateOfBirth);
    const dayOfYear = Math.floor((dob - new Date(dob.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    return (dayOfYear / 365) * 360;
});


const moonData = computed(() => {
    const today = new Date();
    return {
        phase: Moon.lunarPhase(today),
        emoji: Moon.lunarPhaseEmoji(today),
        age: Math.round(Moon.lunarAge(today) * 10) / 10
    };
});

const moonEmoji = computed(() => moonData.value.emoji);
const moonName = computed(() => moonData.value.phase);
const moonAge = computed(() => moonData.value.age);

const moonAngle = computed(() => {
    // lunarphase-js phase age 0-29.53
    const phasePercent = Moon.lunarAge(new Date()) / 29.530588853;
    return sunAngle.value + (phasePercent * 360);
});
</script>

<style scoped>
.spin-slow {
    animation: spin 60s linear infinite;
    transform-origin: center;
}
@keyframes spin {
    100% { transform: rotate(360deg); }
}
</style>
