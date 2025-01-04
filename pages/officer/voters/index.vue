<template>
  <NuxtLayout name="officer">
    <template #page_title>Data Pemilih</template>
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
      message="Data pemilih yang dipilih akan dihapus secara permanen."
      :button_confirm_loading="uiFormState.disabledInputs.button"
      @closeModal="closeModalDeleteConfirmation"
      @confirm="onDeleteSingle"
    />
    <ModalNotification
      v-model="isModalBulkDeleteConfirmationOpen"
      type="confirm"
      :title="`Apakah Anda Yakin ingin menghapus ${selectedTableItems.length} data pemilih ini?`"
      :button_confirm_loading="uiFormState.disabledInputs.button"
      @closeModal="closeModalDeleteBulkConfirmation"
      @confirm="onDeleteBulk"
    />
    <UModal
      v-model="isModalFormOpen"
      :ui="{ width: 'w-full sm:max-w-6xl', height: 'h-full sm:max-h-4xl' }"
    >
      <FormVoter
        :state="formState"
        :uiState="uiFormState"
        :schema="CREATE_UPDATE"
        :submit="isEdit ? onUpdate : onCreate"
        :isEdit="isEdit"
        @closeModal="closeModalForm"
      />
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
<!--            <USelectMenu-->
<!--              class="font-medium w-full md:w-[48%] lg:w-full xl:w-[48%] 2xl:w-[215px] flex-shrink-0"-->
<!--              v-model="filterSessionName"-->
<!--              size="lg"-->
<!--              :options="['Filter by Session Name', ...sessions]"-->
<!--              placeholder="Filter by Session Name"-->
<!--              value-attribute="name"-->
<!--              option-attribute="name"-->
<!--              @change="changefilterSessionName"-->
<!--            />-->
            <USelectMenu
              class="font-medium w-full md:w-[48%] lg:w-full xl:w-[48%] 2xl:w-[192px] flex-shrink-0"
              v-model="filterOtpStatus"
              size="lg"
              :options="['Filter by OTP Status', 'Available', 'Not Available']"
              placeholder="Filter by OTP Status"
              @change="changefilterOtpStatus"
            />
            <UButton
              class="font-medium flex justify-center items-center flex-shrink-0"
              :class="[
                isButtonDeleteDisabled
                  ? 'w-full md:w-[98%] lg:w-full xl:w-[98%] 2xl:w-auto'
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
        <TableVoter
          v-model="selectedTableItems"
          :data="filtered.data"
          :columns="tableColumns"
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
import { tableColumns, voters } from '~/data/model/voter'
import type { Schema } from '~/types/validation/validation.type'
import type {
  Voter,
  VoterResponse,
  FormState as VoterFormState,
  FormUiState as VoterFormUiState,
  DeleteIds as VoterDelete
} from '~/types/model/voter.type'
import { CREATE_UPDATE } from '~/validations/officer/voter.validation'

import {useVoterStore} from "~/stores/voters";
import type {DeleteIds as SessionDelete} from "~/types/model/session.type";


useHead({
  title: 'E-Voting - Pemilih'
})

const voterId = ref('')
const isEdit = ref(false)
const isModalFormOpen = ref(false)
const isModalSuccessOpen = ref(false)
const modalSuccessMessage = ref('')
const isModalErrorOpen = ref(false)
const isModalDeleteConfirmationOpen = ref(false)
const isModalBulkDeleteConfirmationOpen = ref(false)

const q = ref('')
const page = ref(1)
const limit = ref(10)
const selectedTableItems = ref([])
const filterOtpStatus = ref('')
const filterSessionName = ref('')
const isButtonDeleteDisabled = computed(
  () => selectedTableItems.value.length === 0
)

const formState = reactive<VoterFormState>({
  id: '',
  election_session_id: '',
  nik: '',
  full_name: '',
  birth_date: '',
  address: '',
  gender: ''
})

const uiFormState = reactive<VoterFormUiState>({
  disabledInputs: {
    button: false,
    election_session_id: false,
    nik: false,
    full_name: false,
    birth_date: false,
    address: false,
    gender: false
  },
  error: '',
  errors: {
    election_session_id: '',
    nik: '',
    full_name: '',
    birth_date: '',
    address: '',
    gender: ''
  }
})

const deleteId = reactive<VoterDelete>({
  ids: [],
})

const toggleInputs = (status: boolean) => {
  uiFormState.disabledInputs.election_session_id = status
  uiFormState.disabledInputs.nik = status
  uiFormState.disabledInputs.full_name = status
  uiFormState.disabledInputs.birth_date = status
  uiFormState.disabledInputs.address = status
  uiFormState.disabledInputs.gender = status
  uiFormState.disabledInputs.button = status
}

const resetFormState = () => {
  Object.assign(formState, {
    election_session: '',
    nik: '',
    full_name: '',
    birth_date: '',
    address: '',
    gender: 'male'
  })
}

const openModalFormCreate = () => {
  resetFormState()
  isEdit.value = false
  isModalFormOpen.value = true
}

