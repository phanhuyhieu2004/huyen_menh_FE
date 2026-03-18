<template>
  <div class="landing-page min-h-screen flex flex-col items-center justify-between text-center select-none pt-12 pb-6 px-4 relative z-10 w-full overflow-hidden">




    <div class="flex flex-col items-center justify-center w-full max-w-5xl mx-auto flex-1 h-full pt-10">


      <div class="relative w-80 h-80 md:w-[450px] md:h-[450px] mb-8 flex items-center justify-center drop-shadow-[0_0_20px_rgba(255, 184, 0,0.3)]">


        <div class="absolute inset-0 z-0 animate-spin-slow">

          <div class="absolute top-1/2 left-1/2 w-12 h-12 md:w-32 md:h-32 -ml-6 -mt-6 md:-ml-16 md:-mt-16 orbit-item" style="--angle: 45deg; animation-delay: 0.1s;">
            <img :src="optimizeCloudinaryUrl('https://res.cloudinary.com/drac9ko3l/image/upload/v1772078984/ChatGPT_Image_15_19_12_13_thg_2_2026_aes1f8.png', { width: 128 })" alt="Icon 1" class="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255, 184, 0,0.6)] animate-reverse-spin-slow" loading="lazy">
          </div>

          <div class="absolute top-1/2 left-1/2 w-12 h-12 md:w-32 md:h-32 -ml-6 -mt-6 md:-ml-16 md:-mt-16 orbit-item" style="--angle: 90deg; animation-delay: 0.2s;">
            <img :src="optimizeCloudinaryUrl('https://res.cloudinary.com/drac9ko3l/image/upload/v1772078982/ChatGPT_Image_15_14_58_13_thg_2_2026_cffntg.png', { width: 128 })" alt="Icon 2" class="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255, 184, 0,0.6)] animate-reverse-spin-slow" loading="lazy">
          </div>

          <div class="absolute top-1/2 left-1/2 w-12 h-12 md:w-32 md:h-32 -ml-6 -mt-6 md:-ml-16 md:-mt-16 orbit-item" style="--angle: 135deg; animation-delay: 0.3s;">
            <img :src="optimizeCloudinaryUrl('https://res.cloudinary.com/drac9ko3l/image/upload/v1772078981/ChatGPT_Image_15_15_13_13_thg_2_2026_acvkwn.png', { width: 128 })" alt="Icon 3" class="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255, 184, 0,0.6)] animate-reverse-spin-slow" loading="lazy">
          </div>

          <div class="absolute top-1/2 left-1/2 w-12 h-12 md:w-32 md:h-32 -ml-6 -mt-6 md:-ml-16 md:-mt-16 orbit-item" style="--angle: 180deg; animation-delay: 0.4s;">
            <img :src="optimizeCloudinaryUrl('https://res.cloudinary.com/drac9ko3l/image/upload/v1772078980/ChatGPT_Image_15_15_03_13_thg_2_2026_uxdugc.png', { width: 128 })" alt="Icon 4" class="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255, 184, 0,0.6)] animate-reverse-spin-slow" loading="lazy">
          </div>

          <div class="absolute top-1/2 left-1/2 w-12 h-12 md:w-32 md:h-32 -ml-6 -mt-6 md:-ml-16 md:-mt-16 orbit-item" style="--angle: 225deg; animation-delay: 0.5s;">
            <img :src="optimizeCloudinaryUrl('https://res.cloudinary.com/drac9ko3l/image/upload/v1772078978/ChatGPT_Image_15_14_33_13_thg_2_2026_varore.png', { width: 128 })" alt="Icon 5" class="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255, 184, 0,0.6)] animate-reverse-spin-slow" loading="lazy">
          </div>

          <div class="absolute top-1/2 left-1/2 w-12 h-12 md:w-32 md:h-32 -ml-6 -mt-6 md:-ml-16 md:-mt-16 orbit-item" style="--angle: 270deg; animation-delay: 0.6s;">
            <img :src="optimizeCloudinaryUrl('https://res.cloudinary.com/drac9ko3l/image/upload/v1772078977/ChatGPT_Image_15_14_16_13_thg_2_2026_eeuayo.png', { width: 128 })" alt="Icon 6" class="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255, 184, 0,0.6)] animate-reverse-spin-slow" loading="lazy">
          </div>

          <div class="absolute top-1/2 left-1/2 w-12 h-12 md:w-32 md:h-32 -ml-6 -mt-6 md:-ml-16 md:-mt-16 orbit-item" style="--angle: 315deg; animation-delay: 0.7s;">
            <img :src="optimizeCloudinaryUrl('https://res.cloudinary.com/drac9ko3l/image/upload/v1772078973/ChatGPT_Image_15_13_54_13_thg_2_2026_zcicyz.png', { width: 128 })" alt="Icon 7" class="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255, 184, 0,0.6)] animate-reverse-spin-slow" loading="lazy">
          </div>

          <div class="absolute top-1/2 left-1/2 w-12 h-12 md:w-32 md:h-32 -ml-6 -mt-6 md:-ml-16 md:-mt-16 orbit-item" style="--angle: 360deg; animation-delay: 0.8s;">
            <img :src="optimizeCloudinaryUrl('https://res.cloudinary.com/drac9ko3l/image/upload/v1772078985/ChatGPT_Image_15_14_11_13_thg_2_2026_xfmjec.png', { width: 128 })" alt="Icon 8" class="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255, 184, 0,0.6)] animate-reverse-spin-slow" loading="lazy">
          </div>
        </div>


        <div class="absolute inset-0 flex items-center justify-center animate-mandala-entrance z-10">
          <img :src="optimizeCloudinaryUrl('https://res.cloudinary.com/drac9ko3l/image/upload/v1772078973/ChatGPT_Image_10_26_18_13_thg_2_2026_mc8dn3.png', { width: 400 })" alt="Mandala Center" class="w-48 h-48 md:w-80 md:h-80 object-contain animate-spin-extremely-slow drop-shadow-[0_0_15px_rgba(255, 184, 0,0.8)]" loading="lazy">
        </div>

      </div>


      <h1 class="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-widest text-gold mb-4 glowing-text-gold">
        HUYỀN MỆNH
      </h1>


      <p class="text-base md:text-lg text-white font-sans font-medium tracking-wide mb-10 ">
        Khai mở thiên mệnh - Kết nối Đông Tây qua trí tuệ vũ trụ
      </p>


      <button @click="goToLogin" class="relative group cursor-pointer mt-4">

        <div class="absolute -inset-1 rounded-full bg-gradient-to-r from-accent-purple via-gold to-accent-orange opacity-50 blur-md group-hover:opacity-100 transition duration-500 animate-pulse"></div>

        <div class="relative px-10 py-4  border border-gold-light/50 rounded-full font-sans font-bold text-white tracking-widest text-lg md:text-xl shadow-[inset_0_0_20px_rgba(255, 184, 0,0.3)] hover:scale-105 transition-transform duration-300">
          Khai Mở Thiên Mệnh Ngay
        </div>
      </button>

    </div>


    <div class="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 md:mt-24 mb-16 px-4">


      <div class="animated-border-card group cursor-pointer">
        <div class="inner-card-content items-center justify-center text-center p-8">
          <div class="h-28 flex items-center justify-center mb-6 relative">
            <img :src="optimizeCloudinaryUrl('https://res.cloudinary.com/drac9ko3l/image/upload/v1772088191/ChatGPT_Image_13_42_43_26_thg_2_2026_ll4rvz.png', { width: 256 })" alt="Tarot Icon" class="w-48 h-48 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(255, 184, 0,0.5)] z-10 relative" loading="lazy">
          </div>
          <h3 class="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold-dark mb-3 text-center glowing-text-gold-hover transition-all">Tarot Phương Tây</h3>
          <p class="text-sm font-sans text-white/90 text-center leading-relaxed">Giải mã bí ẩn qua từng lá bài</p>
        </div>
      </div>


      <div class="animated-border-card group cursor-pointer">
        <div class="inner-card-content items-center justify-center text-center p-8">
          <div class="h-28 flex items-center justify-center mb-6 relative">
            <img :src="optimizeCloudinaryUrl('https://res.cloudinary.com/drac9ko3l/image/upload/v1772088190/ChatGPT_Image_13_42_38_26_thg_2_2026_yae0jd.png', { width: 256 })" alt="Kinh Dịch Icon" class="w-48 h-48  object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(255, 184, 0,0.5)] z-10 relative" loading="lazy">
          </div>
          <h3 class="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold-dark mb-3 text-center glowing-text-gold-hover transition-all">Kinh Dịch Phương Đông</h3>
          <p class="text-sm font-sans text-white/90 text-center leading-relaxed">Khám phá minh triết cổ xưa</p>
        </div>
      </div>


      <div class="animated-border-card group cursor-pointer">
        <div class="inner-card-content items-center justify-center text-center p-8">
          <div class="h-28 flex items-center justify-center mb-6 relative">
            <img :src="optimizeCloudinaryUrl('https://res.cloudinary.com/drac9ko3l/image/upload/v1772088190/ChatGPT_Image_13_42_32_26_thg_2_2026_byqwzk.png', { width: 256 })" alt="AI Icon" class="w-48 h-48  object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(255, 184, 0,0.5)] z-10 relative" loading="lazy">
          </div>
          <h3 class="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold-dark mb-3 text-center leading-snug glowing-text-gold-hover transition-all">AI Cá Nhân Hóa<br/>Từ Ngày Sinh</h3>
          <p class="text-sm font-sans text-white/90 text-center leading-relaxed">Phân tích vận mệnh chính xác</p>
        </div>
      </div>

    </div>


    <!-- Footer removed as it is now global -->
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { optimizeCloudinaryUrl } from '@/utils/spiritualCalc';

