<template>
    <DashboardCard title="Màu Sắc & Hướng Bổ Trợ" contentClass="w-full h-full flex flex-col p-4 md:p-6 justify-between">


        <div class="flex justify-between w-full items-start mb-6 px-1 lg:px-6 mt-2">


            <div class="flex flex-col items-center w-3/5">
                <div class="relative w-full h-24 flex justify-center items-center mb-3">

                    <div class="absolute inset-0 blur-2xl opacity-30 rounded-full" :style="{ background: getOrbStyle(0).background }"></div>


                    <div class="absolute left-[10%] md:left-[20%] top-2 w-12 h-12 rounded-full border border-white/20 animate-[float-slow_4s_ease-in-out_infinite] transition-colors duration-1000"
                         :style="getOrbStyle(0)" style="animation-delay: 0s;">
                         <div class="absolute w-full h-full rounded-full shadow-[inset_-4px_-4px_12px_rgba(0,0,0,0.8),_0_0_15px_rgba(255,255,255,0.1)]"></div>
                    </div>


                    <div class="absolute right-[10%] md:right-[20%] top-4 w-10 h-10 rounded-full border border-white/10 animate-[float-slow_5s_ease-in-out_infinite] transition-colors duration-1000"
                         :style="getOrbStyle(1)" style="animation-delay: 1.5s;">
                         <div class="absolute w-full h-full rounded-full shadow-[inset_-3px_-3px_10px_rgba(0,0,0,0.8)]"></div>
                    </div>


                    <div class="absolute z-10 w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.4)] animate-[float_3s_ease-in-out_infinite] transition-colors duration-1000"
                         :style="getOrbStyle(2)" style="animation-delay: 0.5s;">
                         <div class="absolute w-full h-full rounded-full shadow-[inset_-6px_-6px_15px_rgba(0,0,0,0.9)]"></div>

                         <div class="absolute top-[15%] left-[20%] w-[10px] md:w-[15px] h-[5px] md:h-[8px] bg-white rounded-full opacity-70 blur-[1px] rotate-[-45deg]"></div>
                    </div>
                </div>

                <span class="text-gold/80 text-[10px] md:text-sm font-bold font-serif mb-1 tracking-wider uppercase">Màu hợp:</span>
                <span class="text-white text-xs md:text-base font-sans text-center leading-snug drop-shadow-md px-2">
                    {{ currentColorsText }}
                </span>
            </div>


            <div class="flex flex-col items-center w-2/5 mt-1 border-l border-white/10 pl-2">
                <div class="relative w-20 h-20 md:w-24 md:h-24 mb-3 group cursor-help">

                    <svg class="w-full h-full filter drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(255,215,0,0.8)] transition-all duration-1000 origin-center"
                         viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">

                      <circle cx="50" cy="50" r="45" stroke="#ecc94b" stroke-width="1.5" stroke-dasharray="2 4" stroke-opacity="0.7"/>
                      <circle cx="50" cy="50" r="38" stroke="#f6e05e" stroke-width="1" stroke-opacity="0.3"/>


                      <g class="transition-transform duration-1000 ease-in-out origin-center" :style="{ transform: `rotate(${directionRotation}deg)` }">
                          <path d="M50 10 L58 50 L50 90 L42 50 Z" fill="url(#gradRed)" />
                          <path d="M50 10 L50 90 L42 50 Z" fill="url(#gradRedDark)" />
                          <path d="M10 50 L50 58 L90 50 L50 42 Z" fill="url(#gradGold)" />
                          <path d="M10 50 L90 50 L50 42 Z" fill="url(#gradGoldDark)" />
                      </g>


                      <circle cx="50" cy="50" r="4" fill="#ecc94b" shadow="0 0 5px black"/>
                      <circle cx="50" cy="50" r="1.5" fill="#24243e"/>


                      <text x="50" y="24" fill="#f6e05e" font-size="10" font-family="serif" text-anchor="middle" font-weight="bold" transform="rotate()">B</text>
                      <text x="50" y="83" fill="#f6e05e" font-size="10" font-family="serif" text-anchor="middle" font-weight="bold" opacity="0.6">N</text>
                      <text x="76" y="53" fill="#f6e05e" font-size="10" font-family="serif" text-anchor="middle" font-weight="bold" opacity="0.6">Đ</text>
                      <text x="24" y="53" fill="#f6e05e" font-size="10" font-family="serif" text-anchor="middle" font-weight="bold" opacity="0.6">T</text>

                      <defs>
                        <linearGradient id="gradRed" x1="50" y1="10" x2="50" y2="90" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#ef4444"/>
                          <stop offset="1" stop-color="#7f1d1d"/>
                        </linearGradient>
                        <linearGradient id="gradRedDark" x1="50" y1="10" x2="50" y2="90" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#b91c1c"/>
                          <stop offset="1" stop-color="#450a0a"/>
                        </linearGradient>
                        <linearGradient id="gradGold" x1="10" y1="50" x2="90" y2="50" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#eab308"/>
                          <stop offset="1" stop-color="#713f12"/>
                        </linearGradient>
                        <linearGradient id="gradGoldDark" x1="10" y1="50" x2="90" y2="50" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#ca8a04"/>
                          <stop offset="1" stop-color="#422006"/>
                        </linearGradient>
                      </defs>
                    </svg>
                </div>
                <span class="text-white text-xs md:text-sm font-sans tracking-wide">
                    Hướng hợp: <span class="text-gold font-bold text-sm drop-shadow-md">{{ currentDirection }}</span>
                </span>
            </div>
        </div>


        <div class="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-1"></div>


        <div class="w-full flex items-center justify-between px-2 md:px-8 py-2 mb-2 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-xl">
            <div class="flex-1 pr-4">
                <div class="text-white text-sm md:text-base font-sans drop-shadow-md flex items-center gap-2 flex-wrap mb-1">
                    <span class="font-bold text-gold/80 tracking-wider text-[11px] md:text-sm uppercase">Đá hợp:</span>
                    <span class="font-bold flex items-center gap-1 group">
                        <i :class="getDailyElementIcon()" :style="{color: userElementColor}" class="text-[10px] md:text-xs"></i>
                        <span :style="{color: userElementColor}" class="text-xs md:text-sm">{{ userElement }}</span>
                    </span>
                    <span class="text-white/60 text-[10px] md:text-xs italic lowercase px-1 opacity-80">{{ interactionVerb }}</span>
                    <span class="font-bold flex items-center gap-1 group">
                        <i :class="getUserElementIcon()" :style="{color: dailyElementColor}" class="text-[10px] md:text-xs"></i>
                        <span :style="{color: dailyElementColor}" class="text-xs md:text-sm">{{ dailyElement }}</span>
                    </span>
                </div>
                <div class="text-white/80 font-bold text-sm md:text-base tracking-wide">{{ currentStoneName }}</div>
                <div class="text-white/50 text-[11px] md:text-xs mt-1 font-serif italic">{{ interactionStatusText }}</div>
            </div>

            <div class="w-28 h-28 md:w-32 md:h-32 shrink-0 relative flex items-center justify-center group cursor-pointer hover:scale-110 transition-transform duration-500 mr-2">

                 <div class="absolute inset-0 blur-2xl opacity-60 rounded-full animate-pulse-slow" :style="{ background: stoneGlowColor }"></div>


                 <img :src="currentStoneUrl"
                      :alt="currentStoneName"
                      :style="{ filter: `drop-shadow(0 0 20px ${stoneGlowColor})` }"
                      class="w-full h-full object-contain relative z-10 animate-[float-slow_4s_ease-in-out_infinite] scale-125"
                      loading="lazy">
            </div>
        </div>


        <div class="w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 mt-2">
            <p class="text-white/80 text-[12px] md:text-[13px] font-sans italic leading-relaxed text-justify relative pl-4">
                <span class="absolute left-0 top-0 text-gold text-base">"</span>
                <span class="font-bold text-accent-gold uppercase text-[10px] md:text-[11px] mr-1">Gợi ý:</span>
                {{ currentAdvice }}
            </p>
        </div>


        <template #info>
            <div class="space-y-6 text-sm md:text-base">
                <section>
                    <h4 class="text-gold font-bold mb-2 flex items-center gap-2">
                        <i class="fi fi-rr-palette"></i> Màu Sắc Bổ Trợ
                    </h4>
                    <p class="text-white/70 leading-relaxed">
                        Hệ thống tính toán màu sắc dựa trên sự tương tác giữa **Bản mệnh** của bạn và **Năng lượng ngày**.
                        Chúng tôi ưu tiên các màu thuộc hành **Tương Sinh** (nuôi dưỡng mệnh) hoặc **Bình Hòa** (cân bằng) để giúp bạn duy trì trạng thái năng lượng tốt nhất.
                    </p>
                </section>

                <section>
                    <h4 class="text-gold font-bold mb-2 flex items-center gap-2">
                        <i class="fi fi-rr-compass"></i> Hướng Đại Cát
                    </h4>
                    <p class="text-white/70 leading-relaxed">
                        Đây là hướng đón luồng khí (vận khí) tốt nhất trong ngày cho cung mệnh của bạn. Khi làm việc, tĩnh tâm hoặc khởi sự, việc quay mặt về hướng này giúp tâm trí thông tuệ và thu hút cơ hội thuận lợi.
                    </p>
                </section>

                <section>
                    <h4 class="text-gold font-bold mb-2 flex items-center gap-2">
                        <i class="fi fi-rr-gem"></i> Vật Phẩm Hộ Thân
                    </h4>
                    <p class="text-white/70 leading-relaxed">
                        Các loại đá quý được gợi ý mang tần số rung động tương ứng để hóa giải năng lượng xấu hoặc kích hoạt năng lượng tốt. Nếu gặp ngày **Tương Khắc**, đá hộ thân đóng vai trò như một "lá chắn" bảo vệ tâm trí bạn.
                    </p>
                </section>

                <div class="p-4 bg-gold/5 border border-gold/20 rounded-xl italic text-xs text-gold-light/80">
                    * Lưu ý: Năng lượng này mang tính chất tham khảo để bạn có sự chuẩn bị tốt nhất về mặt tinh thần và tâm thế trong ngày.
                </div>
            </div>
        </template>
    </DashboardCard>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import api from '@/services/api';
