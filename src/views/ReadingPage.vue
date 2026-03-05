<template>
  <div class="reading-page min-h-screen pt-24 pb-12 px-4 relative flex flex-col items-center">


    <div class="text-center mb-10 animate-fade-in relative z-10">
        <h2 class="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold-dark tracking-widest glowing-text-gold uppercase">
            XEM QUẺ MỆNH
        </h2>
        <div class="h-1 w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4 drop-shadow-[0_0_8px_rgba(255,184,0,0.8)]"></div>
    </div>


    <canvas id="fireworksCanvas" class="fixed inset-0 pointer-events-none z-[60] w-full h-full"></canvas>


    <div class="w-full max-w-2xl mb-12 animate-slide-up-fade relative z-10">
        <div class="relative group">
            <input
                v-model="question"
                type="text"
                placeholder="Hỏi về bất cứ điều gì bạn đang băn khoăn..."
                class="w-full bg-black/40 border border-gold/30 rounded-full py-3 px-8 pr-16 text-white placeholder-white/40 focus:outline-none focus:border-gold/60 focus:bg-black/60 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                @keyup.enter="handleDraw"
            />
            <button @click="handleDraw" class="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gold hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
        </div>
        <div class="flex flex-wrap justify-center gap-6 mt-6 text-xs md:text-sm font-serif select-none">
            <span v-for="tag in suggestions" :key="tag" class="text-gold-light brightness-110 drop-shadow-[0_0_5px_rgba(255,215,0,0.4)] uppercase tracking-[0.15em] font-bold">{{ tag }}</span>
        </div>

        <div class="flex justify-center mt-10">
            <button
                @click="handleDraw"
                :disabled="isLoading"
                class="gieo-que-btn-super group overflow-hidden"
            >
                <div class="absolute inset-0 bg-gradient-to-r from-gold via-purple-600 to-gold bg-[length:200%_auto] animate-gradient-slow opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:animate-shine transition-all"></div>
                <span class="relative z-10 font-serif font-black text-[10px] md:text-xs tracking-[0.2em] text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                    {{ isLoading ? 'Đang phân tích...' : 'Xem Kết Quả' }}
                </span>
            </button>
        </div>
    </div>


    <div class="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 px-4 relative">


        <div class="flex flex-col items-center relative">
            <div class="mb-6 flex flex-col items-center">
                <h3 class="text-2xl font-serif text-gold-light tracking-widest uppercase mb-1 drop-shadow-[0_0_5px_rgba(255,184,0,0.5)]">Thông điệp Tarot</h3>
                <div class="w-24 h-[1px] bg-gold/40"></div>
            </div>

            <div class="relative w-64 h-96 flex items-center justify-center">
                <div
                    class="card-container perspective w-full h-full transition-all duration-1000"
                    :class="{
                        'is-flipped': result && !isSpinning,
                        'is-spinning': isSpinning
                    }"
                >
                    <div class="card-inner">

                        <div v-if="!result || isSpinning" class="card-front bg-black/40 border-2 border-gold/40 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                            <img src="https://res.cloudinary.com/drac9ko3l/image/upload/v1772453096/image_Pippit_202603021904_1_yfjtoh.png" alt="Tarot Back" class="w-full h-full object-cover" loading="lazy">
                        </div>

                        <div class="card-back bg-black/60 border-4 border-gold rounded-xl overflow-hidden shadow-[0_0_30px_rgba(255,184,0,0.4)]">
                            <img :src="result?.tarotImage" class="w-full h-full object-cover" loading="lazy">
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-8 text-center" v-if="result && !isSpinning">
                 <h4 class="text-gold font-serif text-xl tracking-widest uppercase mb-2">{{ result?.tarotName }}</h4>
            </div>
        </div>


        <div class="hidden md:block absolute left-1/2 bottom-0 top-32 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-gold/60 to-transparent shadow-[0_0_10px_rgba(255,184,0,0.3)]"></div>


        <div class="flex flex-col items-center relative">
            <div class="mb-6 flex flex-col items-center">
                <h3 class="text-2xl font-serif text-gold-light tracking-widest uppercase mb-1 drop-shadow-[0_0_5px_rgba(255,184,0,0.5)]">Trí tuệ Kinh Dịch</h3>
                <div class="w-24 h-[1px] bg-gold/40"></div>
            </div>

            <div class="relative w-64 h-96 flex items-center justify-center">
                <div
                    class="card-container perspective w-full h-full transition-all duration-1000"
                    :class="{
                        'is-flipped': result && !isSpinning,
                        'is-spinning': isSpinning
                    }"
                >
                    <div class="card-inner">

                        <div v-if="!result || isSpinning" class="card-front bg-black/40 border-2 border-gold/40 rounded-xl flex items-center justify-center p-0 overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                            <img src="https://res.cloudinary.com/drac9ko3l/image/upload/v1772078974/ChatGPT_Image_15_14_00_13_thg_2_2026_s7ufpx.png" class="w-48 h-48 opacity-80 object-cover" alt="I-Ching Back" loading="lazy">
                        </div>

                        <div class="card-back bg-black/60 border-4 border-gold rounded-xl flex flex-col items-center justify-center p-6 shadow-[0_0_30px_rgba(255,184,0,0.4)]">
                            <div v-if="result" class="flex flex-col items-center text-center w-full">

                                <div class="hexagram-drawing flex flex-col-reverse gap-3 mb-6 w-full max-w-[120px]">
                                    <div
                                        v-for="(line, index) in result.hexBinary.split('')"
                                        :key="index"
                                        class="hex-line h-3 w-full"
                                    >
                                        <div v-if="line === '1'" class="w-full h-full bg-gold shadow-[0_0_10px_rgba(255,184,0,0.5)] rounded-sm"></div>
                                        <div v-else class="w-full h-full flex justify-between">
                                            <div class="w-[42%] h-full bg-gold shadow-[0_0_10px_rgba(255,184,0,0.5)] rounded-sm"></div>
                                            <div class="w-[42%] h-full bg-gold shadow-[0_0_10px_rgba(255,184,0,0.5)] rounded-sm"></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="relative mb-3">
                                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-gold via-yellow-400 to-amber-600 flex items-center justify-center text-white font-serif font-black text-lg shadow-[0_0_10px_rgba(255,184,0,0.4)] border-2 border-white/20">
                                        {{ result?.hexNumber }}
                                    </div>
                                </div>

                                <div class="text-white text-xl font-serif font-bold tracking-widest uppercase">{{ result?.hexName }}</div>
                                <div class="h-[1px] w-14 bg-gold/40 mt-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-8 text-center" v-if="result && !isSpinning">
                 <h4 class="text-gold font-serif text-xl tracking-widest uppercase mb-2">{{ result?.hexName }}</h4>
            </div>
        </div>
    </div>


    <div v-if="result" class="w-full max-w-4xl animate-slide-up-fade">
        <div class="bg-black/60 border border-gold/40 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)]">


            <div class="flex border-b border-gold/20">
                <button
                    v-for="(label, key) in tabs"
                    :key="key"
                    @click="activeTab = key"
                    class="flex-1 py-4 text-xs md:text-sm font-serif tracking-widest uppercase transition-all duration-300"
                    :class="activeTab === key ? 'text-gold bg-gold/10' : 'text-white/40 hover:text-white/80 hover:bg-white/5'"
                >
                    {{ label }}
                </button>
            </div>


            <div class="p-8 md:p-12 min-h-[300px] prose prose-invert max-w-none">
                <div v-show="activeTab === 'tarot'" class="animate-fade-in">
                    <h5 class="text-gold font-serif text-xl mb-4 uppercase tracking-widest">Chi tiết lá bài "{{ result?.tarotName }}"</h5>
                    <p class="text-white/90 leading-relaxed font-sans">{{ result?.tarotMeaning }}</p>
                </div>
                <div v-show="activeTab === 'iching'" class="animate-fade-in">
                    <h5 class="text-gold font-serif text-xl mb-4 uppercase tracking-widest">Chi tiết quẻ dịch "{{ result?.hexName }}"</h5>
                    <p class="text-white/90 leading-relaxed font-sans">{{ result?.hexMeaning }}</p>
                </div>
                <div v-show="activeTab === 'ai'" class="animate-fade-in">
                    <div class="ai-typing-container">
                        <p class="text-gold-light leading-relaxed font-serif text-lg italic whitespace-pre-line">{{ typedAiInsight }}<span v-if="isTyping" class="cursor">|</span></p>
                    </div>
                </div>
            </div>


            <div class="flex flex-wrap border-t border-gold/20 p-6 gap-4 justify-center">
                <button @click="handleDraw" :disabled="isTyping || isLoading" class="secondary-btn">
                    Làm Quẻ Mới
                </button>
                <button @click="saveToJournal" :disabled="isSaving || isTyping || hasSaved" class="secondary-btn flex items-center gap-2" :class="{'opacity-50 cursor-not-allowed': hasSaved}">
                    <svg v-if="isSaving" class="animate-spin h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path v-if="hasSaved" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        <path v-else d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.246 18.477 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke-width="2"/>
                    </svg>
                    {{ isSaving ? 'Đang lưu...' : (hasSaved ? 'Đã Lưu Vào Nhật Ký' : 'Lưu Vào Nhật Ký') }}
                </button>
                <button @click="share" :disabled="isTyping" class="secondary-btn flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" stroke-width="2"/></svg>
                    Chia Sẻ Ẩn Danh
                </button>
            </div>
        </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import api from '@/services/api';
