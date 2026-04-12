<template>
    <div class="flex items-center justify-center min-h-screen px-4 py-12 relative z-10 w-full font-sans">


        <div
            class="w-full max-w-5xl bg-transparent rounded-3xl border border-gold/30 shadow-[0_0_50px_rgba(255,184,0,0.15)] overflow-hidden flex flex-col md:flex-row relative transition-all duration-700 ease-in-out"
            :class="isRegisterMode ? 'md:flex-row-reverse' : ''"
        >


            <div class="w-full md:w-1/2 p-8 md:p-12 lg:p-14 flex flex-col justify-center relative z-10 transition-all duration-500">

                <div class="absolute top-6 left-1/2 -translate-x-1/2 text-gold text-2xl animate-pulse">✨</div>

                <div class="text-center mb-10 mt-6">
                    <h2 class="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold-dark mb-3 tracking-[0.2em] uppercase glowing-text-gold drop-shadow-[0_0_10px_rgba(255,184,0,0.8)]">
                        {{ isRegisterMode ? 'Đăng Ký' : 'Đăng Nhập' }}
                    </h2>
                    <p class="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.3em] font-serif mt-2">
                        Nghi thức bước vào thế giới huyền mệnh
                    </p>
                </div>

                <form @submit.prevent="handleLogin" class="space-y-5" autocomplete="off" novalidate>


                    <div class="relative group">
                        <input v-model.trim="form.email" type="email" autocomplete="off" class="w-full pl-6 pr-4 py-3.5 bg-black/30 border border-gold/40 rounded-xl text-white placeholder-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/60 transition-all shadow-inner" placeholder="Email" />
                    </div>



                    <div class="relative group">
                        <input v-model="form.password" :type="showPassword ? 'text' : 'password'" autocomplete="new-password" class="w-full pl-6 pr-12 py-3.5 bg-black/30 border border-gold/40 rounded-xl text-white placeholder-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/60 transition-all shadow-inner" placeholder="Mật khẩu" />
                        <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-4 flex items-center text-gold/50 hover:text-gold transition-colors focus:outline-none">
                            <svg v-if="!showPassword" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                        </button>
                    </div>


                    <div v-if="isRegisterMode" class="relative group">
                        <input v-model="form.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" autocomplete="new-password" class="w-full pl-6 pr-12 py-3.5 bg-black/30 border border-gold/40 rounded-xl text-white placeholder-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/60 transition-all shadow-inner" placeholder="Xác nhận mật khẩu" />
                        <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute inset-y-0 right-0 pr-4 flex items-center text-gold/50 hover:text-gold transition-colors focus:outline-none">
                            <svg v-if="!showConfirmPassword" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                        </button>
                    </div>

                    <div class="flex justify-end mt-1" v-if="!isRegisterMode">
                        <router-link to="/forgot-password" class="text-xs text-gold/60 hover:text-gold transition-colors font-medium">Quên mật khẩu?</router-link>
                    </div>


                    <div class="relative py-3">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gold/30"></div>
                        </div>
                        <div class="relative flex justify-center text-xs">
                            <span class="px-4 py-1 bg-[#1a130a] border border-gold/40 rounded-full text-gold/80 uppercase tracking-widest">Hoặc</span>
                        </div>
                    </div>

                    <div class="flex flex-col gap-3">
                        <a href="javascript:void(0)" @click="handleGoogleLogin" class="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-white/10 to-white/5 border border-gold/30 rounded-xl hover:border-gold hover:shadow-[0_0_15px_rgba(255,184,0,0.3)] transition-all duration-300 group">
                            <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span class="text-white/90 text-sm font-medium group-hover:text-gold transition-colors">Tiếp Tục Với Google</span>
                        </a>


                        <button :disabled="isLoading" type="submit" class="w-full mt-2 px-4 py-3.5 font-bold tracking-widest text-[#1a130a] bg-gradient-to-r from-gold-light via-gold to-gold-dark rounded-xl hover:shadow-[0_0_25px_rgba(255,184,0,0.6)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed">
                            {{ isRegisterMode ? 'HOÀN TẤT ĐĂNG KÝ' : 'BẮT ĐẦU NGAY' }}
                        </button>
                    </div>
                </form>

                <div class="mt-8 text-center text-sm">
                    <span class="text-white/60">{{ isRegisterMode ? 'Đã có tài khoản?' : 'Chưa có tài khoản?' }} </span>
                    <button @click="toggleMode" class="text-gold hover:text-gold-light hover:drop-shadow-[0_0_8px_rgba(255,184,0,0.8)] transition-all underline underline-offset-4 decoration-gold/40 hover:decoration-gold/100">
                        {{ isRegisterMode ? 'Đăng nhập ngay' : 'Đăng ký ngay' }}
                    </button>
                </div>
            </div>


            <div class="hidden md:block w-1/2 relative overflow-hidden transition-all duration-700 bg-transparent" :class="isRegisterMode ? 'border-r border-gold/30' : 'border-l border-gold/30'">

                <!-- Loading Skeleton / Spinner (Shown below image while it loads) -->
                <div class="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-0">
                    <i class="fi fi-rr-spinner animate-spin text-4xl text-gold/40 mb-4 drop-shadow-[0_0_10px_rgba(255,184,0,0.5)]"></i>
                    <p class="text-[10px] text-gold/50 uppercase tracking-[0.3em] font-serif animate-pulse">Lưu Chuyển Không Gian...</p>
                </div>

                <!-- Actual Images with Lazy Load & Fade In (z-10 to stay above spinner) -->
                <transition name="fade" mode="out-in" @before-enter="isImageLoaded = false">
                    <img
                        :key="isRegisterMode ? 'register-img' : 'login-img'"
                        :src="isRegisterMode ? 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772092739/ChatGPT_Image_14_56_28_26_thg_2_2026_kkhhqr.png' : 'https://res.cloudinary.com/drac9ko3l/image/upload/v1772092737/ChatGPT_Image_14_54_35_26_thg_2_2026_sga1vy.png'"
                        :alt="isRegisterMode ? 'Register Mystic Gateway' : 'Login Mystic Gateway'"
                        @load="isImageLoaded = true"
                        :class="[
                            'absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-1000',
                            isImageLoaded ? 'opacity-100' : 'opacity-0'
                        ]"
                        loading="lazy"
                    />
                </transition>

                <!-- Dramatic Vignette Overlay -->
                <div class="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,1)] pointer-events-none z-20"></div>
            </div>

        </div>

    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { cosmicToast as toast } from '@/utils/toast';
