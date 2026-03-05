<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-transparent relative z-10 font-sans">
    <div class="w-full max-w-[380px] bg-black/40 backdrop-blur-2xl border border-gold/30 rounded-[2.5rem] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.8)] animate-scale-up relative overflow-hidden group">

      <div class="absolute -top-16 -right-16 w-32 h-32 bg-gold/10 rounded-full blur-[60px]"></div>

      <div class="text-center space-y-2 mb-6 relative z-10">
        <div class="inline-block relative mb-1">
           <img src="https://res.cloudinary.com/drac9ko3l/image/upload/v1772078973/ChatGPT_Image_15_13_54_13_thg_2_2026_zcicyz.png"
                class="w-20 h-20 object-contain drop-shadow-[0_0_12px_rgba(255,184,0,0.5)] animate-pulse"
                alt="Mystic Icon" />
        </div>
        <h2 class="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-light via-gold to-gold-dark tracking-tight">
          Khôi Phục Tâm Linh
        </h2>
        <p class="text-white/40 text-[11px] font-medium leading-relaxed max-w-[240px] mx-auto">Nhập email để nhận liên kết từ vũ trụ</p>
      </div>

      <div v-if="!submitted" class="relative z-10">
        <form @submit.prevent="handleForgotPassword" class="space-y-6">
          <div class="space-y-2 group/input">
            <label class="block text-[9px] uppercase tracking-[2px] text-gold/50 font-black ml-4 group-focus-within/input:text-gold transition-colors">Địa chỉ Email</label>
            <div class="relative">
               <input
                 v-model="email"
                 type="email"
                 placeholder="your-soul@email.com"
                 class="w-full bg-white/5 border border-gold/20 rounded-xl py-3 px-5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold/40 focus:border-gold transition-all duration-300 pl-12"
                 required
               />
               <div class="absolute left-4 top-1/2 -translate-y-1/2">
                  <i class="fi fi-rr-envelope text-lg text-gold/30 group-focus-within/input:text-gold"></i>
               </div>
            </div>
          </div>

          <button
            :disabled="loading"
            class="w-full primary-btn py-3.5 rounded-xl text-[#1a130a] font-black tracking-[0.2em] text-[10px] relative overflow-hidden group/btn flex items-center justify-center uppercase"
          >
            <span v-if="!loading" class="relative z-10">GỬI YÊU CẦU</span>
            <div v-else class="relative z-10 flex items-center gap-2">
              <svg class="animate-spin h-4 w-4 text-black" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            </div>
          </button>

          <div class="text-center">
             <router-link to="/login" class="text-gold/40 hover:text-gold text-[10px] uppercase tracking-widest transition-all font-bold group/back">
                Quay lại Đăng nhập
             </router-link>
          </div>
        </form>
      </div>


      <div v-else class="text-center space-y-4 animate-fade-in relative z-10 py-2">
        <div class="relative inline-block">
          <div class="absolute inset-0 bg-green-500/10 rounded-full blur-xl animate-pulse"></div>
          <div class="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-full flex items-center justify-center mx-auto border border-green-500/30 relative z-10 shadow-[0_0_20px_rgba(34,197,94,0.2)]">

            <svg class="w-8 h-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>

        <div class="space-y-1">
          <h3 class="text-xl font-serif font-bold text-green-500">Thành Công!</h3>
          <p class="text-white/40 text-[11px] leading-relaxed max-w-[220px] mx-auto">Vũ trụ đã gửi thông điệp khôi phục mật khẩu tới email của bạn.</p>
        </div>

        <div class="space-y-3 mt-4">
           <router-link to="/login" class="primary-btn w-full py-3 rounded-lg text-[#1a130a] font-black text-[10px] uppercase tracking-widest inline-block">VỀ ĐĂNG NHẬP</router-link>
           <button @click="submitted = false" class="text-gold/30 hover:text-gold text-[9px] uppercase tracking-widest transition-all font-medium">Gửi lại yêu cầu</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '@/services/api';
import { cosmicToast as toast } from '@/utils/toast';

const email = ref('');
const loading = ref(false);
const submitted = ref(false);

const handleForgotPassword = async () => {
  if (!email.value) return;

  loading.value = true;
  try {
    await api.post('/auth/forgot-password', { email: email.value });
    toast.success('Đã gửi liên kết khôi phục tới email của bạn.');
    submitted.value = true;
  } catch (error) {
    toast.error(error.response?.data || 'Không tìm thấy tài khoản với email này');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.animate-scale-up {
  animation: scale-up 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}
@keyframes scale-up {
  from { transform: scale(0.97); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
.primary-btn {
  background: linear-gradient(135deg, #FFB800 0%, #FFD700 50%, #FFB800 100%);
  background-size: 200% auto;
  transition: all 0.3s ease;
}
.primary-btn:hover {
  transform: translateY(-2px);
  background-position: right center;
  box-shadow: 0 5px 20px rgba(255, 184, 0, 0.3);
}
</style>