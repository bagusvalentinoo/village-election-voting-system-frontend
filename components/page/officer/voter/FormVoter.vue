<template>
  <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100' }">
    <template #header>
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-medium">
          {{ props.isEdit ? 'Edit Pemilih' : 'Tambah Pemilih' }}
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
          v-model="props.state.election_session_id"
          size="lg"
          :options="
            storeElection.electionSessions.length > 0
              ? ['-- Pilih Sesi Pemilihan --', ...storeElection.electionSessions]
              : []
          "
          :placeholder="
            storeElection.electionSessions.length > 0
              ? '-- Pilih Sesi Pemilihan --'
              : '-- Sesi Pemilihan Tidak Tersedia --'
          "
          value-attribute="id"
          option-attribute="name"
          :disabled="props.uiState.disabledInputs.election_session_id"
        />
      </UFormGroup>
      <UFormGroup size="lg" label="NIK" name="nik" required>
        <UInput
          v-model="props.state.nik"
          size="lg"
          placeholder="Masukan NIK"
          :disabled="props.uiState.disabledInputs.nik"
          @input="handleInputNik"
        />
      </UFormGroup>
      <UFormGroup size="lg" label="Nama" name="name" required>
        <UInput
          v-model="props.state.full_name"
          size="lg"
          placeholder="Masukan Nama"
          :disabled="props.uiState.disabledInputs.full_name"
        />
      </UFormGroup>
      <UFormGroup size="lg" label="Tanggal Lahir" name="birth_date" required>
        <UInput
          type="date"
          v-model="props.state.birth_date"
          size="lg"
          :disabled="props.uiState.disabledInputs.birth_date"
        />
      </UFormGroup>
      <UFormGroup size="lg" label="Alamat" name="address" required>
        <UInput
          v-model="props.state.address"
          size="lg"
          placeholder="Masukan Alamat"
          :disabled="props.uiState.disabledInputs.address"
        />
      </UFormGroup>
      <UFormGroup size="lg" label="Jenis Kelamin" name="gender" required>
        <div class="flex flex-col gap-4 lg:flex-row flex-wrap">
          <URadio
            v-for="gender of genderOptions"
            :key="gender.value"
            v-model="props.state.gender"
            v-bind="gender"
            :disabled="props.uiState.disabledInputs.gender"
          />
        </div>
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
import type {
  FormState as VoterFormState,
  FormUiState as VoterFormUiState
} from '~/types/model/voter.type'
import type { Schema } from '~/types/validation/validation.type'
import {useElectionSessionStore} from "~/stores/elections";

type FormVoterProps = {
  state: VoterFormState
  uiState: VoterFormUiState
  schema: ZodType
  isEdit: boolean
  submit: (event: FormSubmitEvent<Schema<ZodType>>) => Promise<void>
}

const props = defineProps<FormVoterProps>()
const emit = defineEmits(['closeModal'])

const genderOptions = [
  {
    value: 'male',
    label: 'Laki - laki'
  },
  {
    value: 'female',
    label: 'Perempuan'
  }
]

const storeElection = useElectionSessionStore()
const { electionSessions } = storeToRefs(storeElection);
await storeElection.getListElectionSession()

const handleInputNik = (event: Event) => {
  const target = event.target as HTMLInputElement
  target.value = target.value.replace(/[^0-9]/g, '').slice(0, 16)
  props.state.nik = target.value
}
</script>