import DashboardCard from '@/components/common/DashboardCard.vue';

const authStore = useAuthStore();
const energyData = ref({ dailyElement: 'Thổ', interactionScore: 0 });

const fetchEnergy = async () => {
    try {
        const response = await api.getDailyEnergy();
        energyData.value = response.data;
    } catch (error) {
        console.error("Lỗi khi tải năng lượng hằng ngày cho Thẻ Hỗ Trợ", error);
    }
};

onMounted(() => {
    fetchEnergy();
});




const FENG_SHUI_DATA = {
    'Kim': {
        direction: 'Tây, Tây Bắc',
        coreColors: 'Trắng, Bạc, Ghi, Ánh kim',
        coreOrbs: [ 'linear-gradient(135deg, #ffffff, #d1d5db)', 'linear-gradient(135deg, #f3f4f6, #6b7280)', 'linear-gradient(135deg, #e5e7eb, #9ca3af)' ],
        supportColors: 'Vàng, Nâu đất, Trắng bạc',
        supportOrbs: [ 'linear-gradient(135deg, #fde047, #a16207)', 'linear-gradient(135deg, #d97706, #78350f)', 'linear-gradient(135deg, #ffffff, #9ca3af)' ],
        stones: ['Thạch Anh Tóc Vàng', 'Đá Mặt Trăng'],
        stoneBright: '#fef08a', stoneDark: '#ca8a04', stoneGlow: '#fde047'
    },
    'Mộc': {
        direction: 'Đông, Đông Nam',
        coreColors: 'Xanh lá cây, Xanh lục',
        coreOrbs: [ 'linear-gradient(135deg, #4ade80, #166534)', 'linear-gradient(135deg, #86efac, #15803d)', 'linear-gradient(135deg, #22c55e, #14532d)' ],
        supportColors: 'Đen, Xanh dương, Xanh đen',
        supportOrbs: [ 'linear-gradient(135deg, #38bdf8, #075985)', 'linear-gradient(135deg, #0ea5e9, #082f49)', 'linear-gradient(135deg, #1e293b, #020617)' ],
        stones: ['Ngọc Bích', 'Thạch Anh Đen'],
        stoneBright: '#4ade80', stoneDark: '#14532d', stoneGlow: '#22c55e'
    },
    'Thủy': {
        direction: 'Bắc',
        coreColors: 'Đen, Xanh dương, Xanh đen',
        coreOrbs: [ 'linear-gradient(135deg, #0ea5e9, #082f49)', 'linear-gradient(135deg, #1e293b, #020617)', 'linear-gradient(135deg, #38bdf8, #075985)' ],
        supportColors: 'Trắng bạc, Xám, Ghi',
        supportOrbs: [ 'linear-gradient(135deg, #ffffff, #d1d5db)', 'linear-gradient(135deg, #f3f4f6, #6b7280)', 'linear-gradient(135deg, #e5e7eb, #9ca3af)' ],
        stones: ['Aquamarine', 'Đá Obsidian Khói'],
        stoneBright: '#38bdf8', stoneDark: '#0f172a', stoneGlow: '#0ea5e9'
    },
    'Hỏa': {
        direction: 'Nam',
        coreColors: 'Đỏ, Hồng, Tím, Cam',
        coreOrbs: [ 'linear-gradient(135deg, #f87171, #991b1b)', 'linear-gradient(135deg, #ec4899, #831843)', 'linear-gradient(135deg, #a855f7, #581c87)' ],
        supportColors: 'Xanh lá, Xanh lục, Đỏ tươi',
        supportOrbs: [ 'linear-gradient(135deg, #4ade80, #166534)', 'linear-gradient(135deg, #86efac, #15803d)', 'linear-gradient(135deg, #f87171, #991b1b)' ],
        stones: ['Ruby Đỏ', 'Thạch Anh Tím'],
        stoneBright: '#f87171', stoneDark: '#7f1d1d', stoneGlow: '#ef4444'
    },
    'Thổ': {
        direction: 'Đông Bắc, Tây Nam',
        coreColors: 'Vàng, Nâu đất, Nâu cà phê',
        coreOrbs: [ 'linear-gradient(135deg, #fde047, #a16207)', 'linear-gradient(135deg, #fef08a, #854d0e)', 'linear-gradient(135deg, #d97706, #78350f)' ],
        supportColors: 'Đỏ, Hồng, Tím, Vàng đậm',
        supportOrbs: [ 'linear-gradient(135deg, #f87171, #991b1b)', 'linear-gradient(135deg, #ec4899, #831843)', 'linear-gradient(135deg, #fde047, #a16207)' ],
        stones: ['Mắt Hổ', 'Thạch Anh Vàng'],
        stoneBright: '#fcd34d', stoneDark: '#713f12', stoneGlow: '#eab308'
    }
};

