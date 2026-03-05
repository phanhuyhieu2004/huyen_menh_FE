<template>
    <div class="flex flex-col items-center justify-center min-h-screen px-4 font-sans relative z-10 w-full overflow-hidden bg-transparent">


        <div class="absolute inset-0 pointer-events-none z-0 opacity-25" style="background: transparent url('https://www.transparenttextures.com/patterns/stardust.png') repeat;"></div>


        <div class="text-center mb-6 mt-12 z-20">
            <h2 class="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold-dark mb-3 tracking-wider glowing-text-gold drop-shadow-[0_0_10px_rgba(255,184,0,0.8)]">
                Khai Mở Thiên Mệnh
            </h2>
            <p class="text-sm md:text-base text-gold/80 font-sans tracking-[0.1em] uppercase shadow-black drop-shadow-md">
                Hoàn thiện thông tin để bắt đầu
            </p>
        </div>


        <div class="relative w-full max-w-4xl mx-auto flex justify-center items-center mt-4 mb-20 lg:mb-12">


            <div class="absolute inset-0 z-0 raging-fire-ring rounded-full pointer-events-none w-[70%] h-[70%] max-w-[500px] max-h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>


            <img
                src="https://res.cloudinary.com/drac9ko3l/image/upload/v1772100726/snapedit_1772100684808_lguqpi.png"
                alt="Natra Gateway"
                class="w-full h-auto object-contain max-h-[70vh] drop-shadow-[0_0_50px_rgba(255,100,0,0.5)] relative z-10"
            />


            <form @submit.prevent="handleCompleteOnboarding" class="absolute inset-0 w-full h-full pointer-events-none z-30" novalidate>


                <div class="absolute top-[15%] left-[10%] md:left-[10%] w-[35%] md:w-[22%] flex items-center justify-center z-40">
                    <div v-if="meteorsActive[0]" class="meteor fall-left pointer-events-none"></div>

                    <div v-if="impactsActive[0]" class="impact pointer-events-none">
                        <div v-for="s in impactSparks[0]" :key="'sk0-'+s.id" class="spark" :style="{'--dx': s.dx, '--dy': s.dy}"></div>
                        <div v-for="st in impactStars[0]" :key="'st0-'+st.id" class="star4" :style="{left: st.x, top: st.y}"></div>
                    </div>

                    <div :class="['cosmic-input', { 'active': showInputs[0] }]">
                        <div class="w-full pointer-events-auto input-glow-wrap transform -rotate-6 relative">
                            <input v-model.trim="form.fullName" type="text" class="natra-input" placeholder="Họ tên" autocomplete="off" />
                        </div>
                    </div>
                </div>


                <div class="absolute top-[15%] right-[10%] md:right-[10%] w-[35%] md:w-[22%] flex items-center justify-center z-40">
                    <div v-if="meteorsActive[1]" class="meteor fall-right pointer-events-none"></div>

                    <div v-if="impactsActive[1]" class="impact pointer-events-none">
                        <div v-for="s in impactSparks[1]" :key="'sk1-'+s.id" class="spark" :style="{'--dx': s.dx, '--dy': s.dy}"></div>
                        <div v-for="st in impactStars[1]" :key="'st1-'+st.id" class="star4" :style="{left: st.x, top: st.y}"></div>
                    </div>

                    <div :class="['cosmic-input', { 'active': showInputs[1] }]">
                        <div class="w-full pointer-events-auto input-glow-wrap transform rotate-6 relative">

                            <div class="relative w-full">
                                <input v-model="form.dob"
                                       type="date"
                                       class="natra-input" />

                            </div>
                        </div>
                    </div>
                </div>


                <div class="absolute top-[55%] left-[10%] md:left-[10%] w-[35%] md:w-[22%] flex items-center justify-center z-40">
                    <div v-if="meteorsActive[2]" class="meteor fall-left pointer-events-none"></div>
                    <div v-if="impactsActive[2]" class="impact pointer-events-none">
                        <div v-for="s in impactSparks[2]" :key="'sk2-'+s.id" class="spark" :style="{'--dx': s.dx, '--dy': s.dy}"></div>
                        <div v-for="st in impactStars[2]" :key="'st2-'+st.id" class="star4" :style="{left: st.x, top: st.y}"></div>
                    </div>
                    <div :class="['cosmic-input', { 'active': showInputs[2] }]">
                        <div class="w-full pointer-events-auto input-glow-wrap transform -rotate-12 relative">
                            <input v-model="form.hour" type="number" min="0" max="23" pattern="[0-9]*" class="natra-input font-mono text-lg font-bold" placeholder="Giờ" />
                        </div>
                    </div>
                </div>


                <div class="absolute top-[55%] right-[10%] md:right-[10%] w-[35%] md:w-[22%] flex items-center justify-center z-40">
                    <div v-if="meteorsActive[3]" class="meteor fall-right pointer-events-none"></div>
                    <div v-if="impactsActive[3]" class="impact pointer-events-none">
                        <div v-for="s in impactSparks[3]" :key="'sk3-'+s.id" class="spark" :style="{'--dx': s.dx, '--dy': s.dy}"></div>
                        <div v-for="st in impactStars[3]" :key="'st3-'+st.id" class="star4" :style="{left: st.x, top: st.y}"></div>
                    </div>
                    <div :class="['cosmic-input', { 'active': showInputs[3] }]">
                        <div class="w-full pointer-events-auto input-glow-wrap transform rotate-12 relative">
                            <input v-model="form.minute" type="number" min="0" max="59" pattern="[0-9]*" class="natra-input font-mono text-lg font-bold" placeholder="Phút" />
                        </div>
                    </div>
                </div>


                <div class="absolute bottom-[-5%] md:bottom-[0%] left-[50%] -translate-x-1/2 w-[80%] md:w-[45%] z-40 mt-8 pb-10">
                    <Transition name="btn-materialize">
                        <button v-show="showButton" :disabled="isLoading" type="submit" class="w-full pointer-events-auto px-4 py-4 md:py-5 font-bold tracking-widest text-[#1a130a] bg-gradient-to-r from-gold-light via-gold to-gold-dark rounded-full shadow-[0_0_40px_rgba(255,184,0,0.9)] hover:shadow-[0_0_60px_rgba(255,184,0,1)] hover:scale-105 transition-all duration-300 border-[3px] border-white/40 uppercase text-base md:text-lg flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed">
                            Tính Toán Thiên Mệnh
                        </button>
                    </Transition>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { cosmicToast as toast } from '@/utils/toast';
