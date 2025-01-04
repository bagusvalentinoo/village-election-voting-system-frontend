import type { UseFetchOptions } from 'nuxt/app'; // Adjust based on actual import

export function useApi<T>(
    url: string | (() => string),
    options: Omit<UseFetchOptions<T>, 'default'> & { default?: () => T | Ref<T> },
) {

    return useFetch(url, {
        ...options,
        $fetch: useNuxtApp().$api,
    });
}