const STONE_IMAGES = {
    'Ngọc Bích': 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772371180/ChatGPT_Image_20_19_00_1_thg_3_2026_goetzz.png',
    'Thạch Anh Đen': 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772371886/ChatGPT_Image_20_30_51_1_thg_3_2026_doojvl.png',
    'Aquamarine': 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772370886/ChatGPT_Image_18_39_46_1_thg_3_2026_1_yjxr3u.png',
    'Đá Obsidian Khói': 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772370885/ChatGPT_Image_18_38_38_1_thg_3_2026_jigbqs.png',
    'Ruby Đỏ': 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772370884/ChatGPT_Image_18_38_18_1_thg_3_2026_t7jlv1.png',
    'Thạch Anh Tím': 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772370883/ChatGPT_Image_18_38_06_1_thg_3_2026_vtonnj.png',
    'Mắt Hổ': 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772370884/ChatGPT_Image_18_38_02_1_thg_3_2026_oiuwo8.png',
    'Thạch Anh Vàng': 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772370883/ChatGPT_Image_18_37_58_1_thg_3_2026_xid9vp.png',
    'Thạch Anh Tóc Vàng': 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772371181/ChatGPT_Image_20_18_54_1_thg_3_2026_zggemz.png',
    'Đá Mặt Trăng': 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772371180/ChatGPT_Image_20_18_44_1_thg_3_2026_nhu3wb.png'
};

