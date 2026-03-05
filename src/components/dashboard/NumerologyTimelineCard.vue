<template>
    <div class="animated-border-card group cursor-pointer h-full">
        <div class="inner-card-content !border-[#FCD34D]/30 !bg-[#1A1A0F]/60 !shadow-[0_0_20px_rgba(252,211,77,0.1)] relative flex flex-col p-6 overflow-hidden h-full">

            <h2 class="text-xl font-serif text-[#FCD34D] tracking-wider mb-2 drop-shadow-md">
                Chu Kỳ Thần Số Học
            </h2>
            <p class="text-white/50 text-xs mb-4">Năm, Tháng & Ngày Cá Nhân</p>

            <div class="flex-1 flex flex-col justify-center space-y-5 relative z-10 w-full mt-2">


                <div class="flex items-center gap-6">
                    <div class="w-16 h-16 rounded-full bg-gradient-to-br from-[#FCD34D] to-[#D97706] flex items-center justify-center shadow-[0_0_20px_rgba(252,211,77,0.4)]">
                        <span class="text-3xl font-serif font-black text-[#1A1A0F]">{{ cycles.personalYear }}</span>
                    </div>
                    <div>
                        <div class="text-white/60 text-xs uppercase tracking-wider font-bold mb-1">Năm Cá Nhân Hiện Tại</div>
                        <div class="text-[#FCD34D] font-medium text-sm leading-tight">
                            Năm của sự Gieo Hạt và Khởi đầu mới. Khởi tạo dự án, thiết lập mục tiêu 9 năm tới.
                        </div>
                    </div>
                </div>


                <div class="relative pt-6 pb-2">
                    <div class="absolute top-[34px] left-0 w-full h-1 bg-white/10 rounded-full"></div>
                    <div class="absolute top-[34px] left-0 w-[55%] h-1 bg-gradient-to-r from-transparent via-[#FCD34D] to-[#FCD34D] rounded-full shadow-[0_0_10px_rgba(252,211,77,0.8)]"></div>

                    <div class="flex justify-between relative z-10">
                        <div class="flex flex-col items-center">
                            <span class="text-[10px] text-white/40 mb-2">Tháng Trước</span>
                            <div class="w-3 h-3 rounded-full bg-[#D97706] mb-1"></div>
                            <span class="text-xs text-white/70 font-bold border border-white/10 px-2 py-0.5 rounded bg-black/50">{{ prevMonthNum }}</span>
                        </div>
                        <div class="flex flex-col items-center -mt-2">
                            <span class="text-xs text-[#FCD34D] font-bold mb-1">Tháng Này</span>
                            <div class="w-5 h-5 rounded-full bg-[#FCD34D] shadow-[0_0_10px_rgba(252,211,77,0.8)] border-2 border-white mb-1"></div>
                            <span class="text-sm text-black font-black px-3 py-0.5 rounded bg-[#FCD34D]">{{ cycles.personalMonth }}</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <span class="text-[10px] text-white/40 mb-2">Tháng Sau</span>
                            <div class="w-3 h-3 rounded-full bg-white/20 mb-1"></div>
                            <span class="text-xs text-white/50 font-bold border border-white/10 px-2 py-0.5 rounded bg-black/50">{{ nextMonthNum }}</span>
                        </div>
                    </div>
                </div>


                <div class="bg-black/40 rounded-xl p-3 border border-[#FCD34D]/20">
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-xs text-white/50">Ngày Cá Nhân (Hôm Nay)</span>
                        <span class="text-[#FCD34D] font-bold text-lg">{{ cycles.personalDay }}</span>
                    </div>
                    <p class="text-white/70 text-xs italic">
                        Hãy ra ngoài, gặp gỡ, giao tiếp và đón nhận những ý tưởng bất chợt. Đừng giới hạn bản thân trong khuôn khổ hôm nay.
                    </p>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { getNumerologyCycles } from '@/utils/spiritualCalc';

const authStore = useAuthStore();

const cycles = computed(() => {
    return getNumerologyCycles(authStore.user?.dateOfBirth);
});


const prevMonthNum = computed(() => cycles.value.personalMonth === 1 ? 9 : cycles.value.personalMonth - 1);
const nextMonthNum = computed(() => cycles.value.personalMonth === 9 ? 1 : cycles.value.personalMonth + 1);
</script>