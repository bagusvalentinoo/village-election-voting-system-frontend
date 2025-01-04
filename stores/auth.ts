import { defineStore } from 'pinia';
import { useApi } from '~/composables/useApi';
import type { FormLoginOfficerState } from '~/types/model/auth.type';
import type { Responser } from '~/types/serializer/responser';
import type { AuthSerializer } from '~/types/serializer/auth';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        loading: true,
    }),
    actions: {
        async login({ username, password }: FormLoginOfficerState) {
            const {
                data,
                error
            } = await useApi<Responser.MessageResponse<AuthSerializer.AuthData>>('auth/login', {
                method: 'POST',
                body: {
                    username,
                    password,
                },
                default: () => ({
                    message: '',
                    data: {
                        bearer_token: '',
                        expired_at: '',
                        user: {
                            id: '',
                            name: '',
                            username: '',
                            roles: []
                        }
                    },
                    error: null
                })
            });

            if (!error.value) {
                const token = useCookie('token');
                token.value = data.value.data.bearer_token;
                this.authenticated = true;
            } else {
                throw error.value.data;
            }
        },
        logout() {
            const token = useCookie('token');
            this.authenticated = false;
            token.value = null;
        }
    },
});
