<template>
  <div class="min-h-[80vh] flex flex-col md:flex-row gap-6 p-4 md:p-8 animate-fade-in relative z-10">
    <div class="w-full md:w-64 flex-shrink-0">
      <div class="glass-panel p-3 border border-gold/20 sticky top-24">
        <div class="space-y-1">
          <button
            v-for="item in menuItems"
            :key="item.id"
            v-show="item.show"
            @click="activeTab = item.id"
            :class="[
              'w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-500 group relative overflow-hidden',
              activeTab === item.id
                ? 'bg-gradient-to-r from-gold/20 to-transparent text-gold border-l-4 border-gold shadow-[0_0_20px_rgba(255,184,0,0.1)]'
                : 'text-white/40 hover:text-white/80 hover:bg-white/5 border-l-4 border-transparent'
            ]"
          >
            <div v-if="activeTab === item.id" class="absolute inset-0 bg-gold/5 animate-pulse"></div>
            <i :class="[item.icon, activeTab === item.id ? 'text-gold scale-110' : 'text-gold/30 group-hover:text-gold/60']" class="text-xl transition-all duration-500"></i>
            <span class="text-xs font-black uppercase tracking-[0.2em] relative z-10">{{ item.label }}</span>
            <div class="absolute right-0 top-0 bottom-0 w-1 bg-gold scale-y-0 group-hover:scale-y-50 transition-transform duration-500"></div>
          </button>
        </div>
      </div>
    </div>

    <div class="flex-1 min-w-0">
      <div class="glass-panel p-6 md:p-10 border border-gold/10 min-h-[600px] relative overflow-hidden">
        <div class="absolute -top-20 -right-20 w-64 h-64 bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none"></div>

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
                    <button type="submit" class="primary-btn px-10 py-4 rounded-2xl text-[#1a130a] font-black tracking-widest text-xs uppercase hover:shadow-[0_10px_30px_rgba(255,184,0,0.3)] transition-all">
                        Lưu Dấu Ấn Mới
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

            <div v-else-if="activeTab === 'stats'" class="space-y-8 animate-fade-in">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/10 pb-6">
                <div class="space-y-1">
                  <h2 class="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark tracking-tight uppercase">Đài Quan Sát Vũ Trụ</h2>
                  <p class="text-white/40 text-[10px] uppercase tracking-[0.3em] font-serif mt-2">Thống kê sự phát triển & bản đồ linh hồn cư dân</p>
                </div>
                <div class="bg-white/5 border border-gold/20 rounded-xl p-1 flex items-center gap-1 backdrop-blur-md">
                  <button v-for="range in ranges" :key="range.id" @click="selectedRange = range.id" :class="selectedRange === range.id ? 'bg-gold text-black' : 'text-gold/60 hover:text-gold hover:bg-white/5'" class="px-4 py-2 rounded-lg text-xs font-bold tracking-wider transition-all duration-300">{{ range.label }}</button>
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div v-for="stat in quickStats" :key="stat.label" class="glass-panel p-6 border border-gold/20 relative group hover:border-gold/40 transition-all duration-500 overflow-hidden">
                  <div class="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <i :class="stat.icon" class="text-6xl text-gold"></i>
                  </div>
                  <div class="relative z-10 flex flex-col gap-1">
                    <span class="text-gold/60 text-[10px] uppercase tracking-widest font-black">{{ stat.label }}</span>
                    <div class="flex items-baseline gap-2">
                      <span class="text-3xl font-serif font-bold text-white tracking-widest">{{ stat.value }}</span>
                      <span v-if="stat.trend" class="text-[10px] text-green-400 font-bold flex items-center gap-1"><i class="fi fi-rr-arrow-trend-up"></i> {{ stat.trend }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2 glass-panel p-6 md:p-8 min-h-[400px]">
                  <h3 class="text-lg font-serif font-bold text-gold flex items-center gap-2 mb-8"><i class="fi fi-rr-chart-line-up"></i> Biểu Đồ Tăng Trưởng</h3>
                  <div class="h-[300px] relative">
                    <Line v-if="chartReady" :data="chartData" :options="chartOptions" />
                    <div v-else class="absolute inset-0 flex items-center justify-center">
                       <div class="animate-spin h-8 w-8 border-2 border-gold/20 border-t-gold rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div class="glass-panel p-6 md:p-8 flex flex-col">
                  <h3 class="text-lg font-serif font-bold text-gold mb-6 flex items-center gap-2"><i class="fi fi-rr-portal-exit"></i> Cư Dân Mới</h3>
                  <div class="flex-1 space-y-4 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
                    <div v-if="!stats?.recentUsers?.length" class="text-center py-20 text-white/20 italic text-sm">Chưa có linh hồn mới</div>
                    <div v-for="user in stats?.recentUsers" :key="user.id" class="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-gold/20 transition-all">
                      <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-gold/20 to-gold-light/40 flex items-center justify-center text-gold font-bold">{{ user.email.charAt(0).toUpperCase() }}</div>
                      <div class="flex-1 min-w-0">
                        <p class="text-[11px] font-bold text-white/80 truncate font-sans">{{ user.email }}</p>
                        <p class="text-[9px] text-gold/40 uppercase tracking-tighter">{{ formatRecentTime(user.created_at) }}</p>
                      </div>
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
                <div class="flex flex-wrap items-center gap-4">
                  <div class="relative group">
                    <i class="fi fi-rr-search absolute left-4 top-1/2 -translate-y-1/2 text-gold/40 group-focus-within:text-gold transition-colors"></i>
                    <input v-model="userSearchQuery" @input="handleUserFilter" type="text" placeholder="Tìm theo email..." class="bg-white/5 border border-gold/20 rounded-xl py-2.5 pl-12 pr-4 text-xs text-white focus:outline-none focus:border-gold transition-all w-full md:w-64" />
                  </div>
                  <div class="flex items-center gap-2 bg-white/5 border border-gold/20 rounded-xl px-4 py-2">
                    <input v-model="userDateFilter.start" @change="handleUserFilter" type="date" class="bg-transparent text-[10px] text-gold focus:outline-none [color-scheme:dark]" />
                    <span class="text-gold/20">→</span>
                    <input v-model="userDateFilter.end" @change="handleUserFilter" type="date" class="bg-transparent text-[10px] text-gold focus:outline-none [color-scheme:dark]" />
                  </div>
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
                          <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-gold/20 to-gold/5 flex items-center justify-center text-gold font-bold border border-gold/20 group-hover:border-gold/40 transition-all">{{ user.fullName ? user.fullName.charAt(0) : user.email.charAt(0).toUpperCase() }}</div>
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
                           <button @click="toggleUserStatus(user)" :class="user.status === 'active' || !user.status ? 'bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white' : 'bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white'" class="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all border flex items-center gap-2" :title="user.status === 'active' || !user.status ? 'Khóa tài khoản' : 'Mở khóa tài khoản'"><i :class="user.status === 'active' || !user.status ? 'fi fi-rr-lock' : 'fi fi-rr-unlock'"></i><span>{{ user.status === 'active' || !user.status ? 'KHÓA' : 'MỞ KHÓA' }}</span></button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="!filteredUsers.length">
                      <td colspan="5" class="px-6 py-20 text-center text-white/30 italic text-sm">Không tìm thấy linh hồn nào phù hợp với yêu cầu</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div v-else-if="activeTab === 'data'" class="space-y-8 animate-fade-in">
              <div v-if="!editingItem" class="space-y-6">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gold/10 pb-8">
                  <div>
                    <h2 class="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold-dark tracking-tight">Kho Dữ Liệu Huyền Học</h2>
                    <p class="text-white/40 text-xs uppercase tracking-[0.3em] mt-2">Quản lý nội dung Tarot & Kinh Dịch</p>
                  </div>
                  <div class="flex items-center gap-4">
                    <select v-model="dataFilterType" @change="fetchLibraryItems" class="bg-white/5 border border-gold/20 rounded-xl px-4 py-2.5 text-xs text-gold focus:outline-none focus:border-gold transition-all">
                      <option value="">Tất cả loại</option>
                      <option value="tarot_card">Tarot (Lá bài)</option>
                      <option value="iching_hexagram">Kinh Dịch (Quẻ)</option>
                    </select>
                    <div class="relative group">
                      <i class="fi fi-rr-search absolute left-4 top-1/2 -translate-y-1/2 text-gold/40"></i>
                      <input v-model="dataSearchQuery" @input="handleDataFilter" type="text" placeholder="Tìm tên hoặc mô tả..." class="bg-white/5 border border-gold/20 rounded-xl py-2.5 pl-12 pr-4 text-xs text-white focus:outline-none focus:border-gold w-64" />
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div v-for="item in filteredLibraryItems" :key="item.id" class="glass-panel p-5 border border-gold/10 hover:border-gold/30 transition-all group relative overflow-hidden">
                    <div class="flex items-start justify-between gap-4 mb-4">
                      <div class="w-12 h-16 rounded-lg bg-gold/5 border border-gold/10 flex items-center justify-center overflow-hidden">
                        <img v-if="item.imageUrl" :src="item.imageUrl" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" loading="lazy" />
                        <i v-else :class="item.type === 'tarot_card' ? 'fi fi-rr-cards' : 'fi fi-rr-yin-yang'" class="text-2xl text-gold/20"></i>
                      </div>
                      <div class="text-right">
                        <span class="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border border-gold/20 text-gold/60">{{ item.itemId }}</span>
                        <p class="text-[9px] text-white/30 mt-1 uppercase tracking-tighter">{{ item.type === 'tarot_card' ? 'Tarot' : 'Kinh Dịch' }}</p>
                      </div>
                    </div>
                    <h4 class="text-gold font-bold text-base mb-2 group-hover:text-gold-light transition-colors">{{ item.name }}</h4>
                    <p class="text-xs text-white/40 line-clamp-3 leading-relaxed mb-6">{{ item.description }}</p>
                    <button @click="startEditing(item)" class="w-full py-2 bg-gold/10 text-gold text-xs font-black uppercase tracking-widest rounded-xl border border-gold/20 hover:bg-gold hover:text-black transition-all">CHỈNH SỬA LINH TỰ</button>
                  </div>
                  <div v-if="!filteredLibraryItems.length" class="col-span-full py-20 text-center opacity-30 italic">Không tìm thấy nội dung phù hợp</div>
                </div>
              </div>
              <div v-else class="space-y-8 animate-slide-up">
                <div class="flex items-center justify-between border-b border-gold/10 pb-6">
                  <div class="flex items-center gap-6">
                    <button @click="editingItem = null" class="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-all group"><i class="fi fi-rr-arrow-left group-hover:-translate-x-1 transition-transform"></i></button>
                    <div>
                      <h3 class="text-2xl font-serif font-bold text-gold italic">Cải Biên Linh Tự: {{ editingItem.name }}</h3>
                      <p class="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1">{{ editingItem.itemId }} • {{ editingItem.type.replace('_', ' ') }}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <button @click="editingItem = null" class="px-6 py-3 rounded-2xl border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">Hủy Bỏ</button>
                    <button @click="saveLibraryItem" class="primary-btn px-8 py-3 rounded-2xl text-[#1a130a] text-[10px] font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(255,184,0,0.2)]">CẬP NHẬT LINH TỰ</button>
                  </div>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div :class="editingItem.type === 'iching_hexagram' ? 'lg:col-span-12' : 'lg:col-span-7'" class="space-y-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div class="space-y-2 group/input col-span-full">
                        <label class="block text-[11px] uppercase tracking-widest text-gold/50 font-black ml-4 font-serif">Tên Linh Tự</label>
                        <input v-model="editingItem.name" type="text" class="w-full bg-white/5 border border-gold/20 rounded-2xl py-5 px-6 text-white text-base focus:outline-none focus:border-gold focus:bg-gold/5 transition-all font-serif" />
                      </div>
                      <div class="space-y-2 group/input col-span-full">
                        <label class="block text-[11px] uppercase tracking-widest text-gold/50 font-black ml-4">Mô Tả Tổng Quan</label>
                        <textarea v-model="editingItem.description" rows="5" class="w-full bg-white/5 border border-gold/20 rounded-2xl py-5 px-6 text-white text-sm leading-relaxed focus:outline-none focus:border-gold transition-all resize-none italic"></textarea>
                      </div>
                      <div v-if="editingItem.type === 'tarot_card'" class="space-y-2 group/input">
                        <label class="block text-[11px] uppercase tracking-widest text-gold/50 font-black ml-4">Ý Nghĩa Xuôi</label>
                        <textarea v-model="editingItem.meaningUpright" rows="4" class="w-full bg-white/5 border border-gold/20 rounded-2xl py-4 px-6 text-white text-xs leading-relaxed focus:outline-none focus:border-gold transition-all resize-none"></textarea>
                      </div>
                      <div v-if="editingItem.type === 'tarot_card'" class="space-y-2 group/input">
                        <label class="block text-[11px] uppercase tracking-widest text-gold/50 font-black ml-4">Ý Nghĩa Ngược</label>
                        <textarea v-model="editingItem.meaningReversed" rows="4" class="w-full bg-white/5 border border-gold/20 rounded-2xl py-4 px-6 text-white text-xs leading-relaxed focus:outline-none focus:border-gold transition-all resize-none"></textarea>
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
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import api from '@/services/api';
import { uploadToCloudinary } from '@/services/cloudinary';
import { cosmicToast as toast } from '@/utils/toast';
import { Line, Bar } from 'vue-chartjs';
import { 
  Chart as ChartJS, 
  Title, Tooltip, Legend, 
  LineElement, PointElement, 
  BarElement,
  CategoryScale, LinearScale, 
  Filler 
} from 'chart.js';

ChartJS.register(
  Title, Tooltip, Legend, 
  LineElement, PointElement, 
  BarElement,
  CategoryScale, LinearScale, 
  Filler
);

const authStore = useAuthStore();
const activeTab = ref('profile');
const fileInput = ref(null);
const isUploading = ref(false);

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
  plugins: { legend: { display: false }, tooltip: { backgroundColor: 'rgba(0,0,0,0.8)', padding: 12 } },
  scales: {
    x: { ticks: { color: 'rgba(255,184,0,0.4)', font: { size: 9 } }, grid: { display: false } },
    y: { ticks: { color: 'rgba(255,184,0,0.4)', font: { size: 9 } }, grid: { color: 'rgba(255,184,0,0.05)' } }
  }
};

const zodiacOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { 
    legend: { display: false },
    tooltip: { 
        backgroundColor: 'rgba(0,0,0,0.9)',
        titleColor: '#FFB800',
        padding: 12,
        bodyFont: { family: 'Montserrat' }
    } 
  },
  scales: {
    x: { 
        ticks: { color: 'rgba(255,255,255,0.6)', font: { size: 10, weight: 'bold' } }, 
        grid: { display: false } 
    },
    y: { 
        ticks: { color: 'rgba(255,184,0,0.4)', font: { size: 9 }, stepSize: 1 }, 
        grid: { color: 'rgba(255,184,0,0.05)' } 
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
const allUsers = ref([]);
const filteredUsers = ref([]);
const dataFilterType = ref('');
const dataSearchQuery = ref('');
const allLibraryItems = ref([]);
const filteredLibraryItems = ref([]);
const editingItem = ref(null);

const menuItems = computed(() => [
  { id: 'profile', label: 'Hồ Sơ Cá Nhân', icon: 'fi fi-rr-user-astrological', show: true },
  { id: 'security', label: 'Linh Ấn Bảo Mật', icon: 'fi fi-rr-shield-check', show: true },
  { id: 'stats', label: 'Thống Kê Chiến Lược', icon: 'fi fi-rr-stats', show: authStore.user?.role === 'admin' },
  { id: 'users', label: 'Quản Lý Cư Dân', icon: 'fi fi-rr-users-alt', show: authStore.user?.role === 'admin' },
  { id: 'data', label: 'Kho Dữ Liệu', icon: 'fi fi-rr-database', show: authStore.user?.role === 'admin' }
]);

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
        if (authStore.user?.role === 'admin') await fetchUsers();
    } catch (e) {
        toast.error('Gặp nhiễu loạn khi tải hồ sơ');
    }
});