const router = useRouter();

const goToLogin = async () => {
  const authStore = useAuthStore();

  if (authStore.token) {
    const isValid = await authStore.checkAuth();
    if (isValid) {
      const hasOnboarded = localStorage.getItem('hasOnboarded') === 'true';
      router.push(hasOnboarded ? '/app' : '/onboarding');
    } else {
      router.push('/login');
    }
  } else {
    router.push('/login');
  }
};
</script>

<style scoped>

@keyframes spin-extremely-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-extremely-slow {
  animation: spin-extremely-slow 60s linear infinite;
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 40s linear infinite;
}

@keyframes reverse-spin-slow {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}
.animate-reverse-spin-slow {
  animation: reverse-spin-slow 40s linear infinite;
}

.animate-mandala-entrance {
  animation: mandala-entrance 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes mandala-entrance {
  0% { transform: scale(0) rotate(-180deg); opacity: 0; filter: drop-shadow(0 0 50px rgba(255, 184, 0, 1)) brightness(2); }
  100% { transform: scale(1) rotate(0deg); opacity: 1; filter: drop-shadow(0 0 15px rgba(255, 184, 0, 0.8)) brightness(1); }
}

.orbit-item {

  transform: rotate(var(--angle)) translateY(-130px) rotate(calc(-1 * var(--angle)));
  opacity: 1;
}

@media (min-width: 768px) {
  .orbit-item {
    transform: rotate(var(--angle)) translateY(-180px) rotate(calc(-1 * var(--angle)));
  }
}


.glowing-text-gold {
  text-shadow: 0 0 10px rgba(255, 184, 0, 0.8), 0 0 20px rgba(204, 147, 0, 0.6);
  animation: text-pulse 3s infinite alternate;
}

.glowing-text-gold-hover {
  text-shadow: 0 0 5px rgba(255, 184, 0, 0.4);
}
.group:hover .glowing-text-gold-hover {
  text-shadow: 0 0 15px rgba(255, 184, 0, 0.9), 0 0 30px rgba(204, 147, 0, 0.7);
}

@keyframes text-pulse {
  from { text-shadow: 0 0 10px rgba(255, 184, 0, 0.6), 0 0 20px rgba(204, 147, 0, 0.4); }
  to { text-shadow: 0 0 20px rgba(255, 184, 0, 1), 0 0 40px rgba(204, 147, 0, 0.8), 0 0 60px rgba(255, 255, 255, 0.4); }
}





</style>
