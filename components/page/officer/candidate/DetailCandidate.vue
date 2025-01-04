<template>
  <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100' }">
    <template #header>
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-medium">Detail Paslon</h1>
        <Icon
          name="heroicons:x-mark-16-solid"
          color="gray"
          size="1.5rem"
          class="cursor-pointer"
          @click="emit('closeModal')"
        />
      </div>
    </template>
    <div class="flex flex-col items-center justify-center px-6 py-4">
      <h1 class="serial-number">{{ props.state.serial_number }}</h1>
      <div class="photo-container">
        <NuxtImg class="photo" :src="props.state.photo_url" />
      </div>
      <h1 class="candidate-name mb-2">{{ props.state.chairperson_name }}</h1>
      <h1 class="candidate-name mb-5">{{ props.state.deputy_name }}</h1>
      <div class="description-container">
        <p class="description">
          {{ props.state.description }}
        </p>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { DetailState as CandidateDetailState } from '~/types/model/candidate.type'

type DetailCandidateProps = {
  state: CandidateDetailState
}

const props = defineProps<DetailCandidateProps>()
const emit = defineEmits(['closeModal'])
</script>

<style scoped>
.photo-container {
  @apply bg-customPrimary-500 py-6 px-4 rounded-[91px] mb-6;
}

.photo {
  @apply w-[200px] md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[380px];
}

.serial-number {
  @apply text-4xl font-bold mb-2;
}

.candidate-name {
  @apply text-xl xl:text-2xl text-center font-bold;
}

.description-container {
  @apply w-full px-4 md:w-[60%] md:px-2 xl:w-[50%] xl:px-0;
}

.description {
  @apply text-[15px] xl:text-base font-light leading-6 text-left md:text-justify whitespace-pre-line;
}
</style>
