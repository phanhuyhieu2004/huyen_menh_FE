<template>
  <div class="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center justify-center text-center">
    <div class="w-24 h-24 mb-6 border-2 border-gold/30 rounded-full flex items-center justify-center animate-pulse">
      <div class="w-16 h-16 border-2 border-gold/50 rounded-full animate-spin-slow"></div>
    </div>
    <h1 class="text-3xl font-serif font-bold text-gold mb-4 uppercase tracking-widest">
      Khai Phá Thiên Mệnh
    </h1>
    <p class="text-white/60 max-w-md italic font-serif">
      Cung điện này đang được các vị thần xây dựng. Hãy quay lại sau khi năng lượng vũ trụ hội tụ đầy đủ.
    </p>
    <button @click="$router.push('/app')" class="mt-10 px-8 py-3 bg-gold/10 border border-gold/50 rounded-full text-gold hover:bg-gold/20 transition-all font-sans tracking-widest uppercase text-xs">
      Trở về Điện Chính
    </button>
  </div>
</template>

<script setup>

</script>