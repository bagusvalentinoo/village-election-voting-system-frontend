<template>
  <UTable :rows="props.data" :columns="props.columns">
    <template #session_name-data="{ row }">
      {{ row.session.name }}
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
import type { CandidateResponse } from '~/types/model/candidate.type'

type TableProps = {
  data: any[]
  columns: TableColumns[]
}

const props = defineProps<TableProps>()
const emit = defineEmits(['detail', 'edit', 'delete'])

const dropdownItems = (row: CandidateResponse) => [
  [
    {
      label: 'Detail',
      icon: 'i-heroicons-arrow-up-right-16-solid',
      click: () => emit('detail', row.id)
    },
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
