<template>
  <DashboardCard title="Chu kỳ cảm xúc tuần này" contentClass="p-0 overflow-hidden min-h-[480px]">


    <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
    <div class="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/5 rounded-full blur-[80px] pointer-events-none"></div>
    <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px] pointer-events-none"></div>


    <div class="relative z-10 h-full flex flex-col items-center justify-between p-6">

      <p class="text-[10px] uppercase tracking-[0.3em] text-gold-light/60 -mt-2 mb-4">
        - Ảnh hưởng Mặt Trăng -
      </p>


      <div class="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center my-2 md:my-0 group">

        <div class="absolute inset-4 rounded-full bg-white/20 blur-[60px] animate-moon-pulse pointer-events-none"></div>
        <div class="absolute inset-10 rounded-full bg-blue-400/10 blur-[80px] animate-moon-pulse [animation-delay:2s] pointer-events-none"></div>


        <div class="absolute inset-[-8%] border border-white/10 rounded-full animate-spin-slow"></div>
        <div class="absolute inset-[-12%] border border-white/5 border-dashed rounded-full animate-spin-slow [animation-direction:reverse]"></div>


        <div class="relative z-10 w-full h-full p-0">
          <img :src="moonDetails.image"
               :alt="moonDetails.name"
               class="w-full h-full object-contain filter drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-1000 group-hover:scale-105 group-hover:drop-shadow-[0_0_60px_rgba(255,255,255,0.6)]"
               loading="lazy" />
        </div>
      </div>


      <div class="w-full space-y-4 px-2">
        <div class="text-center">
          <p class="font-serif text-lg md:text-xl text-white tracking-wide">
            Tuần này: <span class="text-gold-light italic">{{ Math.round(moonDetails.progress * 100) }}%</span> chu kỳ
          </p>
          <p class="text-xs text-white/70 font-light mt-1 capitalize">
            đang {{ moonDetails.name.toLowerCase() }}
          </p>
        </div>


        <div class="relative h-2.5 w-full bg-white/5 rounded-full border border-white/10 overflow-hidden">
          <div class="absolute inset-y-0 left-0 bg-gradient-animated rounded-full transition-all duration-1000 ease-out"
               :style="{ width: `${moonDetails.progress * 100}%` }">

            <div class="absolute inset-0 bg-white/10 animate-shimmer"></div>
          </div>

          <div class="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-1000 ease-out flex items-center justify-center z-20"
               :style="{ left: `calc(${moonDetails.progress * 100}% - 8px)` }">
            <div class="w-full h-full relative overflow-hidden rounded-full bg-black/90">
                <div class="absolute inset-0 bg-white shadow-[0_0_5px_white]" :style="{ transform: `translateX(${(1 - moonDetails.progress * 2) * 50}%)` }"></div>
            </div>
          </div>
        </div>
      </div>


      <div class="w-full mt-6 space-y-3 bg-white/5 border border-white/10 rounded-2xl p-4 transition-all hover:bg-white/10">
        <div class="flex items-center gap-2 mb-1">
           <span class="text-gold text-lg">🌙</span>
           <span class="text-xs uppercase tracking-widest text-gold-light font-bold">Cảm xúc tuần</span>
        </div>
        <p class="text-sm text-white font-medium leading-tight">
          {{ moonDetails.emotion }}
        </p>
        <p class="text-[11px] md:text-xs text-white/50 italic leading-relaxed">
          Gợi ý: {{ moonDetails.tip }}
        </p>
      </div>
    </div>


    <template #footer>
      <div class="w-full py-4 px-6 flex flex-col items-center">
        <p class="text-[9px] text-white/20 mt-3 uppercase tracking-tighter">
          ● Liên kết với Emotional Balance hôm nay ({{ emotionalBalance }}%) ●
        </p>
      </div>
    </template>


    <template #info>
      <div class="space-y-4 text-white/80 text-sm leading-relaxed font-sans">
        <h3 class="text-gold font-serif text-lg">Mặt Trăng & Thế giới nội tâm</h3>
        <p>
          Trong Huyền học phương Tây, Mặt Trăng chi phối cảm xúc, tiềm thức và những nhịp điệu sinh học ẩn sâu trong mỗi con người. Chu kỳ 29.5 ngày của Trăng phản chiếu chính xác những thăng trầm trong tâm hồn bạn.
        </p>
        <ul class="space-y-3 mt-4">
          <li class="flex gap-2">
            <span class="text-gold">●</span>
            <span><b>Trăng Tròn (Full Moon):</b> Đỉnh điểm của năng lượng và cảm xúc. Dễ thăng hoa nhưng cũng dễ bùng nổ.</span>
          </li>
          <li class="flex gap-2">
            <span class="text-gold">●</span>
            <span><b>Trăng Non (New Moon):</b> Thời điểm của sự tĩnh lặng, gieo mầm cho những dự định mới.</span>
          </li>
          <li class="flex gap-2">
            <span class="text-gold">●</span>
            <span><b>Trăng Khuyết (Waning):</b> Giai đoạn của sự thanh lọc, buông bỏ và đánh giá lại nội tâm.</span>
          </li>
        </ul>
        <p class="text-xs italic mt-4 text-white/50 border-l-2 border-gold/40 pl-3">
          "Hiểu được nhịp điệu của Trăng là hiểu được dòng chảy cảm xúc của chính mình."
        </p>
      </div>
    </template>
  </DashboardCard>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { getMoonPhaseDetails } from '@/utils/moonPhase';
import DashboardCard from '@/components/common/DashboardCard.vue';

const authStore = useAuthStore();

const moonDetails = computed(() => {
  return getMoonPhaseDetails(new Date());
});

const emotionalBalance = computed(() => {
  return authStore.user?.dailyEnergy?.emotionalBalance || 68;
});
</script>

<style scoped>
.animate-spin-slow {
  animation: spin 60s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-moon-pulse {
  animation: moon-pulse 4s ease-in-out infinite;
}

@keyframes moon-pulse {
  0%, 100% { opacity: 0.1; transform: scale(1); filter: blur(40px); }
  50% { opacity: 0.25; transform: scale(1.1); filter: blur(60px); }
}

.bg-gradient-animated {
  background: linear-gradient(90deg, #06b6d4, #8b5cf6, #4f46e5, #06b6d4);
  background-size: 200% 100%;
  animation: gradient-move 5s linear infinite;
}

@keyframes gradient-move {
  0% { background-position: 100% 0%; }
  100% { background-position: -100% 0%; }
}

.animate-shimmer {
  animation: shimmer 3s linear infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-150%) skewX(-20deg); }
  100% { transform: translateX(150%) skewX(-20deg); }
}
</style>