<template>
  <div class="min-h-[80vh] flex flex-col md:flex-row gap-6 p-4 md:p-8 animate-fade-in relative z-10">
    <!-- Sidebar Desktop: Hệ Thống Mảnh Tinh Thể 3D (Crystal Shards) - Chỉ hiện trên Desktop -->
    <div class="hidden md:block w-72 flex-shrink-0 relative group/sidebar perspective-[1000px]">
      <div class="sticky top-24 space-y-4 py-4">
        <button
          v-for="(item, idx) in menuItems"
          :key="item.id"
          v-show="item.show"
          @click="activeTab = item.id"
          :style="{ '--delay': idx * 0.1 + 's' }"
          :class="[
            'w-full flex items-center gap-5 px-6 py-5 rounded-[2rem] transition-all duration-700 relative overflow-visible group/shard preserve-3d',
            activeTab === item.id
              ? 'crystal-shard-active translate-z-[30px] shadow-[0_20px_40px_rgba(255,184,0,0.2)]'
              : 'crystal-shard hover:translate-z-[15px]'
          ]"
        >
          <!-- Crystal Body -->
          <div class="absolute inset-0 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-2xl transition-all duration-700 group-hover/shard:border-gold/30"></div>
          
          <!-- Inner Glow (Active Only) -->
          <div v-if="activeTab === item.id" class="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-gold/20 via-transparent to-transparent opacity-50 animate-pulse"></div>

          <!-- Icon: Radiant & Floating -->
          <div class="relative z-10 w-10 h-10 flex items-center justify-center rounded-2xl bg-black/20 border border-white/5 group-hover/shard:border-gold/40 transition-all duration-700 transform group-hover/shard:-translate-y-1">
             <i :class="[item.icon, activeTab === item.id ? 'text-gold drop-shadow-[0_0_12px_#FFB800] scale-125' : 'text-gold/30 group-hover/shard:text-gold/60']" 
                class="text-xl transition-all duration-700"></i>
          </div>
          
          <!-- Label: Floating Text -->
          <div class="flex flex-col items-start relative z-10">
            <span :class="activeTab === item.id ? 'text-white' : 'text-white/40 group-hover/shard:text-white/70'" 
                  class="text-xs font-black uppercase tracking-[0.2em] transition-colors duration-700">
              {{ item.label }}
            </span>
          </div>

          <!-- Active Marker: Orbital Dot -->
          <div v-if="activeTab === item.id" class="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-gold/10 border border-gold/40 rounded-full flex items-center justify-center animate-spin-slow">
              <div class="w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_10px_#FFB800]"></div>
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile/Tablet FAB: Hệ Thống Menu Vòng Tròn (Orbital Menu) -->
    <div class="md:hidden fixed bottom-10 right-10 z-[100]">
       <!-- Sub-buttons (Orbitals) -->
       <div class="relative w-16 h-16">
          <transition-group name="orbit">
             <button v-for="(item, idx) in visibleMenuItems" :key="item.id" v-if="isMobileMenuOpen"
                     @click="activeTab = item.id; isMobileMenuOpen = false"
                     :style="{ 
                        '--x': totalVisible > 1 ? Math.cos((180 + (idx * (90 / (totalVisible - 1)))) * Math.PI / 180) * 110 + 'px' : '-110px',
                        '--y': totalVisible > 1 ? Math.sin((180 + (idx * (90 / (totalVisible - 1)))) * Math.PI / 180) * 110 + 'px' : '0px',
                        'transition-delay': idx * 40 + 'ms'
                     }"
                     class="absolute top-0 left-0 w-14 h-14 rounded-full glass-panel flex flex-col items-center justify-center border-white/10 shadow-2xl transition-all duration-500 overflow-visible orbital-btn group"
                     :class="activeTab === item.id ? 'border-gold bg-gold/20' : 'bg-black/60'">
                <i :class="[item.icon, activeTab === item.id ? 'text-gold' : 'text-gold/40']" class="text-base mb-0.5"></i>
                <span class="text-[6px] text-white/40 font-black uppercase tracking-tighter text-center leading-none px-1"
                      :class="activeTab === item.id ? '!text-gold' : ''">{{ item.label.split(' ').pop() }}</span>
             </button>
          </transition-group>

          <!-- Main FAB (Core) -->
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" 
                  class="w-16 h-16 rounded-full bg-gold shadow-[0_10px_40px_rgba(255,184,0,0.5)] flex items-center justify-center relative z-20 group overflow-hidden active:scale-90 transition-all duration-300">
             <div class="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></div>
             <i :class="isMobileMenuOpen ? 'fi fi-rr-cross rotate-90' : 'fi fi-rr-apps'" class="text-2xl text-black transition-all duration-500 relative z-10"></i>
             <!-- Inner Glow -->
             <div class="absolute inset-0 rounded-full border-4 border-gold/40 animate-ping" v-if="!isMobileMenuOpen"></div>
          </button>
       </div>
    </div>

    <div class="flex-1 min-w-0">
      <!-- Premium Glassmorphism Background (Trong suốt & Căng bóng) -->
      <div class="bg-[#05080a]/30 backdrop-blur-[60px] p-6 md:p-10 min-h-[600px] relative overflow-hidden rounded-[2rem] border-t border-b border-t-white/10 border-b-black/50 border-x border-x-gold/10 shadow-[inset_0_1px_10px_rgba(255,255,255,0.05),0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_80px_rgba(255,184,0,0.08)]">
        
        <!-- Distinctive Corner Glows (Inside the glass for refractive depth) -->
        <div class="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-[100px] pointer-events-none opacity-60"></div>
        <div class="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-gradient-to-tr from-accent-purple/10 to-transparent rounded-full blur-[100px] pointer-events-none opacity-60"></div>

        <transition name="tab-slide" mode="out-in">
          <div :key="activeTab" class="relative z-10">
            <div v-if="activeTab === 'profile'" class="space-y-8">
              <div class="border-b border-gold/10 pb-6">
                <h2 class="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold-dark tracking-tight">Hồ Sơ Cư Dân</h2>
                <p class="text-white/40 text-xs uppercase tracking-[0.3em] mt-2">Cập nhật thông tin sinh mệnh của bạn</p>
              </div>
              <form @submit.prevent="updateProfile" class="max-w-xl space-y-6">
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2 col-span-full group/input">
                        <label class="block text-xs uppercase tracking-widest text-gold/50 font-black ml-4">Họ và Tên</label>
                        <input v-model="profileForm.fullName" type="text" class="w-full bg-white/5 border border-gold/20 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-gold transition-all" required />
                    </div>
                    <div class="space-y-2 group/input">
                        <label class="block text-xs uppercase tracking-widest text-gold/50 font-black ml-4">Ngày Sinh</label>
                        <input v-model="profileForm.dob" type="date" class="w-full bg-white/5 border border-gold/20 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-gold transition-all" required />
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-2 group/input">
                            <label class="block text-xs uppercase tracking-widest text-gold/50 font-black ml-4">Giờ Sinh</label>
                            <input v-model="profileForm.hour" type="number" min="0" max="23" placeholder="HH" class="w-full bg-white/5 border border-gold/20 rounded-2xl py-4 px-6 text-white text-sm text-center focus:outline-none focus:border-gold transition-all" required />
                        </div>
                        <div class="space-y-2 group/input">
                            <label class="block text-xs uppercase tracking-widest text-gold/50 font-black ml-4">Phút Sinh</label>
                            <input v-model="profileForm.minute" type="number" min="0" max="59" placeholder="MM" class="w-full bg-white/5 border border-gold/20 rounded-2xl py-4 px-6 text-white text-sm text-center focus:outline-none focus:border-gold transition-all" required />
                        </div>
                    </div>
                 </div>
                 <div class="pt-6">
                    <button type="submit" :disabled="isSubmittingProfile" class="primary-btn px-10 py-4 rounded-2xl text-[#1a130a] font-black tracking-widest text-xs uppercase hover:shadow-[0_10px_30px_rgba(255,184,0,0.3)] transition-all flex items-center gap-3">
                        <i v-if="isSubmittingProfile" class="fi fi-rr-spinner animate-spin"></i>
                        <span>{{ isSubmittingProfile ? 'ĐANG GHI CHÉP...' : 'Lưu Dấu Ấn Mới' }}</span>
                    </button>
                 </div>
              </form>
            </div>

            <div v-else-if="activeTab === 'security'" class="space-y-8">
              <div class="border-b border-gold/10 pb-6">
                <h2 class="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold-dark tracking-tight">Linh Ấn Bảo Mật</h2>
                <p class="text-white/40 text-xs uppercase tracking-[0.3em] mt-2">Thiết lập mật khẩu truy cập vũ trụ</p>
              </div>
              <form @submit.prevent="handleChangePassword" class="max-w-xl space-y-6">
                <div class="space-y-6">
                  <div class="space-y-2 group/input">
                    <label class="block text-xs uppercase tracking-widest text-gold/50 font-black ml-4">Mật khẩu mới</label>
                    <div class="relative">
                      <input v-model="passwordForm.newPassword" :type="showNewPassword ? 'text' : 'password'" class="w-full bg-white/5 border border-gold/20 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-gold transition-all" required />
                      <button type="button" @click="showNewPassword = !showNewPassword" class="absolute right-6 top-1/2 -translate-y-1/2 text-gold/30 hover:text-gold transition-colors">
                        <i :class="showNewPassword ? 'fi fi-rr-eye-crossed' : 'fi fi-rr-eye'" class="text-xl"></i>
                      </button>
                    </div>
                  </div>
                  <div class="space-y-2 group/input">
                    <label class="block text-xs uppercase tracking-widest text-gold/50 font-black ml-4">Xác nhận mật khẩu</label>
                    <div class="relative">
                      <input v-model="passwordForm.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" class="w-full bg-white/5 border border-gold/20 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-gold transition-all" required />
                      <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute right-6 top-1/2 -translate-y-1/2 text-gold/30 hover:text-gold transition-colors">
                        <i :class="showConfirmPassword ? 'fi fi-rr-eye-crossed' : 'fi fi-rr-eye'" class="text-xl"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="pt-6">
                  <button type="submit" class="primary-btn px-10 py-4 rounded-2xl text-[#1a130a] font-black tracking-widest text-xs uppercase transition-all">
                    Cập Nhật Mật Khẩu
                  </button>
                </div>
              </form>
            </div>

            <!-- Tab Thống kê: Trung Tâm Điều Hành Chiến Lược -->
            <div v-else-if="activeTab === 'stats'" class="space-y-10 animate-fade-in relative">
              
              <!-- Header & Filters -->
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gold/10 pb-8">
                <div class="flex items-center gap-5">
                   <div class="space-y-1">
                     <h2 class="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold-dark tracking-tight">Thống Kê Chiến Lược</h2>
                     <p class="text-gold/40 text-[9px] uppercase tracking-[0.4em] font-black">Trung tâm dữ liệu chiến lược vũ trụ</p>
                   </div>
                </div>
                <div class="bg-black/40 border border-gold/20 rounded-2xl p-1.5 flex items-center gap-1 backdrop-blur-2xl">
                  <button v-for="range in ranges" :key="range.id" @click="selectedRange = range.id" 
                          :class="selectedRange === range.id ? 'bg-gold text-black shadow-lg scale-105' : 'text-gold/40 hover:text-gold hover:bg-white/5'" 
                          class="px-5 py-2 rounded-xl text-[9px] font-black tracking-[0.2em] transition-all duration-500 uppercase">
                    {{ range.label }}
                  </button>
                </div>
              </div>

              <!-- Unified Command Panel -->
              <div class="space-y-10">
                
                <!-- Section 1: Quick Artifacts -->
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                  <div v-for="stat in quickStats" :key="stat.label" 
                       class="animated-border-card group cursor-default h-full">
                    <div class="inner-card-content !bg-[#0F172A]/40 !border-white/5 group-hover:!border-gold/30 p-5 flex flex-col gap-3 relative overflow-hidden h-full">
                        <div class="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-all transform group-hover:scale-125">
                          <i :class="stat.icon" class="text-5xl text-gold"></i>
                        </div>
                        <span class="text-gold/40 text-[8px] uppercase tracking-[0.3em] font-black">{{ stat.label }}</span>
                        <div class="flex items-baseline gap-2">
                           <div class="text-2xl font-serif font-black text-white tracking-widest">{{ stat.value }}</div>
                           <div v-if="stat.trend" class="text-[9px] text-emerald-400 font-bold flex items-center bg-emerald-400/10 px-1.5 py-0.5 rounded-full">
                              <i class="fi fi-rr-arrow-small-up"></i>{{ stat.trend }}
                           </div>
                        </div>
                    </div>
                  </div>
                </div>

                <!-- Section 2: Growth & Spirits -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <!-- Growth -->
                  <div class="lg:col-span-2 glass-panel p-8 border border-white/5 relative overflow-hidden group">
                    <div class="flex items-center justify-between mb-8">
                       <h3 class="text-sm font-black uppercase tracking-[0.4em] text-gold/60 flex items-center gap-3">
                         <span class="w-1.5 h-1.5 rounded-full bg-gold animate-ping"></span>
                         Thiên Đồ Tăng Trưởng
                       </h3>
                    </div>
                    <div class="h-[300px]">
                      <Line v-if="chartReady" :data="chartData" :options="chartOptions" />
                      <div v-else class="h-full flex items-center justify-center">
                        <div class="animate-spin h-8 w-8 border-2 border-gold/10 border-t-gold rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <!-- Spirits -->
                  <div class="glass-panel p-8 border border-white/5 flex flex-col relative overflow-hidden">
                    <h3 class="text-sm font-black uppercase tracking-[0.4em] text-gold/60 mb-6 flex items-center gap-3">
                      <i class="fi fi-rr-portal-enter text-blue-400"></i>
                      Linh Hồn Mới
                    </h3>
                    <div class="flex-1 space-y-3 overflow-y-auto max-h-[280px] pr-2 custom-scrollbar">
                      <div v-for="user in stats?.recentUsers" :key="user.id" 
                           class="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-gold/20 transition-all group/item">
                        <div class="w-9 h-9 rounded-xl bg-gold/10 border border-gold/10 flex items-center justify-center text-gold text-[10px] font-black">{{ user.email?.charAt(0).toUpperCase() }}</div>
                        <div class="flex-1 min-w-0">
                          <p class="text-[10px] font-black text-white/70 truncate tracking-wide">{{ user.email }}</p>
                          <p class="text-[8px] text-gold/30 uppercase tracking-widest mt-0.5">{{ formatRecentTime(user.created_at) }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Section 3: Zodiac Wheel -->
                <div class="glass-panel p-8 md:p-10 border border-white/5 relative overflow-hidden">
                   <div class="absolute -right-20 -bottom-20 opacity-[0.03] pointer-events-none">
                       <img src="https://res.cloudinary.com/drac9ko3l/image/upload/v1773297177/ChatGPT_Image_13_30_22_12_thg_3_2026_df1lkc.png" 
                            class="w-80 h-80 animate-spin-slow rotate-12" alt="Decor" />
                   </div>
                   
                   <div class="flex items-center justify-between mb-8">
                     <h3 class="text-sm font-black uppercase tracking-[0.4em] text-gold/60 flex items-center gap-3">
                        <i class="fi fi-rr-settings-sliders text-purple-400"></i>
                        Bản Đồ Địa Chi
                     </h3>
                     <div class="px-3 py-1 rounded-full bg-gold/5 border border-gold/10 text-[8px] text-gold font-black uppercase tracking-widest">Ma trận cộng hưởng</div>
                   </div>
                   
                   <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                      <div class="h-[350px] relative order-2 lg:order-1">
                        <PolarArea v-if="chartReady" :data="zodiacData" :options="zodiacOptions" />
                        <div v-else class="h-full flex items-center justify-center">
                           <div class="animate-spin h-8 w-8 border-2 border-gold/10 border-t-gold rounded-full"></div>
                        </div>
                      </div>
                      <div class="grid grid-cols-2 gap-4 order-1 lg:order-2">
                          <div v-for="(d, idx) in stats?.zodiacDistribution?.slice(0, 4)" :key="idx" 
                               class="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-2 group hover:border-gold/20 transition-all">
                              <span class="text-[7px] text-gold/40 uppercase font-black tracking-widest">Hạng {{ idx + 1 }}</span>
                              <div class="flex justify-between items-center">
                                  <p class="text-[11px] font-black text-white/80 uppercase tracking-widest">{{ d.label.split(' (')[0] }}</p>
                                  <span class="text-gold font-serif font-black text-lg">{{ d.count }}</span>
                              </div>
                          </div>
                          <div class="col-span-full pt-2 italic text-white/20 text-[8px] tracking-[0.2em] uppercase font-bold text-center">Tất cả các chi đang hội tụ tại tâm quan sát...</div>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            <div v-else-if="activeTab === 'users'" class="space-y-8 animate-fade-in">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gold/10 pb-8">
                <div>
                  <h2 class="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold-dark tracking-tight">Quản Lý Cư Dân</h2>
                  <p class="text-white/40 text-xs uppercase tracking-[0.3em] mt-2">Điều hành danh sách linh hồn trong vũ trụ</p>
                </div>
                <div class="flex flex-wrap items-center gap-4 w-full">
                  <div class="relative group">
                    <i class="fi fi-rr-search absolute left-4 top-1/2 -translate-y-1/2 text-gold/40 group-focus-within:text-gold transition-colors"></i>
                    <input v-model="userSearchQuery" @input="handleUserFilter" type="text" placeholder="Tìm theo email..." class="bg-white/5 border border-gold/20 rounded-xl py-2.5 pl-12 pr-4 text-xs text-white focus:outline-none focus:border-gold transition-all w-full md:w-64" />
                  </div>
                  <div class="flex items-center gap-2 bg-white/5 border border-gold/20 rounded-xl px-4 py-2">
                    <input v-model="userDateFilter.start" @change="handleUserFilter" type="date" class="bg-transparent text-[10px] text-gold focus:outline-none [color-scheme:dark]" />
                    <span class="text-gold/20">→</span>
                    <input v-model="userDateFilter.end" @change="handleUserFilter" type="date" class="bg-transparent text-[10px] text-gold focus:outline-none [color-scheme:dark]" />
                  </div>
                  <button @click="clearUserFilters" class="text-white/40 hover:text-gold text-[10px] uppercase tracking-widest transition-colors flex items-center gap-1 ml-2">
                    <i class="fi fi-rr-cross-small"></i> Xóa lọc
                  </button>
                </div>
              </div>
              <div class="overflow-x-auto rounded-3xl border border-gold/10 bg-white/[0.02] backdrop-blur-xl">
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="border-b border-gold/10">
                      <th class="px-6 py-5 text-xs uppercase tracking-[0.2em] text-gold/60 font-black">Cư Dân</th>
                      <th class="px-6 py-5 text-xs uppercase tracking-[0.2em] text-gold/60 font-black">Vai Trò</th>
                      <th class="px-6 py-5 text-xs uppercase tracking-[0.2em] text-gold/60 font-black">Ngày Gia Nhập</th>
                      <th class="px-6 py-5 text-xs uppercase tracking-[0.2em] text-gold/60 font-black text-center">Trạng Thái</th>
                      <th class="px-6 py-5 text-xs uppercase tracking-[0.2em] text-gold/60 font-black text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in filteredUsers" :key="user.id" class="border-b border-white/5 hover:bg-gold/5 transition-colors group">
                      <td class="px-6 py-4">
                        <div class="flex items-center gap-3">
                          <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-gold/20 to-gold/5 flex items-center justify-center text-gold font-bold border border-gold/20 group-hover:border-gold/40 transition-all">{{ user.fullName ? user.fullName.charAt(0) : (user.email?.charAt(0).toUpperCase() || '?') }}</div>
                          <div>
                            <p class="text-sm font-bold text-white group-hover:text-gold-light transition-colors">{{ user.fullName || 'Chưa cập nhật' }}</p>
                            <p class="text-xs text-white/40">{{ user.email }}</p>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <span :class="user.role === 'admin' ? 'bg-gold/20 text-gold border-gold/30' : 'bg-white/5 text-white/60 border-white/10'" class="text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-md border">{{ user.role }}</span>
                      </td>
                      <td class="px-6 py-4 text-sm text-white/60 font-serif">{{ new Date(user.created_at).toLocaleDateString('vi-VN') }}</td>
                      <td class="px-6 py-4 text-center">
                        <span :class="user.status === 'active' || !user.status ? 'bg-green-400/10 text-green-400 border-green-400/20' : 'bg-red-400/10 text-red-400 border-red-400/20'" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest border">
                          <span :class="user.status === 'active' || !user.status ? 'bg-green-400' : 'bg-red-400'" class="w-1.5 h-1.5 rounded-full shadow-[0_0_5px_currentColor]"></span>
                          {{ user.status === 'active' || !user.status ? 'Đang Hoạt Động' : 'Đã Khóa' }}
                        </span>
                      </td>
                      <td class="px-6 py-4 text-right">
                        <div class="flex items-center justify-end gap-2">
                           <button @click="confirmToggleStatus(user)" :class="user.status === 'active' || !user.status ? 'bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white' : 'bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white'" class="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all border flex items-center gap-2" :title="user.status === 'active' || !user.status ? 'Khóa tài khoản' : 'Mở khóa tài khoản'"><i :class="user.status === 'active' || !user.status ? 'fi fi-rr-lock' : 'fi fi-rr-unlock'"></i><span>{{ user.status === 'active' || !user.status ? 'KHÓA' : 'MỞ KHÓA' }}</span></button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="!filteredUsers.length">
                      <td colspan="5" class="px-6 py-20 text-center text-white/30 italic text-sm">Không tìm thấy linh hồn nào phù hợp với yêu cầu</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
                <!-- Pagination Mystic Gold -->
                <div v-if="totalPages > 0" class="flex justify-center items-center gap-6 mt-8 py-6 uppercase">
                  <!-- First Page -->
                  <button 
                    @click="changePage(0)" 
                    :disabled="currentPage === 0"
                    class="text-gold hover:text-gold-light disabled:opacity-20 transition-all font-black text-xl"
                  >«</button>
                  
                  <!-- Page Numbers -->
                  <div class="flex items-center gap-2">
                    <template v-for="p in totalPages" :key="p">
                      <button 
                        v-if="Math.abs(p - 1 - currentPage) < 3 || p === 1 || p === totalPages"
                        @click="changePage(p - 1)"
                        :class="[
                          'min-w-[40px] h-[40px] flex items-center justify-center text-sm font-bold transition-all duration-300',
                          currentPage === p - 1 
                            ? 'bg-gold text-black rounded-lg shadow-[0_4px_15px_rgba(255,184,0,0.3)]' 
                            : 'text-gold-light/60 hover:text-gold'
                        ]"
                      >
                        {{ p }}
                      </button>
                      <span v-else-if="p === 2 && currentPage > 3" class="text-gold/30">...</span>
                      <span v-else-if="p === totalPages - 1 && currentPage < totalPages - 4" class="text-gold/30">...</span>
                    </template>
                  </div>

                  <!-- Last Page -->
                  <button 
                    @click="changePage(totalPages - 1)" 
                    :disabled="currentPage >= totalPages - 1"
                    class="text-gold hover:text-gold-light disabled:opacity-20 transition-all font-black text-xl"
                  >»</button>
                </div>
            </div>

            <div v-else-if="activeTab === 'data'" class="space-y-8 animate-fade-in">
              <div v-if="!editingItem" class="space-y-6">
                <!-- Data Header & Search -->
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gold/10 pb-8">
                  <div>
                    <h2 class="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold-dark tracking-tight">Kho Dữ Liệu Huyền Học</h2>
                    <p class="text-white/40 text-xs uppercase tracking-[0.3em] mt-2">Quản lý nội dung Tarot & Kinh Dịch</p>
                  </div>
                  <div class="flex flex-wrap items-center gap-4">
                    <div class="relative inline-block w-40" v-click-outside="() => isDataFilterOpen = false">
                      <div @click="isDataFilterOpen = !isDataFilterOpen" 
                           class="flex items-center justify-between cursor-pointer bg-[#0a0a0a]/80 backdrop-blur-md border border-gold/30 hover:border-gold/60 rounded-xl px-4 h-10 text-xs font-bold text-gold/90 transition-all shadow-[inset_0_0_10px_rgba(255,184,0,0.05)] hover:shadow-[0_0_15px_rgba(255,184,0,0.15)] font-sans">
                        <div class="flex items-center gap-2">
                          <span class="text-sm leading-none">{{ currentFilterIcon }}</span>
                          <span class="truncate leading-none mt-0.5">{{ currentFilterLabel }}</span>
                        </div>
                        <i class="fi fi-rr-angle-small-down text-gold/60 text-sm transition-transform duration-300" :class="{ 'rotate-180': isDataFilterOpen }"></i>
                      </div>

                      <transition 
                        enter-active-class="transition ease-out duration-200" 
                        enter-from-class="opacity-0 translate-y-1" 
                        enter-to-class="opacity-100 translate-y-0" 
                        leave-active-class="transition ease-in duration-150" 
                        leave-from-class="opacity-100 translate-y-0" 
                        leave-to-class="opacity-0 translate-y-1">
                        <div v-if="isDataFilterOpen" 
                             class="absolute z-50 w-full mt-2 bg-[#050505]/95 backdrop-blur-2xl border border-gold/20 rounded-xl py-2 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(255,184,0,0.1)] overflow-hidden font-sans">
                          <div v-for="opt in dataFilterOptions" :key="opt.value" 
                               @click="selectDataFilter(opt.value)"
                               class="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors"
                               :class="dataFilterType === opt.value ? 'bg-gold/10 text-gold' : 'text-gold/60 hover:bg-white/5 hover:text-gold-light'">
                            <span class="text-base">{{ opt.icon }}</span>
                            <span class="text-xs font-bold">{{ opt.label }}</span>
                            <i v-if="dataFilterType === opt.value" class="fi fi-rr-check text-gold ml-auto text-sm drop-shadow-[0_0_5px_rgba(255,184,0,0.8)]"></i>
                          </div>
                        </div>
                      </transition>
                    </div>
                    <div class="relative group">
                      <i class="fi fi-rr-search absolute left-4 top-1/2 -translate-y-1/2 text-gold/40"></i>
                      <input v-model="dataSearchQuery" @input="handleDataFilter" type="text" placeholder="Tìm tên hoặc mô tả..." class="bg-white/5 border border-gold/20 rounded-xl h-10 pl-12 pr-4 text-xs text-white focus:outline-none focus:border-gold w-64" />
                    </div>
                    <button @click="clearDataFilters" class="text-white/40 hover:text-gold text-[10px] uppercase tracking-widest transition-colors flex items-center gap-1">
                      <i class="fi fi-rr-cross-small"></i> Xóa lọc
                    </button>
                  </div>
                </div>

                <!-- Magic Books Grid (Huyền Thư Pháp Bảo V2) -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12 px-4 mt-8">
                  <div v-for="item in filteredLibraryItems" :key="item.id" 
                       class="relative group perspective-[1200px] h-96 flex flex-col items-center">
                    
                    <!-- The Magic Book Container (Static Clean) -->
                    <div class="relative w-full aspect-[3/4] transition-all duration-700 preserve-3d group-hover:rotate-y-12 group-hover:-translate-y-4">
                      
                      <!-- Book Background Image (V2) -->
                      <img src="https://res.cloudinary.com/drac9ko3l/image/upload/v1773305762/image_Pippit_202603121546-Photoroom_cpcr9l.png" 
                           class="w-full h-full object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]" alt="Magic Book V2" />
                      
                      <!-- Overlay: Data Image Centered on Cover (High Definition with 2D Skew Tilt) -->
                      <div class="absolute top-[25%] left-[43%] w-[18%] h-[36%] flex items-center justify-center pointer-events-none"
                           style="transform: skewY(169deg) rotateZ(19deg);">
                         <div v-if="item.imageUrl" class="relative w-full h-full flex items-center justify-center">
                             <!-- Loading Spinner (Shown before image loads) -->
                             <i v-show="!loadedImages.has(item.id)" class="fi fi-rr-spinner animate-spin text-2xl text-gold/40 absolute"></i>
                             
                             <!-- Actual Image with Smooth Fade-in -->
                             <img :src="item.imageUrl" 
                                  @load="handleImageLoad(item.id)"
                                  :class="[
                                      'max-w-full max-h-full object-contain filter brightness-110 contrast-110 rounded-sm transition-all duration-700 drop-shadow-[0_0_10px_rgba(255,184,0,0.5)]',
                                      loadedImages.has(item.id) ? 'opacity-95 group-hover:opacity-100' : 'opacity-0'
                                  ]" 
                                  loading="lazy" />
                         </div>
                         <i v-else :class="item.type === 'tarot_card' ? 'fi fi-rr-cards' : 'fi fi-rr-yin-yang'" 
                            class="text-5xl text-gold/30 transition-all group-hover:scale-110 group-hover:text-gold/50 drop-shadow-[0_0_15px_rgba(255,184,0,0.4)]"></i>
                      </div>

                      <!-- Book Aura Glow -->
                      <div class="absolute inset-0 bg-gold/5 blur-[40px] rounded-full opacity-40 -z-10 group-hover:opacity-100 transition-opacity"></div>
                      
                      <!-- Magic Dust Sparkles (Hạt Bụi Trắng Li Ti Lấp Lánh Quanh Vòng Ma Thuật) -->
                      <div class="absolute inset-x-[15%] bottom-[5%] h-[20%] pointer-events-none z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-700">
                         <div class="absolute top-[20%] left-[15%] w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_4px_#FFFFFF] animate-twinkle" style="animation-duration: 2s; animation-delay: 0.2s"></div>
                         <div class="absolute bottom-[10%] left-[30%] w-[1px] h-[1px] bg-white/80 rounded-full shadow-[0_0_4px_#FFFFFF] animate-twinkle" style="animation-duration: 3s; animation-delay: 1.2s"></div>
                         <div class="absolute top-[40%] right-[20%] w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_6px_#FFFFFF] animate-twinkle" style="animation-duration: 2.5s; animation-delay: 0.5s"></div>
                         <div class="absolute bottom-[20%] right-[35%] w-[1px] h-[1px] bg-white/90 rounded-full shadow-[0_0_4px_#FFFFFF] animate-twinkle" style="animation-duration: 4s; animation-delay: 1.8s"></div>
                         <div class="absolute top-[60%] left-[50%] w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_5px_#FFFFFF] animate-twinkle" style="animation-duration: 1.8s; animation-delay: 0.8s"></div>
                         <div class="absolute top-[10%] right-[40%] w-[1px] h-[1px] bg-white/70 rounded-full shadow-[0_0_4px_#FFFFFF] animate-twinkle" style="animation-duration: 2.2s; animation-delay: 1.5s"></div>
                         <div class="absolute bottom-[40%] left-[45%] w-[1px] h-[1px] bg-white/60 rounded-full shadow-[0_0_3px_#FFFFFF] animate-twinkle" style="animation-duration: 2.8s; animation-delay: 1.0s"></div>
                      </div>
                    </div>

                    <!-- Action Link & Name Button Below (Combined Magical Frame) -->
                    <div class="-mt-[5rem] relative z-20 w-[85%] max-w-[280px] pointer-events-auto">
                       <!-- Main Frame Container -->
                       <div class="relative bg-gradient-to-b from-[#1a1130]/90 to-[#0a0515]/95 backdrop-blur-md rounded-xl border border-gold/40 shadow-[0_4px_25px_rgba(255,184,0,0.15)] group/frame hover:border-gold/70 transition-colors duration-500">
                          
                          <!-- Subtle Inner Glow -->
                          <div class="absolute inset-0 shadow-[inset_0_0_20px_rgba(255,184,0,0.05)] pointer-events-none rounded-xl overflow-hidden"></div>

                          <div class="flex items-center justify-between p-4 h-[72px]">
                             <!-- Name & Decoration -->
                             <div class="flex-1 min-w-0 pr-2 flex flex-col items-center justify-center relative group/title">
                                <!-- Tooltip Custom Siêu thực (Nằm dưới đè lên Nút) -->
                                <div class="absolute top-[80%] left-1/2 -translate-x-1/2 mt-2 w-max max-w-[220px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-gold/40 text-gold-light text-[11px] font-serif leading-relaxed text-center py-2 px-3 rounded-lg shadow-[0_4px_25px_rgba(0,0,0,0.8),0_0_15px_rgba(255,184,0,0.3)] opacity-0 invisible group-hover/title:opacity-100 group-hover/title:visible transition-all duration-300 z-[100] pointer-events-none transform -translate-y-2 group-hover/title:translate-y-0">
                                   <!-- Tooltip Arrow (Chỉ lên) -->
                                   <div class="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0a0a0a] border-t border-l border-gold/40 rotate-45"></div>
                                   {{ item.name }}
                                </div>

                                <span class="w-full text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark uppercase tracking-[0.2em] font-serif text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] truncate">{{ item.name }}</span>
                                
                                <!-- Decorative Line Below Name -->
                                <div class="w-full flex items-center justify-center mt-2 opacity-60">
                                   <div class="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
                                   <i class="fi fi-rr-rhombus text-[8px] text-gold mx-2"></i>
                                   <div class="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold/50 to-transparent"></div>
                                </div>
                             </div>

                             <!-- Edit Button (Integrated) -->
                             <button @click="startEditing(item)" 
                                     class="ml-3 group/btn shrink-0 w-11 h-11 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shadow-[0_0_10px_rgba(255,184,0,0.2)] transition-all hover:bg-gold hover:text-black hover:shadow-[0_0_20px_rgba(255,184,0,0.5)]">
                                <i class="fi fi-rr-feather text-xl drop-shadow-md transition-transform group-hover/btn:-rotate-12 group-hover/btn:scale-110"></i>
                             </button>
                          </div>

                          <!-- Top Border Highlight -->
                          <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-50"></div>
                       </div>
                    </div>
                  </div>
                  <div v-if="!filteredLibraryItems.length" class="col-span-full py-24 text-center">
                    <i class="fi fi-rr-book-open-reader text-5xl text-gold/10 block mb-4"></i>
                    <p class="text-white/20 italic font-serif">Không tìm thấy linh thư nào phù hợp trong kho lưu trữ</p>
                  </div>
                </div>

                <!-- Data Pagination Mystic Gold -->
                <div v-if="dataTotalPages > 0" class="flex justify-center items-center gap-6 mt-8 py-6 uppercase">
                  <!-- First Page -->
                  <button 
                    @click="changeDataPage(0)" 
                    :disabled="dataCurrentPage === 0"
                    class="text-gold hover:text-gold-light disabled:opacity-20 transition-all font-black text-xl"
                  >«</button>
                  
                  <!-- Page Numbers -->
                  <div class="flex items-center gap-2">
                    <template v-for="p in dataTotalPages" :key="p">
                      <button 
                        v-if="Math.abs(p - 1 - dataCurrentPage) < 3 || p === 1 || p === dataTotalPages"
                        @click="changeDataPage(p - 1)"
                        :class="[
                          'min-w-[40px] h-[40px] flex items-center justify-center text-sm font-bold transition-all duration-300',
                          dataCurrentPage === p - 1 
                            ? 'bg-gold text-black rounded-lg shadow-[0_4px_15px_rgba(255,184,0,0.3)]' 
                            : 'text-gold-light/60 hover:text-gold'
                        ]"
                      >
                        {{ p }}
                      </button>
                      <span v-else-if="p === 2 && dataCurrentPage > 3" class="text-gold/30">...</span>
                      <span v-else-if="p === dataTotalPages - 1 && dataCurrentPage < dataTotalPages - 4" class="text-gold/30">...</span>
                    </template>
                  </div>

                  <!-- Last Page -->
                  <button 
                    @click="changeDataPage(dataTotalPages - 1)" 
                    :disabled="dataCurrentPage >= dataTotalPages - 1"
                    class="text-gold hover:text-gold-light disabled:opacity-20 transition-all font-black text-xl"
                  >»</button>
                </div>
              </div>
              <div v-else class="space-y-8 animate-slide-up">
                <!-- Responsive Header: Stacked on mobile, row on desktop -->
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gold/10 pb-8">
                  <div class="flex items-start gap-4 md:gap-6 w-full">
                    <button @click="editingItem = null" class="w-12 h-12 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-all group shadow-lg">
                      <i class="fi fi-rr-arrow-left group-hover:-translate-x-1 transition-transform"></i>
                    </button>
                    <div class="min-w-0">
                      <h3 class="text-xl md:text-2xl font-serif font-bold text-gold italic break-words leading-tight">Cải Biên Linh Tự: {{ editingItem.name }}</h3>
                      <div class="flex flex-wrap items-center gap-2 mt-2">
                        <span class="text-[9px] bg-gold/10 text-gold/60 border border-gold/20 px-2 py-0.5 rounded uppercase tracking-widest">{{ editingItem.itemId }}</span>
                        <span class="text-[9px] bg-white/5 text-white/40 border border-white/10 px-2 py-0.5 rounded uppercase tracking-widest">{{ editingItem.type.replace('_', ' ') }}</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Desktop Actions (Hidden on mobile footer takes over) -->
                  <div class="hidden md:flex items-center gap-3">
                    <button @click="editingItem = null" class="px-6 py-3 rounded-2xl border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">Hủy Bỏ</button>
                    <button @click="saveLibraryItem" class="primary-btn px-8 py-3 rounded-2xl text-[#1a130a] text-[10px] font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(255,184,0,0.2)]">CẬP NHẬT LINH TỰ</button>
                  </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-24 md:pb-0">
                  <div :class="editingItem.type === 'iching_hexagram' ? 'lg:col-span-12' : 'lg:col-span-7'" class="space-y-10">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div class="space-y-3 group/input col-span-full">
                        <label class="block text-[11px] uppercase tracking-[0.25em] text-gold/50 font-black ml-4 font-serif">Tên Linh Tự</label>
                        <div class="relative">
                          <input v-model="editingItem.name" type="text" class="w-full bg-white/[0.03] border border-gold/20 rounded-2xl py-5 px-6 text-white text-base md:text-lg focus:outline-none focus:border-gold focus:bg-gold/5 transition-all font-serif shadow-inner" />
                          <div class="absolute inset-0 rounded-2xl pointer-events-none border border-gold/5 opacity-0 group-focus-within/input:opacity-100 transition-opacity"></div>
                        </div>
                      </div>
                      
                      <div class="space-y-3 group/input col-span-full">
                        <label class="block text-[11px] uppercase tracking-[0.25em] text-gold/50 font-black ml-4">Mô Tả Tổng Quan</label>
                        <textarea v-model="editingItem.description" rows="6" class="w-full bg-white/[0.03] border border-gold/20 rounded-3xl py-5 px-6 text-white text-sm md:text-base leading-relaxed focus:outline-none focus:border-gold transform transition-all resize-none shadow-inner italic custom-scrollbar"></textarea>
                      </div>

                      <div v-if="editingItem.type === 'tarot_card'" class="space-y-3 group/input">
                        <label class="block text-[11px] uppercase tracking-[0.25em] text-emerald-400/50 font-black ml-4 flex items-center gap-2">
                          <i class="fi fi-rr-angle-small-up"></i> Ý Nghĩa Xuôi
                        </label>
                        <textarea v-model="editingItem.meaningUpright" rows="5" class="w-full bg-white/[0.03] border border-emerald-400/20 rounded-2xl py-4 px-6 text-white text-xs md:text-sm leading-relaxed focus:outline-none focus:border-emerald-400/50 transition-all resize-none shadow-inner"></textarea>
                      </div>

                      <div v-if="editingItem.type === 'tarot_card'" class="space-y-3 group/input">
                        <label class="block text-[11px] uppercase tracking-[0.25em] text-rose-400/50 font-black ml-4 flex items-center gap-2">
                          <i class="fi fi-rr-angle-small-down"></i> Ý Nghĩa Ngược
                        </label>
                        <textarea v-model="editingItem.meaningReversed" rows="5" class="w-full bg-white/[0.03] border border-rose-400/20 rounded-2xl py-4 px-6 text-white text-xs md:text-sm leading-relaxed focus:outline-none focus:border-rose-400/50 transition-all resize-none shadow-inner"></textarea>
                      </div>
                      <div v-if="editingItem.type === 'iching_hexagram'" class="space-y-2 group/input col-span-full">
                        <label class="block text-[11px] uppercase tracking-widest text-gold/50 font-black ml-4 font-serif">Thông Điệp Cơ Bản</label>
                        <textarea v-model="editingItem.meaningUpright" rows="4" class="w-full bg-white/5 border border-gold/20 rounded-2xl py-5 px-6 text-white text-sm leading-relaxed focus:outline-none focus:border-gold transition-all resize-none font-serif italic"></textarea>
                      </div>
                      <div class="space-y-2 group/input col-span-full">
                        <label class="block text-[11px] uppercase tracking-widest text-gold/50 font-black ml-4">Tương Quan Pháp Bảo (Cung/Hành/Số)</label>
                        <input v-model="editingItem.correlation" type="text" class="w-full bg-white/5 border border-gold/20 rounded-2xl py-5 px-6 text-white text-sm focus:outline-none focus:border-gold transition-all" />
                      </div>
                    </div>
                  </div>
                  <div v-if="editingItem.type !== 'iching_hexagram'" class="lg:col-span-5 space-y-6">
                    <div class="space-y-4 group/input">
                      <div class="flex items-center justify-between ml-4">
                        <label class="block text-[11px] uppercase tracking-widest text-gold/50 font-black">Linh Ảnh</label>
                        <button @click="fileInput.click()" :disabled="isUploading" class="bg-gold/10 hover:bg-gold hover:text-black text-gold text-[9px] font-black px-4 py-2 rounded-xl border border-gold/20 transition-all flex items-center gap-2"><i :class="isUploading ? 'fi fi-rr-spinner animate-spin' : 'fi fi-rr-cloud-upload'"></i><span>{{ isUploading ? 'ĐANG TẢI...' : 'TẢI ẢNH LÊN' }}</span></button>
                        <input type="file" ref="fileInput" @change="handleFileUpload" class="hidden" accept="image/*" />
                      </div>
                      <input v-model="editingItem.imageUrl" type="text" placeholder="https://res.cloudinary.com/..." class="w-full bg-white/5 border border-gold/20 rounded-xl py-3 px-6 text-[10px] text-white/60 focus:outline-none focus:border-gold transition-all" />
                    </div>
                    <div class="relative group/preview overflow-hidden rounded-[2.5rem] border border-gold/20 aspect-[3/4] flex items-center justify-center bg-black/40 shadow-inner">
                      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,184,0,0.05)_0%,transparent_70%)] opacity-0 group-hover/preview:opacity-100 transition-opacity"></div>
                      <img v-if="editingItem.imageUrl" :src="editingItem.imageUrl" class="max-w-[80%] max-h-[80%] object-contain shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-xl transform group-hover/preview:scale-105 transition-transform duration-700" loading="lazy" />
                      <div v-else class="text-center opacity-10 space-y-4">
                        <i class="fi fi-rr-picture text-7xl block"></i>
                        <p class="text-[10px] font-black uppercase tracking-[0.3em]">Chưa có linh ảnh</p>
                      </div>
                    </div>
                  </div>
                  <div v-else class="lg:col-span-5 flex items-center justify-center">
                     <div class="text-center p-10 border border-dashed border-gold/20 rounded-[2.5rem] bg-gold/5 space-y-4">
                        <i class="fi fi-rr-yin-yang text-6xl text-gold/20"></i>
                        <p class="text-white/40 text-xs italic leading-relaxed max-w-xs mx-auto">Kinh Dịch được kiến tạo từ hào và quái, không sử dụng linh ảnh hữu hình mà dùng thông điệp vô ảnh để truyền đạt chân lý.</p>
                     </div>
                  </div>
                </div>

              <!-- Floating Mobile Action Menu: Orbital Style for Form Edit -->
              <div class="fixed bottom-10 right-6 z-[101] md:hidden flex flex-col items-center animate-slide-up">
                <!-- Action Buttons (Orbiting) -->
                <transition name="orbital-pop">
                  <div v-if="isEditMenuOpen" class="absolute bottom-full mb-6 flex flex-col gap-5 items-center">
                    <!-- Save Action -->
                    <div class="relative group">
                      <span class="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-gold text-[#1a130a] text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">LƯU DỮ LIỆU</span>
                      <button @click="saveLibraryItem" 
                              class="w-14 h-14 rounded-full bg-gold shadow-[0_0_20px_rgba(255,184,0,0.4)] flex items-center justify-center text-[#1a130a] active:scale-95 transition-all">
                        <i class="fi fi-rr-disk text-xl"></i>
                      </button>
                    </div>

                    <!-- Cancel Action -->
                    <div class="relative group">
                      <span class="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">HỦY BỎ</span>
                      <button @click="closeEdit" 
                              class="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white/60 active:scale-95 transition-all">
                        <i class="fi fi-rr-cross text-lg"></i>
                      </button>
                    </div>
                  </div>
                </transition>

                <!-- Trigger Button (Core) -->
                <button @click="isEditMenuOpen = !isEditMenuOpen" 
                        class="w-16 h-16 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark shadow-[0_10px_40px_rgba(255,184,0,0.5)] flex items-center justify-center text-[#1a130a] relative group border-4 border-[#0F172A]/50 active:scale-90 transition-all z-20">
                  <i class="fi fi-rr-bolt text-2xl transition-transform duration-500" :class="{ 'rotate-[360deg] scale-125': isEditMenuOpen }"></i>
                  <div class="absolute inset-0 rounded-full border-4 border-gold/40 animate-ping" v-if="!isEditMenuOpen"></div>
                </button>
              </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    
    <SpiritualConfirm 
      v-model:show="showConfirmModal"
      :title="userToToggle?.status === 'active' || !userToToggle?.status ? 'Khóa Linh Hồn?' : 'Giải Phóng Linh Hồn?'"
      :message="userToToggle?.status === 'active' || !userToToggle?.status ? 'Cư dân này sẽ không thể truy cập vào vũ trụ Huyền Mệnh cho đến khi được mở khóa.' : 'Cư dân này sẽ được phép truy cập lại vào vũ trụ Huyền Mệnh.'"
      :confirm-text="userToToggle?.status === 'active' || !userToToggle?.status ? 'XÁC NHẬN KHÓA' : 'XÁC NHẬN MỞ'"
      :type="userToToggle?.status === 'active' || !userToToggle?.status ? 'danger' : 'primary'"
      :icon="userToToggle?.status === 'active' || !userToToggle?.status ? 'fi fi-rr-lock' : 'fi fi-rr-unlock'"
      @confirm="toggleUserStatus"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import api from '@/services/api';
