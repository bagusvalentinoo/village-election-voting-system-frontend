<template>
  <div>
    <h1>E-Voting Home Page</h1>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'E-Voting - Home'
})

definePageMeta({
  middleware: 'auth'
})
</script>

<style scoped></style>
