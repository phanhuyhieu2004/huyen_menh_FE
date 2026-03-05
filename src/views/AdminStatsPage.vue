<template>
  <div class="p-6 md:p-10 space-y-8 animate-fade-in pb-20">

    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
      <div class="space-y-1">
        <h1 class="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark tracking-tight uppercase">
          Đài Quan Sát Vũ Trụ
        </h1>
        <p class="text-white/40 text-xs uppercase tracking-[0.3em] font-serif mt-2">Thống kê sự phát triển & bản đồ linh hồn cư dân</p>
      </div>


      <div class="bg-white/5 border border-gold/20 rounded-xl p-1 flex items-center gap-1 backdrop-blur-md">
        <button v-for="range in ranges" :key="range.id"
                @click="selectedRange = range.id"
                :class="selectedRange === range.id ? 'bg-gold text-black' : 'text-gold/60 hover:text-gold hover:bg-white/5'"
                class="px-4 py-2 rounded-lg text-xs font-bold tracking-wider transition-all duration-300">
          {{ range.label }}
        </button>
      </div>
    </div>


    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in quickStats" :key="stat.label"
           class="glass-panel p-6 border border-gold/20 relative group hover:border-gold/40 transition-all duration-500 overflow-hidden">
        <div class="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <i :class="stat.icon" class="text-6xl text-gold"></i>
        </div>
        <div class="relative z-10 flex flex-col gap-1">
          <span class="text-gold/60 text-[10px] uppercase tracking-widest font-black">{{ stat.label }}</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-serif font-bold text-white tracking-widest">{{ stat.value }}</span>
            <span v-if="stat.trend" class="text-[10px] text-green-400 font-bold flex items-center gap-1">
              <i class="fi fi-rr-arrow-trend-up"></i> {{ stat.trend }}
            </span>
          </div>
        </div>
      </div>
    </div>


    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <div class="lg:col-span-2 glass-panel p-6 md:p-8 min-h-[400px]">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-lg font-serif font-bold text-gold flex items-center gap-2">
            <i class="fi fi-rr-chart-line-up"></i> Biểu Đồ Tăng Trưởng
          </h3>
          <button @click="exportToCSV" class="text-[10px] text-gold/40 hover:text-gold hover:bg-gold/5 px-3 py-1.5 rounded-lg border border-gold/10 transition-all font-bold tracking-widest flex items-center gap-2 uppercase">
            <i class="fi fi-rr-file-export"></i> Xuất CSV
          </button>
        </div>

        <div class="h-[300px] relative">
          <Line v-if="chartReady" :data="chartData" :options="chartOptions" />
          <div v-else class="absolute inset-0 flex items-center justify-center">
             <div class="animate-spin h-8 w-8 border-2 border-gold/20 border-t-gold rounded-full"></div>
          </div>
        </div>
      </div>


      <div class="glass-panel p-6 md:p-8 flex flex-col">
        <h3 class="text-lg font-serif font-bold text-gold mb-6 flex items-center gap-2">
          <i class="fi fi-rr-portal-exit"></i> Cư Dân Mới Đến
        </h3>
        <div class="flex-1 space-y-4 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
          <div v-if="!stats?.recentUsers?.length" class="text-center py-20 text-white/20 italic text-sm">
            Chưa có linh hồn nào hạ giới
          </div>
          <div v-for="user in stats?.recentUsers" :key="user.id" class="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-gold/20 transition-all group">
            <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-gold/20 to-gold-light/40 flex items-center justify-center text-gold font-bold shadow-[0_0_10px_rgba(255,184,0,0.1)]">
              {{ user.email.charAt(0).toUpperCase() }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-bold text-white/80 truncate font-sans">{{ user.email }}</p>
              <p class="text-[9px] text-gold/40 uppercase tracking-tighter font-serif">{{ formatTime(user.created_at) }}</p>
            </div>
            <div class="w-2 h-2 rounded-full bg-green-500/50 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
          </div>
        </div>
      </div>
    </div>


    <div class="glass-panel p-6 md:p-8">
      <div class="mb-8">
        <h3 class="text-lg font-serif font-bold text-gold flex items-center gap-2">
          <i class="fi fi-rr-settings-sliders"></i> Phân Bổ Thập Nhị Chi
        </h3>
        <p class="text-white/40 text-[10px] uppercase tracking-widest mt-1">Thống kê mật độ linh hồn theo cung tuổi (Tý, Sửu, Dần...)</p>
      </div>

      <div class="h-[300px] relative">
        <Bar v-if="chartReady" :data="zodiacData" :options="zodiacOptions" />
        <div v-else class="absolute inset-0 flex items-center justify-center">
             <div class="animate-spin h-8 w-8 border-2 border-gold/20 border-t-gold rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '@/services/api';
import { Line, Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  LineElement, PointElement,
  BarElement,
  CategoryScale, LinearScale,
  Filler
} from 'chart.js';
import { cosmicToast as toast } from '@/utils/toast';

ChartJS.register(
  Title, Tooltip, Legend,
  LineElement, PointElement,
  BarElement,
  CategoryScale, LinearScale,
  Filler
);

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
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border-radius: 2rem;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 184, 0, 0.2);
  border-radius: 10px;
}

.animate-zoom-in {
  animation: zoom-in 0.6s ease-out;
}
</style>