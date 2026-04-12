<template>
    <div class="animated-border-card group cursor-pointer w-full h-full">
        <div class="inner-card-content !border-gold/40 !bg-white/5 !shadow-[0_0_20px_rgba(255,215,0,0.3),inset_0_0_10px_rgba(255,255,255,0.1)] relative flex flex-col p-6 overflow-hidden flex-1 w-full relative">

        <div class="absolute inset-0 bg-gradient-to-t from-accent-purple/0 via-amber-500/0 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        <h2 class="text-xl font-serif text-gold tracking-wider mb-2 relative z-10 drop-shadow-[0_0_5px_rgba(255,215,0,0.5)] text-center w-full">Bản Đồ Linh Hồn</h2>


        <div class="flex-1 flex items-center justify-center relative my-4 min-h-[350px] z-10">

            <div class="w-full max-w-[400px] aspect-square relative">


                <svg viewBox="0 0 400 400" class="w-full h-full overflow-visible">
                    <defs>

                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>


                        <filter id="strong-glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>

                        <radialGradient id="bg-glow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stop-color="rgba(255, 215, 0, 0.15)" />
                            <stop offset="60%" stop-color="rgba(255, 215, 0, 0.05)" />
                            <stop offset="100%" stop-color="rgba(255, 215, 0, 0)" />
                        </radialGradient>
                    </defs>


                    <circle cx="200" cy="200" r="140" fill="url(#bg-glow)" stroke="#ffd700" stroke-width="1" stroke-opacity="0.2" :class="{ 'draw-circle': isLoaded }" />


                    <polygon
                        :points="pentagonPoints"
                        stroke="rgba(255, 215, 0, 0.6)"
                        stroke-width="1"
                        fill="none"
                        filter="url(#glow)"
                        :class="{ 'draw-pentagon': isLoaded, 'opacity-0': !isLoaded }"
                    />


                    <g stroke="rgba(255, 215, 0, 0.2)" stroke-width="1" :class="{ 'draw-stars-line': isLoaded, 'opacity-0': !isLoaded }">
                        <line :x1="points[0].x" :y1="points[0].y" :x2="points[2].x" :y2="points[2].y" />
                        <line :x1="points[2].x" :y1="points[2].y" :x2="points[4].x" :y2="points[4].y" />
                        <line :x1="points[4].x" :y1="points[4].y" :x2="points[1].x" :y2="points[1].y" />
                        <line :x1="points[1].x" :y1="points[1].y" :x2="points[3].x" :y2="points[3].y" />
                        <line :x1="points[3].x" :y1="points[3].y" :x2="points[0].x" :y2="points[0].y" />


                        <line :x1="200" :y1="200" :x2="points[0].x" :y2="points[0].y" />
                        <line :x1="200" :y1="200" :x2="points[1].x" :y2="points[1].y" />
                        <line :x1="200" :y1="200" :x2="points[2].x" :y2="points[2].y" />
                        <line :x1="200" :y1="200" :x2="points[3].x" :y2="points[3].y" />
                        <line :x1="200" :y1="200" :x2="points[4].x" :y2="points[4].y" />
                    </g>





                    <polygon
                        :points="energyPoints"
                        :stroke="mainElementColor"
                        stroke-width="2"
                        :fill="hexToRgba(mainElementColor, 0.2)"
                        filter="url(#glow)"
                        class="energy-polygon"
                    />

                    <polygon
                        :points="energyPoints"
                        stroke="#ffffff"
                        stroke-width="1"
                        fill="none"
                        class="energy-polygon"
                        stroke-opacity="0.5"
                    />


                    <g v-for="(point, index) in dataPoints" :key="'node-'+index" :transform="`translate(${point.x}, ${point.y})`" class="energy-node">

                        <circle cx="0" cy="0" r="14" :fill="labels[index].color" fill-opacity="0.4" filter="url(#glow)" />
                        <circle cx="0" cy="0" r="6" :fill="labels[index].color" fill-opacity="0.8" filter="url(#strong-glow)" />


                        <path d="M 0 -15 L 4 -4 L 15 0 L 4 4 L 0 15 L -4 4 L -15 0 L -4 -4 Z" fill="#ffffff" filter="url(#strong-glow)" />

                        <circle cx="0" cy="0" r="2" fill="#ffffff" />
                    </g>


                    <text v-for="(lbl, i) in labels" :key="'lbl-'+i"
                          :x="lbl.x" :y="lbl.y"
                          :fill="lbl.color"
                          font-size="16"
                          font-family="serif"
                          font-weight="bold"
                          text-anchor="middle"
                          filter="url(#glow)"
                          :class="{ 'fade-in-label': isLoaded, 'opacity-0': !isLoaded }">
                        {{ lbl.text }}
                    </text>
                </svg>


                <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div class="relative flex items-center justify-center">
                        <div class="absolute w-20 h-20 bg-gold/20 rounded-full blur-xl mix-blend-screen pulse-slow"></div>
                        <span class="text-6xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#fff8b0] via-[#ffd700] to-[#d97706] relative z-10" style="text-shadow: 0 0 10px rgba(255,215,0,0.8), 0 0 25px rgba(217,119,6,0.6)">
                            {{ lifePathNumber }}
                        </span>
                    </div>
                </div>
            </div>
        </div>


        <div class="mt-4 p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-gold/10 italic text-sm text-gold/80 text-center font-serif leading-relaxed relative z-10">
            "Sức mạnh không đo lường bằng biên giới,
            <br/>mà bằng tinh thần thấu hiểu."
        </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useDailyEnergy } from '@/composables/useDailyEnergy';