import { uploadToCloudinary } from '@/services/cloudinary';
import { cosmicToast as toast } from '@/utils/toast';
import { Line, PolarArea } from 'vue-chartjs';
import { 
  Chart as ChartJS, 
  Title, Tooltip, Legend, 
  LineElement, PointElement, 
  BarElement, ArcElement,
  RadialLinearScale,
  CategoryScale, LinearScale, 
  Filler 
} from 'chart.js';
import SpiritualConfirm from '@/components/common/SpiritualConfirm.vue';

ChartJS.register(
  Title, Tooltip, Legend, 
  LineElement, PointElement, 
  BarElement, ArcElement,
  RadialLinearScale,
  CategoryScale, LinearScale, 
  Filler
);

const authStore = useAuthStore();
const activeTab = ref('profile');
const fileInput = ref(null);
const isUploading = ref(false);
const loadedImages = ref(new Set());
const isDataFilterOpen = ref(false);
const isEditMenuOpen = ref(false);
const editingItem = ref(null);
const dataFilterOptions = [
  { value: '', label: 'Tất cả', icon: '🌌' },
  { value: 'tarot_card', label: 'Tarot', icon: '🃏' },
  { value: 'iching_hexagram', label: 'Kinh Dịch', icon: '☯️' }
];

const currentFilterLabel = computed(() => {
  const opt = dataFilterOptions.find(o => o.value === dataFilterType.value);
  return opt ? opt.label : 'Tất cả';
});

