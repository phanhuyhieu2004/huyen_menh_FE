<template>
  <transition name="modal-fade">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 md:p-8">
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-500"
        @click="close"
      ></div>

      <!-- Modal Content -->
      <div class="relative w-full max-w-4xl bg-[#0a0a0a] border border-gold/30 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden animate-modal-in flex flex-col max-h-[90vh]">
        
        <!-- Header -->
        <div class="px-8 py-6 border-b border-gold/10 flex items-center justify-between bg-gold/5 flex-shrink-0">
          <div class="flex items-center gap-6">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              class="relative py-2 px-1 text-xs md:text-sm font-black uppercase tracking-[0.2em] transition-all duration-300"
              :class="activeTab === tab.id ? 'text-gold' : 'text-white/40 hover:text-white/60'"
            >
              {{ tab.label }}
              <div 
                v-if="activeTab === tab.id" 
                class="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold shadow-[0_0_10px_#FFB800]"
              ></div>
            </button>
          </div>
          
          <button @click="close" class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all">
            <i class="fi fi-rr-cross text-xs"></i>
          </button>
        </div>

        <!-- Body -->
        <div class="p-8 md:p-12 overflow-y-auto custom-scrollbar flex-grow">
          <transition name="tab-fade" mode="out-in">
            <!-- Privacy Tab -->
            <div v-if="activeTab === 'privacy'" :key="'privacy'" class="space-y-10 animate-fade-in">
              <div class="flex items-center gap-5">
                <div class="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shadow-[0_0_20px_rgba(255,184,0,0.1)]">
                  <i class="fi fi-rr-shield-check text-2xl"></i>
                </div>
                <h2 class="text-2xl md:text-3xl font-serif text-gold-light tracking-wide uppercase">Bảo Mật Thông Tin</h2>
              </div>
              <div class="prose prose-invert prose-sm max-w-none text-white/70 leading-relaxed font-sans space-y-6">
                <p class="text-lg font-serif italic border-l-2 border-gold/40 pl-6 py-2 bg-gold/5 rounded-r-xl">"Sự riêng tư của linh hồn bạn là sinh mệnh của chúng tôi."</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                    <h4 class="text-gold font-bold uppercase tracking-widest text-xs">Mục Đích Thu Thập</h4>
                    <p>Dữ liệu sinh mệnh (ngày, giờ sinh) chỉ phục vụ cho việc tính toán các chỉ số huyền học cá nhân và Bản đồ Linh hồn của riêng bạn.</p>
                  </div>
                  <div class="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                    <h4 class="text-gold font-bold uppercase tracking-widest text-xs">Mã Hóa Dữ Liệu</h4>
                    <p>Mọi thông tin được mã hóa bằng thuật toán 256-bit và bảo vệ bằng các lớp tường lửa năng lượng tiên tiến, chống mọi sự xâm nhập trái phép.</p>
                  </div>
                  <div class="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                    <h4 class="text-gold font-bold uppercase tracking-widest text-xs">Tính Toàn Vẹn</h4>
                    <p>Thông tin sinh mệnh được bảo toàn vĩnh viễn trên dòng thời gian số để đảm bảo tính nhất quán và chính xác cho các phép tính huyền học xuyên suốt hành trình của bạn.</p>
                  </div>
                  <div class="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                    <h4 class="text-gold font-bold uppercase tracking-widest text-xs">Cam Kết</h4>
                    <p>Tuyệt đối không mua bán, trao đổi hoặc cung cấp dữ liệu người dùng cho bất kỳ bên thứ ba nào vì mục đích thương mại.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contact Tab -->
            <div v-else-if="activeTab === 'contact'" :key="'contact'" class="space-y-12 animate-fade-in text-center py-4">
              <div class="space-y-4">
                <div class="w-20 h-20 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center text-gold mx-auto shadow-inner ring-4 ring-gold/5">
                  <i class="fi fi-rr-interrogation text-3xl"></i>
                </div>
                <h2 class="text-3xl md:text-4xl font-serif text-gold uppercase tracking-[0.2em] font-bold">Liên Hệ Vũ Trụ</h2>
                <div class="h-px w-24 bg-gradient-to-r from-transparent via-gold/40 to-transparent mx-auto"></div>
                <p class="text-white/40 text-[10px] md:text-xs uppercase font-black tracking-[0.3em] max-w-sm mx-auto">Kết nối trực tiếp với người sáng tạo khi hành trình gặp nhiễu loạn</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <a href="mailto:hieuhuyphantn@gmail.com" class="flex flex-col items-center gap-4 p-8 rounded-[2rem] bg-gold/5 border border-gold/10 hover:border-gold/30 hover:bg-gold/10 transition-all duration-300 group">
                  <div class="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-500">
                    <i class="fi fi-rr-envelope text-2xl"></i>
                  </div>
                  <div class="space-y-1">
                    <p class="text-[10px] text-white/40 uppercase font-black tracking-widest">Email Linh Hồn</p>
                    <p class="text-base font-bold text-white group-hover:text-gold transition-colors">hieuhuyphantn@gmail.com</p>
                  </div>
                </a>

                <a href="tel:0396671835" class="flex flex-col items-center gap-4 p-8 rounded-[2rem] bg-gold/5 border border-gold/10 hover:border-gold/30 hover:bg-gold/10 transition-all duration-300 group">
                  <div class="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-500">
                    <i class="fi fi-rr-phone-call text-2xl"></i>
                  </div>
                  <div class="space-y-1">
                    <p class="text-[10px] text-white/40 uppercase font-black tracking-widest">Tổng Đài Năng Lượng</p>
                    <p class="text-base font-bold text-white group-hover:text-gold transition-colors">0396671835</p>
                  </div>
                </a>
              </div>

              <div class="space-y-3">
                <p class="text-[9px] text-gold/40 uppercase font-black tracking-[0.4em]">Cung Điện Huyền Mệnh</p>
                <p class="text-sm font-medium text-white/60 italic">"Chúng tôi luôn ở đây để lắng nghe tiếng vọng từ vũ trụ của bạn."</p>
                <p class="text-[10px] text-white/20 uppercase tracking-widest pt-4 decoration-white/10 underline underline-offset-8 decoration-dashed">Thời gian phản hồi: 1 vòng quay trái đất (24h)</p>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  initialTab: {
    type: String,
    default: 'privacy'
  }
});

const emit = defineEmits(['close']);

const activeTab = ref(props.initialTab);

const tabs = [
  { id: 'privacy', label: 'Bảo Mật' },
  { id: 'contact', label: 'Liên Hệ' }
];

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    activeTab.ref = props.initialTab;
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Sync active tab when initialTab changes
watch(() => props.initialTab, (newTab) => {
  activeTab.value = newTab;
});

const close = () => {
  emit('close');
};
</script>

<style scoped>
.animate-modal-in {
  animation: modal-in 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modal-in {
  from { opacity: 0; transform: scale(0.9) translateY(40px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.4s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: all 0.3s ease;
}

.tab-fade-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.tab-fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 184, 0, 0.05);
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 184, 0, 0.2);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 184, 0, 0.4);
}
</style>
