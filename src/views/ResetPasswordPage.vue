<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-transparent relative z-10 font-sans">
    <div class="w-full max-w-[380px] bg-black/40 backdrop-blur-2xl border border-gold/30 rounded-[2.5rem] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.8)] animate-scale-up relative overflow-hidden group">


      <div class="absolute -top-16 -right-16 w-32 h-32 bg-gold/10 rounded-full blur-[60px]"></div>

      <div class="text-center space-y-2 mb-6 relative z-10">
        <div class="inline-block relative mb-1">
           <img src="https://res.cloudinary.com/drac9ko3l/image/upload/v1772078973/ChatGPT_Image_15_13_54_13_thg_2_2026_zcicyz.png"
                class="w-20 h-20 object-contain drop-shadow-[0_0_12px_rgba(255,184,0,0.5)]"
                alt="Mystic Icon" />
        </div>
        <h2 class="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-light via-gold to-gold-dark tracking-tight">
          Mật Khẩu Mới
        </h2>
        <p class="text-white/40 text-[11px] font-medium leading-relaxed max-w-[240px] mx-auto">Thiết lập lại chìa khóa truy cập tâm linh</p>
      </div>

      <form @submit.prevent="handleResetPassword" class="space-y-5 relative z-10">
        <div class="space-y-4">

           <div class="space-y-1.5 group/input">
              <label class="block text-[9px] uppercase tracking-[2px] text-gold/50 font-black ml-4 mb-0.5 group-focus-within/input:text-gold transition-colors">Mật khẩu mới</label>
              <div class="relative">
                <input
                  v-model="newPassword"
                  :type="showNewPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="w-full bg-white/5 border border-gold/20 rounded-xl py-3 px-5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold/40 focus:border-gold transition-all duration-300 pr-12 placeholder-white/10"
                  required
                />
                <button
                  type="button"
                  @click="showNewPassword = !showNewPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-gold/20 hover:text-gold transition-colors"
                >
                  <i :class="showNewPassword ? 'fi fi-rr-eye-crossed' : 'fi fi-rr-eye'" class="text-lg"></i>
                </button>
              </div>
           </div>


           <div class="space-y-1.5 group/input">
              <label class="block text-[9px] uppercase tracking-[2px] text-gold/50 font-black ml-4 mb-0.5 group-focus-within/input:text-gold transition-colors">Xác nhận mật khẩu</label>
              <div class="relative">
                <input
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="w-full bg-white/5 border border-gold/20 rounded-xl py-3 px-5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold/40 focus:border-gold transition-all duration-300 pr-12 placeholder-white/10"
                  required
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-gold/20 hover:text-gold transition-colors"
                >
                  <i :class="showConfirmPassword ? 'fi fi-rr-eye-crossed' : 'fi fi-rr-eye'" class="text-lg"></i>
                </button>
              </div>
           </div>
        </div>

        <div class="pt-2">
          <button
            :disabled="loading"
            class="w-full primary-btn py-3.5 rounded-xl text-[#1a130a] font-black tracking-[0.2em] text-[10px] relative overflow-hidden group/btn flex items-center justify-center uppercase"
          >
            <span v-if="!loading" class="relative z-10">ĐẶT LẠI MẬT KHẨU</span>
            <div v-else class="relative z-10">
              <svg class="animate-spin h-4 w-4 text-black" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            </div>
          </button>
        </div>

        <div class="text-center">
           <router-link to="/login" class="text-gold/40 hover:text-gold text-[10px] uppercase tracking-widest transition-all font-bold">
              Quay lại Đăng nhập
           </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/services/api';
import { cosmicToast as toast } from '@/utils/toast';

const route = useRoute();
const router = useRouter();
const loading = ref(false);
const newPassword = ref('');
const confirmPassword = ref('');
const token = ref('');

const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

onMounted(() => {
  token.value = route.query.token;
  if (!token.value) {
    toast.error('Dấu ấn vũ trụ không hợp lệ');
    router.push('/login');
  }
});

const handleResetPassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    toast.warning('Mật khẩu xác nhận không khớp');
    return;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  if (!passwordRegex.test(newPassword.value)) {
    toast.error('Mật khẩu cần tối thiểu 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt');
    return;
  }

  loading.value = true;
  try {
    await api.post('/auth/reset-password', {
      token: token.value,
      newPassword: newPassword.value
    });
    toast.success('Mật khẩu của bạn đã được cập nhật.');
    setTimeout(() => router.push('/login'), 2000);
  } catch (error) {
    toast.error(error.response?.data || 'Link đã hết hạn hoặc không hợp lệ');
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
  box-shadow: 0 5px 20px rgba(255, 184, 0, 0.3);
  background-position: right center;
}
</style>