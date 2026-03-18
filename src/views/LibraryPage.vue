<template>
  <div class="library-page space-y-12 animate-fade-in pb-20 pt-8">

    <div class="text-center space-y-4 relative z-10">
      <h1 class="text-2xl md:text-3xl font-serif font-bold  bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark tracking-[0.2em] mb-2 glowing-text-gold uppercase">
        HUYỀN THƯ
      </h1>
      <div class="h-[2px] w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto drop-shadow-[0_0_8px_rgba(255,184,0,0.8)]"></div>
      <p class="text-white/40 text-xs uppercase tracking-[0.3em] font-serif mt-2">Kho tàng thông điệp cổ xưa và trí tuệ vũ trụ</p>
    </div>


    <div class="max-w-6xl mx-auto px-4 relative z-10">
      <div class="bg-black/40 backdrop-blur-xl border border-gold/20 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center gap-8">


        <div class="flex p-1 bg-white/5 rounded-2xl border border-white/10 w-full md:w-auto">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            @click="activeTab = tab.value; resetAndFetch()"
            class="flex-1 md:w-40 py-3 rounded-xl transition-all duration-500 font-serif tracking-widest text-sm uppercase font-bold"
            :class="activeTab === tab.value ? 'bg-gold text-black shadow-[0_0_20px_rgba(255,184,0,0.4)]' : 'text-white/40 hover:text-white hover:bg-white/5'"
          >
            {{ tab.label }}
          </button>
        </div>


        <div class="relative flex-1 group w-full">
          <input
            v-model="searchKeyword"
            @keyup.enter="resetAndFetch"
            type="text"
            placeholder="Tìm kiếm thông điệp..."
            class="w-full bg-black/40 border border-gold/20 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all font-sans"
          />
          <svg @click="resetAndFetch" class="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gold/40 group-focus-within:text-gold transition-colors cursor-pointer hover:scale-110 active:scale-95" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-width="2"/>
          </svg>
        </div>


        <button @click="handleReset" class="p-4 rounded-2xl bg-gold/5 border border-gold/20 text-gold hover:bg-gold hover:text-black transition-all shadow-lg">
          <svg :class="{'animate-spin': loading}" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke-width="2"/>
          </svg>
        </button>
      </div>
    </div>


    <div class="max-w-7xl mx-auto px-4 relative z-10">
      <div v-if="loading && items.length === 0" class="flex flex-col items-center justify-center py-40 space-y-6">
        <div class="w-20 h-20 border-t-2 border-b-2 border-gold rounded-full animate-spin shadow-[0_0_30px_rgba(255,184,0,0.3)]"></div>
        <p class="text-gold font-serif italic tracking-[0.2em] animate-pulse">Đang thỉnh cầu dữ liệu...</p>
      </div>

      <div v-else-if="items.length === 0" class="text-center py-40 bg-black/20 border border-dashed border-gold/10 rounded-3xl">
        <svg class="w-24 h-24 text-gold/10 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.246 18.477 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke-width="2"/>
        </svg>
        <p class="text-white/40 italic font-serif text-xl tracking-widest">Không tìm thấy thông điệp trùng khớp</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="item in items"
          :key="item.id"
          class="animated-border-card group cursor-pointer h-full"
          @click="openDetail(item)"
        >
          <div class="inner-card-content !bg-[#0d0d0d]/80 !border-gold/20 group-hover:!border-gold/60 relative flex flex-col h-full overflow-hidden transition-all duration-500 group-hover:-translate-y-1">
            <div class="w-full aspect-[2/3] relative flex flex-col items-center justify-center bg-black/40 overflow-hidden border-b border-gold/10 p-3 transition-all duration-500">
              <!-- Content Container (Blurred on hover) -->
              <div class="w-full h-full transition-all duration-700 group-hover:blur-md group-hover:scale-105 group-hover:opacity-40 flex flex-col items-center justify-center">
                <template v-if="item.type === 'tarot_card' || item.imageUrl">
                  <img
                    :src="getItemImageUrl(item)"
                    class="w-full h-full object-cover"
                    :alt="item.name"
                  />
                </template>
                <template v-else-if="item.type === 'iching_hexagram'">
                  <div class="w-full flex-1 flex flex-col justify-center gap-2 px-4">
                    <div v-for="(line, idx) in getHexBinary(item.itemId)" :key="idx" class="h-2 w-full">
                      <div v-if="line === '1'" class="w-full h-full bg-gold/80 rounded-sm"></div>
                      <div v-else class="w-full h-full flex justify-between">
                        <div class="w-[42%] h-full bg-gold/80 rounded-sm"></div>
                        <div class="w-[42%] h-full bg-gold/80 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                  <div class="text-gold font-serif text-3xl font-bold mt-4 drop-shadow-md">
                     {{ item.itemId.split('_')[1] }}
                  </div>
                </template>
              </div>

              <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-10 transition-opacity"></div>
              
              <!-- Radiant Eye Icon Hover Effect (Enhanced) -->
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-150 group-hover:scale-100 pointer-events-none">
                 <div class="relative">
                    <!-- Outer Glow Rings -->
                    <div class="absolute inset-0 rounded-full bg-gold/40 blur-2xl animate-pulse-slow"></div>
                    <div class="absolute inset-0 rounded-full bg-gold/20 blur-3xl"></div>
                    
                    <div class="relative p-5 rounded-full bg-black/40 backdrop-blur-xl border border-gold/50 shadow-[0_0_50px_rgba(255,184,0,0.6)] group-hover:shadow-[0_0_80px_rgba(255,184,0,0.8)] transition-all duration-700">
                       <svg class="w-10 h-10 text-gold drop-shadow-[0_0_15px_gold]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                       </svg>
                    </div>
                 </div>
              </div>

              <div class="absolute top-2 right-2">
                <span class="bg-black/60 backdrop-blur-md text-gold text-[10px] uppercase font-bold px-2 py-1 rounded-md border border-gold/30 tracking-tighter shadow-lg">
                  {{ item.type === 'tarot_card' ? 'Tarot' : 'Kinh Dịch' }}
                </span>
              </div>
            </div>

            <div class="p-5 text-center space-y-2 w-full bg-gradient-to-b from-transparent to-black/40">
              <h3 class="text-gold font-serif text-lg font-bold group-hover:text-gold-light transition-colors line-clamp-1 italic tracking-wide group-hover:scale-105 transform duration-300">{{ item.name }}</h3>
              <p class="text-white/40 text-[10px] leading-relaxed line-clamp-2 font-sans italic opacity-60 group-hover:opacity-100 transition-opacity">
                {{ item.description || 'Thông điệp huyền bí chưa được giải mã trọn vẹn...' }}
              </p>
            </div>
            <div class="h-1 w-0 bg-gold rounded-full group-hover:w-full transition-all duration-500 absolute bottom-0 left-0"></div>
          </div>
        </div>
      </div>


      <!-- Pagination Mystic Gold -->
      <div v-if="totalPages > 0" class="flex justify-center items-center gap-6 mt-16 relative z-10 py-6 uppercase">
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


    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="selectedItem" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" @click.self="selectedItem = null">
          <div class="bg-[#0c0c0c] border border-gold/30 rounded-3xl w-full max-w-xl p-10 relative animate-scale-up shadow-[0_0_60px_rgba(0,0,0,0.8)] max-h-[85vh] overflow-y-auto scrollbar-custom">


            <button @click="selectedItem = null" class="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-gold/20 rounded-full transition-all text-white/20 hover:text-gold border border-white/10">
              <i class="fi fi-rr-cross text-xs"></i>
            </button>

            <div class="space-y-10">

              <div class="text-center space-y-3 border-b border-gold/10 pb-6">
                <span class="bg-gold/5 text-gold text-[9px] px-6 py-1.5 rounded-full border border-gold/20 font-sans font-black uppercase tracking-[0.3em]">
                  {{ selectedItem.type === 'tarot_card' ? 'Huyền Tự Tarot' : 'Quẻ Trí Tuệ Kinh Dịch' }}
                </span>
                <h3 class="text-white font-serif text-3xl italic tracking-tight leading-tight pt-2">
                  {{ selectedItem.name }}
                </h3>
              </div>


              <div class="flex justify-center py-4">
                <div class="flex flex-col items-center">
                  <template v-if="selectedItem.type === 'tarot_card'">
                    <span class="text-purple-400 text-[10px] uppercase tracking-[0.2em] font-sans font-black mb-1">Cấp bậc</span>
                    <span class="text-white font-serif text-xl tracking-wide">Ẩn Chính</span>
                  </template>
                  <template v-else-if="selectedItem.type === 'iching_hexagram'">
                    <span class="text-orange-400 text-[10px] uppercase tracking-[0.2em] font-sans font-black mb-1">Số Quẻ</span>
                    <span class="text-white font-serif text-xl tracking-wide">Quẻ {{ selectedItem.itemId.split('_')[1] }}</span>
                  </template>
                </div>
              </div>


              <div class="space-y-8">

                  <div v-if="selectedItem.type === 'tarot_card' && selectedItem.description" class="relative py-4 text-center">
                     <p class="text-white/80 leading-relaxed font-serif text-xl italic tracking-wide">
                        "{{ selectedItem.description }}"
                     </p>
                  </div>


                  <div class="space-y-6">
                     <div v-if="selectedItem.type === 'tarot_card'" class="grid grid-cols-1 gap-6 text-left">
                        <div class="space-y-3 border-l-2 border-gold/30 pl-6">
                           <h5 class="text-gold text-[10px] font-black uppercase tracking-[0.3em]">Ánh sáng (Ý nghĩa xuôi)</h5>
                           <p class="text-white/60 text-sm leading-relaxed font-sans font-light">{{ selectedItem.meaningUpright }}</p>
                        </div>
                        <div class="space-y-3 border-l-2 border-purple-500/20 pl-6">
                           <h5 class="text-purple-300 text-[10px] font-black uppercase tracking-[0.3em]">Bóng tối (Ý nghĩa ngược)</h5>
                           <p class="text-white/40 text-sm leading-relaxed font-sans italic font-light">{{ selectedItem.meaningReversed }}</p>
                        </div>
                     </div>

                     <div v-else class="bg-white/5 p-8 rounded-3xl border border-gold/10">
                        <h5 class="text-gold text-[9px] font-black uppercase tracking-[0.4em] mb-6 text-center">THÔNG ĐIỆP VŨ TRỤ</h5>
                        <p class="text-gold-light/90 leading-loose italic text-lg font-serif text-center whitespace-pre-line">{{ selectedItem.description || selectedItem.meaningUpright }}</p>
                     </div>
                  </div>
              </div>

            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