import api from '@/services/api';
import { useUiStore } from '@/stores/ui';

const router = useRouter();


const meteorsActive = reactive([false, false, false, false]);
const impactsActive = reactive([false, false, false, false]);
const showInputs = reactive([false, false, false, false]);
const showButton = ref(false);

const impactSparks = reactive([[], [], [], []]);
const impactStars = reactive([[], [], [], []]);

const form = reactive({
    fullName: '',
    dob: '',
    hour: '',
    minute: ''
});

const isLoading = ref(false);

const validateFullName = () => {
    if (!form.fullName.trim()) return true;
    if (form.fullName.trim().length < 2) {
        console.error('Tên quá ngắn');
        toast.error('Họ tên cần tối thiểu 2 ký tự');
        return false;
    }
    return true;
};

const validateDob = () => {
    if (!form.dob) return true;
    const dobDate = new Date(form.dob);
    if (isNaN(dobDate.getTime())) {
        console.error('Ngày sinh không hợp lệ:', form.dob);
        toast.error('Ngày sinh không hợp lệ');
        return false;
    } else if (dobDate > new Date()) {
        console.error('Ngày sinh tương lai:', form.dob);
        toast.error('Ngày sinh không thể ở tương lai');
        return false;
    } else if (dobDate.getFullYear() < 1900) {
        console.error('Năm sinh quá cũ:', form.dob);
        toast.error('Năm sinh tối thiểu là 1900');
        return false;
    }
    return true;
};

const validateHour = (e) => {
    if (form.hour === '') return true;
    let h = parseInt(form.hour);
    if (isNaN(h) || h < 0 || h > 23) {
        if (h < 0) form.hour = '0';
        if (h > 23) form.hour = '23';
        console.error('Giờ không hợp lệ:', form.hour);
        toast.error('Giờ sinh phải từ 0-23');
        return false;
    }
    return true;
};

const validateMinute = (e) => {
    if (form.minute === '') return true;
    let m = parseInt(form.minute);
    if (isNaN(m) || m < 0 || m > 59) {
        if (m < 0) form.minute = '0';
        if (m > 59) form.minute = '59';
        console.error('Phút không hợp lệ:', form.minute);
        toast.error('Phút sinh phải từ 0-59');
        return false;
    }
    return true;
};

const validateOnboardingForm = () => {
    if (!form.fullName.trim()) {
        toast.error('Vui lòng điền họ tên');
        return false;
    }
    if (!form.dob) {
        toast.error('Vui lòng điền ngày sinh');
        return false;
    }
    if (form.hour === '') {
        toast.error('Vui lòng điền giờ sinh');
        return false;
    }
    if (form.minute === '') {
        toast.error('Vui lòng điền phút sinh');
        return false;
    }

    return validateFullName() && validateDob() && validateHour() && validateMinute();
};



