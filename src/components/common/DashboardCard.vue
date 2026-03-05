<template>
    <div class="w-full h-full relative flex flex-col items-center justify-center p-1 overflow-hidden animated-border-card">

        <div class="relative z-10 w-full h-full flex flex-col items-center bg-black/20 rounded-[15px] p-2 md:p-4" :class="contentClass">


            <div class="text-center mb-2 mt-2 relative w-full flex flex-col items-center">
                <div class="flex items-center justify-center gap-2">
                    <h2 class="text-xl md:text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wide">
                        {{ title }}
                    </h2>
                    <button v-if="$slots.info" @click="showInfoModal = true" class="relative w-7 h-7 rounded-full flex items-center justify-center border border-gold/40 text-gold bg-gold/5 hover:bg-gold/20 hover:border-gold hover:shadow-[0_0_15px_rgba(255,184,0,0.6)] transition-all duration-300 group/info" title="Tìm hiểu thêm">

                        <div class="absolute inset-0 rounded-full bg-gold/20 blur-md animate-pulse group-hover/info:bg-gold/40 transition-colors"></div>
                        <svg class="w-4 h-4 relative z-10 animate-[gentle-shake_3s_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 16v-4"></path>
                            <path d="M12 8h.01"></path>
                        </svg>
                    </button>
                </div>

                <div class="mt-2 flex justify-center items-center gap-2 opacity-70">
                    <div class="h-[1px] w-8 bg-gradient-to-r from-transparent to-gold"></div>
                    <div class="w-1.5 h-1.5 rotate-45 bg-gold shadow-[0_0_8px_#FCD34D]"></div>
                    <div class="h-[1px] w-8 bg-gradient-to-l from-transparent to-gold"></div>
                </div>


                <slot name="header-actions"></slot>
            </div>


            <div class="relative w-full flex-1 flex flex-col items-center justify-center">
                <slot></slot>
            </div>


            <slot name="footer"></slot>
        </div>


        <InfoModal v-if="$slots.info" v-model:show="showInfoModal" :title="title">
            <slot name="info"></slot>
        </InfoModal>

    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import InfoModal from '@/components/common/InfoModal.vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    contentClass: {
        type: String,
        default: ''
    }
});

const showInfoModal = ref(false);
</script>

<style scoped>
.animated-border-card {
    border-radius: 1rem;
    padding: 1px;
    background: linear-gradient(135deg, rgba(255,215,0,0.4), rgba(255,255,255,0));
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

@keyframes gentle-shake {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-10deg); }
    75% { transform: rotate(10deg); }
}

.shake-icon {
    animation: gentle-shake 2s ease-in-out infinite;
}
</style>