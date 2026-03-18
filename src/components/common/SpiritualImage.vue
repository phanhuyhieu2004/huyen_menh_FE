<template>
  <div class="spiritual-image-container relative overflow-hidden" :class="containerClass">
    <!-- Image Item -->
    <img
      v-show="isLoaded"
      :src="src"
      :alt="alt"
      @load="handleLoad"
      @error="handleError"
      class="w-full h-full object-cover transition-opacity duration-500"
      :class="{ 'opacity-100': isLoaded, 'opacity-0': !isLoaded, ...imgClass }"
    />

    <!-- Loading Spinner Overlay -->
    <div v-if="!isLoaded && !isError" class="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div class="spiritual-spinner">
        <div class="spinner-ring"></div>
        <div class="spinner-core"></div>
      </div>
    </div>

    <!-- Error Placeholder -->
    <div v-if="isError" class="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-gold/60 p-4 text-center">
      <i class="fi fi-rr-cloud-disabled text-2xl mb-2"></i>
      <span class="text-[10px] uppercase tracking-widest font-serif">Không thể tải linh ảnh</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: 'Spiritual image' },
  containerClass: { type: [String, Object, Array], default: '' },
  imgClass: { type: [String, Object, Array], default: '' }
});

const isLoaded = ref(false);
const isError = ref(false);

const handleLoad = () => {
  isLoaded.value = true;
  isError.value = false;
};

const handleError = () => {
  isError.value = true;
  isLoaded.value = false;
};

// Reset state when src changes
watch(() => props.src, () => {
  isLoaded.value = false;
  isError.value = false;
});
</script>

<style scoped>
.spiritual-spinner {
  position: relative;
  width: 40px;
  height: 40px;
}

.spinner-ring {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 32px;
  height: 32px;
  margin: 4px;
  border: 4px solid #FFB800;
  border-radius: 50%;
  animation: spinner-spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #FFB800 transparent transparent transparent;
  filter: drop-shadow(0 0 5px rgba(255, 184, 0, 0.5));
}

.spinner-core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px white;
  animation: spinner-pulse 1s ease-in-out infinite;
}

@keyframes spinner-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes spinner-pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.5); opacity: 1; }
}
</style>
