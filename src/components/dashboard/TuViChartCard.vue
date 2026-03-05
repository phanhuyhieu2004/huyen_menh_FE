<template>
    <div class="animated-border-card group cursor-pointer h-full">
        <div class="inner-card-content !border-[#F87171]/30 !bg-[#2A1515]/60 !shadow-[0_0_20px_rgba(248,113,113,0.15)] relative flex flex-col p-6 overflow-hidden h-full">

            <h2 class="text-xl font-serif text-[#F87171] tracking-wider mb-2 drop-shadow-md">
                12 Cung Tử Vi
            </h2>
            <p class="text-white/50 text-xs mb-4">Lá Số Mệnh Bàn (TuVi JS)</p>

            <div class="flex-1 flex items-center justify-center relative my-4">
                <svg viewBox="0 0 200 200" class="w-full max-w-[250px] aspect-square overflow-visible">
                    <defs>
                        <filter id="red-glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>


                    <circle cx="100" cy="100" r="95" fill="none" stroke="#F87171" stroke-width="1" stroke-dasharray="2, 4" class="spin-slow-reverse" />


                    <g v-for="(cung, i) in 12" :key="'cung-'+i" :transform="`translate(100, 100) rotate(${i * 30 - 90}) translate(80, 0)`">

                        <circle cx="0" cy="0" r="12" :fill="i === 1 ? '#EF4444' : '#1A1025'" :stroke="i === 1 ? '#FCA5A5' : '#4B5563'" stroke-width="1" :filter="i === 1 ? 'url(#red-glow)' : ''" />
                        <text x="0" y="3" font-size="8" :fill="i === 1 ? '#FFF' : '#9CA3AF'" text-anchor="middle" font-weight="bold" :transform="`rotate(${-(i * 30 - 90)})`">
                            {{ CUNG_NAMES[i-1] }}
                        </text>
                    </g>


                    <polygon points="100,20 169,60 169,140 100,180 31,140 31,60" fill="none" stroke="rgba(248,113,113,0.2)" stroke-width="1" />
                    <circle cx="100" cy="100" r="2" fill="#F87171" filter="url(#red-glow)"/>
                </svg>
            </div>


            <div class="bg-gradient-to-r from-[#F87171]/20 to-transparent p-3 rounded-xl border-l-2 border-[#F87171] mt-4 z-10">
                <div class="flex items-center gap-2 mb-1">
                    <span class="text-white font-bold text-sm">Cung Mệnh: Tý</span>
                    <span class="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full border border-red-500/30">Chính tinh đắc địa</span>
                </div>
                <p class="text-white/70 text-xs leading-relaxed">
                    Sự nghiệp và bản mệnh của bạn được bảo hộ bởi Tử Vi & Thiên Phủ. Bạn có khả năng lãnh đạo bẩm sinh và đường hậu vận vững chắc.
                </p>
            </div>

        </div>
    </div>
</template>

<script setup>

const CUNG_NAMES = ['MỆNH', 'B.MẪU', 'P.ĐỨC', 'Đ.TRẠCH', 'Q.LỘC', 'N.BỘC', 'T.DI', 'T.ÁCH', 'T.BẠCH', 'T.TỨC', 'P.THÊ', 'H.ĐỆ'];
</script>

<style scoped>
.spin-slow-reverse {
    animation: spinReverse 120s linear infinite;
    transform-origin: center;
}
@keyframes spinReverse {
    100% { transform: rotate(-360deg); }
}
</style>