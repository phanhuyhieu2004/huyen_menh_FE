<template>
    <div class="animated-border-card group cursor-pointer w-full h-full">
        <div class="inner-card-content !border-gold/40 !bg-white/5 !shadow-[0_0_20px_rgba(255,215,0,0.3),inset_0_0_10px_rgba(255,255,255,0.1)] relative flex flex-col p-6 flex-1 w-full relative">

        <div class="absolute inset-0 bg-gradient-to-t from-accent-purple/0 via-amber-500/0 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>


        <div class="flex justify-center mb-4 text-gold/80 relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 drop-shadow-[0_0_8px_rgba(255,215,106,0.6)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v16m8-8H4" />
            </svg>
        </div>

        <h2 class="text-center text-lg font-serif text-gold tracking-wider mb-4 border-b border-gold/20 pb-2 relative z-10">Thông Điệp Hôm Nay</h2>

        <div class="flex-1 flex items-center justify-center p-4 relative z-10">
            <p class="text-gold-light/90 italic font-serif text-center leading-relaxed text-lg typewriter-text">
                <span class="inline-block overflow-hidden whitespace-nowrap border-r-2 border-gold max-w-fit pr-1 animate-typing">“Đóng bỏ tâm trí,<br/>có thể và tinh thần –<br/>Hành trình hướng đến<br/>sự hòa hợp.”</span><br/>
                <span class="block mt-4 text-sm text-gold/60 not-italic uppercase tracking-widest opacity-0 animate-[fadeIn_1s_ease_3s_forward]" style="animation-fill-mode: forwards">— Huyền Mệnh</span>
            </p>
        </div>

        <button class="mt-6 w-full py-3 bg-gradient-to-r from-[rgba(88,28,135,0.8)] to-[rgba(217,119,6,0.8)] border border-gold/50 rounded-xl text-primary font-serif tracking-widest uppercase transition-all duration-300 ease-in-out hover:scale-[1.05] hover:shadow-[0_0_15px_#ffd700] relative z-10">
            DÒNG BỎ NĂNG LƯỢNG
        </button>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
@keyframes typing {
  from { width: 0; opacity: 1; border-color: transparent }
  to { width: 100%; opacity: 1; border-color: transparent }
}
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: #ffd700; }
}
@keyframes fadeIn {
  to { opacity: 1; }
}
.animate-typing {
  animation:
    typing 3s steps(40, end),
    blink-caret .75s step-end infinite;
  white-space: normal;
}
</style>