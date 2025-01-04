<template>
  <header
    :class="{ 'fixed w-full top-0 z-20': props.role === 'Pemilih' }"
    class="mb-3"
  >
    <nav class="navbar">
      <div class="container-fluid">
        <div class="flex items-center gap-6 ps-3">
          <UIcon
            v-if="props.role === 'Petugas'"
            name="i-heroicons-bars-3-16-solid"
            class="block text-2xl cursor-pointer lg:hidden"
            @click="emit('toggleSidebar')"
          />
          <h1 class="text-[#151D48] text-3xl font-semibold">
            <slot name="page_title"></slot>
          </h1>
        </div>
        <UDropdown
          :ui="{ item: { size: 'text-md', padding: 'py-2 px-3' } }"
          :items="dropdownItems"
          :popper="{ placement: 'bottom-start' }"
        >
          <NuxtImg :src="computedPhotoProfileUrl" class="avatar-image" />
          <div class="user-info">
            <UButton class="user-button" color="white" variant="ghost">
              <span class="username">{{ props.name }}</span>
              <UIcon name="i-heroicons-chevron-down-20-solid" />
            </UButton>
            <span class="user-role">{{ props.role }}</span>
          </div>
        </UDropdown>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type HeaderProps = {
  name: string
  role: string
  photo_profile_url?: string
}

const props = defineProps<HeaderProps>()
const emit = defineEmits(['toggleSidebar', 'confirmLogout'])

const computedPhotoProfileUrl = computed(
  () => props.photo_profile_url || '/images/avatar/default.jpg'
)

const dropdownItems = [
  [
    {
      label: 'Profile',
      avatar: {
        src: computedPhotoProfileUrl.value
      }
    }
  ],
  [
    {
      label: 'Logout',
      icon: 'i-heroicons-arrow-left-start-on-rectangle-20-solid',
      click: () => emit('confirmLogout')
    }
  ]
]
</script>

<style scoped>
header {
  @apply mb-3;
}

header .navbar {
  @apply bg-white relative z-10 flex items-center justify-start flex-nowrap;
}

header .navbar .container-fluid {
  @apply flex items-center justify-between w-full py-4 px-4 xl:py-6 xl:px-8;
}

.avatar-image {
  @apply max-w-[67px] max-h-[60px] me-4 object-contain rounded-2xl;
}

.user-info {
  @apply hidden md:flex md:flex-col;
}

.user-button {
  @apply flex gap-8;
}

.username {
  @apply text-base font-medium;
}

.user-role {
  @apply text-sm font-normal pb-[6px] px-[10px];
}
</style>
