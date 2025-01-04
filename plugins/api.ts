import {useRuntimeConfig} from "#app";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    const apiBase = config.public.apiBase

    const api = $fetch.create({
        baseURL: apiBase,
        onRequest({ request, options, error }) {
            const token = useCookie('token')
            if (token) {
                const headers = options.headers ||= {}
                if (Array.isArray(headers)) {
                    headers.push(['Authorization', `Bearer ${token.value}`])
                } else if (headers instanceof Headers) {
                    headers.set('Authorization', `Bearer ${token.value}`)
                } else {
                    headers.Authorization = `Bearer ${token.value}`
                }
            }
        },
        async onResponseError({ response }) {
            if (response.status === 401) {
                await nuxtApp.runWithContext(() => navigateTo('/login'))
            }
        }
    })

    return {
        provide: {
            api
        }
    }
})
