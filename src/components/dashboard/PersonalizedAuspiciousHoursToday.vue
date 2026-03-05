<template>
  <DashboardCard title="Giờ Hoàng Đạo Cá Nhân" contentClass="p-2 overflow-hidden min-h-[520px]">


    <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
    <div class="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/5 rounded-full blur-[80px] pointer-events-none"></div>
    <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px] pointer-events-none"></div>


    <div class="relative flex-1 flex flex-col items-center justify-center py-6 mt-2">
      <div class="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">


        <div class="absolute inset-x-[-8%] inset-y-[-8%] border border-gold/10 rounded-full animate-spin-slow"></div>
        <div class="absolute inset-0 border-2 border-gold/20 rounded-full shadow-[0_0_20px_rgba(255,184,0,0.05)]"></div>


        <div v-for="i in 24" :key="'mark-'+i"
             class="absolute w-full h-full flex justify-center py-1.5"
             :style="{ transform: `rotate(${(i-1) * 15}deg)` }">
          <div :class="[
            'w-0.5 rounded-full',
            (i-1) % 2 === 0 ? 'h-2.5 bg-gold/40' : 'h-1.5 bg-gold/20'
          ]"></div>
        </div>


        <div v-for="(hour, idx) in zodiacHoursDisplay" :key="hour.name"
             class="absolute w-full h-full flex flex-col items-center pt-5"
             :style="{ transform: `rotate(${calculateRotation(idx)}deg)` }">
          <div class="flex flex-col items-center transition-all duration-300"
               :style="{ transform: `rotate(${-calculateRotation(idx)}deg)` }"
               :class="[
                 isCurrentHour(idx) ? 'scale-125' : 'scale-100',
                 isAuspicious(idx) ? 'text-gold drop-shadow-[0_0_5px_rgba(255,184,0,0.6)]' : 'text-white/30'
               ]">
            <span class="text-[10px] md:text-xs font-serif font-bold uppercase tracking-tighter">{{ hour.name }}</span>
            <span class="text-[7px] md:text-[8px] opacity-60 font-mono">{{ hour.timeRange }}</span>
            <div v-if="isAuspicious(idx)" class="w-1 h-1 bg-gold rounded-full mt-0.5 animate-pulse shadow-[0_0_5px_gold]"></div>
            <div v-else class="mt-0.5">
               <svg class="w-1.5 h-1.5 text-red-500/40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L1 21h22L12 2zm0 3.45L20.1 19H3.9L12 5.45zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z"/>
               </svg>
            </div>
          </div>
        </div>


        <div class="absolute w-12 h-12 md:w-16 md:h-16 rounded-full bg-gold/5 blur-xl animate-pulse-slow"></div>


        <div class="absolute w-full h-full flex justify-center items-center pointer-events-none"
             :style="{ transform: `rotate(${clockHandRotation}deg)` }">
          <div class="w-1 h-[42%] bg-gradient-to-t from-gold/70 to-transparent rounded-full relative">
             <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-gold rounded-full border border-white/20 shadow-[0_0_8px_gold]"></div>
          </div>
        </div>
        <div class="absolute w-3.5 h-3.5 bg-gold rounded-full border-2 border-black/40 z-10 shadow-[0_0_8px_rgba(255,184,0,0.8)]"></div>
      </div>


      <div class="mt-8 text-center bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
        <p class="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gold-light/60">
          Hiện tại: <span class="text-gold font-bold">{{ currentClockTime }}</span> – {{ currentHourStatus }}
        </p>
      </div>
    </div>


    <div class="mt-8 grid grid-cols-3 gap-2 relative z-10 px-2 flex justify-center items-end">
      <div v-for="(h, i) in top3Hours" :key="h.name"
           class="flex flex-col items-center group/gem"
           v-tooltip="h.reasons.join(', ')">

        <div class="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center mb-2 transition-transform duration-500 group-hover/gem:scale-110">
          <div class="relative z-10 w-full h-full p-1">
             <img :src="i === 0 ? 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772421706/ChatGPT_Image_10_20_34_2_thg_3_2026_dydzv6.png' :
                        i === 1 ? 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772421706/ChatGPT_Image_10_20_31_2_thg_3_2026_iyfk27.png' :
                        'https://res.cloudinary.com/drac9ko3l/image/upload/v1772421706/ChatGPT_Image_10_20_25_2_thg_3_2026_bqpnrz.png'"
                  alt="Gem"
                  class="w-full h-full object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
                  loading="lazy" />
          </div>
        </div>

        <span class="text-[10px] md:text-sm text-gold font-serif font-bold uppercase tracking-widest">Giờ {{ h.name }}</span>
        <span class="text-[8px] md:text-[10px] text-white/40 font-mono">{{ h.timeRange }}</span>
      </div>
    </div>


    <template #footer>
      <div class="w-full py-4 px-6 md:px-10 flex flex-col items-center">
        <div class="h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-4"></div>
        <p class="text-[10px] md:text-xs leading-relaxed text-gold-light/80 italic text-center max-w-sm">
          "Hôm nay giờ <span class="text-white font-bold">{{ topHour.name }}</span> hợp mệnh <span class="text-white">{{ userElement }}</span> nhất. Năng lượng <span class="text-white">{{ dominantEnergyName }}</span> cao ({{ dominantEnergyVal }}%). Hãy ưu tiên <span class="text-white font-semibold underline decoration-gold/30">{{ topHour.action }}</span>."
        </p>
      </div>
    </template>


    <template #info>
      <div class="space-y-6 text-white/80 leading-relaxed font-sans pb-4">
        <section>
          <h3 class="text-gold font-serif text-lg mb-2 flex items-center gap-2">
            <span class="w-1.5 h-1.5 rotate-45 bg-gold shadow-[0_0_8px_gold]"></span>
            Tại sao giờ của mỗi người lại khác nhau?
          </h3>
          <p class="text-sm">
            Hệ thống <b>Tinh hoa Huyền Mệnh</b> không chỉ dựa trên giờ hoàng đạo chung từ lịch vạn niên. Kết quả của bạn được bảo chứng qua 5 lớp thuật toán cổ học để tìm ra thời điểm năng lượng của bạn và vũ trụ hòa hợp nhất.
          </p>
        </section>

        <section class="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
          <div class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center text-xs flex-shrink-0 font-bold border border-gold/40">1</div>
            <div>
              <p class="text-sm font-semibold text-gold-light">Giờ Hoàng Đạo Cố Định</p>
              <p class="text-[11px] opacity-70">Xác định các khung giờ Cát/Hung theo Can Chi của ngày hiện tại (phần kiến thức chung).</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center text-xs flex-shrink-0 font-bold border border-gold/40">2</div>
            <div>
              <p class="text-sm font-semibold text-gold-light">Độ Hợp Mệnh Ngũ Hành</p>
              <p class="text-[11px] opacity-70">Giờ sẽ được cộng điểm mạnh nếu tương sinh với mệnh của bạn (Ví dụ: Thủy hợp giờ Tý, Thân).</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center text-xs flex-shrink-0 font-bold border border-gold/40">3</div>
            <div>
              <p class="text-sm font-semibold text-gold-light">Tương Quan Ngũ Hành Ngày</p>
              <p class="text-[11px] opacity-70">Sử dụng Số Cá Nhân (Personal Day Number) để đối soát xem ngày hôm nay thúc đẩy hay cản trở mệnh của bạn.</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center text-xs flex-shrink-0 font-bold border border-gold/40">4</div>
            <div>
              <p class="text-sm font-semibold text-gold-light">Biến Thiên Năng Lượng Cá Nhân</p>
              <p class="text-[11px] opacity-70">Phân tích 5 chỉ số năng lượng (Hành động, Tập trung, Cảm xúc...) để ưu tiên giờ phù hợp với trạng thái thực tế.</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center text-xs flex-shrink-0 font-bold border border-gold/40">5</div>
            <div>
              <p class="text-sm font-semibold text-gold-light">Gợi Ý Hành Động "Vàng"</p>
              <p class="text-[11px] opacity-70">Tự động đề xuất việc nên làm (Hành động/Học tập/Nghỉ ngơi) để tối ưu hiệu suất sống.</p>
            </div>
          </div>
        </section>

        <p class="text-[11px] italic text-center text-gold/60">
          "Năng lượng không tự sinh ra hay mất đi, nó chỉ chuyển từ vũ trụ vào hành động của bạn tại đúng thời điểm vàng."
        </p>
      </div>
    </template>
  </DashboardCard>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { getScoredHours } from '@/utils/lunarCalc';
