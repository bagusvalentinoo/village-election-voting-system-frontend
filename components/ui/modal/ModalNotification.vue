<template>
  <UModal :ui="{ rounded: 'rounded-3xl' }">
    <div class="px-4 pt-6 pb-4">
      <div class="flex flex-col items-center justify-center">
        <Icon :name="iconName" size="6.5rem" :class="iconClass" />
        <h1
          class="text-3xl font-bold mt-4 mb-2 text-center"
          :class="titleClass"
        >
          {{ props.title }}
        </h1>
        <p
          class="text-lg font-light text-gray-500 text-center"
          :class="{ hidden: !props.message }"
        >
          {{ props.message }}
        </p>
        <div
          v-if="props.type === 'confirm'"
          class="flex justify-center items-center gap-3 mt-3"
        >
          <UButton
            class="font-bold mt-4 mb-2"
            :class="{ hidden: props.button_confirm_loading }"
            color="gray"
            variant="outline"
            size="lg"
            @click="emit('closeModal')"
          >
            Kembali
          </UButton>
          <UButton
            class="font-bold mt-4 mb-2"
            color="primary"
            variant="outline"
            size="lg"
            :loading="props.button_confirm_loading"
            @click="emit('confirm')"
          >
            {{ props.button_confirm_loading ? 'Memproses...' : 'Ya' }}
          </UButton>
        </div>
        <UButton
          v-else
          class="font-bold mt-4 mb-2"
          :color="buttonColor"
          size="lg"
          @click="emit('closeModal')"
        >
          OK
        </UButton>
      </div>
    </div>
  </UModal>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ModalProps = {
  type: 'success' | 'warning' | 'error' | 'confirm'
  title: string
  message?: string
  button_confirm_loading?: boolean
}

const props = defineProps<ModalProps>()
const emit = defineEmits(['closeModal', 'loading', 'confirm'])

const iconName = computed(() => {
  switch (props.type) {
    case 'success':
      return 'line-md:confirm-circle'
    case 'warning':
      return 'line-md:alert-circle'
    case 'error':
      return 'line-md:close-circle'
    case 'confirm':
      return 'line-md:question-circle'
    default:
      return ''
  }
})

const iconClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'text-green-500'
    case 'warning':
      return 'text-yellow-500'
    case 'error':
      return 'text-red-500'
    case 'confirm':
      return 'text-customPrimary-500'
    default:
      return ''
  }
})

const titleClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'text-green-500'
    case 'warning':
      return 'text-yellow-500'
    case 'error':
      return 'text-red-500'
    default:
      return ''
  }
})

const buttonColor = computed(() => {
  switch (props.type) {
    case 'success':
      return 'green'
    case 'warning':
      return 'yellow'
    case 'error':
      return 'red'
    default:
      return ''
  }
})
</script>