const authStore = useAuthStore();
const { userElement, baseEnergy } = useDailyEnergy();

const lifePathNumber = computed(() => authStore.user?.godNumber || 7);


const cx = 200;
const cy = 200;
const r = 140;

const points = computed(() => {
    const pts = [];
    for (let i = 0; i < 5; i++) {
        const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        pts.push({ x, y });
    }
    return pts;
});

const pentagonPoints = computed(() => {
    return points.value.map(p => `${p.x},${p.y}`).join(' ');
});


const ELEMENT_STYLES = [
    { text: 'Kim', color: '#FFFFFF' },
    { text: 'Mộc', color: '#4ADE80' },
    { text: 'Hỏa', color: '#FF4D4D' },
    { text: 'Thủy', color: '#3B82F6' },
    { text: 'Thổ', color: '#F59E0B' }
];

const mainElementColor = computed(() => {
    const elStyle = ELEMENT_STYLES.find(e => e.text === userElement.value);
    return elStyle ? elStyle.color : '#ffd700';
});


const labels = computed(() => {
    const rLabel = r + 30;
    const lbls = [];
    for (let i = 0; i < 5; i++) {
        const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
        let yOffset = 5;
        if (i === 0) yOffset = 0;
        if (i === 2 || i === 3) yOffset = 10;

        const x = cx + rLabel * Math.cos(angle);
        const y = cy + rLabel * Math.sin(angle) + yOffset;
        lbls.push({ x, y, text: ELEMENT_STYLES[i].text, color: ELEMENT_STYLES[i].color });
    }
    return lbls;
});

const energy = ref([0.1, 0.1, 0.1, 0.1, 0.1]);
const isLoaded = ref(false);

let intervalId;
onMounted(() => {

    setTimeout(() => {
        isLoaded.value = true;
    }, 100);


    setTimeout(() => {
        energy.value = [...baseEnergy.value];


        intervalId = setInterval(() => {
            energy.value = energy.value.map((val, idx) => {
                const base = baseEnergy.value[idx];
                const delta = Math.floor(Math.random() * 11) - 5;
                let newVal = val + delta;


                if(newVal > base + 10) newVal = base + 10;
                if(newVal < base - 10) newVal = base - 10;

                return Math.max(20, Math.min(100, newVal));
            });
        }, 2000);
    }, 3500);
});

onUnmounted(() => {
    clearInterval(intervalId);
});


const dataPoints = computed(() => {
    const pts = [];
    for (let i = 0; i < 5; i++) {
        const percent = energy.value[i] / 100;
        const currentRadius = r * percent;
        const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;

        const x = cx + currentRadius * Math.cos(angle);
        const y = cy + currentRadius * Math.sin(angle);

        pts.push({ x, y });
    }
    return pts;
});

const energyPoints = computed(() => {
    return dataPoints.value.map(p => `${p.x},${p.y}`).join(' ');
});

const hexToRgba = (hex, opacity) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if(result) {
        const r = parseInt(result[1], 16);
        const g = parseInt(result[2], 16);
        const b = parseInt(result[3], 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return `rgba(255, 215, 0, ${opacity})`;
};
</script>

<style scoped>
.draw-circle {
  stroke-dasharray: 900;
  stroke-dashoffset: 900;
  animation: drawLine 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.draw-pentagon {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine 1s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards;
}

.draw-stars-line line {
  stroke-dasharray: 500;
  stroke-dashoffset: 500;
  animation: drawLine 1.5s cubic-bezier(0.4, 0, 0.2, 1) 1s forwards;
}

.fade-in-star {
  opacity: 0;
  transform: scale(0);
  animation: fadeInScale 1.5s cubic-bezier(0.4, 0, 0.2, 1) 2s forwards;
  transform-origin: center;
}

.fade-in-label {
  opacity: 0;
  animation: fadeInLabel 1s ease-out 2.5s forwards;
}

@keyframes drawLine {
  to { stroke-dashoffset: 0; }
}

@keyframes fadeInScale {
  to { opacity: 1; transform: scale(1); }
}

@keyframes fadeInLabel {
  to { opacity: 1; }
}


.energy-polygon {

  transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.energy-node {

  transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;

  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0%   { transform: scale(0.8); fill-opacity: 0.8; }
  50%  { transform: scale(1.4); fill-opacity: 1; stroke: rgba(255, 215, 0, 0.4); stroke-width: 4; }
  100% { transform: scale(0.8); fill-opacity: 0.8; }
}

.energy-node-glow {
  transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
  animation: pulse-glow 2s infinite ease-in-out;
}

@keyframes pulse-glow {
  0%   { transform: scale(0.5); opacity: 0.3; }
  50%  { transform: scale(1.6); opacity: 0.8; }
  100% { transform: scale(0.5); opacity: 0.3; }
}


.star-twinkle {
  transform-origin: center;
  animation: twinkle 3s infinite alternate ease-in-out;
}

@keyframes twinkle {
  0%   { opacity: 0.4; transform: scale(0.7) rotate(0deg); }
  100% { opacity: 1; transform: scale(1.3) rotate(15deg); }
}

.pulse-slow {
  animation: bg-pulse-slow 3s infinite ease-in-out alternate;
}

@keyframes bg-pulse-slow {
  from { opacity: 0.4; transform: scale(0.95); }
  to   { opacity: 0.8; transform: scale(1.1); }
}
</style>