const currentFilterIcon = computed(() => {
  const opt = dataFilterOptions.find(o => o.value === dataFilterType.value);
  return opt ? opt.icon : '🌌';
});

const selectDataFilter = (value) => {
  dataFilterType.value = value;
  isDataFilterOpen.value = false;
  fetchLibraryItems(); // Kích hoạt filter data
};

const handleImageLoad = (id) => {
    loadedImages.value.add(id);
};

const showConfirmModal = ref(false);
const userToToggle = ref(null);
const isMobileMenuOpen = ref(false);

const chartReady = ref(false);
const stats = ref(null);
const selectedRange = ref('30d');
const ranges = [
  { id: '7d', label: '7 Ngày' },
  { id: '30d', label: '30 Ngày' },
  { id: '90d', label: '90 Ngày' }
];

const quickStats = computed(() => [
  { label: 'Tổng Cư Dân', value: stats.value?.totalUsers || 0, icon: 'fi fi-rr-users', trend: '+12%' },
  { label: 'Đang Hiện Diện', value: stats.value?.activeUsers || 0, icon: 'fi fi-rr-eye', trend: '+5%' },
  { label: 'Luồng Năng Lượng', value: '1,280', icon: 'fi fi-rr-sparkles', trend: '+18%' },
  { label: 'Độ Tương Thích', value: '94%', icon: 'fi fi-rr-bolt', trend: '+2%' }
]);