const openModalFormEdit = async (id: Voter['id']) => {
  const voter = await storeVoter.getByIdVoter(id)
  console.log("getById",voter)
  if (!voter) {
    uiFormState.error = 'Oops, pemilih tidak ditemukan'
    isModalErrorOpen.value = true
    return
  }

  voterId.value = id
  Object.assign(formState, {
    id: voter!.id,
    election_session_id: voter!.election_session.id,
    nik: voter!.nik,
    full_name: voter!.full_name,
    birth_date: voter!.birth_date,
    address: voter!.address,
    gender: voter!.gender
  })

  isEdit.value = true
  isModalFormOpen.value = true
}

const closeModalSuccess = () => {
  isModalSuccessOpen.value = false
}

const closeModalError = () => {
  isModalErrorOpen.value = false
}

const closeModalDeleteConfirmation = () => {
  isModalDeleteConfirmationOpen.value = false
}

const closeModalDeleteBulkConfirmation = () => {
  isModalBulkDeleteConfirmationOpen.value = false
}

const openModalDeleteConfirmation = (id: Voter['id']) => {
  voterId.value = id
  isModalDeleteConfirmationOpen.value = true
}

const openModalDeleteBulkConfirmation = () => {
  isModalBulkDeleteConfirmationOpen.value = true
}

const closeModalForm = () => {
  toggleInputs(false)
  isModalFormOpen.value = false
}

const changeLimit = (value: string) => {
  limit.value = parseInt(value)
  page.value = 1
}

const changefilterSessionName = (value: string) => {
  filterSessionName.value = value
  page.value = 1
}

const changefilterOtpStatus = (value: string) => {
  filterOtpStatus.value = value
  page.value = 1
}

watch(q, () => {
  page.value = 1
})

const storeVoter = useVoterStore()
const { voterSessions } = storeToRefs(storeVoter);
await storeVoter.getListVoter()

const filtered = computed(() => {
  const offset = (page.value - 1) * limit.value
  let filteredVoters: VoterResponse[] = storeVoter.voterSessions

  console.log("call",filteredVoters)
  if (filterOtpStatus.value === 'Available')
    filteredVoters = filteredVoters.filter((voter) => voter.otp_status)

  if (filterOtpStatus.value === 'Not Available')
    filteredVoters = filteredVoters.filter((voter) => !voter.otp_status)

  if (filterSessionName.value)
    filteredVoters = filteredVoters.filter(
      (voter) => voter.session.name === filterSessionName.value
    )

  filteredVoters = filteredVoters.filter(
    (voter) =>
      voter.nik.toLowerCase().includes(q.value.toLowerCase()) ||
      voter.full_name.toLowerCase().includes(q.value.toLowerCase())
  )

  return {
    data: filteredVoters
      .slice(offset, offset + limit.value)
      .map((voter, index) => ({
        ...voter,
        no: offset + index + 1
      })),
    length: filteredVoters.length
  }
})

const onCreate = async (
  event: FormSubmitEvent<Schema<typeof CREATE_UPDATE>>
) => {
  try {
    toggleInputs(true)
    await storeVoter.createVoter(formState)
    // console.log(
    //   'Voter created data: ',
    //   JSON.stringify({
    //     data: {
    //       id: String(voters.length + 1),
    //       ...event.data,
    //       otp: '12345678',
    //       otp_status: false
    //     }
    //   })
    // )
    // handle create
  } catch (error) {
    uiFormState.error = 'Oops, something went wrong'
    isModalErrorOpen.value = true
    console.error(JSON.stringify(error))
  } finally {
    resetFormState()
    toggleInputs(false)
    closeModalForm()
    modalSuccessMessage.value = 'Data pemilih berhasil ditambahkan'
    isModalSuccessOpen.value = true
  }
}

const onUpdate = async (
  event: FormSubmitEvent<Schema<typeof CREATE_UPDATE>>
) => {
  try {
    toggleInputs(true)
    await storeVoter.updateVoter(formState)
    // console.log(
    //   'Voter updated data: ',
    //   JSON.stringify({
    //     data: {
    //       id: voterId.value,
    //       ...event.data,
    //       otp: '12345678',
    //       otp_status: false
    //     }
    //   })
    // )
    // handle update
  } catch (error) {
    uiFormState.error = 'Oops, something went wrong'
    isModalErrorOpen.value = true
  } finally {
    resetFormState()
    toggleInputs(false)
    closeModalForm()
    modalSuccessMessage.value = 'Data pemilih berhasil diperbarui'
    isModalSuccessOpen.value = true
  }
}

const onDeleteSingle = async () => {
  try {
    uiFormState.disabledInputs.button = true
    deleteId.ids.push(voterId.value);
    await storeVoter.deleteVoter(deleteId);
    console.log('Voter Deleted Selected: ', JSON.stringify({ deleteId }))
    // handle delete
  } catch (error) {
    uiFormState.error = 'Oops, something went wrong'
    isModalErrorOpen.value = true
    console.error(JSON.stringify(error))
  } finally {
    uiFormState.disabledInputs.button = false
    closeModalDeleteConfirmation()
    modalSuccessMessage.value = 'Data pemilih berhasil dihapus'
    isModalSuccessOpen.value = true
  }
}

const onDeleteBulk = async () => {
  try {
    uiFormState.disabledInputs.button = true
    console.log(
      'Voters Deleted Selected: ',
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
    modalSuccessMessage.value = `Data pemilih berhasil dihapus sebanyak ${selectedTableItems.value.length} data`
    isModalSuccessOpen.value = true
    selectedTableItems.value = []
  }
}
</script>
