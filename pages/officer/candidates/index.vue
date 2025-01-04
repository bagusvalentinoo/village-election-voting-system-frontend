<template>
  <NuxtLayout name="officer">
    <template #page_title>Data Paslon</template>
    <ModalNotification
      v-model="isModalSuccessOpen"
      type="success"
      title="Success"
      :message="modalSuccessMessage"
      @closeModal="closeModalSuccess"
    />
    <ModalNotification
      v-model="isModalErrorOpen"
      type="error"
      title="Error"
      :message="uiFormState.error"
      @closeModal="closeModalError"
    />
    <ModalNotification
      v-model="isModalDeleteConfirmationOpen"
      type="confirm"
      title="Apakah Anda Yakin?"
      message="Data paslon yang dihapus tidak dapat dikembalikan"
      :button_confirm_loading="uiFormState.disabledInputs.button"
      @closeModal="closeModalDeleteConfirmation"
      @confirm="onDeleteSingle"
    />
    <ModalNotification
      v-model="isModalDeleteBulkConfirmationOpen"
      type="confirm"
      :title="`Apakah Anda Yakin ingin menghapus ${selectedTableItems.length} data paslon ini?`"
      :button_confirm_loading="uiFormState.disabledInputs.button"
      @closeModal="closeModalDeleteBulkConfirmation"
      @confirm="onDeleteBulk"
    />
    <UModal
      v-model="isModalFormOpen"
      :ui="{ width: 'w-full sm:max-w-6xl', height: 'h-full sm:max-h-4xl' }"
    >
      <FormCandidate
        :state="formState"
        :uiState="uiFormState"
        :schema="CREATE_UPDATE"
        :isEdit="isEdit"
        :submit="isEdit ? onUpdate : onCreate"
        @closeModal="closeModalForm"
      />
    </UModal>
    <UModal
      v-model="isModalDetailOpen"
      :ui="{ width: 'w-full sm:max-w-6xl', height: 'h-full sm:max-h-4xl' }"
    >
      <DetailCandidate :state="detailState" @closeModal="closeModalDetail" />
    </UModal>
    <div class="page-content">
      <UCard class="mt-4">
        <div
          class="flex flex-wrap items-center justify-between gap-4 py-3.5 border-b border-gray-200"
        >
          <UInput
            v-model="q"
            class="w-full 2xl:w-auto"
            icon="i-heroicons-magnifying-glass-20-solid"
            size="lg"
            :trailing="false"
            placeholder="Search..."
          />
          <div class="w-full 2xl:w-auto flex flex-wrap items-center gap-4">
            <USelectMenu
              class="font-medium w-full 2xl:w-[215px] flex-shrink-0"
              v-model="filterSessionName"
              size="lg"
              :options="['Filter by Session Name', ...sessions]"
              placeholder="Filter by Session Name"
              value-attribute="name"
              option-attribute="name"
              @change="changefilterSessionName"
            />
            <UButton
              class="font-medium flex justify-center items-center flex-shrink-0"
              :class="[
                isButtonDeleteDisabled
                  ? 'w-full md:w-full lg:w-full xl:w-full 2xl:w-auto'
                  : 'w-full md:w-[48%] lg:w-full xl:w-[48%] 2xl:w-auto'
              ]"
              size="lg"
              color="primary"
              variant="outline"
              icon="i-heroicons-plus-20-solid"
              @click="openModalFormCreate"
            >
              Tambah
            </UButton>
            <UButton
              class="font-medium w-full md:w-[48%] lg:w-full xl:w-[48%] 2xl:w-auto flex justify-center items-center flex-shrink-0"
              :class="[isButtonDeleteDisabled ? 'hidden' : '']"
              size="lg"
              color="red"
              variant="outline"
              icon="i-heroicons-trash"
              @click="openModalDeleteBulkConfirmation"
            >
              Hapus
            </UButton>
          </div>
        </div>
        <TableCandidate
          v-model="selectedTableItems"
          :data="filtered.data"
          :columns="tableColumns"
          @detail="openModalDetail"
          @edit="openModalFormEdit"
          @delete="openModalDeleteConfirmation"
        />
        <div
          class="flex items-center flex-wrap justify-end gap-4 px-3 py-3.5 border-t border-gray-200"
        >
          <USelectMenu
            v-model="limit"
            size="lg"
            :options="['5', '10', '20', '30', '50', '100']"
            @change="changeLimit"
          />
          <span class="text-sm !font-light">
            1 - {{ limit }} dari {{ filtered.length }}
          </span>
          <UPagination
            size="lg"
            v-model="page"
            :page-count="limit"
            :total="filtered.length"
          />
        </div>
      </UCard>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue'
