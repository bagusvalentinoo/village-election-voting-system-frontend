<template>
  <UTable :rows="props.data" :columns="props.columns">
    <template #no-data="{ row }">{{ row.no }}</template>
    <template #session_name-data="{ row }">
    {{ row.election_session.name }}
    </template>
    <template #otp_status-data="{ row }">
      <span
        class="text-white font-medium px-3 py-2 rounded-full"
        :class="row.otp_status ? 'bg-blue-500' : 'bg-red-500'"
      >
        {{ row.otp_status ? 'Available' : 'Not Available' }}
      </span>
    </template>
    <template #action-data="{ row }">
      <UDropdown
        :ui="{ item: { padding: 'py-2 px-3' } }"
        :items="dropdownItems(row)"
      >
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-ellipsis-horizontal-20-solid"
        />
      </UDropdown>
    </template>
    <template #empty-state>
      <TableEmptyState />
    </template>
  </UTable>
</template>

<script setup lang="ts">
import type { TableColumns } from '~/types/model/table.type'
import type { VoterResponse } from '~/types/model/voter.type'

type TableProps = {
  data: any[]
  columns: TableColumns[]
}

const props = defineProps<TableProps>()
const emit = defineEmits(['edit', 'delete'])

const dropdownItems = (row: VoterResponse) => [
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => emit('edit', row.id)
    },
    {
      label: 'Hapus',
      icon: 'i-heroicons-trash-20-solid',
      click: () => emit('delete', row.id)
    }
  ]
]
</script>
