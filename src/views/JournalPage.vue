<template>
  <div class="journal-page space-y-8 animate-fade-in pb-20">

    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h2 class="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold-dark tracking-widest uppercase">Nhật Ký Tâm Linh</h2>
        <p class="text-white/40 text-xs uppercase tracking-[0.3em] font-serif mt-2">Lưu giữ hành trình thức tỉnh và những lời phán từ vũ trụ</p>
      </div>

      <div class="flex flex-wrap items-center gap-4">


        <div class="relative">
          <input
            v-model="filterDate"
            type="date"
            @change="resetAndFetch"
            class="bg-black/40 border border-gold/30 rounded-full py-2 px-4 text-white text-sm focus:outline-none focus:border-gold transition-all [color-scheme:dark]"
          />
        </div>

        <div class="relative group">
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="Tìm theo từ khóa..."
            class="bg-black/40 border border-gold/30 rounded-full py-2 pl-4 pr-10 text-white text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all w-48 md:w-64"
            @keyup.enter="resetAndFetch"
          />
          <button @click="resetAndFetch" class="absolute right-3 top-1/2 -translate-y-1/2 text-gold/60 hover:text-gold transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-width="2"/></svg>
          </button>
        </div>

        <button @click="clearFilters" class="text-white/40 hover:text-gold text-xs transition-colors flex items-center gap-1">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-width="2.5"/></svg>
          Xóa lọc
        </button>

      </div>
    </div>


    <div v-if="journals.length === 0 && !loading" class="bg-black/30 border border-dashed border-gold/20 rounded-3xl p-16 text-center space-y-6">
      <div class="w-24 h-24 bg-gold/5 rounded-full flex items-center justify-center mx-auto border border-gold/10">
        <svg class="w-12 h-12 text-gold/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.246 18.477 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke-width="2"/></svg>
      </div>
      <div class="max-w-xs mx-auto space-y-2">
        <h4 class="text-gold font-serif text-sm uppercase tracking-widest">Vũ trụ đang đợi bạn...</h4>
        <p class="text-white/40 text-xs">Bạn chưa có nhật ký nào. Hãy tạo mới để bắt đầu ghi lại hành trình của mình!</p>
      </div>
    </div>


    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="j in journals"
        :key="j.id"
        class="journal-card group bg-black/40 border border-gold/20 rounded-2xl overflow-hidden hover:border-gold/50 transition-all duration-500 flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
      >

        <div class="p-5 flex justify-between items-start border-b border-gold/10 bg-white/5">
           <div class="flex flex-col">
              <span class="text-[10px] uppercase tracking-[0.2em] text-gold-light opacity-60">{{ formatDate(j.createdAt, 'time') }}</span>
              <span class="text-sm font-serif font-bold text-white/90">{{ formatDate(j.createdAt, 'date') }}</span>
           </div>

           <div class="flex items-center gap-2">
              <div v-if="j.tarotCardId" class="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/30" title="Tarot">
                <span class="text-[10px] font-bold">T</span>
              </div>
              <div v-if="j.ichingHexId" class="w-6 h-6 rounded bg-orange-500/20 flex items-center justify-center text-orange-400 border border-orange-500/30" title="Kinh Dịch">
                <span class="text-[10px] font-bold">K</span>
              </div>
           </div>
        </div>


        <div class="p-5 flex-1 space-y-4">
           <div class="space-y-1">
              <h3 class="text-gold font-serif uppercase tracking-wider text-xs font-bold truncate">{{ j.question || 'Suy ngẫm tự do' }}</h3>
              <p class="text-white/60 text-xs line-clamp-3 leading-relaxed italic">
                 {{ j.userNotes || j.aiInsight || 'Không có ghi chú...' }}
              </p>
           </div>


           <div v-if="j.mentalEnergy" class="flex gap-1 h-1 w-full rounded-full overflow-hidden bg-white/5">
              <div class="h-full bg-blue-400" :style="{ width: j.mentalEnergy + '%' }"></div>
              <div class="h-full bg-rose-400" :style="{ width: j.emotionalBalance + '%' }"></div>
              <div class="h-full bg-emerald-400" :style="{ width: j.focusLevel + '%' }"></div>
           </div>
        </div>


        <div class="p-4 flex items-center justify-between border-t border-gold/10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
           <button @click="viewDetail(j)" class="text-[10px] uppercase tracking-widest text-gold hover:text-white transition-colors">Xem Chi Tiết</button>
           <div class="flex items-center gap-3">

              <button @click.stop="openEditModal(j)" class="text-white/40 hover:text-gold transition-colors" title="Chỉnh sửa">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" stroke-width="2"/></svg>
              </button>
              <button @click.stop="confirmDelete(j)" class="text-white/40 hover:text-red-400 transition-colors" title="Xóa">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2"/></svg>
              </button>
           </div>
        </div>
      </div>
    </div>


    <div v-if="totalPages > 1" class="flex justify-center gap-4 mt-12">
      <button
        @click="currentPage--"
        :disabled="currentPage === 0"
        class="p-2 border border-gold/30 rounded-full text-gold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gold/10"
      >
        <svg class="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke-width="2"/></svg>
      </button>
      <span class="flex items-center text-gold font-serif">{{ currentPage + 1 }} / {{ totalPages }}</span>
      <button
        @click="currentPage++"
        :disabled="currentPage >= totalPages - 1"
        class="p-2 border border-gold/30 rounded-full text-gold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gold/10"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke-width="2"/></svg>
      </button>
    </div>


    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="selectedJournal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" @click.self="selectedJournal = null">
          <div class="bg-[#0c0c0c] border border-gold/30 rounded-3xl w-full max-w-xl p-10 relative animate-scale-up shadow-[0_0_60px_rgba(0,0,0,0.8)] max-h-[85vh] overflow-y-auto scrollbar-custom">


            <button @click="selectedJournal = null" class="absolute top-6 right-6 text-white/20 hover:text-gold transition-colors">
              <i class="fi fi-rr-cross text-sm"></i>
            </button>

            <div class="space-y-10">

              <div class="text-center space-y-2 border-b border-gold/10 pb-6">
                <p class="text-gold/60 text-xs uppercase tracking-[0.3em] font-sans font-bold">
                  {{ formatDate(selectedJournal.createdAt, 'time') }} — {{ formatDate(selectedJournal.createdAt, 'date') }}
                </p>
                <h3 class="text-white font-serif text-3xl italic tracking-tight leading-tight">
                  {{ selectedJournal.question || 'Câu hỏi gửi tới vũ trụ' }}
                </h3>
              </div>


              <div class="flex flex-wrap justify-center gap-4 py-2">
                <div v-if="selectedJournal.tarotSnapshot" class="flex flex-col items-center">
                  <span class="text-purple-400 text-[10px] uppercase tracking-[0.2em] font-sans font-black mb-1">Tarot</span>
                  <span class="text-white font-serif text-xl tracking-wide">{{ selectedJournal.tarotSnapshot }}</span>
                </div>

                <div v-if="selectedJournal.tarotSnapshot && selectedJournal.ichingSnapshot" class="w-[1px] h-8 bg-gold/10"></div>

                <div v-if="selectedJournal.ichingSnapshot" class="flex flex-col items-center">
                  <span class="text-orange-400 text-[10px] uppercase tracking-[0.2em] font-sans font-black mb-1">Kinh Dịch</span>
                  <span class="text-white font-serif text-xl tracking-wide">{{ selectedJournal.ichingSnapshot }}</span>
                </div>
              </div>


              <div class="space-y-8">
                 <div v-if="selectedJournal.userNotes" class="bg-white/5 p-6 rounded-2xl">
                    <p class="text-white/60 text-sm leading-relaxed font-sans italic">{{ selectedJournal.userNotes }}</p>
                 </div>

                 <div v-if="selectedJournal.aiInsight" class="space-y-4">
                    <h5 class="text-gold text-[9px] uppercase tracking-[0.4em] font-sans font-black text-center">Lời Khuyên Từ Vũ Trụ</h5>
                    <p class="text-gold-light/90 leading-loose italic text-xl font-serif text-center">
                       {{ selectedJournal.aiInsight }}
                    </p>
                 </div>
              </div>


              <div class="pt-6 border-t border-gold/10 flex justify-center">
                 <button @click="confirmDelete(selectedJournal)" class="text-red-500/30 hover:text-red-400 text-[10px] uppercase tracking-widest font-sans font-bold flex items-center gap-2 transition-all">
                    <i class="fi fi-rr-trash"></i> Xóa vĩnh viễn
                 </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>


    <Teleport to="body">
       <Transition name="modal-fade">
         <div v-if="editingJournal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" @click.self="editingJournal = null">
            <div class="bg-[#0f0f0f] border border-gold/40 rounded-[2rem] w-full max-w-lg p-10 space-y-8 animate-scale-up shadow-[0_0_50px_rgba(255,184,0,0.2)] max-h-[85vh] overflow-y-auto scrollbar-custom">
               <div class="text-center">
                  <h3 class="text-2xl font-serif font-bold text-gold uppercase tracking-widest">{{ editingJournal.id ? 'Chỉnh Sửa Nhật Ký' : 'Ghi Chép Mới' }}</h3>
                  <p class="text-white/40 text-xs mt-2 uppercase tracking-tighter">Lưu lại hành trình thức tỉnh của bạn</p>
               </div>

               <div class="space-y-6">
                  <div v-if="!editingJournal.id">
                     <label class="block text-gold/40 text-xs uppercase font-black mb-2 ml-4 tracking-[0.2em]">Chủ đề suy ngẫm</label>
                     <input v-model="editingJournal.question" type="text" class="w-full bg-white/5 border border-gold/20 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-gold transition-all" placeholder="Bạn đang nghĩ gì?">
                  </div>

                  <div>
                     <label class="block text-gold/40 text-xs uppercase font-sans font-black mb-2 ml-4 tracking-[0.2em]">Lời tự sự</label>
                     <textarea v-model="editingJournal.notes" rows="6" class="w-full bg-white/5 border border-gold/20 rounded-2xl py-4 px-6 text-white text-sm leading-relaxed font-sans focus:outline-none focus:border-gold transition-all resize-none" placeholder="Viết những suy ngẫm của bạn..."></textarea>
                  </div>

                  <div v-if="!editingJournal.id" class="flex items-center gap-3 px-4">
                     <div class="relative flex items-center">
                       <input type="checkbox" v-model="editingJournal.linkEnergy" id="linkEnergy" class="w-5 h-5 accent-gold bg-black border-gold/20 rounded-lg cursor-pointer">
                     </div>
                     <label for="linkEnergy" class="text-white/60 text-xs cursor-pointer hover:text-gold transition-colors">Liên kết với năng lượng hiện tại</label>
                  </div>
               </div>

                <div class="flex flex-col gap-3 pt-6">
                   <button @click="saveJournal" :disabled="saving" class="save-btn py-4 rounded-2xl disabled:opacity-50 flex items-center justify-center gap-3 group shadow-[0_0_20px_rgba(255,184,0,0.2)]">
                      <svg v-if="saving" class="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      <span class="text-xs font-black tracking-[0.2em] uppercase text-black">{{ editingJournal.id ? 'CẬP NHẬT DẤU ẤN' : 'KHẮC GHI VÀO VŨ TRỤ' }}</span>
                      <i v-if="!saving" class="fi fi-rr-paper-plane text-black group-hover:translate-x-1 transition-transform"></i>
                   </button>
                   <button @click="editingJournal = null" class="py-3 text-white/20 hover:text-white/50 transition-colors text-xs font-black uppercase tracking-widest">Đắm lại vào hư không</button>
                </div>
            </div>
         </div>
       </Transition>
    </Teleport>


  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

