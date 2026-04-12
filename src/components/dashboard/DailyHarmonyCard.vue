<template>
    <DashboardCard title="Quan Hệ Sinh – Khắc Hôm Nay" contentClass="w-full h-full flex flex-col items-center justify-between overflow-hidden">


        <div class="absolute inset-0 bg-cover bg-center opacity-40 z-0 pointer-events-none mix-blend-screen" :style="{ backgroundImage: `url(${getBackgroundImage()})`}"></div>

        <div class="relative w-full flex-1 flex flex-col items-center mt-2 z-10">

            <div v-if="energyData" class="flex flex-col items-center w-full h-full justify-between">


                <div class="relative w-[220px] h-[220px] md:w-[260px] md:h-[260px] flex items-center justify-center -mt-2">

                    <div class="absolute inset-x-4 inset-y-12 bg-white rounded-[100%] blur-[40px] opacity-20 pointer-events-none" :class="getGlowClass()"></div>

                    <img :src="getMainImageUrl()"
                         class="w-full h-full object-contain filter drop-shadow-2xl animate-[pulse_3s_ease-in-out_infinite]"
                         :class="getImageFilterClass()" 
                         loading="lazy" />
                </div>


                <div class="text-center w-full px-4 flex flex-col items-center">


                    <div class="flex items-center justify-center gap-4 mb-4">
                        <div class="flex items-center gap-2 border border-white/20 bg-black/40 backdrop-blur-sm rounded-full pr-3 pl-1 py-1" :class="getLabelGlowClass(energyData.dailyElement)">
                            <img :src="getStoneUrl(energyData.dailyElement)" class="w-6 h-6 object-contain" loading="lazy" />
                            <span class="text-[11px] md:text-xs font-bold uppercase" :class="getTextColorClass(energyData.dailyElement)">Ngày {{ energyData.dailyElement }}</span>
                        </div>
                        <i class="fi fi-rr-angle-double-right text-white/40 text-xs"></i>
                        <div class="flex items-center gap-2 border border-white/20 bg-black/40 backdrop-blur-sm rounded-full pr-3 pl-1 py-1" :class="getLabelGlowClass(energyData.userElement)">
                            <img :src="getStoneUrl(energyData.userElement)" class="w-6 h-6 object-contain" loading="lazy" />
                            <span class="text-[11px] md:text-xs font-bold uppercase" :class="getTextColorClass(energyData.userElement)">Mệnh {{ energyData.userElement }}</span>
                        </div>
                    </div>

                    <h3 class="text-xl md:text-2xl font-serif font-bold mb-2 flex items-center justify-center gap-2 drop-shadow-lg" :class="statusColor">
                        <span v-if="energyData.interactionScore === -10">⚠️</span>
                        <span v-else-if="energyData.interactionScore === 15">✨</span>
                        <span v-else>☯️</span>
                        {{ statusTitle }}
                    </h3>

                    <div class="w-12 h-px bg-white/20 my-2"></div>

                    <p class="text-white/90 text-sm md:text-base leading-relaxed mb-4 text-center px-4">
                        {{ statusDescription }}
                    </p>

                    <div class="bg-black/40 border border-white/10 rounded-lg p-3 w-full backdrop-blur-md">
                        <p class="text-[13px] md:text-sm italic font-medium" :class="adviceColor">
                            <span class="font-bold opacity-80">Gợi ý:</span> {{ statusAdvice }}
                        </p>
                    </div>
                </div>
            </div>

            <div v-else class="flex flex-col items-center justify-center py-20 gap-3">
                 <i class="fi fi-rr-spinner animate-spin text-4xl text-gold"></i>
                 <p class="text-white/50 text-sm text-center font-serif italic tracking-wide">Đang phân tích thiên can địa chi...</p>
            </div>
        </div>


        <template #info>
             <div class="text-center">
                <h4 class="text-xl font-serif text-gold mb-4 flex items-center justify-center gap-2">
                    <span class="text-2xl">☯️</span> Quan hệ Sinh – Khắc
                </h4>
                <p class="text-sm text-white/90 leading-relaxed mb-5 text-left">
                    Chức năng này giúp bạn biết hôm nay ngày đó “thuận lợi” hay “khắc chế” với mệnh bản thân của mình.
                </p>

                <div class="bg-white/5 p-4 rounded-xl border border-white/10 text-left space-y-4 mb-5">
                    <div>
                        <p class="text-sm font-bold text-[#34d399] mb-1">Thuận lợi (Sinh)</p>
                        <p class="text-xs text-white/70">Năng lượng ngày hỗ trợ mệnh bạn → dễ dàng hành động, mọi việc suôn sẻ hơn.</p>
                    </div>
                    <div class="h-px w-full bg-white/10"></div>
                    <div>
                        <p class="text-sm font-bold text-[#ff4757] mb-1">Cẩn thận (Khắc)</p>
                        <p class="text-xs text-white/70">Năng lượng ngày kìm hãm mệnh bạn → cần kiên nhẫn, tránh quyết định lớn hoặc tranh cãi.</p>
                    </div>
                    <div class="h-px w-full bg-white/10"></div>
                    <div>
                        <p class="text-sm font-bold text-[#FDE68A] mb-1">Cân bằng</p>
                        <p class="text-xs text-white/70">Ngày hôm nay không sinh cũng không khắc → mọi việc diễn ra ổn định, duy trì nhịp độ bình thường.</p>
                    </div>
                </div>

                <p class="text-xs text-white/50 italic text-left">
                    * Công thức tính toán dựa trên Nguyên tắc Tương sinh – Tương khắc của Ngũ hành lịch sử, được ứng dụng rộng rãi trong Huyền học Đông Phương.
                </p>
            </div>
        </template>
    </DashboardCard>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import DashboardCard from '@/components/common/DashboardCard.vue';
