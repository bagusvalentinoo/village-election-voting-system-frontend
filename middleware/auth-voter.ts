export default defineNuxtRouteMiddleware((to) => {
    const { authenticated, otp } = storeToRefs(useVoterStore());
    const token = useCookie('voter-token');

    if (token.value) {
        authenticated.value = true
        otp.value = token.value
        console.log(otp.value)
    }

    if (token.value && to.path === '/auth/voter/login') {
        return navigateTo('/voter/dashboard')
    }

    if (!token.value && to.path !== '/auth/voter/login') {
        abortNavigation()
        return navigateTo('auth/voter/login')
    }
});
