<template>
  <div class="app-root min-h-screen bg-black text-white font-sans relative overflow-x-hidden">

        <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <video 
                ref="bgVideo"
                autoplay 
                loop 
                muted 
                playsinline="true"
                webkit-playsinline="true"
                preload="auto"
                disablePictureInPicture="true"
                disableRemotePlayback="true"
                controls="false"
                @canplay="playVideo"
                @ended="playVideo"
                class="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-1000"
            >
                <source src="https://res.cloudinary.com/drac9ko3l/video/upload/v1772078973/video_nebula_full_yxicgk.mp4" type="video/mp4">
                Trình duyệt của bạn không hỗ trợ video nền.
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
    if (bgVideo.value) {
        bgVideo.value.play().catch(error => {
            console.warn("Autoplay was prevented on mobile/safari:", error);
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