import api from '@/services/api';
import { cosmicToast as toast } from '@/utils/toast';

const journals = ref([]);
const loading = ref(false);
const saving = ref(false);
const searchKeyword = ref('');
const filterType = ref('');
const filterDate = ref('');
const currentPage = ref(0);
const totalPages = ref(1);

const selectedJournal = ref(null);
const editingJournal = ref(null);

const energyLabels = {
  'Tinh thần': 'mentalEnergy',
  'Cân bằng': 'emotionalBalance',
  'Tập trung': 'focusLevel',
  'Hành động': 'actionReadiness',
  'Hòa hợp': 'socialHarmony'
};

const fetchJournals = async () => {
  loading.value = true;
  try {
    const res = await api.get('/journal/list', {
      params: {
        page: currentPage.value,
        size: 9,
        keyword: searchKeyword.value,
        type: filterType.value,
        date: filterDate.value
      }
    });
    journals.value = res.data.content;
    totalPages.value = res.data.totalPages;
  } catch (error) {
    toast.error('Không thể tải nhật ký');
  } finally {
    loading.value = false;
  }
};

const resetAndFetch = () => {
  currentPage.value = 0;
  fetchJournals();
};

const clearFilters = () => {
  searchKeyword.value = '';
  filterType.value = '';
  filterDate.value = '';
  resetAndFetch();
};

