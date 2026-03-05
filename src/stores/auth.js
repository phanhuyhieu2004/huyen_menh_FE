import { defineStore } from 'pinia';
import api from '@/services/api';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        user: null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        setToken(token) {
            this.token = token;
            localStorage.setItem('token', token);

        },
        async fetchUser() {
            try {
                const response = await api.get('/profiles/me');
                this.user = response.data;
                localStorage.setItem('hasOnboarded', 'true');
                return true;
            } catch (error) {
                this.user = null;
                if (error.response && error.response.status === 401) {
                    this.logout();
                } else if (error.response && error.response.status === 404) {
                    localStorage.setItem('hasOnboarded', 'false');
                }
                return false;
            }
        },
        async checkAuth() {
            if (this.token) {
                return await this.fetchUser();
            }
            return false;
        },
        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('hasOnboarded');

            if (window.location.pathname !== '/') {
                window.location.href = '/';
            }
        }
    }
});