import api from '@/services/api';
import { useAuthStore } from '@/stores/auth';
import { useUiStore } from '@/stores/ui';

const router = useRouter();
const authStore = useAuthStore();
const uiStore = useUiStore();

const isRegisterMode = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const form = reactive({
    email: '',
    password: '',
    confirmPassword: ''
});

const isLoading = ref(false);
const isImageLoaded = ref(false);

import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

onMounted(() => {
    // Đợi một chút để Router và UI ổn định trước khi hiện Toast
    setTimeout(() => {
        if (route.query.error) {
            toast.error(route.query.error);
            router.replace({ query: {} });
        }
    }, 300);
});

const toggleMode = () => {
    isRegisterMode.value = !isRegisterMode.value;
    isImageLoaded.value = false;
    form.email = '';
    form.password = '';
    form.confirmPassword = '';
};

const validateEmail = () => {
    if (!form.email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
        toast.error('Email không đúng định dạng');
        return false;
    }
    return true;
};

const validatePassword = () => {
    if (!form.password) return true;
    if (isRegisterMode.value) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        if (!passwordRegex.test(form.password)) {
            toast.error('Mật khẩu cần tối thiểu 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt');
            return false;
        }
    }
    return true;
};

const validateConfirmPassword = () => {
    if (isRegisterMode.value && form.password !== form.confirmPassword) {
        toast.error('Mật khẩu xác nhận không khớp');
        return false;
    }
    return true;
};

const validateForm = () => {
    if (!form.email) {
        toast.error('Vui lòng điền email');
        return false;
    }
    if (!form.password) {
        toast.error('Vui lòng điền mật khẩu');
        return false;
    }
    if (isRegisterMode.value && !form.confirmPassword) {
        toast.error('Vui lòng xác nhận mật khẩu');
        return false;
    }
    return validateEmail() && validatePassword() && validateConfirmPassword();
};

const handleLogin = async () => {
    if (!validateForm()) return;

    uiStore.setGlobalLoading(true);
    try {
        if (isRegisterMode.value) {
            await api.post('/auth/signup', {
                email: form.email,
                password: form.password
            });
            toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
            isRegisterMode.value = false;
            form.email = '';
            form.password = '';
            form.confirmPassword = '';
        } else {
            const response = await api.post('/auth/login', {
                email: form.email,
                password: form.password
            });
            authStore.setToken(response.data.accessToken);
            await authStore.fetchUser();
            toast.success("Đăng nhập thành công!");

            const hasOnboarded = localStorage.getItem('hasOnboarded') === 'true';
            if (!hasOnboarded) {
                router.push('/onboarding');
            } else {
                router.push('/app');
            }
        }
    } catch (error) {
        const errorMsg = error.response?.data || error.message || 'Lỗi kết nối máy chủ';
        toast.error(errorMsg);
    } finally {
        uiStore.setGlobalLoading(false);
    }
};

const handleGoogleLogin = () => {
    // Tận dụng proxy đã cấu hình trong vite.config.js để giữ tunnel domain
    window.location.href = "/oauth2/authorization/google";
};
</script>