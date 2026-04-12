
<template>
    <DashboardCard title="Năng Lượng Hôm Nay" contentClass="w-full flex flex-col items-center">
        <template #header-actions>

            <button @click="refreshEnergy"
                    class="absolute right-0 top-0 text-white/50 hover:text-gold transition-colors p-2 rounded-full hover:bg-white/5"
                    :class="{'animate-spin': isRefreshing}"
                    title="Làm mới năng lượng">
                <i class="fi fi-rr-refresh"></i>
            </button>
        </template>



        <div class="relative w-full flex-1 min-h-[300px] flex items-center justify-center overflow-visible">



                <div class="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 w-32 md:w-36">
                    <div class="w-full flex justify-between items-end text-white/90 font-serif text-[10px] md:text-sm font-bold tracking-wide drop-shadow-md mb-1 px-1">
                        <span>Tinh Thần</span>
                        <span class="text-[#38bdf8] text-sm md:text-base">{{ energyData.mentalEnergy }}</span>
                    </div>
                    <div class="w-full h-2 md:h-2.5 bg-white/10 rounded-full border border-white/20 overflow-hidden shadow-[0_0_10px_rgba(56,189,248,0.3)] relative">
                         <div class="h-full bg-gradient-to-r from-cyan-600 to-cyan-300 transition-all duration-1000 ease-out"
                              :style="{ width: `${animating ? energyData.mentalEnergy : 0}%` }"></div>
                    </div>
                </div>


                <div class="absolute top-1/4 right-2 md:right-4 flex flex-col items-end z-20 w-28 md:w-36">
                    <div class="w-full flex justify-between items-end text-white/90 font-serif text-[10px] md:text-sm font-bold tracking-wide drop-shadow-md mb-1 px-1">
                        <span class="flex items-center gap-1"><span class="text-xs md:text-sm filter drop-shadow-[0_0_5px_rgba(255,105,180,0.8)]">💖</span> Cảm Xúc</span>
                        <span class="text-[#ec4899] text-sm md:text-base">{{ energyData.emotionalBalance }}</span>
                    </div>
                    <div class="w-full h-2 md:h-2.5 bg-white/10 rounded-full border border-white/20 overflow-hidden shadow-[0_0_10px_rgba(236,72,153,0.3)] relative">
                         <div class="h-full bg-gradient-to-r from-pink-600 to-pink-300 transition-all duration-1000 ease-out delay-100"
                              :style="{ width: `${animating ? energyData.emotionalBalance : 0}%` }"></div>
                    </div>
                </div>


                <div class="absolute bottom-[10%] right-2 md:right-4 flex flex-col items-end z-20 w-28 md:w-36">
                    <div class="w-full flex justify-between items-end text-white/90 font-serif text-[10px] md:text-sm font-bold tracking-wide drop-shadow-md mb-1 px-1">
                        <span class="flex items-center gap-1"><span class="text-xs md:text-sm filter drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]">🔥</span> Hành Động</span>
                        <span class="text-[#facc15] text-sm md:text-base">{{ energyData.actionReadiness }}</span>
                    </div>
                    <div class="w-full h-2 md:h-2.5 bg-white/10 rounded-full border border-white/20 overflow-hidden shadow-[0_0_10px_rgba(250,204,21,0.3)] relative">
                         <div class="h-full bg-gradient-to-r from-yellow-600 to-yellow-300 transition-all duration-1000 ease-out delay-200"
                              :style="{ width: `${animating ? energyData.actionReadiness : 0}%` }"></div>
                    </div>
                </div>


                <div class="absolute bottom-[10%] left-2 md:left-4 flex flex-col items-start z-20 w-28 md:w-36">
                    <div class="w-full flex justify-between items-end text-white/90 font-serif text-[10px] md:text-sm font-bold tracking-wide drop-shadow-md mb-1 px-1">
                        <span class="text-[#a855f7] text-sm md:text-base">{{ energyData.socialHarmony }}</span>
                        <span class="flex items-center gap-1"><span class="text-xs md:text-sm filter drop-shadow-[0_0_5px_rgba(167,139,250,0.8)]">✨</span> Xã Hội</span>
                    </div>
                    <div class="w-full h-2 md:h-2.5 bg-white/10 rounded-full border border-white/20 overflow-hidden shadow-[0_0_10px_rgba(167,139,250,0.3)] relative text-right">
                         <div class="h-full bg-gradient-to-l from-purple-600 to-purple-300 transition-all duration-1000 ease-out delay-300 ml-auto"
                              :style="{ width: `${animating ? energyData.socialHarmony : 0}%` }"></div>
                    </div>
                </div>


                <div class="absolute top-1/4 left-2 md:left-4 flex flex-col items-start z-20 w-28 md:w-36">
                    <div class="w-full flex justify-between items-end text-white/90 font-serif text-[10px] md:text-sm font-bold tracking-wide drop-shadow-md mb-1 px-1">
                        <span class="text-white text-sm md:text-base">{{ energyData.focusLevel }}</span>
                        <span>Tập Trung</span>
                    </div>
                    <div class="w-full h-2 md:h-2.5 bg-white/10 rounded-full border border-white/20 overflow-hidden shadow-[0_0_10px_rgba(255,255,255,0.3)] relative text-right">
                         <div class="h-full bg-gradient-to-l from-gray-400 to-gray-100 transition-all duration-1000 ease-out delay-400 ml-auto"
                              :style="{ width: `${animating ? energyData.focusLevel : 0}%` }"></div>
                    </div>
                </div>


                <div class="absolute inset-0 m-auto w-full max-w-[280px] md:max-w-[360px] flex items-center justify-center pointer-events-none z-10 p-2">
                    <img src="https://res.cloudinary.com/drac9ko3l/image/upload/v1772206916/star_xzdurp.png"
                         class="w-full h-full object-contain filter drop-shadow-[0_0_40px_rgba(255,184,0,0.5)] transition-all duration-1000 origin-center"
                         :class="animating ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 -rotate-12'"
                         loading="lazy" />


                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center transition-all duration-1000 delay-300 w-full h-full mt-1"
                         :class="animating ? 'opacity-100 scale-100' : 'opacity-0 scale-50'">
                        <span class="text-[3rem] md:text-5xl font-serif font-bold leading-none" :style="{ color: elementColor, textShadow: `0 0 30px ${elementColor}` }">{{ elementChar }}</span>
                        <span class="text-[0.55rem] md:text-xs font-bold tracking-widest mt-2 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" :style="{ color: elementColor }">{{ elementStore }} CỤC</span>
                    </div>
                </div>
        </div>

        <template #footer>

            <div class="flex flex-col items-center w-full pt-4">
                <div class="flex items-center gap-4 mb-3 opacity-0 transition-opacity duration-1000 delay-700" :class="{'opacity-100': animating}">
                    <div class="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-gold"></div>
                    <h3 class="text-sm md:text-base font-serif text-white tracking-widest drop-shadow-md flex items-center gap-2">
                        Tổng Năng Lượng: <span class="text-gold font-bold text-lg md:text-xl">{{ energyData.totalEnergy }}</span>
                    </h3>
                    <div class="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-gold"></div>
                </div>


                <div class="w-full bg-transparent text-center min-h-[60px] flex items-center justify-center
                            opacity-0 transition-opacity duration-1000 delay-1000" :class="{'opacity-100': animating}">
                    <p class="text-white/90 font-serif italic text-sm md:text-base leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                        "{{ energyData.affirmation }}"
                    </p>
                </div>
            </div>
        </template>

        <template #info>
            <div>
                <h4 class="text-lg font-bold text-white mb-2 flex items-center gap-2"><span class="text-xl">🌌</span> 1. Đây là gì?</h4>
                <p class="text-sm">Bản đồ năng lượng hôm nay thể hiện trạng thái tinh thần và cảm xúc của bạn trong ngày hiện tại, dựa trên ngày sinh và thời điểm bạn chào đời.</p>
                <p class="text-sm mt-2">Hệ thống phân tích năng lượng cá nhân theo chu kỳ Đông – Tây và chuyển đổi thành 5 chỉ số trực quan.</p>
            </div>

            <div>
                <h4 class="text-lg font-bold text-white mb-3 flex items-center gap-2"><span class="text-xl">📊</span> 2. 5 chỉ số có ý nghĩa gì?</h4>
                <ul class="space-y-3 text-sm">
                    <li class="bg-white/5 p-3 rounded-lg border border-white/5">
                        <strong class="text-[#38bdf8] block mb-1">🧠 Mental Energy (Tinh Thần)</strong>
                        Mức độ tỉnh táo, sáng suốt và khả năng suy nghĩ logic hôm nay.
                    </li>
                    <li class="bg-white/5 p-3 rounded-lg border border-white/5">
                        <strong class="text-[#ec4899] block mb-1">❤️ Emotional Balance (Cảm Xúc)</strong>
                        Mức độ ổn định cảm xúc và khả năng kiểm soát tâm trạng.
                    </li>
                    <li class="bg-white/5 p-3 rounded-lg border border-white/5">
                        <strong class="text-white block mb-1">🎯 Focus Level (Tập Trung)</strong>
                        Khả năng tập trung và duy trì sự chú ý.
                    </li>
                    <li class="bg-white/5 p-3 rounded-lg border border-white/5">
                        <strong class="text-[#facc15] block mb-1">🚀 Action Readiness (Hành Động)</strong>
                        Sự sẵn sàng bắt đầu việc mới hoặc đưa ra quyết định.
                    </li>
                    <li class="bg-white/5 p-3 rounded-lg border border-white/5">
                        <strong class="text-[#a855f7] block mb-1">🤝 Social Harmony (Xã Hội)</strong>
                        Mức độ hòa hợp trong giao tiếp và các mối quan hệ.
                    </li>
                </ul>
                <div class="mt-4 bg-white/5 p-3 rounded-lg border border-white/5 text-sm">
                    <strong class="text-gold block mb-1">Điểm số từ 0 – 100:</strong>
                    <div class="grid grid-cols-3 gap-2 text-center mt-2">
                        <div class="bg-red-500/20 text-red-300 py-1 rounded border border-red-500/30">0–40: Thấp</div>
                        <div class="bg-yellow-500/20 text-yellow-300 py-1 rounded border border-yellow-500/30">40–70: TB</div>
                        <div class="bg-green-500/20 text-green-300 py-1 rounded border border-green-500/30">70–100: Cao</div>
                    </div>
                </div>
            </div>

            <div>
                <h4 class="text-lg font-bold text-white mb-2 flex items-center gap-2"><span class="text-xl">🔍</span> 3. Hệ thống tính toán dựa trên gì?</h4>
                <p class="text-sm">Chỉ số được tổng hợp từ:</p>
                <ul class="list-disc list-inside text-sm mt-2 ml-2 space-y-1 text-white/70">
                    <li>Ngũ hành bản mệnh của bạn</li>
                    <li>Ngũ hành của ngày hôm nay</li>
                    <li>Quan hệ Sinh – Khắc giữa mệnh và ngày</li>
                    <li>Chu kỳ Thần số học cá nhân (Personal Day Number)</li>
                </ul>
                <p class="text-sm mt-2 italic text-white/60">Các yếu tố này được quy đổi thành điểm số để phản ánh mức năng lượng trong ngày.</p>
            </div>

            <div>
                <h4 class="text-lg font-bold text-white mb-2 flex items-center gap-2"><span class="text-xl">✨</span> 4. Tôi nên hiểu biểu đồ này như thế nào?</h4>
                <p class="text-sm">Biểu đồ không dự đoán tương lai, mà cho bạn một "bản đồ tham khảo" về trạng thái năng lượng hiện tại.</p>
                <ul class="text-sm mt-2 space-y-2">
                    <li class="flex items-start gap-2">
                        <i class="fi fi-rr-arrow-circle-down text-red-400 mt-0.5"></i>
                        <span>Nếu một chỉ số <strong>thấp</strong> → bạn nên điều chỉnh nhịp độ sinh hoạt.</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <i class="fi fi-rr-arrow-circle-up text-green-400 mt-0.5"></i>
                        <span>Nếu một chỉ số <strong>cao</strong> → đây có thể là thời điểm thuận lợi để hành động.</span>
                    </li>
                </ul>
            </div>

            <div class="bg-gold/10 border border-gold/30 p-4 rounded-xl">
                <h4 class="text-gold font-bold mb-1 flex items-center gap-2"><span class="text-xl">🌿</span> 5. Lưu ý</h4>
                <p class="text-sm text-gold/80 italic">Kết quả mang tính định hướng và tự chiêm nghiệm, giúp bạn hiểu rõ hơn về bản thân và nhịp năng lượng cá nhân.</p>
            </div>
        </template>
    </DashboardCard>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import api from '@/services/api';
