<template>
  <FormOfficerLogin
      :state="formState"
      :uiState="formUiState"
      :schema="LOGIN_OFFICER"
      :onSubmit="onSubmit"
      :submit="onSubmit"
      @togglePasswordVisibility="togglePasswordVisibility"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { FormSubmitEvent } from '#ui/types';
import type {
  FormLoginOfficerState,
  FormLoginOfficerUiState
} from '~/types/model/auth.type';
import type { Schema } from '~/types/validation/validation.type';
import { LOGIN_OFFICER } from '~/validations/auth/auth.validation';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';

useHead({
  title: 'E-Voting - Officer Login'
});

definePageMeta({
  layout: 'auth',
  middleware: 'auth'
});

const formState = reactive<FormLoginOfficerState>({
  username: '',
  password: ''
});

const formUiState = reactive<FormLoginOfficerUiState>({
  showPassword: false,
  disabledInputs: {
    button: false,
    username: false,
    password: false
  },
  error: '',
  errors: {
    username: '',
    password: ''
  }
});

const togglePasswordVisibility = () => {
  formUiState.showPassword = !formUiState.showPassword;
};

const toggleInputs = (status: boolean) => {
  formUiState.disabledInputs.username = status;
  formUiState.disabledInputs.password = status;
  formUiState.disabledInputs.button = status;
};

const authStore = useAuthStore();
const { authenticated } = storeToRefs(authStore);

const router = useRouter();

const onSubmit = async (
    event: FormSubmitEvent<Schema<typeof LOGIN_OFFICER>>
) => {
  formUiState.showPassword = false;
  toggleInputs(true);

  try {
    await authStore.login(formState);
    if (authenticated) {
      await router.push('/officer/dashboard');
    }
  } catch (error: any) {
    if (error.data) {
      formUiState.error = error.data.message || 'Login failed';
      formUiState.errors = {
        username: error.data.errors?.username || '',
        password: error.data.errors?.password || ''
      };
    } else {
      formUiState.error = 'An unexpected error occurred';
    }
  } finally {
    toggleInputs(false);
  }
};
</script>
