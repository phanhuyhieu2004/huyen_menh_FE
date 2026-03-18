<template>
  <Teleport to="body">
    <Transition name="confirm-fade">
      <div v-if="show" class="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" @click.self="cancel">
        <div class="bg-[#0c0c0c] border border-gold/40 rounded-[2rem] w-full max-w-sm p-8 relative shadow-[0_0_40px_rgba(255,184,0,0.2)] animate-confirm-pop overflow-hidden">
          
          <!-- Spiritual Decorative Elements -->
          <div class="absolute -top-10 -right-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div class="relative z-10 text-center space-y-6">
            <div class="w-20 h-20 rounded-full border border-gold/30 flex items-center justify-center mx-auto mb-4 bg-gold/5 shadow-[0_0_15px_rgba(255,184,0,0.3)]">
               <i :class="icon" class="text-3xl text-gold"></i>
            </div>
            
            <div class="space-y-3">
              <h3 class="text-2xl font-serif font-bold text-gold tracking-widest uppercase">{{ title }}</h3>
              <p class="text-white/60 text-sm leading-relaxed font-sans italic px-2">"{{ message }}"</p>
            </div>

            <div class="grid grid-cols-2 gap-4 pt-4">
              <button @click="cancel" class="px-6 py-3 rounded-xl border border-gold/20 text-gold/60 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gold/5 hover:text-gold transition-all duration-300">
                Linh Hủy
              </button>
              <button @click="confirm" :class="confirmClass" class="px-6 py-3 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] shadow-lg transition-all duration-300 hover:scale-[1.05] active:scale-95 text-white">
                {{ confirmText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  show: Boolean,
  title: { type: String, default: 'Xác Nhận' },
  message: { type: String, default: 'Bạn có chắc chắn muốn thực hiện hành động này?' },
  confirmText: { type: String, default: 'Xác Nhận' },
  type: { type: String, default: 'danger' },
  icon: { type: String, default: 'fi fi-rr-interrogation' }
});

const emit = defineEmits(['update:show', 'confirm', 'cancel']);

const confirmClass = computed(() => {
  if (props.type === 'danger') return 'bg-red-500/80 hover:bg-red-600 shadow-red-500/20 border border-red-500/50';
  return 'bg-gold/80 hover:bg-gold shadow-gold/20 border border-gold/50';
});

const cancel = () => {
  emit('update:show', false);
  emit('cancel');
};

const confirm = () => {
  emit('confirm');
  emit('update:show', false);
};
</script>

<style scoped>
.confirm-fade-enter-active, .confirm-fade-leave-active {
  transition: opacity 0.5s ease;
}
.confirm-fade-enter-from, .confirm-fade-leave-to {
  opacity: 0;
}

@keyframes confirm-pop {
  from { transform: scale(0.8); opacity: 0; filter: blur(10px); }
  to { transform: scale(1); opacity: 1; filter: blur(0); }
}

.animate-confirm-pop {
  animation: confirm-pop 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
