<template>
  <Teleport to="body">
    <div v-if="show" class="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div class="bg-[#151515] border border-gold/40 rounded-3xl w-full max-w-lg shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden animate-scale-up">
        <div class="p-6 md:p-8 space-y-6">
          <div class="flex items-center justify-between border-b border-gold/20 pb-4">
             <h3 class="text-xl font-serif font-bold text-gold uppercase tracking-wider">{{ title }}</h3>
             <button @click="close" class="text-white/40 hover:text-white transition-colors">
                <i class="fi fi-rr-cross text-lg"></i>
             </button>
          </div>

          <div class="text-white/70 text-sm md:text-base leading-relaxed max-h-[70vh] overflow-y-auto pr-2 scrollbar-custom">
             <slot></slot>
          </div>

          <div class="pt-2 flex justify-center">
             <button @click="close" class="px-8 py-2.5 bg-gold/10 border border-gold/20 rounded-xl text-gold text-xs font-black uppercase tracking-widest hover:bg-gold hover:text-black transition-all">Đóng</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  title: String
});
const emit = defineEmits(['update:show']);
const close = () => emit('update:show', false);
</script>

<style scoped>
.animate-scale-up {
  animation: scale-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes scale-up {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.scrollbar-custom::-webkit-scrollbar {
  width: 4px;
}
.scrollbar-custom::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}
.scrollbar-custom::-webkit-scrollbar-thumb {
  background: rgba(255, 184, 0, 0.2);
  border-radius: 10px;
}
</style>