const ELEMENT_COLORS = { 'KIM': '#ffffff', 'MỘC': '#4ade80', 'THỦY': '#38bdf8', 'HỎA': '#f87171', 'THỔ': '#facc15' };




const userElementFull = computed(() => authStore.user?.elements || 'Tuyền Trung Thủy');
const userElement = computed(() => {
    const cores = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];
    return cores.find(c => userElementFull.value.toLowerCase().includes(c.toLowerCase())) || 'Thủy';
});
const dailyElement = computed(() => energyData.value.dailyElement || 'Không rõ');
const interactionScore = computed(() => energyData.value.interactionScore || 0);

const userElementColor = computed(() => ELEMENT_COLORS[userElement.value.toUpperCase()] || '#aaa');
const dailyElementColor = computed(() => ELEMENT_COLORS[dailyElement.value.toUpperCase()] || '#aaa');

const interactionState = computed(() => {
    if (interactionScore.value > 0) return 'SINH';
    if (interactionScore.value < 0) return 'KHAC';
    return 'BINH_HOA';
});


const getOrbStyle = (index) => {
    const data = FENG_SHUI_DATA[userElement.value];
    if (!data) return { background: 'gray' };

    let gradients = data.coreOrbs;


    if (interactionState.value === 'SINH') {
        const generativeMap = { 'Kim': 'Thổ', 'Thủy': 'Kim', 'Mộc': 'Thủy', 'Hỏa': 'Mộc', 'Thổ': 'Hỏa' };
        gradients = FENG_SHUI_DATA[generativeMap[userElement.value]]?.coreOrbs || data.coreOrbs;
    }

    else if (interactionState.value === 'KHAC') {
        gradients = data.supportOrbs;
    }

    return { background: gradients[index % 3] };
};


