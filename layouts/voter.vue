<template>
  <div class="app">
    <div class="main">
      <div class="main-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//
</script>

<style scoped>
.app {
  @apply relative min-h-screen bg-[#F7F7F6];
}

.main-content {
  @apply p-4 lg:p-10;
}
</style>
