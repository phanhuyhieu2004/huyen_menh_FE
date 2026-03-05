<template>
    <div class="main-layout flex flex-col min-h-screen bg-transparent text-primary relative">


        <header class="h-16 px-6 border-b border-gold/20 bg-black/20 backdrop-blur-md flex items-center justify-between z-20">

            <button @click="goHome" class="flex items-center space-x-3 text-gold-light hover:text-gold transition-colors group">
                <img src="https://res.cloudinary.com/drac9ko3l/image/upload/v1772078973/ChatGPT_Image_10_26_18_13_thg_2_2026_mc8dn3.png" alt="Huyền Mệnh" class="w-12 h-12 drop-shadow-[0_0_15px_rgba(255,215,106,0.9)] rounded-full object-cover" />
                <span class="text-lg md:text-xl text-gold font-serif font-bold uppercase transition-colors logo-glowing-text">
                    Huyền Mệnh
                </span>
            </button>


            <div class="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 text-sm md:text-base font-semibold tracking-wide h-16">
                <router-link to="/app" exact-active-class="nav-active" class="nav-link relative h-full flex items-center">Bản Đồ Linh Hồn</router-link>
                <router-link to="/app/tarot" active-class="nav-active" class="nav-link relative h-full flex items-center">Trải Bài Song Hành</router-link>
                <router-link to="/app/journal" active-class="nav-active" class="nav-link relative h-full flex items-center">Nhật Ký</router-link>
                <router-link to="/app/library" active-class="nav-active" class="nav-link relative h-full flex items-center">Huyền Thư</router-link>
            </div>


            <div class="relative flex items-center gap-4" v-if="authStore.isAuthenticated">

                <button @click="showProfileInfo = true" class="relative group/profile-info w-8 h-8 flex items-center justify-center transition-all">
                    <div class="absolute inset-0 rounded-full bg-gold/30 blur-md animate-pulse group-hover/profile-info:bg-gold/50"></div>
                    <div class="relative z-10 w-full h-full rounded-full border border-gold/40 bg-gold/10 flex items-center justify-center text-gold shadow-[0_0_10px_rgba(255,184,0,0.4)] group-hover/profile-info:scale-110 transition-transform">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 16v-4"></path>
                            <path d="M12 8h.01"></path>
                        </svg>
                    </div>
                </button>


                <div class="relative">
                    <button @click="isDropdownOpen = !isDropdownOpen" class="flex items-center space-x-3 focus:outline-none hover:bg-white/5 p-1.5 rounded-full transition-colors">

                        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-accent-purple to-accent-orange border border-gold/50 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_10px_rgba(255,215,106,0.2)]">
                            {{ userInitial }}
                        </div>

                        <span class="hidden md:inline font-medium text-gold-light text-sm">{{ displayName }}</span>

                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gold-light/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>


                    <div v-if="isDropdownOpen" @click.away="isDropdownOpen = false" class="absolute right-0 top-full mt-2 w-56 bg-[#0a0a0a]/90 backdrop-blur-xl border border-gold/30 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] py-2 z-50 animate-fade-in divide-y divide-gold/10 overflow-hidden">
                        <div class="px-4 py-3 bg-gold/5">
                            <p class="text-[10px] uppercase tracking-widest text-gold/60 font-black mb-0.5">Xin chào,</p>
                            <p class="text-sm font-bold text-white truncate">{{ displayName }}</p>
                            <div v-if="authStore.user?.role === 'admin'" class="inline-flex items-center px-1.5 py-0.5 rounded bg-gold/20 border border-gold/40 mt-1">
                               <span class="text-[8px] text-gold font-black uppercase tracking-tighter">ADMIN</span>
                            </div>
                        </div>
                        <div class="py-1">
                            <router-link to="/app/settings" @click="isDropdownOpen = false" class="w-full text-left px-4 py-4 text-xs font-bold text-white/70 hover:text-gold hover:bg-gold/5 transition-all flex items-center gap-3 font-sans">
                                <i class="fi fi-rr-settings-sliders text-xl text-gold/60"></i>
                                <span>CÀI ĐẶT HỆ THỐNG</span>
                            </router-link>
                        </div>
                        <div class="py-1">
                            <button @click="handleLogout" class="w-full text-left px-4 py-4 text-xs font-bold text-red-400 hover:bg-red-500/10 transition-all flex items-center gap-3 font-sans">
                                <i class="fi fi-rr-exit text-xl opacity-60"></i>
                                <span>ĐĂNG XUẤT</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>

                <button @click="handleLogout" class="text-gold-light text-sm hover:text-white">Đăng Nhập</button>
            </div>
        </header>


        <main class="p-4 md:py-6 md:px-8 flex-1 w-full relative z-10 mx-auto">

            <router-view />
        </main>



        <InfoModal v-model:show="showProfileInfo" title="Tại sao cần Hồ sơ Sinh mệnh?">
            <div class="space-y-4 text-sm md:text-base">
                <p class="text-white/70">
                    Mọi tính toán về **Ngũ Hành**, **Màu Sắc Đại Cát**, và **Bản Đồ Linh Hồn** trong ứng dụng đều dựa trên thông tin **Ngày, Giờ, Phút sinh** của bạn.
                </p>
                <ul class="space-y-3">
                    <li class="flex items-start gap-3">
                        <i class="fi fi-rr-star text-gold mt-1"></i>
                        <span><b class="text-gold">Độ chính xác:</b> Chỉ sai lệch 1 giờ cũng có thể thay đổi hoàn toàn lá số tử vi và bản đồ năng lượng.</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <i class="fi fi-rr-settings text-gold mt-1"></i>
                        <span><b class="text-gold">Tùy biến:</b> Sau khi cập nhật, toàn bộ các chỉ số trên Dashboard sẽ được tự động tính toán lại theo thông tin mới nhất.</span>
                    </li>
                </ul>
                <div class="bg-gold/10 p-4 border border-gold/20 rounded-xl text-center">
                    <p class="text-gold font-bold">Hãy đảm bảo thông tin của bạn là chính xác nhất!</p>
                </div>
            </div>
        </InfoModal>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import api from '@/services/api';
