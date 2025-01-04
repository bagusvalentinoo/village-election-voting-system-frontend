<template>
  <div class="candidates-grid">
    <div
      class="candidate-card"
      v-for="candidate in props.candidates"
      :key="candidate.id"
    >
      <h1 class="serial-number">{{ candidate.number }}</h1>
      <div class="photo-container">
        <NuxtImg class="photo" :src="candidate.image_url" />
      </div>
      <h1 class="candidate-name mb-2">{{ candidate.first_candidate_name }}</h1>
      <h1 class="candidate-name mb-5">{{ candidate.second_candidate_name }}</h1>
      <URadio
        :ui="{ base: 'h-6 w-6', border: 'border-[3px]' }"
        v-model="props.state.candidate_id"
        :value="candidate.id"
        :disabled="props.uiState.disabledInputs.candidate_id"
      />
    </div>
  </div>
  <UButton
    class="my-5"
    color="black"
    size="xl"
    variant="outline"
    :disabled="props.uiState.disabledInputs.button"
    @click="emit('openModalVoteCandidateConfirmation')"
  >
    Simpan Pilihan
  </UButton>
</template>

<script setup lang="ts">
import type {
  VoteCandidateState,
  VoteCandidateUiState,
} from '~/types/model/candidate.type'
import type {ElectionSessionSerializer} from "~/types/serializer/election-session";

type VoteCandidateProps = {
  state: VoteCandidateState
  uiState: VoteCandidateUiState
  candidates: ElectionSessionSerializer.CandidatePair[]
}

const props = defineProps<VoteCandidateProps>()
const emit = defineEmits(['openModalVoteCandidateConfirmation'])
</script>

<style scoped>
.candidates-grid {
  @apply grid grid-cols-1 xl:grid-cols-3 gap-8;
}

.candidate-card {
  @apply flex flex-col items-center justify-center px-6 py-4;
}

.photo-container {
  @apply bg-customPrimary-500 py-6 px-4 rounded-[91px] mb-6 min-h-[400px] flex items-center justify-center;
}

.photo {
  @apply w-[200px] md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[380px] rounded-[91px];
}

.serial-number {
  @apply text-4xl font-bold mb-2;
}

.candidate-name {
  @apply text-xl xl:text-2xl text-center font-bold;
}
</style>