import DashboardCard from '@/components/common/DashboardCard.vue';

const authStore = useAuthStore();
const now = ref(new Date());
let timer;

const ZODIAC_HOURS = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

const userProfile = computed(() => {
  return {
    id: authStore.user?.id,
    fullName: authStore.user?.fullName,
    elements: authStore.user?.elements
  };
});


const dailyEnergy = computed(() => {
  const energy = authStore.user?.dailyEnergy || {};
  return {
    actionReadiness: energy.actionReadiness || 72,
    focusLevel: energy.focusLevel || 65,
    emotionalBalance: energy.emotionalBalance || 80,
    personalDayNumber: energy.personalDayNumber || 1
  };
});

const scoredHoursList = computed(() => {
  return getScoredHours(now.value, userProfile.value, dailyEnergy.value);
});

const zodiacHoursDisplay = computed(() => {

  return ZODIAC_HOURS.map(name => {
    return scoredHoursList.value.find(h => h.name === name);
  });
});

const top3Hours = computed(() => {
  const hours = [...scoredHoursList.value];


  const findBest = (filterFn) => {
    return hours.filter(filterFn).sort((a, b) => b.score - a.score)[0] || hours[0];
  };

  const actionHours = ['Thân', 'Dần', 'Ngọ', 'Thìn'];
  const peaceHours = ['Tý', 'Hợi', 'Sửu', 'Mùi'];
  const socialHours = ['Dậu', 'Mão', 'Tỵ', 'Tuất'];

  const bestAction = findBest(h => actionHours.includes(h.name));
  const bestPeace = findBest(h => peaceHours.includes(h.name));
  const bestSocial = findBest(h => socialHours.includes(h.name));


  return [bestAction, bestPeace, bestSocial];
});

