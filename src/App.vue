<template>
  <div class="app-root min-h-screen bg-black text-white font-sans relative overflow-x-hidden">

        <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden flex justify-center items-center">
            <div class="w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] relative">
                <iframe src="https://player.cloudinary.com/embed/?cloud_name=drac9ko3l&public_id=video_nebula_full_yxicgk&profile=cld-looping&autoplay=true&loop=true&muted=true" width="100%" height="100%" style="border:none; width:100%; height:100%; position:absolute; left:0px; top:0px; overflow:hidden; pointer-events: none;" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>


        <div class="fixed inset-0 bg-black/40 z-0 pointer-events-none"></div>


        <div class="relative z-10 min-h-screen">
          <router-view v-slot="{ Component }">
            <transition name="page" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>


        <transition name="fade">
          <div v-if="isGlobalLoading" class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
            <div class="relative w-32 h-32">

                <div class="absolute inset-0 border-4 border-gold/20 rounded-full"></div>
                <div class="absolute inset-0 border-4 border-t-gold border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                <div class="absolute inset-4 border-2 border-gold/10 rounded-full"></div>
                <div class="absolute inset-4 border-2 border-b-gold-light border-t-transparent border-l-transparent border-r-transparent rounded-full animate-spin-slow"></div>


                <div class="absolute inset-0 flex items-center justify-center text-gold drop-shadow-[0_0_10px_rgba(255,184,0,0.8)]">
                    <svg class="w-10 h-10 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 2L15 8L22 9L17 14L18 21L12 17L6 21L7 14L2 9L9 8L12 2Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            <p class="mt-8 text-gold font-serif tracking-[0.3em] uppercase text-sm animate-pulse-slow">Đang kết nối vũ trụ...</p>
          </div>
        </transition>

  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useUiStore } from '@/stores/ui';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const uiStore = useUiStore();
const authStore = useAuthStore();
const { isGlobalLoading } = storeToRefs(uiStore);

onMounted(async () => {

    if (authStore.token) {
        await authStore.checkAuth();
    }
});
</script>

<style>

.page-enter-active,
.page-leave-active {
  transition: all 0.5s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
  filter: blur(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(1.02);
  filter: blur(10px);
}


.animate-spin-slow {
  animation: spin 3s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-pulse-slow {
  animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


.glowing-text-gold {
  text-shadow: 0 0 15px rgba(255, 184, 0, 0.8), 0 0 30px rgba(204, 147, 0, 0.6);
}
</style>