<template>
  <footer class="w-full pb-6 pt-10 border-t border-gold/40 shadow-[0_-5px_15px_rgba(255,184,0,0.15)] flex flex-col items-center justify-center text-sm md:text-base font-sans text-white/90 gap-4 mt-auto bg-black/20 backdrop-blur-sm relative z-30">
    <div class="flex items-center gap-6 md:gap-8 tracking-widest font-black text-[10px] md:text-xs">
      <button @click="$emit('open-legal', 'contact')" class="hover:text-gold hover:drop-shadow-[0_0_8px_rgba(255,184,0,0.8)] transition-all duration-300 uppercase">VỀ CHÚNG TÔI</button>
      <span class="w-[1px] h-3 bg-gold/40 shadow-[0_0_5px_rgba(255,184,0,0.8)]"></span>
      <button @click="$emit('open-legal', 'privacy')" class="hover:text-gold hover:drop-shadow-[0_0_8px_rgba(255, 184, 0,0.8)] transition-all duration-300 uppercase">BẢO MẬT</button>
      <span class="w-[1px] h-3 bg-gold/40 shadow-[0_0_5px_rgba(255, 184, 0,0.8)]"></span>
      <button @click="$emit('open-legal', 'contact')" class="hover:text-gold hover:drop-shadow-[0_0_8px_rgba(255, 184, 0,0.8)] transition-all duration-300 uppercase">LIÊN HỆ</button>
    </div>
    <div class="tracking-[0.4em] text-white/30 text-[9px] md:text-[10px] mt-2 font-black">
      © 2026 HUYỀN MỆNH • TINH HOA VŨ TRỤ
    </div>
  </footer>
</template>

<script setup>
defineEmits(['open-legal']);
</script>

<style scoped>
footer {
  border-top: 1px solid rgba(255, 184, 0, 0.4);
}
</style>