watch(currentPage, fetchJournals);

const openCreateModal = () => {
  editingJournal.value = {
    question: '',
    notes: '',
    linkEnergy: true
  };
};

const openEditModal = (j) => {
  selectedJournal.value = null;
  editingJournal.value = {
    id: j.id,
    question: j.question,
    notes: j.userNotes
  };
};

const saveJournal = async () => {
  if (!editingJournal.value.notes?.trim() && !editingJournal.value.question?.trim()) {
    toast.warning('Hãy nhập nội dung nhật ký');
    return;
  }

  saving.value = true;
  try {
    if (editingJournal.value.id) {
      await api.put(`/journal/${editingJournal.value.id}`, {
        notes: editingJournal.value.notes,
        question: editingJournal.value.question
      });
      toast.success('Cập nhật nhật ký tâm linh thành công');
    } else {
      await api.post('/journal/create', editingJournal.value);
      toast.success('Hành trình của bạn đã được ghi lại');
    }
    editingJournal.value = null;
    fetchJournals();
  } catch (error) {
    toast.error('Lỗi khi lưu nhật ký');
  } finally {
    saving.value = false;
  }
};

const viewDetail = (j) => {
  selectedJournal.value = j;
};

const confirmDelete = async (j) => {
  if (confirm('Bạn có chắc muốn xóa vĩnh viễn trang nhật ký này khỏi dòng thời gian?')) {
    try {
      await api.delete(`/journal/${j.id}`);
      toast.success('Đã xóa nhật ký');
      if (selectedJournal.value?.id === j.id) selectedJournal.value = null;
      fetchJournals();
    } catch (error) {
      toast.error('Lỗi khi xóa nhật ký');
    }
  }
};

