<template>
  <UForm :schema="props.schema" :state="props.state" class="space-y-4" @submit="props.submit">
    <UFormGroup size="xl" label="Token" name="token" required>
      <UInput
        v-model="props.state.token"
        input-class="py-5 ps-6 rounded-xl"
        size="lg"
        placeholder="Masukan Token"
        :disabled="props.uiState.disabledInputs.token"
        @input="handleInputOTP"
      />
    </UFormGroup>
    <UButton
      class="py-4 font-bold rounded-2xl"
      type="submit"
      size="lg"
      block
      :loading="props.uiState.disabledInputs.button"
    >
      Masuk
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
import { ZodType } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import type { Schema } from '~/types/validation/validation.type'
import type {
  FormLoginVoterState,
  FormLoginVoterUiState
} from '~/types/model/auth.type'

const handleInputOTP = (event: Event) => {
  const target = event.target as HTMLInputElement
  target.value = target.value.toString().toUpperCase()
  props.state.token = target.value
}

type LoginVoterProps = {
  state: FormLoginVoterState
  uiState: FormLoginVoterUiState
  schema: ZodType
  submit: (event: FormSubmitEvent<Schema<ZodType>>) => Promise<void>
}

const props = defineProps<LoginVoterProps>()
</script>