const currentColorsText = computed(() => {
     const data = FENG_SHUI_DATA[userElement.value];
     if (!data) return '';

     if (interactionState.value === 'SINH') {
        const generativeMap = { 'Kim': 'Thổ', 'Thủy': 'Kim', 'Mộc': 'Thủy', 'Hỏa': 'Mộc', 'Thổ': 'Hỏa' };
        return FENG_SHUI_DATA[generativeMap[userElement.value]]?.coreColors || data.coreColors;
    } else if (interactionState.value === 'KHAC') {
        return data.supportColors;
    }
    return data.coreColors;
});

const currentDirection = computed(() => {
    return FENG_SHUI_DATA[userElement.value]?.direction || 'Bắc';
});


const compassRotation = computed(() => {
    const dir = currentDirection.value.toLowerCase();
    if (dir.includes('đông bắc')) return 45;
    if (dir.includes('đông nam')) return 135;
    if (dir.includes('tây nam')) return 225;
    if (dir.includes('tây bắc')) return 315;
    if (dir.includes('đông')) return 90;
    if (dir.includes('nam')) return 180;
    if (dir.includes('tây')) return 270;
    return 0;
});

const currentStoneData = computed(() => {
    const data = FENG_SHUI_DATA[userElement.value];
    if (!data) return { name: 'Thạch anh tự nhiên', bright: '#fff', dark: '#333', glow: '#fff' };


    if (interactionState.value === 'SINH') {
        const generativeMap = { 'Kim': 'Thổ', 'Thủy': 'Kim', 'Mộc': 'Thủy', 'Hỏa': 'Mộc', 'Thổ': 'Hỏa' };
        const supportElement = generativeMap[userElement.value];
        const supportData = FENG_SHUI_DATA[supportElement];
        return {
            name: data.stones[0],
            bright: supportData.stoneBright,
            dark: supportData.stoneDark,
            glow: supportData.stoneGlow
        };
    }

    else if (interactionState.value === 'KHAC') {
        const generativeMap = { 'Kim': 'Thổ', 'Thủy': 'Kim', 'Mộc': 'Thủy', 'Hỏa': 'Mộc', 'Thổ': 'Hỏa' };
        const supportElement = generativeMap[userElement.value];
        const supportData = FENG_SHUI_DATA[supportElement];
        return {
            name: data.stones[1],

            bright: supportData.stoneBright,
            dark: supportData.stoneDark,
            glow: supportData.stoneGlow
        };
    }


    return {
        name: data.stones[0],
        bright: data.stoneBright,
        dark: data.stoneDark,
        glow: data.stoneGlow
    };
});