import api from '@/services/api';
import { optimizeCloudinaryUrl } from '@/utils/spiritualCalc';

const items = ref([]);
const activeTab = ref('tarot_card');
const searchKeyword = ref('');
const loading = ref(false);
const currentPage = ref(0);
const totalPages = ref(1);
const selectedItem = ref(null);

const tabs = [
  { label: 'Tarot', value: 'tarot_card' },
  { label: 'Kinh Dịch', value: 'iching_hexagram' }
];

let searchTimeout = null;
watch(searchKeyword, () => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentPage.value = 0;
    fetchLibrary();
  }, 500);
});

const handleReset = () => {
  searchKeyword.value = '';
  currentPage.value = 0;
  fetchLibrary();
};

const resetAndFetch = () => {
  currentPage.value = 0;
  fetchLibrary();
};

const fetchLibrary = async () => {
  loading.value = true;
  try {
    const res = await api.get('/library/list', {
      params: {
        page: currentPage.value,
        size: 12,
        type: activeTab.value,
        keyword: searchKeyword.value
      }
    });
    items.value = res.data.content || [];
    totalPages.value = res.data.page?.totalPages ?? res.data.totalPages ?? 0;
  } catch (error) {
    console.error('Lỗi khi tải thư viện:', error);
  } finally {
    loading.value = false;
  }
};