const chartData = computed(() => {
  if (!stats.value?.userGrowth) return { labels: [], datasets: [] };
  const rawData = [...stats.value.userGrowth].reverse();
  return {
    labels: rawData.map(d => d.date),
    datasets: [{
      label: 'Linh hồn mới',
      data: rawData.map(d => d.count),
      borderColor: '#FFB800',
      backgroundColor: 'rgba(255, 184, 0, 0.1)',
      borderWidth: 3,
      tension: 0.4,
      fill: true,
      pointRadius: 4,
      pointBackgroundColor: '#FFB800'
    }]
  };
});

const zodiacData = computed(() => {
  if (!stats.value?.zodiacDistribution) return { labels: [], datasets: [] };
  return {
    labels: stats.value.zodiacDistribution.map(d => d.label.split(' (')[0]),
    datasets: [{
      label: 'Số lượng cư dân',
      data: stats.value.zodiacDistribution.map(d => d.count),
      backgroundColor: 'rgba(255, 184, 0, 0.2)',
      borderColor: '#FFB800',
      borderWidth: 1,
      borderRadius: 8,
      hoverBackgroundColor: 'rgba(255, 184, 0, 0.5)',
    }]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { 
    legend: { display: false }, 
    tooltip: { 
        backgroundColor: 'rgba(15, 23, 42, 0.95)', 
        titleFont: { family: 'Montserrat', size: 10, weight: 'bold' },
        padding: 12,
        borderColor: 'rgba(255, 184, 0, 0.2)',
        borderWidth: 1,
        titleColor: '#FFB800'
    } 
  },
  scales: {
    x: { ticks: { color: 'rgba(255,184,0,0.3)', font: { size: 9, family: 'Montserrat' } }, grid: { display: false } },
    y: { ticks: { color: 'rgba(255,184,0,0.3)', font: { size: 9 } }, grid: { color: 'rgba(255,184,0,0.03)' } }
  }
};

const zodiacOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      grid: { color: 'rgba(255, 184, 0, 0.1)' },
      angleLines: { color: 'rgba(255, 184, 0, 0.1)' },
      ticks: { display: false },
      pointLabels: {
        color: 'rgba(255, 184, 0, 0.6)',
        font: { size: 10, weight: 'bold', family: 'Montserrat' }
      }
    }
  },
  plugins: {
    legend: { display: false },
    tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#FFB800',
        padding: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 184, 0, 0.3)',
        bodyFont: { family: 'Montserrat', size: 11 }
    }
  }
};

