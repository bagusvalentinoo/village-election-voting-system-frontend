<template>
  <FormVoterLogin
    :state="state"
    :uiState="uiState"
    :schema="LOGIN_VOTER"
    :submit="onSubmit"
  />
  <ModalNotification
      v-model="isModalCheckOtpOpen"
      type="error"
      title="Gagal Check OTP"
      :message="uiState.error"
      @closeModal="() => isModalCheckOtpOpen = false"
  />
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import type { FormSubmitEvent } from '#ui/types'
import type {
  FormLoginVoterState,
  FormLoginVoterUiState
} from '~/types/model/auth.type'
import type { Schema } from '~/types/validation/validation.type'
import { LOGIN_VOTER } from '~/validations/auth/auth.validation'

useHead({
  title: 'E-Voting - Voter Login'
})

definePageMeta({
  layout: 'auth',
  middleware: 'auth-voter'
})

const router = useRouter()
const voterStore = useVoterStore()

const state = reactive<FormLoginVoterState>({
  token: ''
})

const uiState = reactive<FormLoginVoterUiState>({
  disabledInputs: {
    button: false,
    token: false
  },
  error: '',
  errors: {
    token: ''
  }
})

const isModalCheckOtpOpen = ref(false)

const toggleInputs = (status: boolean) => {
  uiState.disabledInputs.token = status
  uiState.disabledInputs.button = status
}

const onSubmit = async (event: FormSubmitEvent<Schema<typeof LOGIN_VOTER>>) => {
  toggleInputs(true)

  try {
    await voterStore.checkOngoingAvailableOTP({
      token: state.token
    })

    await router.push('/voter/dashboard')
  } catch (error: any) {
    uiState.error = error.message || ''
    isModalCheckOtpOpen.value = true
  }

  toggleInputs(false)
}
</script>
