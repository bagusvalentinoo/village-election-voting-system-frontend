<template>
  <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100' }">
    <template #header>
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-medium">
          {{ props.isEdit ? 'Edit Sesi Pemilihan' : 'Tambah Sesi Pemilihan' }}
        </h1>
        <Icon
          name="heroicons:x-mark-16-solid"
          color="gray"
          size="1.5rem"
          class="cursor-pointer"
          @click="emit('closeModal')"
        />
      </div>
    </template>
    <UForm
      :schema="props.schema"
      :state="props.state"
      class="space-y-4"
      @submit="props.submit"
    >
      <UFormGroup size="lg" label="Sesi Pemilihan" name="name" required>
        <UInput
          v-model="props.state.name"
          size="lg"
          placeholder="Masukan Nama Sesi Pemilihan"
          :disabled="props.uiState.disabledInputs.name"
        />
      </UFormGroup>
      <UFormGroup size="lg" label="Waktu Mulai" name="start_date" required>
        <UInput
          type="datetime-local"
          v-model="props.state.start_date"
          size="lg"
          :disabled="props.uiState.disabledInputs.start_date"
        />
      </UFormGroup>
      <UFormGroup size="lg" label="Waktu Selesai" name="end_date" required>
        <UInput
          type="datetime-local"
          v-model="props.state.end_date"
          size="lg"
          :disabled="props.uiState.disabledInputs.end_date"
        />
      </UFormGroup>
      <div class="flex items-center justify-end gap-3 pt-36">
        <UButton
          type="button"
          color="gray"
          size="lg"
          :disabled="props.uiState.disabledInputs.button"
          @click="emit('closeModal')"
          >KEMBALI</UButton
        >
        <UButton
          type="submit"
          color="blue"
          size="lg"
          :loading="props.uiState.disabledInputs.button"
        >
          SIMPAN
        </UButton>
      </div>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import { ZodType } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import type { Schema } from '~/types/validation/validation.type'
import type {
  FormState as SessionFormState,
  FormUiState as SessionFormUiState
} from '~/types/model/session.type'

type FormSessionProps = {
  state: SessionFormState
  uiState: SessionFormUiState
  schema: ZodType
  isEdit: boolean
  submit: (event: FormSubmitEvent<Schema<ZodType>>) => Promise<void>
}

const props = defineProps<FormSessionProps>()

const emit = defineEmits(['closeModal'])
</script>
