<template>
    <div class="animated-border-card group cursor-pointer h-full">
        <div class="inner-card-content !border-[#60A5FA]/30 !bg-[#0F172A]/60 !shadow-[0_0_20px_rgba(96,165,250,0.1)] relative flex flex-col p-6 overflow-hidden h-full">

            <h2 class="text-xl font-serif text-[#60A5FA] tracking-wider mb-2 drop-shadow-md">
                Phong Thủy Cải Vận
            </h2>
            <p class="text-white/50 text-xs mb-4">Vật phẩm & Năng lượng Hợp Mệnh</p>

            <div class="flex-1 flex flex-col justify-center space-y-6 relative z-10 w-full">


                <div class="bg-gradient-to-r from-[#60A5FA]/10 to-transparent p-4 rounded-xl border-l-[3px] border-[#60A5FA] flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full bg-[#60A5FA]/20 flex items-center justify-center border border-[#60A5FA]/50 shadow-[0_0_15px_rgba(96,165,250,0.4)]">
                        <span class="text-2xl">🌊</span>
                    </div>
                    <div>
                        <div class="text-white/50 text-xs">Mệnh (Nạp Âm)</div>
                        <div class="text-[#60A5FA] font-bold text-lg">{{ authStore.user?.elements || 'Chưa rõ' }}</div>
                    </div>
                </div>


                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-black/30 rounded-xl p-3 border border-white/5">
                        <div class="text-xs text-white/50 mb-2">Màu Sắc Đại Cát</div>
                        <div class="flex gap-2">
                            <div class="w-6 h-6 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)]" title="Xanh dương (Thủy)"></div>
                            <div class="w-6 h-6 rounded-full bg-black shadow-[0_0_5px_rgba(0,0,0,0.8)] border border-white/20" title="Đen (Thủy)"></div>
                            <div class="w-6 h-6 rounded-full bg-gray-200 shadow-[0_0_5px_rgba(229,231,235,0.8)]" title="Trắng (Kim sinh Thủy)"></div>
                        </div>
                    </div>

                    <div class="bg-black/30 rounded-xl p-3 border border-white/5">
                        <div class="text-xs text-white/50 mb-2">Đá Hộ Mệnh</div>
                        <div class="text-sm text-white font-medium flex items-center gap-2">
                            <span>💎</span> Aquamarine
                        </div>
                        <div class="text-[10px] text-white/40 mt-1">Thu hút tài lộc, bình an</div>
                    </div>
                </div>


                <div class="bg-black/30 rounded-xl p-3 border border-white/5 flex items-center justify-between">
                    <div>
                        <div class="text-xs text-white/50 mb-1">Hướng Đón Tài Lộc</div>
                        <div class="text-white font-medium">Bắc, Đông Nam</div>
                    </div>
                    <div class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center relative">

                        <div class="absolute w-full h-[1px] bg-white/20"></div>
                        <div class="absolute h-full w-[1px] bg-white/20"></div>
                        <div class="absolute w-0 h-0 border-l-[4px] border-r-[4px] border-b-[16px] border-transparent border-b-[#60A5FA] -top-1 pointer-events-none drop-shadow-[0_0_3px_rgba(96,165,250,1)]"></div>
                        <div class="absolute w-0 h-0 border-l-[4px] border-r-[4px] border-b-[16px] border-transparent border-b-gray-400 rotate-180 -bottom-1 drop-shadow-[0_0_3px_rgba(156,163,175,0.8)] pointer-events-none"></div>
                        <span class="text-[8px] absolute top-1 font-bold text-[#60A5FA]">B</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();


</script>