const topHour = computed(() => top3Hours.value[0]);

const userElement = computed(() => userProfile.value.element);

const dominantEnergyName = computed(() => {
  const e = dailyEnergy.value;
  if (e.actionReadiness >= e.focusLevel && e.actionReadiness >= e.emotionalBalance) return 'Hành động';
  if (e.focusLevel >= e.actionReadiness && e.focusLevel >= e.emotionalBalance) return 'Tập trung';
  return 'Cân bằng';
});

const dominantEnergyVal = computed(() => {
  const e = dailyEnergy.value;
  return Math.max(e.actionReadiness, e.focusLevel, e.emotionalBalance);
});

const currentClockTime = computed(() => {
  return now.value.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
});

const currentHourIndex = computed(() => {
  const h = now.value.getHours();
  return Math.floor(((h + 1) % 24) / 2);
});

const currentHourStatus = computed(() => {
  const h = zodiacHoursDisplay.value[currentHourIndex.value];
  if (h.isAuspicious && h.score > 12) return 'giờ đại cát';
  if (h.isAuspicious) return 'giờ hoàng đạo';
  return 'giờ bình hòa';
});

const clockHandRotation = computed(() => {
  const h = now.value.getHours();
  const m = now.value.getMinutes();
  const s = now.value.getSeconds();




  return ((h + m/60 + s/3600) / 24) * 360;
});

const calculateRotation = (idx) => {


  return idx * 30;
};

const isCurrentHour = (idx) => idx === currentHourIndex.value;
const isAuspicious = (idx) => zodiacHoursDisplay.value[idx]?.isAuspicious;

function extractUserElement(elements) {
  try {
    const el = typeof elements === 'string' ? JSON.parse(elements) : elements;
    return el?.nguHanh || 'Thủy';
  } catch {
    return 'Thủy';
  }
}

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
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

.animate-pulse-slow {
  animation: pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.1; filter: blur(20px); }
  50% { opacity: 0.3; filter: blur(40px); }
}


[v-tooltip] {
  position: relative;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-bling {
  animation: bling 2s ease-in-out infinite;
}

@keyframes bling {
  0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
  50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
}

.animate-shimmer {
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-150%) skewX(-20deg); }
  100% { transform: translateX(150%) skewX(-20deg); }
}
</style>