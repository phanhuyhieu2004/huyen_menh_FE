<template>
    <div class="animated-border-card group cursor-pointer w-full h-full">
        <div class="inner-card-content !border-gold/40 !bg-white/5 !shadow-[0_0_20px_rgba(255,215,0,0.3),inset_0_0_10px_rgba(255,255,255,0.1)] relative flex flex-col overflow-hidden p-6 flex-1 w-full relative">

        <div class="absolute inset-0 bg-gradient-to-tr from-accent-purple/0 via-amber-500/0 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>


        <div class="absolute top-0 right-0 w-32 h-32 bg-cyan-700/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>

        <h2 class="text-center text-lg font-serif text-gold tracking-wider mb-6 border-b border-gold/20 pb-2 relative z-10">
            Lịch Phong Thủy - {{ displayMonth }}
        </h2>

        <div class="flex-1 flex flex-col justify-between">

            <div class="flex justify-between items-center text-gold-light/80 mb-4 px-2 text-sm font-serif">
                <button class="hover:text-gold transition-colors p-1" @click="changeMonth(-1)">&lt;</button>
                <div class="grid grid-cols-7 w-full text-center tracking-widest text-[10px] sm:text-xs">
                    <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>CN</span>
                </div>
                <button class="hover:text-gold transition-colors p-1" @click="changeMonth(1)">&gt;</button>
            </div>


            <div class="grid grid-cols-7 gap-y-2 gap-x-1 sm:gap-x-2 text-center text-xs sm:text-sm text-gray-400 mb-6">
                <div v-for="(day, idx) in calendarDays" :key="idx"
                     :class="[
                         'flex items-center justify-center mx-auto rounded-full w-7 h-7 sm:w-8 sm:h-8 transition-colors cursor-pointer',
                         !day.date ? 'opacity-0 cursor-default' : '',
                         day.isToday ? 'text-gold bg-gradient-to-br from-amber-400/20 to-amber-600/40 font-bold shadow-[0_0_15px_#ffd700] animate-pulse border border-gold' : 'text-gold-light hover:text-white hover:bg-white/10'
                     ]">
                     {{ day.date || '.' }}
                </div>
            </div>

            <div class="relative z-10 mt-4">
                <button class="w-full py-3 bg-gradient-to-r from-[rgba(88,28,135,0.8)] to-[rgba(217,119,6,0.8)] border border-gold/50 rounded-xl text-primary font-serif tracking-widest uppercase transition-all duration-300 ease-in-out hover:scale-[1.05] hover:shadow-[0_0_15px_#ffd700] relative z-10">
                    GỢI Ý HÀNH ĐỘNG
                </button>
                <p class="mt-4 text-[11px] sm:text-xs text-center text-gold-light/70 italic leading-relaxed">
                    {{ actionSuggestion }}
                </p>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useDailyEnergy } from '@/composables/useDailyEnergy';

const { userElement } = useDailyEnergy();

const displayDate = ref(new Date());

const displayMonth = computed(() => {
    return 'Tháng ' + (displayDate.value.getMonth() + 1) + '/' + displayDate.value.getFullYear();
});

const changeMonth = (offset) => {
    const newDate = new Date(displayDate.value);
    newDate.setMonth(newDate.getMonth() + offset);
    displayDate.value = newDate;
};

const calendarDays = computed(() => {
    const year = displayDate.value.getFullYear();
    const month = displayDate.value.getMonth();
    const todayStr = new Date().toDateString();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    const arr = [];
    for(let i = 0; i < startOffset; i++) {
        arr.push({ date: null });
    }
    for(let i = 1; i <= daysInMonth; i++) {
        const d = new Date(year, month, i);
        arr.push({ date: i, isToday: d.toDateString() === todayStr });
    }
    return arr;
});

const actionSuggestion = computed(() => {
    const el = userElement.value;
    if(el === 'Kim') return 'Hôm nay thích hợp để ra quyết định sắt đá. Nội tâm kiên định cắt đứt những vướng bận.';
    if(el === 'Mộc') return 'Ngày tốt để gieo hạt giống ý tưởng mới. Sự kiên nhẫn sẽ mang lại mầm xanh hi vọng.';
    if(el === 'Hỏa') return 'Ngọn lửa trí tuệ đang bùng cháy. Làm việc bằng đam mê, nhưng tránh nóng giận bốc đồng.';
    if(el === 'Thủy') return 'Hãy mềm mại và thích nghi như dòng nước. Lắng nghe trực giác đang vỗ nhịp trong tim.';
    if(el === 'Thổ') return 'Sự ổn định là chìa khóa hôm nay. Chậm lại và vun đắp nền tảng gia đình, sức khỏe vững chắc.';
    return 'Hôm nay thích hợp để gieo quẻ. Tìm kiếm sự tư vấn từ nội tâm của bạn.';
});
</script>