const fetchUsers = async () => {
    try {
        const res = await api.get('/admin/users');
        allUsers.value = res.data;
        filteredUsers.value = res.data;
    } catch (e) { console.error(e); }
};

const toggleUserStatus = async (user) => {
    try {
        await api.put(`/admin/users/${user.id}/toggle-status`);
        toast.success(`Đã ${user.status === 'active' || !user.status ? 'khóa' : 'mở khóa'} cư dân thành công`);
        fetchUsers();
    } catch (error) { toast.error('Không thể thay đổi trạng thái linh hồn'); }
};

const handleUserFilter = () => {
    let result = [...allUsers.value];
    if (userSearchQuery.value) {
        const query = userSearchQuery.value.toLowerCase();
        result = result.filter(u => u.email.toLowerCase().includes(query) || (u.fullName && u.fullName.toLowerCase().includes(query)));
    }
    if (userDateFilter.value.start) result = result.filter(u => new Date(u.created_at) >= new Date(userDateFilter.value.start));
    if (userDateFilter.value.end) {
        const endDate = new Date(userDateFilter.value.end);
        endDate.setHours(23, 59, 59, 999);
        result = result.filter(u => new Date(u.created_at) <= endDate);
    }
    filteredUsers.value = result;
};

const fetchLibraryItems = async () => {
    try {
        const res = await api.get('/admin/library', { params: { type: dataFilterType.value } });
        allLibraryItems.value = res.data;
        filteredLibraryItems.value = res.data;
    } catch (e) { console.error(e); }
};

const handleDataFilter = () => {
    let result = [...allLibraryItems.value];
    if (dataSearchQuery.value) {
        const query = dataSearchQuery.value.toLowerCase();
        result = result.filter(i => i.name.toLowerCase().includes(query) || (i.description && i.description.toLowerCase().includes(query)));
    }
    filteredLibraryItems.value = result;
};

const startEditing = (item) => { editingItem.value = { ...item }; };
const saveLibraryItem = async () => {
    try {
        await api.put(`/admin/library/${editingItem.value.id}`, editingItem.value);
        toast.success('Dữ liệu huyền học đã được cập nhật');
        editingItem.value = null;
        fetchLibraryItems();
    } catch (e) { toast.error('Không thể cập nhật dữ liệu vào thư viện'); }
};

const updateProfile = async () => {
    try {
        await api.put('/profiles/me', profileForm.value);
        toast.success('Dấu ấn sinh mệnh đã được cập nhật thành công');
        await authStore.fetchUser();
    } catch (e) { toast.error(e.response?.data || 'Không thể liên kết với vũ trụ để cập nhật'); }
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
@keyframes zoom-in {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
.animate-zoom-in {
  animation: zoom-in 0.6s ease-out;
}
</style>