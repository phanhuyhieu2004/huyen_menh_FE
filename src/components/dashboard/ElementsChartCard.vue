<template>
    <div class="animated-border-card group cursor-pointer w-full h-full">
        <div class="inner-card-content !border-gold/40 !bg-white/5 !shadow-[0_0_20px_rgba(255,215,0,0.3),inset_0_0_10px_rgba(255,255,255,0.1)] relative flex flex-col p-6 overflow-hidden flex-1 w-full relative">

        <div class="absolute inset-0 bg-gradient-to-br from-accent-purple/0 via-amber-500/0 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        <div class="flex flex-col border-b border-gold/20 pb-2 mb-4 relative z-10">
            <h2 class="text-lg font-serif text-gold tracking-wider drop-shadow-[0_0_5px_rgba(255,215,0,0.5)]">Ngũ Hành Hôm Nay</h2>
            <div v-if="elementData" class="text-xs text-gold/80 mt-1">Bản mệnh: <span class="text-amber-300 font-bold">{{ elementData.napAm }}</span> ({{ elementData.canChi }})</div>
        </div>

        <div class="flex-1 flex flex-col justify-center space-y-4 relative z-10">
            <div v-for="bar in chartBars" :key="bar.name" class="flex items-center space-x-3 text-xs">
                <div class="w-16 flex justify-between items-center px-1.5 py-0.5 rounded bg-black/30 border border-gold/20">
                   <span class="text-[10px] opacity-80" v-html="bar.icon"></span>
                   <span class="text-gold-light/90 font-semibold uppercase tracking-widest drop-shadow-[0_0_5px_rgba(255,215,0,0.5)]">{{ bar.name }}</span>
                </div>
                <div class="flex-1 h-2 bg-black/40 rounded-full overflow-hidden" :class="`border border-${bar.color}-500/30`">
                    <div class="h-full rounded-full transition-all duration-1000 ease-out shimmer-bar"
                         :class="bar.gradient"
                         :style="`width: ${bar.percentage}%; box-shadow: 0 0 10px ${bar.glow}`">
                    </div>
                </div>
                <span class="w-8 text-right font-bold drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]" :class="`text-${bar.color}-300`">{{ bar.percentage }}%</span>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useDailyEnergy } from '@/composables/useDailyEnergy';

const authStore = useAuthStore();
const { baseEnergy } = useDailyEnergy();

const elementData = computed(() => {
    if (authStore.user?.elements) {
        try {
            return JSON.parse(authStore.user.elements);
        } catch { return null; }
    }
    return null;
});

const chartBars = computed(() => {
    const energies = baseEnergy.value;
    return [
        { name: 'Kim', icon: '&#9876;', percentage: energies[0], color: 'yellow', gradient: 'bg-gradient-to-r from-accent-purple via-yellow-200 to-amber-500', glow: 'rgba(255,215,0,0.8)' },
        { name: 'Mộc', icon: '&#127807;', percentage: energies[1], color: 'green', gradient: 'bg-gradient-to-r from-green-600 via-green-300 to-green-600', glow: 'rgba(34,197,94,0.8)' },
        { name: 'Thủy', icon: '&#128167;', percentage: energies[3], color: 'blue', gradient: 'bg-gradient-to-r from-blue-600 via-blue-300 to-blue-600', glow: 'rgba(59,130,246,0.8)' },
        { name: 'Hỏa', icon: '&#128293;', percentage: energies[2], color: 'red', gradient: 'bg-gradient-to-r from-red-600 via-red-300 to-red-600', glow: 'rgba(239,68,68,0.8)' },
        { name: 'Thổ', icon: '&#9650;', percentage: energies[4], color: 'orange', gradient: 'bg-gradient-to-r from-[#d97706] via-[#fbbf24] to-[#d97706]', glow: 'rgba(245,158,11,0.8)' }
    ];
});
</script>

<style scoped>
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.shimmer-bar {
  background-size: 200% 100%;
  animation: shimmer 3s infinite linear;
}
</style>