function spawnImpact(idx) {

    const sparks = [];
    for(let i = 0; i < 18; i++){
      const a = Math.random() * Math.PI * 2;
      const r = 40 + Math.random() * 80;
      sparks.push({
          id: i,
          dx: Math.cos(a) * r + 'px',
          dy: Math.sin(a) * r + 'px'
      });
    }
    impactSparks[idx] = sparks;


    const stars = [];
    for(let i = 0; i < 8; i++){
      const a = Math.random() * Math.PI * 2;
      const r = 30 + Math.random() * 90;
      stars.push({
          id: i,
          x: Math.cos(a) * r + 'px',
          y: Math.sin(a) * r + 'px'
      });
    }
    impactStars[idx] = stars;
}

onMounted(() => {
    const hasOnboarded = localStorage.getItem('hasOnboarded') === 'true';
    if (hasOnboarded) {
        toast.info("Bạn đã hoàn tất thông tin sinh rồi.");
        router.push('/app');
        return;
    }


    const sequence = [
        { start: 500, idx: 0 },
        { start: 1600, idx: 1 },
        { start: 2700, idx: 2 },
        { start: 3800, idx: 3 },
    ];

    sequence.forEach(({ start, idx }) => {
        setTimeout(() => {
            meteorsActive[idx] = true;


            setTimeout(() => {
                meteorsActive[idx] = false;


                spawnImpact(idx);
                impactsActive[idx] = true;

                setTimeout(() => {
                    showInputs[idx] = true;
                }, 100);


                setTimeout(() => {
                    impactsActive[idx] = false;
                }, 700);

            }, 1200);

        }, start);
    });


    setTimeout(() => {
        showButton.value = true;
    }, 6000);
});

const handleCompleteOnboarding = async () => {
    if (isLoading.value) return;
    if (!validateOnboardingForm()) return;

    const uiStore = useUiStore();
    uiStore.setGlobalLoading(true);
    try {
        await api.post('/profiles/onboard', {
            fullName: form.fullName,
            dob: form.dob,
            hour: parseInt(form.hour),
            minute: parseInt(form.minute)
        });

        localStorage.setItem('hasOnboarded', 'true');
        toast.success("Khai mở thiên mệnh thành công! Vũ trụ đã sẵn sàng.");


        form.fullName = '';
        form.dob = '';
        form.hour = '';
        form.minute = '';

        setTimeout(() => {
            router.push('/app');
        }, 1500);

    } catch (error) {

    } finally {
        uiStore.setGlobalLoading(false);
    }
};
</script>

<style scoped>

.meteor {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 12px #fff, 0 0 40px #b388ff;
  pointer-events: none;
  z-index: 50;
}


.meteor.fall-left {
  animation: fall-left 1.2s ease-out forwards;
}

