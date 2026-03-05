<template>
    <div class="animated-border-card group cursor-pointer h-full">
        <div class="inner-card-content !border-[#4ADE80]/30 !bg-[#1A2E1A]/40 !shadow-[0_0_20px_rgba(74,222,128,0.1)] relative flex flex-col p-6 overflow-hidden h-full">

            <h2 class="text-xl font-serif text-[#4ADE80] tracking-wider mb-4 drop-shadow-md">
                Giờ Hoàng Đạo & Cát Hung
            </h2>

            <div class="flex-1 flex flex-col justify-center space-y-4 relative z-10">

                <div class="bg-black/30 rounded-xl p-4 border border-white/5 flex items-center justify-between">
                    <div>
                        <div class="text-sm text-white/50 mb-1">Thời gian hiện tại</div>
                        <div class="text-2xl font-mono text-white font-bold">{{ currentTimeStr }}</div>
                    </div>
                    <div class="text-right">
                        <div class="text-sm text-white/50 mb-1">Giờ Âm Lịch</div>
                        <div class="text-xl font-serif text-[#4ADE80] font-bold">{{ currentZodiacHour }}</div>
                    </div>
                </div>

                <div class="bg-gradient-to-r from-[#4ADE80]/10 to-transparent p-4 rounded-xl border-l-2 border-[#4ADE80]">
                    <h3 class="text-white font-medium mb-1">Đánh giá chung:</h3>
                    <p class="text-white/80 text-sm">
                        <span v-if="isGoodHour" class="text-gold font-bold">★ GIỜ HOÀNG ĐẠO (TỐT)</span>
                        <span v-else class="text-accent-red font-bold">⚠ GIỜ HẮC ĐẠO (XẤU)</span>
                    </p>
                    <p class="text-white/60 text-xs mt-2 italic">
                        {{ hourlyAdvice }}
                    </p>
                </div>

                <div class="grid grid-cols-6 gap-2 mt-4">
                    <div v-for="(hour, i) in 12" :key="i"
                         class="h-8 rounded-md flex items-center justify-center text-xs font-mono font-bold transition-all"
                         :class="[
                            currentHourIndex === i ? 'ring-2 ring-white scale-110 z-10' : 'opacity-60',
                            isHourGood(i) ? 'bg-[#4ADE80]/20 text-[#4ADE80] border border-[#4ADE80]/30' : 'bg-black/40 text-white/40 border border-white/5'
                         ]"
                         :title="getZodiacName(i) + (isHourGood(i) ? ' (Hoàng Đạo)' : ' (Hắc Đạo)')"
                    >
                        {{ (i * 2 + 23) % 24 }}-{{ (i * 2 + 1) % 24 }}
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';


const ZODIAC_HOURS = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];


const isHourGood = (index) => [0, 1, 4, 6, 9, 10].includes(index);
const getZodiacName = (index) => ZODIAC_HOURS[index];

const now = ref(new Date());
let timer;

onMounted(() => {
    timer = setInterval(() => {
        now.value = new Date();
    }, 1000);
});
onUnmounted(() => clearInterval(timer));

const currentTimeStr = computed(() => {
    return now.value.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
});


const currentHourIndex = computed(() => {
    const h = now.value.getHours();
    return Math.floor((h + 1) % 24 / 2);
});

const currentZodiacHour = computed(() => ZODIAC_HOURS[currentHourIndex.value]);
const isGoodHour = computed(() => isHourGood(currentHourIndex.value));

const hourlyAdvice = computed(() => {
    if (isGoodHour.value) return "Khí vượng, thích hợp để tiến hành các công việc quan trọng, xuất hành, đàm phán.";
    return "Khí suy, nên tĩnh dưỡng, làm việc thường ngày, tránh ra quyết định lớn.";
});
</script>