const fetchStats = async () => {
  chartReady.value = false;
  try {
    const response = await api.get('/admin/stats');
    stats.value = response.data;
    chartReady.value = true;
  } catch (error) {
    toast.error('Gặp nhiễu loạn khi gọi dữ liệu thống kê');
  }
};

const formatRecentTime = (time) => {
  if (!time) return 'Vừa mới đây';
  const date = new Date(time);
  return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
        toast.warning('Linh ảnh quá lớn, vui lòng chọn ảnh dưới 5MB');
        return;
    }
    try {
        isUploading.value = true;
        const imageUrl = await uploadToCloudinary(file);
        editingItem.value.imageUrl = imageUrl;
        toast.success('Huyền ảnh đã được tải lên tiên giới thành công');
    } catch (error) {
        toast.error('Gặp nhiễu loạn khi tải ảnh lên Cloudinary');
    } finally {
        isUploading.value = false;
        if (fileInput.value) fileInput.value.value = '';
    }
};

watch(activeTab, (newTab) => {
    if (newTab === 'users' && authStore.user?.role === 'admin') fetchUsers();
    if (newTab === 'data' && authStore.user?.role === 'admin') fetchLibraryItems();
    if (newTab === 'stats' && authStore.user?.role === 'admin') fetchStats();
});

