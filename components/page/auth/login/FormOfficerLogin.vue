<template>
  <UForm :schema="props.schema" :state="props.state" class="space-y-4" @submit="props.submit">
    <UFormGroup size="xl" label="Username" name="username" required>
      <UInput
        v-model="props.state.username"
        input-class="py-5 ps-6 rounded-xl"
        size="lg"
        placeholder="Masukan Username"
        :disabled="props.uiState.disabledInputs.username"
      />
    </UFormGroup>
    <UFormGroup size="xl" label="Password" name="password" required>
      <UInput
        v-model="props.state.password"
        input-class="py-5 ps-6 rounded-xl"
        size="lg"
        :type="props.uiState.showPassword ? 'text' : 'password'"
        placeholder="Masukan Password"
        :ui="{ icon: { trailing: { pointer: '' } } }"
        :disabled="props.uiState.disabledInputs.password"
      >
        <template #trailing>
          <UIcon
            class="text-xl text-[#BBBFC5] cursor-pointer"
            :name="
              props.uiState.showPassword ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'
            "
            @click="emit('togglePasswordVisibility')"
          />
        </template>
      </UInput>
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
  FormLoginOfficerState,
  FormLoginOfficerUiState
} from '~/types/model/auth.type'

type LoginOfficerProps = {
  state: FormLoginOfficerState
  uiState: FormLoginOfficerUiState
  schema: ZodType
  submit: (event: FormSubmitEvent<Schema<ZodType>>) => Promise<void>
}

const props = defineProps<LoginOfficerProps>()
const emit = defineEmits(['togglePasswordVisibility'])
</script>