const currentStoneName = computed(() => currentStoneData.value.name);
const currentStoneUrl = computed(() => STONE_IMAGES[currentStoneName.value] || STONE_IMAGES['Thạch Anh Vàng']);
const stoneBrightColor = computed(() => currentStoneData.value.bright);
const stoneDarkColor = computed(() => currentStoneData.value.dark);
const stoneGlowColor = computed(() => currentStoneData.value.glow);


const interactionVerb = computed(() => {
    if (interactionState.value === 'SINH') return 'sinh';
    if (interactionState.value === 'KHAC') return 'khắc';
    return 'hòa hợp';
});

const interactionStatusText = computed(() => {
    if (interactionState.value === 'SINH') return 'Năng lượng ngày dồi dào, hỗ trợ đắc lực.';
    if (interactionState.value === 'KHAC') return 'Năng lượng cá nhân bị cản trở nhẹ.';
    return 'Mọi việc cân bằng, nhịp độ ổn định.';
});

const currentAdvice = computed(() => {
    const base = `Nên mặc áo hoặc mang phụ kiện có màu ${currentColorsText.value.toLowerCase()}. Hãy quay mặt tĩnh tâm hoặc hướng làm việc về ${currentDirection.value} để đón cát khí. `;

    if (interactionState.value === 'SINH') {
        return base + `Dùng thêm ${currentStoneName.value} để kích hoạt tối đa vượng khí khởi sự.`;
    } else if (interactionState.value === 'KHAC') {
         return base + `Mang theo ${currentStoneName.value} bên người để tăng cường bảo vệ tâm trí, hóa giải xung đột.`;
    }
    return base + `Mang theo ${currentStoneName.value} để duy trì phong độ hiện tại.`;
});


const getDailyElementIcon = () => {
    const map = { 'KIM': 'fi fi-rr-diamond', 'MỘC': 'fi fi-rr-leaf', 'THỦY': 'fi fi-rr-water-drop', 'HỎA': 'fi fi-rr-fire', 'THỔ': 'fi fi-rr-mountain' };
    return map[userElement.value.toUpperCase()] || 'fi fi-rr-star';
};
const getUserElementIcon = () => {
    const map = { 'KIM': 'fi fi-rr-diamond', 'MỘC': 'fi fi-rr-leaf', 'THỦY': 'fi fi-rr-water-drop', 'HỎA': 'fi fi-rr-fire', 'THỔ': 'fi fi-rr-mountain' };
    return map[dailyElement.value.toUpperCase()] || 'fi fi-rr-star';
};

</script>

<style scoped>
@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

@keyframes float-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
}
</style>