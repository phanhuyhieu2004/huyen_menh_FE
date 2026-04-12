<template>
  <div class="app-root min-h-screen bg-black text-white font-sans relative overflow-x-hidden">

        <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <video 
                ref="bgVideo"
                autoplay 
                loop 
                muted 
                playsinline
                webkit-playsinline
                x5-playsinline
                x5-video-player-type="h5"
                x5-video-player-fullscreen="false"
                preload="auto"
                disablePictureInPicture
                disableRemotePlayback
                @canplay="playVideo"
                class="bg-video absolute inset-0 w-full h-full object-cover"
            >
                <source src="https://res.cloudinary.com/drac9ko3l/video/upload/v1772078973/video_nebula_full_yxicgk.mp4" type="video/mp4">
            </video>
        </div>


        <div class="fixed inset-0 bg-black/40 z-0 pointer-events-none"></div>


        <div class="relative z-10 min-h-screen flex flex-col">
          <div class="flex-1">
            <router-view v-slot="{ Component }">
              <transition name="page" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
          
          <!-- Conditional Global Footer -->
          <GlobalFooter v-if="showFooter" @open-legal="handleOpenLegal" />
        </div>

        <!-- Global Legal Modal -->
        <LegalModal 
          :is-open="isLegalModalOpen" 
          :initial-tab="legalModalTab"
          @close="isLegalModalOpen = false" 
        />


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
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUiStore } from '@/stores/ui';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import GlobalFooter from '@/components/layout/GlobalFooter.vue';
import LegalModal from '@/components/common/LegalModal.vue';

const route = useRoute();
const uiStore = useUiStore();
const authStore = useAuthStore();
const { isGlobalLoading } = storeToRefs(uiStore);

const isLegalModalOpen = ref(false);
const legalModalTab = ref('privacy');
const bgVideo = ref(null);

const handleOpenLegal = (tab) => {
    legalModalTab.value = tab;
    isLegalModalOpen.value = true;
};

const playVideo = () => {
    const v = bgVideo.value;
    if (!v) return;
    v.muted = true; // ensure muted so autoplay policy is satisfied
    const promise = v.play();
    if (promise !== undefined) {
        promise.catch(() => {
            // Autoplay blocked — wait for first user interaction then retry once
            const resume = () => {
                v.play().catch(() => {});
                document.removeEventListener('touchstart', resume);
                document.removeEventListener('click', resume);
            };
            document.addEventListener('touchstart', resume, { once: true, passive: true });
            document.addEventListener('click', resume, { once: true });
        });
    }
};

const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
        playVideo();
    }
};

onMounted(() => {
    playVideo();
    document.addEventListener("visibilitychange", handleVisibilityChange);
});

onBeforeUnmount(() => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
});

const showFooter = computed(() => {
    const hiddenRoutes = ['Login', 'Onboarding', 'ForgotPassword', 'ResetPassword', 'OAuth2Redirect'];
    return !hiddenRoutes.includes(route.name);
});

onMounted(async () => {
    if (authStore.token) {
        await authStore.checkAuth();
    }
});
</script>

<style>

/* ═══ Page transition ══════════════════════════════════════════════════════ */
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

/* ═══ Animations ════════════════════════════════════════════════════════════ */
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

/* ═══ Background video — hide ALL native browser UI ════════════════════════ */
.bg-video {
  /* Prevent pointer events so no tap-to-show-controls */
  pointer-events: none;
}

/* Hide the native controls bar on all browsers */
.bg-video::-webkit-media-controls             { display: none !important; }
.bg-video::-webkit-media-controls-enclosure   { display: none !important; }
.bg-video::-webkit-media-controls-panel       { display: none !important; }
.bg-video::-webkit-media-controls-play-button { display: none !important; }
.bg-video::-webkit-media-controls-start-playback-button { display: none !important; }
.bg-video::-webkit-media-controls-overlay-play-button   { display: none !important; }
/* Hide PiP / download / fullscreen buttons */
.bg-video::-webkit-media-controls-picture-in-picture-button { display: none !important; }
.bg-video::-webkit-media-controls-fullscreen-button         { display: none !important; }
.bg-video::-internal-media-controls-download-button         { display: none !important; }
/* Firefox */
.bg-video::-moz-media-controls { display: none !important; }
</style>