.meteor.fall-left::after {
  content: "";
  position: absolute;
  top: 50%;
  left: -160px;
  width: 160px;
  height: 2px;
  background: linear-gradient(90deg, rgba(255,255,255,0), #fff);
  transform: translateY(-50%);
  filter: blur(2px);
}

@keyframes fall-left {
  0% { transform: translate(-40vw, -60vh) rotate(45deg); opacity: 0; }
  5% { opacity: 1; }
  100% { transform: translate(-50%, -50%) rotate(45deg); opacity: 1; }
}


.meteor.fall-right {
  animation: fall-right 1.2s ease-out forwards;
}

.meteor.fall-right::after {
  content: "";
  position: absolute;
  top: 50%;
  right: -160px;
  width: 160px;
  height: 2px;
  background: linear-gradient(-90deg, rgba(255,255,255,0), #fff);
  transform: translateY(-50%);
  filter: blur(2px);
}

@keyframes fall-right {
  0% { transform: translate(40vw, -60vh) rotate(-45deg); opacity: 0; }
  5% { opacity: 1; }
  100% { transform: translate(-50%, -50%) rotate(-45deg); opacity: 1; }
}



.impact{
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  pointer-events:none;
  z-index: 55;
}


.spark{
  position:absolute;
  width:6px;
  height:6px;
  border-radius:50%;
  background:radial-gradient(circle,#fff 0%,#e6ccff 60%,rgba(255,255,255,0) 70%);
  box-shadow:0 0 8px #fff,0 0 18px #b388ff;
  animation:dust .6s ease-out forwards;
}

@keyframes dust{
  0%{opacity:1; transform:translate(0,0) scale(1)}
  100%{opacity:0; transform:translate(var(--dx),var(--dy)) scale(0.2)}
}


.star4{
  position:absolute;
  width:10px;
  height:10px;
  filter:drop-shadow(0 0 6px #fff) drop-shadow(0 0 14px #b388ff);
  animation:twinkle .7s ease-out forwards;
}

.star4::before, .star4::after{
  content:"";
  position:absolute;
  left:50%;
  top:50%;
  width:2px;
  height:100%;
  background:#fff;
  transform-origin:center;
}

.star4::before{transform:translate(-50%,-50%) rotate(0deg)}
.star4::after{transform:translate(-50%,-50%) rotate(90deg)}

@keyframes twinkle{
  0%{opacity:0; transform:translate(-50%,-50%) scale(0) rotate(45deg)}
  50%{opacity:1; transform:translate(-50%,-50%) scale(1.2) rotate(45deg)}
  100%{opacity:0; transform:translate(-50%,-50%) scale(0.6) rotate(45deg)}
}


.cosmic-input {
  position: relative;
  width: 100%;
  transform: scale(0);
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 40;
}

.cosmic-input.active {
  transform: scale(1);
}


.btn-materialize-enter-active {
    transition: all 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.btn-materialize-enter-from {
    opacity: 0;
    transform: translateY(50px) scale(0.8);
    filter: blur(10px) drop-shadow(0 0 30px #FFB800);
}

.natra-input {
    width: 100%;
    padding: 0.75rem 1rem;
    background: rgba(10, 0, 20, 0.8);
    border: 1px solid rgba(255, 184, 0, 0.5);
    border-radius: 9999px;
    color: white;
    font-size: 0.875rem;
    outline: none;
    transition: all 0.3s ease;
    box-shadow: inset 0 0 15px rgba(0,0,0,0.9), 0 0 15px rgba(255, 184, 0, 0.2);
    backdrop-filter: blur(12px);
    text-align: center;
}

.natra-input:focus {
    border-color: #FFB800;
    box-shadow: inset 0 0 15px rgba(0,0,0,0.9), 0 0 25px rgba(255, 184, 0, 0.6);
}

.natra-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
}


.natra-input::-webkit-calendar-picker-indicator {
    filter: invert(0.8) sepia(100%) saturate(1000%) hue-rotate(10deg) brightness(1.5);
    cursor: pointer;
    background-color: transparent;
    padding: 5px;
}

.input-glow-wrap::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 9999px;
    background: linear-gradient(45deg, transparent, rgba(255,184,0,0.6), transparent);
    z-index: -1;
    filter: blur(6px);
    opacity: 0;
    transition: opacity 0.3s;
}

.input-glow-wrap:focus-within::after {
    opacity: 1;
}


.glowing-text-gold {
  text-shadow: 0 0 15px rgba(255, 184, 0, 0.8), 0 0 30px rgba(204, 147, 0, 0.6);
  animation: text-pulse 3s infinite alternate;
}

@keyframes text-pulse {
  from { text-shadow: 0 0 10px rgba(255, 184, 0, 0.6), 0 0 20px rgba(204, 147, 0, 0.4); }
  to { text-shadow: 0 0 20px rgba(255, 184, 0, 1), 0 0 40px rgba(204, 147, 0, 0.8); }
}


.raging-fire-ring {
    box-shadow:
        0 0 100px 40px rgba(255, 30, 0, 0.9),
        0 0 200px 80px rgba(255, 80, 0, 0.8),
        inset 0 0 100px 30px rgba(255, 120, 0, 0.7);
    animation: blazing-fire 1.5s infinite alternate linear, pulse-fire 2s infinite ease-in-out;
    filter: blur(5px) contrast(1.5) brightness(1.2);

    border-radius: 46% 54% 45% 55% / 54% 46% 54% 46%;
    background: radial-gradient(circle, rgba(255,50,0,0.3) 20%, transparent 70%);
}

@keyframes blazing-fire {
    0% { transform: translate(-50%, -50%) rotate(0deg) scale(0.9); opacity: 0.8; }
    50% { border-radius: 54% 46% 55% 45% / 46% 54% 43% 57%; opacity: 1; filter: drop-shadow(0 0 50px rgba(255,0,0,0.8)); }
    100% { transform: translate(-50%, -50%) rotate(15deg) scale(1.15); opacity: 0.95; }
}

@keyframes pulse-fire {
    0%, 100% { box-shadow: 0 0 120px 40px rgba(255, 20, 0, 1), 0 0 250px 100px rgba(255, 60, 0, 0.9), inset 0 0 120px 40px rgba(255, 100, 0, 0.8); }
    50% { box-shadow: 0 0 80px 20px rgba(255, 40, 0, 0.8), 0 0 160px 60px rgba(255, 100, 0, 0.6), inset 0 0 80px 25px rgba(255, 130, 0, 0.6); }
}


input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>