import type { FormSubmitEvent } from '#ui/types'
import { tableColumns, candidates } from '~/data/model/candidate'
import { sessions } from '~/data/model/session'
import type {
  Candidate,
  CandidateResponse,
  FormState as CandidateFormState,
  FormUiState as CandidateFormUiState,
  DetailState as CandidateDetailState
} from '~/types/model/candidate.type'
import type { Schema } from '~/types/validation/validation.type'
import { CREATE_UPDATE } from '~/validations/officer/candidate.validation'

useHead({
  title: 'E-Voting - Paslon'
})

const candidateId = ref('')
const isEdit = ref(false)
const isModalFormOpen = ref(false)
const isModalSuccessOpen = ref(false)
const modalSuccessMessage = ref('')
const isModalErrorOpen = ref(false)
const isModalDeleteConfirmationOpen = ref(false)
const isModalDeleteBulkConfirmationOpen = ref(false)
const isModalDetailOpen = ref(false)

const q = ref('')
const page = ref(1)
const limit = ref(10)
const selectedTableItems = ref([])
const filterSessionName = ref('')
const isButtonDeleteDisabled = computed(
  () => selectedTableItems.value.length === 0
)

const formState = reactive<CandidateFormState>({
  session_id: '',
  chairperson_name: '',
  deputy_name: '',
  serial_number: '',
  description: '',
  photo: ''
})

const uiFormState = reactive<CandidateFormUiState>({
  disabledInputs: {
    button: false,
    session_id: false,
    chairperson_name: false,
    deputy_name: false,
    serial_number: false,
    description: false,
    photo: false
  },
  error: '',
  errors: {
    session_id: '',
    chairperson_name: '',
    deputy_name: '',
    serial_number: '',
    description: '',
    photo: ''
  }
})

const detailState = reactive<CandidateDetailState>({
  session_name: '',
  chairperson_name: '',
  deputy_name: '',
  serial_number: '',
  description: '',
  photo_url: ''
})

const toggleInputs = (status: boolean) => {
  uiFormState.disabledInputs.button = status
  uiFormState.disabledInputs.session_id = status
  uiFormState.disabledInputs.chairperson_name = status
  uiFormState.disabledInputs.deputy_name = status
  uiFormState.disabledInputs.serial_number = status
  uiFormState.disabledInputs.description = status
  uiFormState.disabledInputs.photo = status
}

const resetFormState = () => {
  Object.assign(formState, {
    session_id: '',
    chairperson_name: '',
    deputy_name: '',
    serial_number: '',
    description: '',
    photo: ''
  })
}

const openModalDetail = (id: Candidate['id']) => {
  const candidate = candidates.find((candidate) => candidate.id === id)

  if (!candidate) {
    uiFormState.error = 'Oops, paslon tidak ditemukan'
    isModalErrorOpen.value = true
    return
  }

  Object.assign(detailState, {
    session_name: candidate.session.name,
    chairperson_name: candidate.chairperson_name,
    deputy_name: candidate.deputy_name,
    serial_number: String(candidate.serial_number),
    description: candidate.description,
    photo_url: candidate.photo_url
  })
  isModalDetailOpen.value = true
}

const openModalFormCreate = () => {
  resetFormState()
  isEdit.value = false
  isModalFormOpen.value = true
}

const openModalFormEdit = (id: Candidate['id']) => {
  const candidate = candidates.find((candidate) => candidate.id === id)

  if (!candidate) {
    uiFormState.error = 'Oops, paslon tidak ditemukan'
    isModalErrorOpen.value = true
    return
  }

  candidateId.value = candidate.id
  Object.assign(formState, {
    session_id: candidate.session.id,
    chairperson_name: candidate.chairperson_name,
    deputy_name: candidate.deputy_name,
    serial_number: String(candidate.serial_number),
    description: candidate.description,
    photo: candidate.photo_url
  })
  isEdit.value = true
  isModalFormOpen.value = true
}

const closeModalForm = () => {
  toggleInputs(false)
  isModalFormOpen.value = false
}

const closeModalDetail = () => {
  isModalDetailOpen.value = false
}

const openModalDeleteConfirmation = (id: Candidate['id']) => {
  candidateId.value = id
  isModalDeleteConfirmationOpen.value = true
}