const profileForm = ref({ fullName: '', dob: '', hour: '', minute: '' });
const passwordForm = ref({ newPassword: '', confirmPassword: '' });
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
const userSearchQuery = ref('');
const userDateFilter = ref({ start: '', end: '' });
let userSearchTimeout = null;
let dataSearchTimeout = null;
const allUsers = ref([]);
const filteredUsers = ref([]);
const currentPage = ref(0);
const pageSize = ref(10);
const totalPages = ref(0);
const totalElements = ref(0);
const dataFilterType = ref('');
const dataSearchQuery = ref('');
const filteredLibraryItems = ref([]);
const dataCurrentPage = ref(0);
const dataPageSize = ref(12);
const dataTotalPages = ref(0);
const dataTotalElements = ref(0);


const menuItems = computed(() => [
  { id: 'profile', label: 'Hồ Sơ Cá Nhân', icon: 'fi fi-rr-user', show: true },
  { id: 'security', label: 'Linh Ấn Bảo Mật', icon: 'fi fi-rr-shield-check', show: true },
  { id: 'stats', label: 'Thống Kê Chiến Lược', icon: 'fi fi-rr-stats', show: authStore.user?.role === 'admin' },
  { id: 'users', label: 'Quản Lý Cư Dân', icon: 'fi fi-rr-users-alt', show: authStore.user?.role === 'admin' },
  { id: 'data', label: 'Kho Dữ Liệu', icon: 'fi fi-rr-database', show: authStore.user?.role === 'admin' }
]);

