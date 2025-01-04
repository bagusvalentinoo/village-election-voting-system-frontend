<template>
  <NuxtLayout name="officer">
    <template #page_title>Dashboard</template>
    <h1 class="text-customPrimary-500 text-3xl font-semibold">
      E-Voting Officer Dashboard Page
    </h1>
    <UCard v-if="electionSessionStore.ongoingElectionSession">
      <PieChart />
    </UCard>
  </NuxtLayout>
</template>

<script setup lang="ts">

import PieChart from "~/components/ui/chart/PieChart.vue";

useHead({
  title: 'E-Voting - Dashboard'
})

const electionSessionStore = useElectionSessionStore()

const getOngoingElectionSessionResult = async () => {
  try {
    await electionSessionStore.getOngoingElectionSessionForResult({
      paginate: false
    })
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await nextTick()
  await getOngoingElectionSessionResult()
})
</script>

<style scoped></style>