import { cosmicToast as toast } from '@/utils/toast';

const question = ref('');
const isLoading = ref(false);
const result = ref(null);
const activeTab = ref('ai');
const typedAiInsight = ref('');
const isTyping = ref(false);
const isSpinning = ref(false);
const isLaunchingFireworks = ref(false);
const hasSaved = ref(false);

const suggestions = ['Tình yêu', 'Công việc', 'Sức khỏe', 'Tài chính', 'Học tập'];

const tabs = {
  ai: 'Lời Khuyên Tổng Hợp',
  tarot: 'Giải Thích Tarot',
  iching: 'Giải Thích Kinh Dịch'
};


let canvas, ctx, animationId;
const fireworks = [];
const colors = ['#ff0044', '#ff7700', '#ffff00', '#00ff88', '#00ccff', '#aa00ff', '#ff00aa', '#ffffff', '#ff69b4', '#00ffcc'];

class Particle {
  constructor(x, y, color) {
    this.x = x; this.y = y; this.color = color;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 6 + 3;
    this.friction = 0.97;
    this.gravity = 0.06;
    this.alpha = 1;
    this.size = Math.random() * 4 + 1;
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = Math.sin(this.angle) * this.speed;
  }
  update() {
    this.vx *= this.friction; this.vy *= this.friction;
    this.vy += this.gravity;
    this.x += this.vx; this.y += this.vy;
    this.alpha -= 0.01;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.restore();
  }
}