import { cosmicToast as toast } from '@/utils/toast';
import InfoModal from '@/components/common/InfoModal.vue';

const router = useRouter();
const authStore = useAuthStore();
const isDropdownOpen = ref(false);
const showProfileInfo = ref(false);

const displayName = computed(() => {
    if (authStore.user && authStore.user.fullName) {
        return authStore.user.fullName;
    }
    return "User";
});

const userInitial = computed(() => {
    return displayName.value.charAt(0).toUpperCase();
});

onMounted(async () => {
    if (authStore.isAuthenticated) {
        await authStore.fetchUser();
        if (localStorage.getItem('hasOnboarded') !== 'true') {
            router.push('/onboarding');
        }
    } else {
        router.push('/login');
    }
});

const goHome = () => {
    router.push('/');
};

const handleLogout = () => {
    isDropdownOpen.value = false;
    authStore.logout();
    router.push('/login');
};
</script>

<style scoped>

.nav-link {
    color: rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;
}

.nav-link:hover {
    color: #ffffff;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 1.5px;
    background: #FFB800;
    box-shadow: 0 0 10px #FFB800, 0 0 20px #CC9300;
    transition: width 0.3s ease;
}

.nav-active {
    color: #FFD700 !important;
    text-shadow: 0 0 15px rgba(255, 184, 0, 0.9), 0 0 30px rgba(204, 147, 0, 0.7) !important;
}

.nav-active::after {
    width: 100%;
    animation: underline-pulse 2s infinite alternate;
}

@keyframes underline-pulse {
    from { opacity: 0.5; box-shadow: 0 0 5px #FFB800, 0 0 10px #CC9300; }
    to { opacity: 1; box-shadow: 0 0 15px #FFD700, 0 0 30px #FFB800; }
}


.logo-glowing-text {
  text-shadow: 0 0 10px rgba(255, 184, 0, 0.8), 0 0 20px rgba(204, 147, 0, 0.6), 0 0 40px rgba(255, 215, 106, 0.5);
  animation: logo-pulse 3s infinite alternate;
}

@keyframes logo-pulse {
  from { text-shadow: 0 0 10px rgba(255, 184, 0, 0.6), 0 0 20px rgba(204, 147, 0, 0.4); }
  to { text-shadow: 0 0 20px rgba(255, 184, 0, 1), 0 0 40px rgba(204, 147, 0, 0.8), 0 0 60px rgba(255, 215, 106, 0.6); }
}
</style>
