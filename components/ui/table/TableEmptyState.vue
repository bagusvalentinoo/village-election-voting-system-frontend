<template>
  <div class="flex flex-col items-center justify-center py-6 gap-3">
    <NuxtImg
      class="w-[200px] md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px]"
      src="/images/illustration/empty.svg"
    />
    <span class="italic text-sm">
      {{ props.message ?? 'Oops, Tidak ada data yang tersedia' }}
    </span>
  </div>
</template>

<script setup lang="ts">
type TableEmptyStateProps = {
  message?: string
}

const props = defineProps<TableEmptyStateProps>()
</script>