const closeModalDeleteConfirmation = () => {
  isModalDeleteConfirmationOpen.value = false
}

const openModalDeleteBulkConfirmation = () => {
  isModalDeleteBulkConfirmationOpen.value = true
}

const closeModalDeleteBulkConfirmation = () => {
  isModalDeleteBulkConfirmationOpen.value = false
}

const closeModalSuccess = () => {
  isModalSuccessOpen.value = false
}

const closeModalError = () => {
  isModalErrorOpen.value = false
}

const changeLimit = (value: string) => {
  limit.value = parseInt(value)
  page.value = 1
}

const changefilterSessionName = (value: string) => {
  filterSessionName.value = value
  page.value = 1
}

watch(q, () => {
  page.value = 1
})

const filtered = computed(() => {
  const offset = (page.value - 1) * limit.value
  let filteredCandidates: CandidateResponse[] = candidates

  if (filterSessionName.value)
    filteredCandidates = filteredCandidates.filter(
      (candidate) => candidate.session.name === filterSessionName.value
    )

  filteredCandidates = filteredCandidates.filter(
    (candidate) =>
      candidate.chairperson_name
        .toLowerCase()
        .includes(q.value.toLowerCase()) ||
      candidate.deputy_name.toLowerCase().includes(q.value.toLowerCase()) ||
      candidate.description.toLowerCase().includes(q.value.toLowerCase())
  )

  return {
    data: filteredCandidates.slice(offset, offset + limit.value),
    length: filteredCandidates.length
  }
})

const onCreate = async (
  event: FormSubmitEvent<Schema<typeof CREATE_UPDATE>>
) => {
  try {
    toggleInputs(true)
    const formData = new FormData()
    Object.keys(event.data).forEach((key) => {
      formData.append(
        key,
        event.data[key as keyof Schema<typeof CREATE_UPDATE>]
      )
    })
    console.log('Candidate created data: ', formData)
    // handle create using formData
  } catch (error) {
    uiFormState.error = 'Oops, something went wrong'
    isModalErrorOpen.value = true
    console.error(JSON.stringify(error))
  } finally {
    resetFormState()
    toggleInputs(false)
    closeModalForm()
    modalSuccessMessage.value = 'Data paslon berhasil ditambahkan'
    isModalSuccessOpen.value = true
  }
}

const onUpdate = async (
  event: FormSubmitEvent<Schema<typeof CREATE_UPDATE>>
) => {
  try {
    toggleInputs(true)
    const formData = new FormData()
    Object.keys(event.data).forEach((key) => {
      formData.append(
        key,
        event.data[key as keyof Schema<typeof CREATE_UPDATE>]
      )
    })
    formData.append('id', candidateId.value)
    console.log('Candidate updated data: ', formData)
    // handle update using formData
  } catch (error) {
    uiFormState.error = 'Oops, something went wrong'
    isModalErrorOpen.value = true
  } finally {
    resetFormState()
    toggleInputs(false)
    closeModalForm()
    modalSuccessMessage.value = 'Data paslon berhasil diperbarui'
    isModalSuccessOpen.value = true
  }
}

const onDeleteSingle = async () => {
  try {
    uiFormState.disabledInputs.button = true
    const candidate = candidates.find(
      (candidate) => candidate.id === candidateId.value
    )
    console.log('Candidate Deleted Selected: ', JSON.stringify({ candidate }))
    // handle delete
  } catch (error) {
    uiFormState.error = 'Oops, something went wrong'
    isModalErrorOpen.value = true
    console.error(JSON.stringify(error))
  } finally {
    uiFormState.disabledInputs.button = false
    closeModalDeleteConfirmation()
    modalSuccessMessage.value = 'Data paslon berhasil dihapus'
    isModalSuccessOpen.value = true
  }
}

const onDeleteBulk = async () => {
  try {
    uiFormState.disabledInputs.button = true
    console.log(
      'Candidates Deleted Selected: ',
      JSON.stringify(selectedTableItems.value)
    )
    // handle delete
  } catch (error) {
    uiFormState.error = 'Oops, something went wrong'
    isModalErrorOpen.value = true
    console.error(JSON.stringify(error))
  } finally {
    uiFormState.disabledInputs.button = false
    closeModalDeleteBulkConfirmation()
    modalSuccessMessage.value = `Data paslon berhasil dihapus sebanyak ${selectedTableItems.value.length} data`
    isModalSuccessOpen.value = true
    selectedTableItems.value = []
  }
}
</script>
