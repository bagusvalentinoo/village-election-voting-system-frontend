<template>
  <UTable :rows="props.data" :columns="props.columns">
    <template #no-data="{ row }">{{ row.no }}</template>
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
import type { Session } from '~/types/model/session.type'

type TableProps = {
  data: any[]
  columns: TableColumns[]
}

const props = defineProps<TableProps>()
const emit = defineEmits(['edit', 'delete'])

const dropdownItems = (row: Session) => [
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
