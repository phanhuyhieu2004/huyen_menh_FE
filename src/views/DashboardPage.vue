<template>
    <div class="h-full flex flex-col p-6 animate-fade-in relative z-10 w-full max-w-7xl mx-auto space-y-6">


        <header class="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h1 class="text-2xl md:text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold-dark font-bold tracking-tight">
                    Chào {{ authStore.user?.fullName }},
                </h1>
                <p class="text-white/40 text-xs uppercase tracking-[0.3em] font-serif mt-2">
                    <span v-if="zodiacInfo.name">Cung {{ zodiacInfo.name }}</span>
                    <span v-if="authStore.user?.canChi"> • Tuổi {{ authStore.user?.canChi }}</span>
                </p>
                <p class="text-gold/40 italic text-[11px] mt-2 tracking-wide uppercase">
                    Bản đồ tâm linh ngày <span class="text-gold/60 font-semibold">{{ currentDayStr }}</span> dựa trên ngày sinh của bạn.
                </p>
            </div>
            <div class="flex items-center space-x-2 text-sm text-white/50 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <i class="fi fi-rr-clock-three"></i>
                <span class="font-mono">{{ currentTime }}</span>
            </div>
        </header>


        <div class="flex-1 w-full relative grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-max items-start mt-6">


            <div class="w-full h-full lg:col-span-1 flex flex-col items-center">
                <DailyEnergyMapCard />
            </div>

            <div class="w-full h-full lg:col-span-1 flex flex-col items-center">
                <DailyHarmonyCard />
            </div>


            <div class="w-full h-full lg:col-span-1 flex flex-col items-center">
                <DailySupportCard />
            </div>


            <div class="w-full h-full lg:col-span-1 flex flex-col items-center">
                <PersonalizedAuspiciousHoursToday />
            </div>


            <div class="w-full h-full lg:col-span-1 flex flex-col items-center">
                <WeeklyMoonPhaseEmotionInfluence />
            </div>

        </div>
    </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { getZodiacSign } from '@/utils/spiritualCalc';


import { defineAsyncComponent } from 'vue';

const DailyEnergyMapCard = defineAsyncComponent(() => import('@/components/dashboard/DailyEnergyMapCard.vue'));
const DailyHarmonyCard = defineAsyncComponent(() => import('@/components/dashboard/DailyHarmonyCard.vue'));
const DailySupportCard = defineAsyncComponent(() => import('@/components/dashboard/DailySupportCard.vue'));
const PersonalizedAuspiciousHoursToday = defineAsyncComponent(() => import('@/components/dashboard/PersonalizedAuspiciousHoursToday.vue'));
const WeeklyMoonPhaseEmotionInfluence = defineAsyncComponent(() => import('@/components/dashboard/WeeklyMoonPhaseEmotionInfluence.vue'));

const authStore = useAuthStore();


const zodiacInfo = computed(() => {
    if (!authStore.user?.dob) return {};
    const dob = new Date(authStore.user.dob);
    return getZodiacSign(dob.getDate(), dob.getMonth() + 1);
});

const currentDayStr = computed(() => {
    return new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
});

const currentTime = ref('');
let timeInterval;

onMounted(() => {
    updateTime();
    timeInterval = setInterval(updateTime, 1000);
});

onUnmounted(() => {
    clearInterval(timeInterval);
});

function updateTime() {
    currentTime.value = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
</script>