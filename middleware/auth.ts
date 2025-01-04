export default defineNuxtRouteMiddleware((to) => {
    const { authenticated } = storeToRefs(useAuthStore());
    const token = useCookie('token');

    if (token.value) {
        authenticated.value = true;
    }

    if (token.value && to.path === '/auth/officer/login') {
        return navigateTo('/officer/dashboard');
    }

    if (!token.value && to.path !== '/auth/officer/login') {
        abortNavigation();
        return navigateTo('auth/officer/login');
    }
});