const visibleMenuItems = computed(() => menuItems.value.filter(item => item.show));
const totalVisible = computed(() => visibleMenuItems.value.length);

onMounted(async () => {
    try {
        const res = await api.get('/profiles/me');
        if (res.data) {
            profileForm.value = {
                fullName: res.data.fullName || '',
                dob: res.data.dob || '',
                hour: res.data.birthHour !== null ? res.data.birthHour : '',
                minute: res.data.birthMinute !== null ? res.data.birthMinute : ''
            };
        }
        if (authStore.user?.role === 'admin') {
            await Promise.all([
                fetchUsers(),
                fetchLibraryItems()
            ]);
        }
    } catch (e) {
        toast.error('Gặp nhiễu loạn khi tải hồ sơ');
    }
});

const fetchUsers = async () => {
    try {
        const res = await api.get('/admin/users', {
            params: {
                page: currentPage.value,
                size: pageSize.value,
                search: userSearchQuery.value,
                startDate: userDateFilter.value.start,
                endDate: userDateFilter.value.end
            }
        });
        filteredUsers.value = res.data.content || [];
        totalPages.value = res.data.page?.totalPages ?? res.data.totalPages ?? 0;
        totalElements.value = res.data.page?.totalElements ?? res.data.totalElements ?? 0;
    } catch (e) { 
        console.error(e);
        toast.error('Gặp nhiễu loạn khi chiêu mộ cư dân');
    }
};