const formatDate = (dateStr, type) => {
  const d = new Date(dateStr);
  if (type === 'time') return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  if (type === 'date') return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  if (type === 'full') return d.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
  return d.toLocaleString('vi-VN');
};

const exportToPdf = (j) => {
  toast.info('Tính năng xuất PDF đang được chuẩn bị...');

};

const getTarotImageUrl = (id) => {





  return `https://res.cloudinary.com/drac9ko3l/image/upload/v1772078973/tarot_${id}.png`;
};

const getHexNumber = (hexId) => {
  if (!hexId) return '64';
  const idStr = String(hexId);
  return idStr.includes('_') ? idStr.split('_')[1] : idStr;
};

const getHexBinary = (hexId) => {
  if (!hexId) return ['1','1','1','1','1','1'];

  const idStr = String(hexId);
  const numPart = idStr.includes('_') ? idStr.split('_')[1] : idStr;
  const hexNum = parseInt(numPart);

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


onMounted(fetchJournals);
</script>

<style scoped>
.journal-card {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.journal-card:hover {
  transform: translateY(-8px);
}
.primary-btn {
  background: linear-gradient(to r, #FFB800, #FFD700);
  color: #1a130a;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-weight: bold;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}
.primary-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(255, 184, 0, 0.4);
}
.secondary-btn {
  background: rgba(255, 184, 0, 0.1);
  border: 1px solid rgba(255, 184, 0, 0.2);
  color: #FFB800;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: bold;
  transition: all 0.3s ease;
}
.secondary-btn:hover {
  background: rgba(255, 184, 0, 0.2);
  border-color: #FFB800;
  color: #fff;
}
.animate-scale-up {
  animation: scale-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes scale-up {
  from { opacity: 0; transform: scale(0.95) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.prose-sm { font-size: 0.95rem; }

.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 12s linear infinite;
}

.save-btn {
  background: #FFB800;
  box-shadow: 0 0 30px rgba(255, 184, 0, 0.3);
  transition: all 0.3s ease;
}
.save-btn:hover {
  background: #FFD700;
  transform: translateY(-2px);
  box-shadow: 0 0 40px rgba(255, 184, 0, 0.5);
}

.scrollbar-custom::-webkit-scrollbar {
  width: 5px;
}
.scrollbar-custom::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
.scrollbar-custom::-webkit-scrollbar-thumb {
  background: rgba(255, 184, 0, 0.2);
  border-radius: 10px;
}
.scrollbar-custom::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 184, 0, 0.4);
}
</style>