class Firework {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.targetY = Math.random() * (canvas.height * 0.6) + 50;
    this.speed = Math.random() * 5 + 7;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.exploded = false;
    this.particles = [];
  }
  update() {
    if (!this.exploded) {
      this.y -= this.speed;
      if (this.y <= this.targetY) this.explode();
    } else {
      this.particles.forEach(p => p.update());
      this.particles = this.particles.filter(p => p.alpha > 0);
    }
  }
  draw() {
    if (!this.exploded) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    } else {
      this.particles.forEach(p => p.draw());
    }
  }
  explode() {
    this.exploded = true;
    const count = Math.random() * 80 + 100;
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(this.x, this.y, this.color));
    }
  }
}

const animateFireworks = () => {
    animationId = requestAnimationFrame(animateFireworks);
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    if (isLaunchingFireworks.value && Math.random() < 0.1) {
        fireworks.push(new Firework());
    }

    fireworks.forEach((fw, i) => {
        fw.update();
        fw.draw();
        if (fw.exploded && fw.particles.length === 0) fireworks.splice(i, 1);
    });
};

onMounted(() => {
    canvas = document.getElementById('fireworksCanvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    animateFireworks();
});

onUnmounted(() => {
    cancelAnimationFrame(animationId);
});


const handleDraw = async () => {
    if (isLoading.value) return;

    isLoading.value = true;
    isSpinning.value = true;
    isLaunchingFireworks.value = false;
    hasSaved.value = false;
    result.value = null;
    typedAiInsight.value = '';

    try {
        const response = await api.post('/reading/draw', { question: question.value });


        setTimeout(() => {
            isSpinning.value = false;
            result.value = response.data;
            activeTab.value = 'ai';


            isLaunchingFireworks.value = true;
            setTimeout(() => { isLaunchingFireworks.value = false; }, 3000);

            startTyping(response.data.aiInterpretation);
            toast.success('Vũ trụ đã hồi đáp lời thỉnh cầu của bạn.');
            isLoading.value = false;
        }, 3000);

    } catch (error) {
        console.error('Lỗi khi rút thẻ:', error);
        toast.error(error.response?.data || 'Không thể kết nối với vũ trụ. Hãy thử lại!');
        isSpinning.value = false;
        isLoading.value = false;
    }
};

let typingInterval = null;
const startTyping = (text) => {
    if (typingInterval) clearInterval(typingInterval);
    isTyping.value = true;
    let i = 0; 
    typedAiInsight.value = '';
    
    typingInterval = setInterval(() => {
        if (i < text.length) {
            typedAiInsight.value += text[i];
            i++;
        } else {
            clearInterval(typingInterval);
            typingInterval = null;
            isTyping.value = false;
        }
    }, 20);
};

const isSaving = ref(false);
const saveToJournal = async () => {
    if (!result.value || isSaving.value || hasSaved.value) return;

    isSaving.value = true;
    try {
        await api.post('/reading/save-journal', {
            question: question.value,
            tarotId: result.value.tarotId,
            hexId: result.value.hexId,
            aiInterpretation: result.value.aiInterpretation
        });
        hasSaved.value = true;
        toast.success('Hành trình tâm linh đã được ghi lại!');
    } catch (error) {
        toast.error('Lỗi khi lưu nhật ký: ' + (error.response?.data || error.message));
    } finally {
        isSaving.value = false;
    }
};
const share = () => { toast.info('Hệ thống đang chuẩn bị bản chia sẻ ẩn danh...'); };
</script>

<style scoped>
.reading-page {

    background: radial-gradient(circle at center, rgba(139, 92, 246, 0.05) 0%, transparent 70%);
}

.gieo-que-btn-super {
    position: relative;
    padding: 0.625rem 1.5rem;
    border-width: 2px;
    border-color: rgba(255, 184, 0, 0.8);
    color: white;
    border-radius: 0.75rem;
    transition-property: all;
    transition-duration: 500ms;
    box-shadow: 0 0 20px rgba(255, 184, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
}

.gieo-que-btn-super:not(:disabled):hover {
    transform: scale(1.1);
    border-color: white;
    box-shadow: 0 0 50px rgba(168, 85, 247, 0.5), 0 0 20px rgba(255, 215, 0, 0.8);
}

.gieo-que-btn-super:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    filter: grayscale(1);
}

@keyframes gradient-slow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

@keyframes shine {
    0% { transform: translateX(-150%) skewX(-30deg); }
    100% { transform: translateX(250%) skewX(-30deg); }
}

.animate-gradient-slow {
    animation: gradient-slow 4s ease infinite;
}

.group-hover\:animate-shine {

}

.group:hover .group-hover\:animate-shine {
    animation: shine 2s infinite;
}

.secondary-btn {
    padding: 0.5rem 1.5rem;
    border-width: 1px;
    border-color: rgba(255, 184, 0, 0.3);
    color: rgba(255, 255, 255, 0.8);
    font-family: sans-serif;
    font-size: 0.875rem;
    line-height: 1.25rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border-radius: 9999px;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
}

.secondary-btn:hover {
    border-color: #FFB800;
    color: #FFB800;
    background-color: rgba(255, 184, 0, 0.05);
}


.perspective {
    perspective: 1000px;
}

.card-container {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes spin-infinite {
    0% { transform: rotateY(0deg); }
    100% { transform: rotateY(360deg); }
}

.is-spinning {
    animation: spin-infinite 0.8s linear infinite;
}

.is-flipped {
    transform: rotateY(180deg) !important;
}

.card-inner {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
}

.card-front, .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
}

.card-back {
    transform: rotateY(180deg);
}


.firework {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    animation: firework-burst 2s ease-out infinite;
    opacity: 0;
}

@keyframes firework-burst {
    0% { transform: scale(0.1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.8; }
    100% { transform: scale(3); opacity: 0; }
}


@keyframes text-pulse {
  from { text-shadow: 0 0 10px rgba(255,184,0,0.4); }
  to { text-shadow: 0 0 20px rgba(255,184,0,1), 0 0 40px rgba(255,255,255,0.4); }
}

.animate-pulse-slow {
    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 0.1; }
    50% { opacity: 0.3; }
}

.animate-fade-in {
    animation: fadeIn 1s ease-out forwards;
}

.animate-slide-up-fade {
    animation: slideUpFade 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUpFade {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes spin-extremely-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-extremely-slow {
  animation: spin-extremely-slow 60s linear infinite;
}

.cursor {
    animation: blink 1s step-end infinite;
}

@keyframes blink {
    from, to { opacity: 1; }
    50% { opacity: 0; }
}


.prose h5 {
    color: #FFB800;
    font-family: serif;
    font-size: 1.25rem;
    line-height: 1.75rem;
    border-left-width: 4px;
    border-color: #FFB800;
    padding-left: 1rem;
}
</style>