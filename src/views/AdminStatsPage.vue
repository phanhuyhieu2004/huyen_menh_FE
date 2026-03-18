<template>
  <div class="p-6 md:p-10 space-y-12 animate-fade-in pb-32 relative overflow-hidden">
    
    <!-- Background Sacred Ornaments -->
    <div class="fixed inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center z-0">
        <img src="https://res.cloudinary.com/drac9ko3l/image/upload/v1773297177/ChatGPT_Image_13_30_22_12_thg_3_2026_df1lkc.png" 
             class="w-[800px] h-[800px] animate-spin-slow rotate-45" alt="Bg Decor" />
    </div>

    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 border-b border-gold/10 pb-8">
      <div class="flex items-center gap-6">
        <div class="w-16 h-16 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center relative group">
            <div class="absolute inset-0 rounded-full bg-gold/10 blur-xl group-hover:bg-gold/20 transition-all"></div>
            <i class="fi fi-rr-star-septagram text-2xl text-gold animate-pulse"></i>
        </div>
        <div class="space-y-1">
          <h1 class="text-3xl md:text-4xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark tracking-widest uppercase">
            Đài Quan Sát Vũ Trụ
          </h1>
          <div class="flex items-center gap-3">
             <div class="h-[1px] w-8 bg-gold/40"></div>
             <p class="text-gold/60 text-[10px] uppercase tracking-[0.4em] font-black">Soul Registry & Cosmic Flow</p>
          </div>
        </div>
      </div>

      <div class="bg-black/40 border border-gold/20 rounded-2xl p-1.5 flex items-center gap-1 backdrop-blur-2xl shadow-[0_0_20px_rgba(255,184,0,0.1)]">
        <button v-for="range in ranges" :key="range.id"
                @click="selectedRange = range.id"
                :class="selectedRange === range.id ? 'bg-gold text-black shadow-lg scale-105' : 'text-gold/40 hover:text-gold hover:bg-white/5'"
                class="px-6 py-2.5 rounded-xl text-[10px] font-black tracking-[0.2em] transition-all duration-500 uppercase">
          {{ range.label }}
        </button>
      </div>
    </div>


    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
      <div v-for="stat in quickStats" :key="stat.label"
           class="animated-border-card group cursor-default">
        <div class="inner-card-content !bg-[#0F172A]/40 !border-white/5 group-hover:!border-gold/40 p-6 flex flex-col gap-4 relative overflow-hidden transition-all duration-700">
            <div class="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-20 transition-all duration-700 transform group-hover:scale-125 group-hover:-rotate-12">
              <i :class="stat.icon" class="text-7xl text-gold"></i>
            </div>
            
            <div class="flex items-center justify-between">
                <span class="text-gold/40 text-[9px] uppercase tracking-[0.3em] font-black">{{ stat.label }}</span>
                <div class="w-8 h-8 rounded-lg bg-gold/5 border border-gold/10 flex items-center justify-center">
                    <i :class="stat.icon" class="text-xs text-gold"></i>
                </div>
            </div>

            <div class="space-y-1">
                <div class="text-4xl font-serif font-black text-white tracking-widest">{{ stat.value }}</div>
                <div v-if="stat.trend" class="flex items-center gap-2">
                    <span class="text-[10px] text-emerald-400 font-bold flex items-center gap-1 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                      <i class="fi fi-rr-arrow-small-up"></i> {{ stat.trend }}
                    </span>
                    <span class="text-[9px] text-white/20 uppercase tracking-tighter italic">vs last moon</span>
                </div>
            </div>
        </div>
      </div>
    </div>


    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
      <!-- Growth Chart -->
      <div class="lg:col-span-2 glass-panel p-8 md:p-10 border border-white/5 relative overflow-hidden group">
        <div class="absolute top-0 right-0 p-8 opacity-5">
            <i class="fi fi-rr-chart-user text-6xl text-gold"></i>
        </div>
        
        <div class="flex items-center justify-between mb-10">
          <div>
            <h3 class="text-xl font-serif font-black text-gold flex items-center gap-3 tracking-widest uppercase">
              <span class="w-2 h-2 rounded-full bg-gold animate-ping"></span>
              Biểu Đồ Tăng Trưởng
            </h3>
            <p class="text-white/20 text-[9px] uppercase tracking-[0.3em] font-bold mt-2 ml-5">Tần số linh hồn hạ giới theo thời gian</p>
          </div>
          <button @click="exportToCSV" class="group/btn relative px-6 py-2 rounded-xl overflow-hidden transition-all">
             <div class="absolute inset-0 bg-gold/5 border border-gold/20 group-hover/btn:bg-gold/10 transition-all"></div>
             <span class="relative text-[9px] text-gold font-black tracking-widest uppercase flex items-center gap-2">
                <i class="fi fi-rr-cloud-download"></i> Xuất Tinh Tệp
             </span>
          </button>
        </div>

        <div class="h-[350px] relative">
          <Line v-if="chartReady" :data="chartData" :options="chartOptions" />
          <div v-else class="absolute inset-0 flex items-center justify-center">
             <div class="animate-spin h-10 w-10 border-2 border-gold/10 border-t-gold rounded-full shadow-[0_0_15px_rgba(255,184,0,0.2)]"></div>
          </div>
        </div>
      </div>

      <!-- Recent Spirits -->
      <div class="glass-panel p-8 md:p-10 border border-white/5 flex flex-col relative overflow-hidden group">
        <div class="flex items-center justify-between mb-8">
            <h3 class="text-xl font-serif font-black text-gold flex items-center gap-3 tracking-widest uppercase">
              <i class="fi fi-rr-portal-enter text-lg"></i>
              Linh Hồn Mới
            </h3>
            <div class="px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-[9px] text-gold font-bold">LIVE</div>
        </div>

        <div class="flex-1 space-y-4 overflow-y-auto max-h-[380px] pr-4 custom-scrollbar">
          <div v-if="!stats?.recentUsers?.length" class="text-center py-24 text-white/10 italic text-sm font-serif tracking-widest">
            Chưa có linh hồn nào hạ giới...
          </div>
          <div v-for="user in stats?.recentUsers" :key="user.id" 
               class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-gold/30 hover:bg-gold/5 transition-all duration-500 group/item">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0F172A] to-gold/20 border border-gold/10 flex items-center justify-center text-gold font-black text-lg shadow-inner group-hover/item:scale-110 transition-transform">
              {{ user.email.charAt(0).toUpperCase() }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-black text-white/90 truncate tracking-wide font-sans group-hover/item:text-gold transition-colors">{{ user.email }}</p>
              <div class="flex items-center gap-2 mt-1">
                  <span class="w-1 h-1 rounded-full bg-gold/40"></span>
                  <p class="text-[9px] text-white/30 uppercase tracking-widest font-bold">{{ formatTime(user.created_at) }}</p>
              </div>
            </div>
            <div class="opacity-0 group-hover/item:opacity-100 transition-opacity">
                <i class="fi fi-rr-star text-gold/40 text-xs"></i>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="glass-panel p-8 md:p-12 border border-white/5 relative overflow-hidden z-10">
      <div class="absolute -left-20 -bottom-20 opacity-5 pointer-events-none">
          <img src="https://res.cloudinary.com/drac9ko3l/image/upload/v1773297177/ChatGPT_Image_13_30_22_12_thg_3_2026_df1lkc.png" 
               class="w-80 h-80 animate-spin-slow" alt="Decor" />
      </div>

      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div class="space-y-2">
          <h3 class="text-2xl font-serif font-black text-gold flex items-center gap-4 tracking-widest uppercase">
            <i class="fi fi-rr-settings-sliders"></i> Phân Bổ Thập Nhị Chi
          </h3>
          <p class="text-white/30 text-[10px] uppercase tracking-[0.4em] font-bold ml-10">Mật độ linh hồn theo vòng quay Hoàng Đạo</p>
        </div>
        <div class="flex items-center gap-4 bg-gold/5 border border-gold/10 px-4 py-2 rounded-xl">
            <span class="w-2 h-2 rounded-full bg-gold"></span>
            <span class="text-[9px] text-gold font-black uppercase tracking-widest">Cosmic Distribution Wheel</span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="h-[450px] relative order-2 lg:order-1">
            <PolarArea v-if="chartReady" :data="zodiacData" :options="zodiacOptions" />
            <div v-else class="absolute inset-0 flex items-center justify-center">
                 <div class="animate-spin h-10 w-10 border-2 border-gold/10 border-t-gold rounded-full shadow-[0_0_15px_rgba(255,184,0,0.2)]"></div>
            </div>
          </div>

          <div class="space-y-6 order-1 lg:order-2">
              <div v-for="(d, idx) in stats?.zodiacDistribution?.slice(0, 4)" :key="idx" 
                   class="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:border-gold/20 transition-all">
                  <div class="flex items-center gap-4">
                      <div class="w-10 h-10 rounded-xl bg-gold/10 border border-gold/10 flex items-center justify-center text-gold font-black text-sm">
                          {{ idx + 1 }}
                      </div>
                      <div>
                          <p class="text-xs font-black text-white/80 uppercase tracking-widest">{{ d.label.split(' (')[0] }}</p>
                          <p class="text-[9px] text-white/20 uppercase font-bold">Resonance Level</p>
                      </div>
                  </div>
                  <div class="text-xl font-serif font-black text-gold tracking-widest">{{ d.count }}</div>
              </div>
              <div class="pt-4 px-2 italic text-white/20 text-[10px] tracking-widest uppercase font-bold text-right">...and 8 more branches manifesting</div>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '@/services/api';
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
import { cosmicToast as toast } from '@/utils/toast';

ChartJS.register(
  Title, Tooltip, Legend,
  LineElement, PointElement,
  BarElement, ArcElement,
  RadialLinearScale,
  CategoryScale, LinearScale,
  Filler
);

const chartReady = ref(false);
const stats = ref(null);
const selectedRange = ref('30d');
const ranges = [
  { id: '7d', label: '7 SUNS' },
  { id: '30d', label: '30 MOONS' },
  { id: '90d', label: '90 CYCLES' }
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
        backgroundColor: 'rgba(15, 23, 42, 0.9)', 
        titleFont: { family: 'Montserrat', size: 10, weight: 'bold' },
        padding: 12,
        borderColor: 'rgba(255, 184, 0, 0.2)',
        borderWidth: 1
    } 
  },
  scales: {
    x: { 
        ticks: { color: 'rgba(255,184,0,0.3)', font: { size: 9, family: 'Montserrat', weight: 'bold' } }, 
        grid: { display: false } 
    },
    y: { 
        ticks: { color: 'rgba(255,184,0,0.3)', font: { size: 9, family: 'Montserrat', weight: 'normal' } }, 
        grid: { color: 'rgba(255,184,0,0.03)' } 
    }
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

onMounted(async () => {
  await fetchStats();
});

const fetchStats = async () => {
  chartReady.value = false;
  try {
    const response = await api.get('/admin/stats');
    stats.value = response.data;
    chartReady.value = true;
  } catch (error) {
    toast.error('Gặp nhiễu loạn khi gọi dữ liệu từ vũ trụ');
    console.error(error);
  }
};

const formatTime = (time) => {
  if (!time) return 'Vừa mới đây';
  const date = new Date(time);
  return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const exportToCSV = () => {
    if (!stats.value?.userGrowth) {
        toast.warning('Chưa có dữ liệu để hạ giới');
        return;
    }
    let csvContent = "data:text/csv;charset=utf-8,Ngay,SoLuongNewUsers\n";
    stats.value.userGrowth.forEach(row => { csvContent += `${row.date},${row.count}\n`; });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `HuyenMenh_Stats_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    toast.success('Dữ liệu đã được xuất ra linh tệp');
};
</script>

<style scoped>
.glass-panel {
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(40px);
  border-radius: 2.5rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, transparent, rgba(255, 184, 0, 0.3), transparent);
  border-radius: 10px;
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 120s linear infinite;
}

.animate-pulse-slow {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes scale-up {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}
.animate-scale-up {
    animation: scale-up 0.8s ease-out;
}
</style>