const changePage = (page) => {
  currentPage.value = page;
  fetchLibrary();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const openDetail = (item) => {
  selectedItem.value = item;
};

const getItemImageUrl = (item) => {
  if (item.imageUrl) return optimizeCloudinaryUrl(item.imageUrl, { width: 300 });

  if (item.type === 'tarot_card') {
    const id = item.itemId.split('_')[1];
    return optimizeCloudinaryUrl(`https://res.cloudinary.com/drac9ko3l/image/upload/v1772078973/tarot_${parseInt(id)}.png`, { width: 300 });
  }

  return '';
};

const getHexBinary = (itemId) => {
  if (!itemId || !itemId.startsWith('hex_')) return ['1','1','1','1','1','1'];
  const hexNum = parseInt(itemId.split('_')[1]);
  const binaries = {
    1: '111111', 2: '000000', 3: '100010', 4: '010001', 5: '111010', 6: '010111', 7: '010000', 8: '000010',
    9: '111011', 10: '110111', 11: '111000', 12: '000111', 13: '101111', 14: '111101', 15: '001000', 16: '000100',
    17: '100110', 18: '011001', 19: '110000', 20: '000011', 21: '100101', 22: '101001', 23: '000001', 24: '100000',
    25: '100111', 26: '111001', 27: '100001', 28: '011110', 29: '010010', 30: '101101', 31: '001110', 32: '011100',
    33: '001111', 34: '111100', 35: '000101', 36: '101000', 37: '110101', 38: '101011', 39: '001010', 40: '010100',
    41: '110001', 42: '100011', 43: '111110', 44: '011111', 45: '000110', 46: '011000', 47: '010110', 48: '011010',
    49: '101110', 50: '011101', 51: '100100', 52: '001001', 53: '001011', 54: '110100', 55: '101100', 56: '001101',
    57: '011011', 58: '110110', 59: '010011', 60: '110010', 61: '110011', 62: '001100', 63: '101010', 64: '010101'
  };
  const bin = binaries[hexNum] || '111111';

  return bin.split('').reverse();
};

const pageNumbers = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value + 1;
  const delta = 2;

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);

    if (current > delta + 2) pages.push('...');

    const start = Math.max(2, current - delta);
    const end = Math.min(total - 1, current + delta);

    for (let i = start; i <= end; i++) pages.push(i);

    if (current < total - delta - 1) pages.push('...');

    pages.push(total);
  }
  return pages;
});