import api from '@/services/api';

const energyData = ref(null);

const checkEnergy = async () => {
    try {
        const response = await api.getDailyEnergy();
        energyData.value = response.data;
    } catch (e) {
        console.error("Không thể tải dữ liệu tương quan ngũ hành");
    }
}

import { optimizeCloudinaryUrl } from '@/utils/spiritualCalc';

onMounted(() => {
    checkEnergy();
});

const getStoneUrl = (element) => {
    let url = '';
    switch(element) {
        case 'Mộc': url = 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772291655/ChatGPT_Image_21_54_37_28_thg_2_2026_zodhqx.png'; break;
        case 'Hỏa': url = 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772291670/ChatGPT_Image_21_54_43_28_thg_2_2026_dojlmy.png'; break;
        case 'Thổ': url = 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772291692/ChatGPT_Image_21_54_51_28_thg_2_2026_iektlf.png'; break;
        case 'Kim': url = 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772291714/ChatGPT_Image_22_03_06_28_thg_2_2026_zz4lr6.png'; break;
        case 'Thủy': url = 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772291713/ChatGPT_Image_22_03_01_28_thg_2_2026_ifee24.png'; break;
        default: url = 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772291692/ChatGPT_Image_21_54_51_28_thg_2_2026_iektlf.png'; break;
    }
    return optimizeCloudinaryUrl(url, { width: 48 });
};

const getTextColorClass = (element) => {
    switch(element) {
        case 'Mộc': return 'text-[#34d399]';
        case 'Hỏa': return 'text-[#ff4757]';
        case 'Thổ': return 'text-[#FDE68A]';
        case 'Kim': return 'text-white';
        case 'Thủy': return 'text-[#60a5fa]';
        default: return 'text-gold';
    }
}

const getLabelGlowClass = (element) => {
    switch(element) {
        case 'Mộc': return 'shadow-[0_0_10px_rgba(52,211,153,0.3)] border-[#34d399]/30';
        case 'Hỏa': return 'shadow-[0_0_10px_rgba(255,71,87,0.3)] border-[#ff4757]/30';
        case 'Thổ': return 'shadow-[0_0_10px_rgba(253,230,138,0.3)] border-[#FDE68A]/30';
        case 'Kim': return 'shadow-[0_0_10px_rgba(255,255,255,0.3)] border-white/30';
        case 'Thủy': return 'shadow-[0_0_10px_rgba(96,165,250,0.3)] border-[#60a5fa]/30';
        default: return 'border-gold/30';
    }
}