import { cosmicToast as toast } from '@/utils/toast';
import DashboardCard from '@/components/common/DashboardCard.vue';

const authStore = useAuthStore();
const animating = ref(false);
const isRefreshing = ref(false);
const isLoadingInitial = ref(true);


const energyData = ref({
    mentalEnergy: 0,
    emotionalBalance: 0,
    focusLevel: 0,
    actionReadiness: 0,
    socialHarmony: 0,
    totalEnergy: 0,
    affirmation: "Đang phân tích năng lượng vũ trụ..."
});

const elementColor = computed(() => {
    const mapping = {
        'KIM': '#ffffff',
        'MỘC': '#4ade80',
        'THỦY': '#38bdf8',
        'HỎA': '#f87171',
        'THỔ': '#facc15'
    };
    return mapping[elementStore.value] || '#ffffff';
});

const elementStore = computed(() => {
    const full = authStore.user?.elements || 'Tuyền Trung Thủy';
    const cores = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];
    return cores.find(c => full.toLowerCase().includes(c.toLowerCase()))?.toUpperCase() || 'THỦY';
});

const elementChar = computed(() => {
    const mapping = { 'KIM': '金', 'MỘC': '木', 'THỦY': '水', 'HỎA': '火', 'THỔ': '土' };
    return mapping[elementStore.value] || '水';
});

const fetchEnergy = async (forceRefresh = false) => {
    if (isRefreshing.value) return;
    isRefreshing.value = true;
    animating.value = false;


    energyData.value = {
        mentalEnergy: 0, emotionalBalance: 0, focusLevel: 0, actionReadiness: 0, socialHarmony: 0, totalEnergy: 0,
        affirmation: forceRefresh ? "Đang đồng bộ..." : "Đang tải dữ liệu năng lượng..."
    };

    try {
        const response = forceRefresh ? await api.refreshDailyEnergy() : await api.getDailyEnergy();
        energyData.value = response.data;


        setTimeout(() => animating.value = true, 50);

        if (forceRefresh) toast.success("Đã đồng bộ nhịp sinh học và thiên can.");
    } catch (error) {
        toast.error(error.response?.data || "Chưa thể kết nối tới Năng Lượng Vũ Trụ hôm nay.");
        energyData.value.affirmation = "Hãy thử lại sau.";
    } finally {
        isRefreshing.value = false;
        isLoadingInitial.value = false;
    }
};

const refreshEnergy = () => fetchEnergy(true);

onMounted(() => {

    setTimeout(() => fetchEnergy(false), 300);
});

</script>

<style scoped>

</style>