onMounted(fetchLibrary);
</script>

<style scoped>
.library-card {
  perspective: 1000px;
}

.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.8s ease;
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}

@keyframes modal-enter {
  from { transform: scale(0.9); opacity: 0; filter: blur(20px); }
  to { transform: scale(1); opacity: 1; filter: blur(0); }
}

.animate-modal-enter {
  animation: modal-enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes float {
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}.border-gold-glow {
  border: 1px solid rgba(255, 184, 0, 0.3);
  box-shadow: 0 0 30px rgba(255, 184, 0, 0.1);
}

.primary-btn {
  background: linear-gradient(135deg, #FFB800 0%, #FFD700 50%, #FFB800 100%);
  background-size: 200% auto;
  transition: 0.5s;
}

.primary-btn:hover {
  background-position: right center;
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(255, 184, 0, 0.4);
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  padding: 12px 32px;
  border-radius: 1rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-family: serif;
  font-weight: bold;
  font-size: 0.75rem;
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.scrollbar-custom::-webkit-scrollbar {
  width: 6px;
}
.scrollbar-custom::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}
.scrollbar-custom::-webkit-scrollbar-thumb {
  background: rgba(255, 184, 0, 0.2);
  border-radius: 10px;
}
.scrollbar-custom::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 184, 0, 0.4);
}

.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}
</style>