const getMainImageUrl = () => {
    if (!energyData.value) return '';
    const score = energyData.value.interactionScore;
    let url = '';
    if (score === 15) url = 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772296610/ChatGPT_Image_23_35_46_28_thg_2_2026_p5pbdj.png';
    else if (score === -10) url = 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772296613/ChatGPT_Image_23_35_34_28_thg_2_2026_scjhzw.png';
    else url = 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772296611/ChatGPT_Image_23_35_30_28_thg_2_2026_m08zel.png';
    return optimizeCloudinaryUrl(url, { width: 400 });
}

const getBackgroundImage = () => {
    if (!energyData.value) return '';
    const score = energyData.value.interactionScore;
    let url = '';
    if (score === 15) url = 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772296610/ChatGPT_Image_23_35_46_28_thg_2_2026_p5pbdj.png';
    else if (score === -10) url = 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772296613/ChatGPT_Image_23_35_34_28_thg_2_2026_scjhzw.png';
    else url = 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772296611/ChatGPT_Image_23_35_30_28_thg_2_2026_m08zel.png';
    return optimizeCloudinaryUrl(url, { width: 800 });
}

const getImageFilterClass = () => {
    if (!energyData.value) return '';
    const score = energyData.value.interactionScore;

    if (score === 15) return 'drop-shadow-[0_0_30px_rgba(52,211,153,0.8)]';
    if (score === -10) return 'drop-shadow-[0_0_30px_rgba(255,71,87,0.8)]';
    return 'drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]';
}

const getGlowClass = () => {
    if (!energyData.value) return '';
    const score = energyData.value.interactionScore;
    if (score === 15) return '!bg-[#34d399] !opacity-30';
    if (score === -10) return '!bg-[#ff4757] !opacity-30';
    return '!bg-[#a855f7] !opacity-30';
}

const statusTitle = computed(() => {
    if (!energyData.value) return "";
    const score = energyData.value.interactionScore;
    if (score === 15) return "Thuận lợi (Sinh)";
    if (score === -10) return "Cẩn thận (Khắc)";
    return "Cân Bằng (Bình)";
});

const statusColor = computed(() => {
    if (!energyData.value) return "text-gold";
    const score = energyData.value.interactionScore;
    if (score === 15) return "text-[#34d399]";
    if (score === -10) return "text-[#ff4757]";
    return "text-[#E9D5FF]";
});

const adviceColor = computed(() => {
    if (!energyData.value) return "text-white/80";
    const score = energyData.value.interactionScore;
    if (score === 15) return "text-[#A7F3D0]";
    if (score === -10) return "text-[#FECACA]";
    return "text-[#E9D5FF]";
});

const statusDescription = computed(() => {
    if (!energyData.value) return "";
    const score = energyData.value.interactionScore;
    const { dailyElement, userElement } = energyData.value;
    if (score === 15) return `Ngày hôm nay ${dailyElement} hỗ trợ tốt cho mệnh ${userElement} của bạn — năng lượng hài hòa, thuận lợi.`;
    if (score === -10) return `Ngày hôm nay ${dailyElement} có xu hướng khắc ${userElement} của bạn — năng lượng bị kìm hãm.`;
    return `Ngày hôm nay năng lượng các hành cân bằng — không sinh, không khắc mạnh mệnh ${userElement}.`;
});

const statusAdvice = computed(() => {
    if (!energyData.value) return "";
    const score = energyData.value.interactionScore;
    if (score === 15) return "Bắt đầu việc mới hoặc gặp gỡ người quan trọng.";
    if (score === -10) return "Tránh xung đột, thi phi và quyết định mạo hiểm.";
    return `Giữ ổn định và tránh quyết định vội vàng.`;
});

</script>

<style scoped>

</style>