const changePage = (newPage) => {
    currentPage.value = newPage;
    fetchUsers();
};

const confirmToggleStatus = (user) => {
    userToToggle.value = user;
    showConfirmModal.value = true;
};

const toggleUserStatus = async () => {
    const user = userToToggle.value;
    if (!user) return;
    try {
        await api.put(`/admin/users/${user.id}/toggle-status`);
        toast.success(`Đã ${user.status === 'active' || !user.status ? 'khóa' : 'mở khóa'} cư dân thành công`);
        fetchUsers();
    } catch (error) { toast.error('Không thể thay đổi trạng thái linh hồn'); }
};

const handleUserFilter = () => {
    if (userSearchTimeout) clearTimeout(userSearchTimeout);
    userSearchTimeout = setTimeout(() => {
        currentPage.value = 0;
        fetchUsers();
    }, 500);
};

const clearUserFilters = () => {
    userSearchQuery.value = '';
    userDateFilter.value = { start: '', end: '' };
    currentPage.value = 0;
    fetchUsers();
};

const fetchLibraryItems = async () => {
    try {
        const res = await api.get('/admin/library', { 
            params: { 
                type: dataFilterType.value,
                search: dataSearchQuery.value,
                page: dataCurrentPage.value,
                size: dataPageSize.value
            } 
        });
        filteredLibraryItems.value = res.data.content || [];
        dataTotalPages.value = res.data.page?.totalPages ?? res.data.totalPages ?? 0;
        dataTotalElements.value = res.data.page?.totalElements ?? res.data.totalElements ?? 0;
    } catch (e) { 
        console.error(e);
        toast.error('Gặp nhiễu loạn khi chiêu mộ dữ liệu');
    }
};

const changeDataPage = (newPage) => {
    dataCurrentPage.value = newPage;
    fetchLibraryItems();
};

const handleDataFilter = () => {
    if (dataSearchTimeout) clearTimeout(dataSearchTimeout);
    dataSearchTimeout = setTimeout(() => {
        dataCurrentPage.value = 0;
        fetchLibraryItems();
    }, 500);
};

const clearDataFilters = () => {
    dataSearchQuery.value = '';
    dataFilterType.value = '';
    dataCurrentPage.value = 0;
    fetchLibraryItems();
};

const closeEdit = () => {
    editingItem.value = null;
    isEditMenuOpen.value = false;
};

const startEditing = (item) => { 
    editingItem.value = { ...item };
    isEditMenuOpen.value = false;
};

const saveLibraryItem = async () => {
    try {
        await api.put(`/admin/library/${editingItem.value.id}`, editingItem.value);
        toast.success('Dữ liệu huyền học đã được cập nhật');
        fetchLibraryItems();
        closeEdit();
    } catch (e) { toast.error('Không thể cập nhật dữ liệu vào thư viện'); }
};

const updateProfile = async () => {
    if (isSubmittingProfile.value) return;
    try {
        isSubmittingProfile.value = true;
        await api.put('/profiles/me', profileForm.value);
        toast.success('Dấu ấn sinh mệnh đã được cập nhật thành công');
        await authStore.fetchUser();
    } catch (e) { toast.error(e.response?.data || 'Không thể liên kết với vũ trụ để cập nhật'); }
    finally { isSubmittingProfile.value = false; }
};

const handleChangePassword = async () => {
    if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
        toast.warning('Mật khẩu xác nhận không trùng khớp');
        return;
    }
    try {
        await api.post('/auth/change-password', { newPassword: passwordForm.value.newPassword });
        toast.success('Mật khẩu mới đã được thiết lập');
        passwordForm.value = { newPassword: '', confirmPassword: '' };
    } catch (e) { toast.error(e.response?.data || 'Năng lượng bảo mật không đủ để thay đổi'); }
};
</script>

<style scoped>
.glass-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(25px);
  border-radius: 2.5rem;
}
.primary-btn {
  background: linear-gradient(135deg, #FFB800 0%, #FFD700 50%, #FFB800 100%);
  background-size: 200% auto;
}
.primary-btn:hover {
  background-position: right center;
  transform: translateY(-2px);
}
.tab-slide-enter-active, .tab-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.tab-slide-enter-from {
  opacity: 0;
  transform: translateX(30px) scale(0.98);
}
.tab-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px) scale(0.98);
}
.preserve-3d {
  transform-style: preserve-3d;
}

.group-hover\:rotate-y-12:hover {
  transform: rotateY(12deg) translateY(-8px);
}

.crystal-shard:hover {
  transform: rotateY(0deg) rotateX(0deg) translateZ(15px);
  background: rgba(255, 255, 255, 0.05);
}

.crystal-shard-active {
  transform: rotateY(0deg) rotateX(0deg) translateZ(30px);
  background: rgba(255, 184, 0, 0.08);
  border-color: rgba(255, 184, 0, 0.3) !important;
}

.mobile-menu-enter-active, .mobile-menu-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.mobile-menu-enter-from, .mobile-menu-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.orbital-btn {
  transform: translate(var(--x, 0), var(--y, 0)) scale(1);
  opacity: 1;
}

.orbit-enter-active, .orbit-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.orbit-enter-from, .orbit-leave-to {
  transform: translate(0, 0) scale(0) !important;
  opacity: 0 !important;
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-10px) scale(1.05); }
}

@keyframes slide-right {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

.animate-slide-right {
  animation: slide-right 0.6s ease-out forwards;
}
@keyframes zoom-in {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
.animate-zoom-in {
  animation: zoom-in 0.6s ease-out;
}

@keyframes magic-sparkle {
  0%, 100% { 
    transform: scale(1) rotate(0deg); 
    opacity: 0.3; 
    filter: blur(60px) brightness(1) hue-rotate(0deg); 
  }
  50% { 
    transform: scale(1.2) rotate(15deg); 
    opacity: 0.8; 
    filter: blur(40px) brightness(1.8) hue-rotate(10deg); 
    box-shadow: 0 0 80px rgba(255, 184, 0, 0.6);
  }
}
.animate-magic-sparkle {
  animation: magic-sparkle 4s ease-in-out infinite;
}

@keyframes gentle-float {
  0%, 100% { transform: translateY(0); filter: drop-shadow(0 15px 35px rgba(0,0,0,0.6)); }
  50% { transform: translateY(-12px); filter: drop-shadow(0 30px 50px rgba(0,0,0,0.8)); }
}
.animate-gentle-float {
  animation: gentle-float 5s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0; transform: scale(0.5); }
  50% { opacity: 1; transform: scale(1.1); box-shadow: 0 0 6px rgba(255, 255, 255, 0.6); }
}
.animate-twinkle {
  animation: twinkle 3s ease-in-out infinite;
}
</style>