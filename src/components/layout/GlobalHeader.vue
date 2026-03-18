<template>
    <header class="h-16 px-6 border-b border-gold/20 bg-black/20 backdrop-blur-md flex items-center justify-between z-50 sticky top-0 relative">
        <!-- Logo -->
        <button @click="goHome" class="flex items-center space-x-3 text-gold-light hover:text-gold transition-colors group">
            <img src="https://res.cloudinary.com/drac9ko3l/image/upload/v1772078973/ChatGPT_Image_10_26_18_13_thg_2_2026_mc8dn3.png" alt="Huyền Mệnh" class="w-10 h-10 md:w-12 md:h-12 drop-shadow-[0_0_15px_rgba(255,215,106,0.9)] rounded-full object-cover" />
            <span class="text-lg md:text-xl text-gold font-serif font-bold uppercase transition-colors logo-glowing-text tracking-widest">
                Huyền Mệnh
            </span>
        </button>

        <!-- Navigation (Desktop Only) -->
        <div v-if="shouldShowMenu" class="hidden md:flex items-center gap-8 text-sm md:text-base font-semibold tracking-wide h-16 absolute left-1/2 -translate-x-1/2">
            <router-link to="/app" exact-active-class="nav-active" class="nav-link relative h-full flex items-center">Bản Đồ Linh Hồn</router-link>
            <router-link to="/app/tarot" active-class="nav-active" class="nav-link relative h-full flex items-center">Trải Bài Song Hành</router-link>
            <router-link to="/app/journal" active-class="nav-active" class="nav-link relative h-full flex items-center">Nhật Ký</router-link>
            <router-link to="/app/library" active-class="nav-active" class="nav-link relative h-full flex items-center">Thư Viện</router-link>
        </div>

        <!-- User Profile / Auth Actions -->
        <div class="flex items-center gap-4">
            <template v-if="authStore.isAuthenticated">
                <button @click="$emit('show-profile-info')" class="relative group/profile-info w-8 h-8 flex items-center justify-center transition-all">
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

                    <div v-if="isDropdownOpen" v-click-outside="() => isDropdownOpen = false" class="absolute right-0 top-full mt-2 w-56 bg-[#0a0a0a]/90 backdrop-blur-xl border border-gold/30 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] py-2 z-50 animate-fade-in divide-y divide-gold/10 overflow-hidden">
                        <div class="px-4 py-3 bg-gold/5 flex items-center gap-4">
                            <div class="flex flex-col">
                                <p class="text-[10px] uppercase tracking-widest text-gold/60 font-black mb-0.5">Xin chào,</p>
                                <p class="text-sm font-bold text-white truncate">{{ displayName }}</p>
                            </div>
                            <div v-if="authStore.user?.role === 'admin'" class="inline-flex items-center px-1.5 py-0.5 rounded bg-gold/20 border border-gold/40 mt-1">
                               <span class="text-[8px] text-gold font-black uppercase tracking-tighter">ADMIN</span>
                            </div>
                        </div>
                        <div class="py-1">
                            <!-- Mobile Navigation Links (Hidden on Desktop) -->
                            <div class="md:hidden flex flex-col border-b border-gold/10 mb-1">
                                <router-link to="/app" @click="isDropdownOpen = false" class="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-gold transition-colors flex items-center gap-3">
                                    <i class="fi fi-rr-map-marker text-lg text-gold/40"></i>
                                    <span>Bản Đồ Linh Hồn</span>
                                </router-link>
                                <router-link to="/app/tarot" @click="isDropdownOpen = false" class="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-gold transition-colors flex items-center gap-3">
                                    <i class="fi fi-rr-layer-plus text-lg text-gold/40"></i>
                                    <span>Trải Bài Song Hành</span>
                                </router-link>
                                <router-link to="/app/journal" @click="isDropdownOpen = false" class="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-gold transition-colors flex items-center gap-3">
                                    <i class="fi fi-rr-notebook text-lg text-gold/40"></i>
                                    <span>Nhật Ký</span>
                                </router-link>
                                <router-link to="/app/library" @click="isDropdownOpen = false" class="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-gold transition-colors flex items-center gap-3">
                                    <i class="fi fi-rr-book-open-reader text-lg text-gold/40"></i>
                                    <span>Thư Viện</span>
                                </router-link>
                            </div>

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
            </template>
            <template v-else>
                <router-link to="/login" class="text-xs font-black uppercase tracking-[0.2em] text-gold/60 hover:text-gold transition-all border border-gold/30 px-6 py-2.5 rounded-full hover:bg-gold/10 bg-black/40"> Đăng Nhập </router-link>
            </template>
        </div>
    </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const props = defineProps({
    hideMenu: {
        type: Boolean,
        default: false
    }
});

defineEmits(['show-profile-info']);

const router = useRouter();
const authStore = useAuthStore();
const isDropdownOpen = ref(false);

const shouldShowMenu = computed(() => {
    return authStore.isAuthenticated && !props.hideMenu;
});

const displayName = computed(() => {
    if (authStore.user && authStore.user.fullName) {
        return authStore.user.fullName;
    }
    return "User";
});

const userInitial = computed(() => {
    return displayName.value.charAt(0).toUpperCase();
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

.animate-fade-in {
    animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
