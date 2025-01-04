<template>
  <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100' }">
    <template #header>
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-medium">
          {{ props.isEdit ? 'Edit Paslon' : 'Tambah Paslon' }}
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
      <UFormGroup size="lg" label="Sesi Pemilihan" name="session_id" required>
        <USelectMenu
          class="font-medium"
          v-model="props.state.session_id"
          size="lg"
          :options="
            sessions.length > 0
              ? ['-- Pilih Sesi Pemilihan --', ...sessions]
              : []
          "
          :placeholder="
            sessions.length > 0
              ? '-- Pilih Sesi Pemilihan --'
              : '-- Sesi Pemilihan Tidak Tersedia --'
          "
          value-attribute="id"
          option-attribute="name"
          :disabled="props.uiState.disabledInputs.session_id"
        />
      </UFormGroup>
      <UFormGroup size="lg" label="Nama Ketua" name="chairperson_name" required>
        <UInput
          v-model="props.state.chairperson_name"
          size="lg"
          placeholder="Masukan Nama Ketua"
          :disabled="props.uiState.disabledInputs.chairperson_name"
        />
      </UFormGroup>
      <UFormGroup size="lg" label="Nama Wakil" name="deputy_name" required>
        <UInput
          v-model="props.state.deputy_name"
          size="lg"
          placeholder="Masukan Nama Wakil"
          :disabled="props.uiState.disabledInputs.deputy_name"
        />
      </UFormGroup>
      <UFormGroup size="lg" label="Nomor Urut" name="serial_number" required>
        <UInput
          v-model="props.state.serial_number"
          size="lg"
          placeholder="Masukan Nomor Urut"
          :disabled="props.uiState.disabledInputs.serial_number"
          @input="handleInputSerialNumber"
        />
      </UFormGroup>
      <UFormGroup size="lg" label="Deskripsi" name="description" required>
        <UTextarea
          v-model="props.state.description"
          size="lg"
          autoresize
          :maxrows="5"
          placeholder="Masukan Deskripsi"
          :disabled="props.uiState.disabledInputs.description"
        />
      </UFormGroup>
      <UFormGroup size="lg" label="Foto Paslon" name="photo" required>
        <input
          type="file"
          @change="handlePhotoChange"
          :disabled="props.uiState.disabledInputs.photo"
        />
        <NuxtImg
          v-if="photoPreview"
          :src="photoPreview"
          class="mt-4"
          width="200"
          height="200"
        />
        <div v-if="props.uiState.errors.photo" class="text-red-500">
          {{ props.uiState.errors.photo }}
        </div>
      </UFormGroup>
      <div class="flex items-center justify-end gap-3 pt-36">
        <UButton
          type="button"
          color="gray"
          size="lg"
          :disabled="props.uiState.disabledInputs.button"
          @click="emit('closeModal')"
        >
          KEMBALI
        </UButton>
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
import { ref, watch } from 'vue'
import { ZodType } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import type {
  FormState as CandidateFormState,
  FormUiState as CandidateFormUiState
} from '~/types/model/candidate.type'
import type { Schema } from '~/types/validation/validation.type'
import { sessions } from '~/data/model/session'

const photoPreview = ref<string | null>(null)

type FormCandidateProps = {
  state: CandidateFormState
  uiState: CandidateFormUiState
  schema: ZodType
  isEdit: boolean
  submit: (event: FormSubmitEvent<Schema<ZodType>>) => Promise<void>
}

const props = defineProps<FormCandidateProps>()
const emit = defineEmits(['closeModal'])

const handleInputSerialNumber = (event: Event) => {
  const target = event.target as HTMLInputElement
  target.value = target.value.replace(/[^0-9]/g, '').slice(0, 2)
  props.state.serial_number = target.value
}

watch(
  () => props.state.photo,
  (newVal) => {
    if (props.isEdit && newVal && typeof newVal === 'string') {
      photoPreview.value = newVal
    }
  },
  { immediate: true }
)

const handlePhotoChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      photoPreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
    props.state.photo = file
  } else {
    photoPreview.value = null
    props.state.photo = ''
  }
}
</script>
