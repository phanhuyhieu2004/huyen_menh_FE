import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import moment from 'moment-timezone';
import { cosmicToast as toast } from '@/utils/toast';

const currentTimezone = moment.tz.guess();

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json'
    },
});


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        const isAuthEndpoint = config.url && (
            config.url.includes('/auth/login') ||
            config.url.includes('/auth/signup')
        );


        if (token && token !== 'undefined' && token !== 'null' && !isAuthEndpoint) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log("API DEBUG: Gửi request tới " + config.url + " với Token.");
        } else {
            console.log("API DEBUG: Gửi request tới " + config.url + " KHÔNG có Token.");
        }


        if (!isAuthEndpoint) {
            config.headers['Timezone'] = currentTimezone;
        }

        return config;
    },
    (error) => Promise.reject(error)
);


api.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorMsg = error.response?.data || error.message || 'Lỗi kết nối máy chủ';

        if (error.response && error.response.status === 401) {
            const isAuthEndpoint = error.config?.url && (
                error.config.url.includes('/auth/login') ||
                error.config.url.includes('/auth/signup')
            );

            if (isAuthEndpoint) {
                toast.error(errorMsg);
            } else {
                console.error('INTERCEPTOR: 401 Không có quyền truy cập:', error.config.url);
                // Nếu backend gửi về văn bản chứa lỗi cụ thể, ưu tiên hiển thị nó thay vì mặc định
                if (typeof errorMsg === 'string' && errorMsg.length > 0 && errorMsg !== 'Lỗi kết nối máy chủ' && errorMsg !== 'Unauthorized') {
                    toast.error(errorMsg);
                } else {
                    toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                }
                const authStore = useAuthStore();
                authStore.logout();
            }
        } else {
            console.group('🔴 Lỗi Spirit API');
            if (error.response) {
                console.error('Địa chỉ:', error.config?.method?.toUpperCase(), error.config?.url);
                console.error('Trạng thái:', error.response.status);
                console.error('Dữ liệu phản hồi:', error.response.data);
            } else if (error.request) {
                console.error('Không nhận được phản hồi (Lỗi CORS hoặc Mạng).');
                console.error('Địa chỉ:', error.config?.url);
                console.error('Headers đã gửi:', error.config?.headers);
            } else {
                console.error('Lỗi:', error.message);
            }
            console.groupEnd();

            toast.error(errorMsg);
        }
        return Promise.reject(error);
    }
);


api.getDailyEnergy = () => api.get('/v1/energy/daily');
api.refreshDailyEnergy = () => api.post('/v1/energy/refresh');

export default api;