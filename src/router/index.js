import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUiStore } from '@/stores/ui';

const AuthLayout = () => import('@/layouts/AuthLayout.vue');
const MainLayout = () => import('@/layouts/MainLayout.vue');

const LandingPage = () => import('@/views/LandingPage.vue');
const LoginPage = () => import('@/views/LoginPage.vue');
const OAuth2RedirectHandler = () => import('@/views/OAuth2RedirectHandler.vue');
const OnboardingPage = () => import('@/views/OnboardingPage.vue');
const ForgotPasswordPage = () => import('@/views/ForgotPasswordPage.vue');
const ResetPasswordPage = () => import('@/views/ResetPasswordPage.vue');
const DashboardPage = () => import('@/views/DashboardPage.vue');

const routes = [
    {
        path: '/',
        component: AuthLayout,
        children: [
            {
                path: '',
                name: 'Landing',
                component: LandingPage
            },
            {
                path: 'login',
                name: 'Login',
                component: LoginPage
            },
            {
                path: 'onboarding',
                name: 'Onboarding',
                component: OnboardingPage
            },
            {
                path: 'forgot-password',
                name: 'ForgotPassword',
                component: ForgotPasswordPage
            },
            {
                path: 'reset-password',
                name: 'ResetPassword',
                component: ResetPasswordPage
            },
            {
                path: 'oauth2/redirect',
                name: 'OAuth2Redirect',
                component: OAuth2RedirectHandler
            }
        ]
    },
    {
        path: '/app',
        component: MainLayout,
        meta: { requiresAuth: true },
        children: [
            { path: '', component: DashboardPage },
            { path: 'tarot', component: () => import('@/views/ReadingPage.vue') },
            { path: 'journal', component: () => import('@/views/JournalPage.vue') },
            { path: 'library', component: () => import('@/views/LibraryPage.vue') },
            { path: 'settings', name: 'Settings', component: () => import('@/views/SettingsPage.vue') },
            { path: 'admin/stats', component: () => import('@/views/AdminStatsPage.vue'), meta: { requiresAdmin: true } }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const uiStore = useUiStore();
    uiStore.setGlobalLoading(true);

    const authStore = useAuthStore();
    const isAuthenticated = authStore.isAuthenticated;

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else if (to.meta.requiresAdmin && authStore.user?.role !== 'admin') {
        next('/app');
    } else {
        next();
    }
});

router.afterEach((to) => {
    const uiStore = useUiStore();

    if (to.name === 'OAuth2Redirect') {
        return;
    }

    setTimeout(() => {
        uiStore.setGlobalLoading(false);
    }, 100);
});

export default router;