<template>
  <div>
    <canvas ref="pieChart"></canvas>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {Chart, registerables} from 'chart.js'

Chart.register(...registerables)

const pieChart = ref<HTMLCanvasElement | null>(null)

const electionSessionStore = useElectionSessionStore()

onMounted(() => {
  if (pieChart.value) {
    const ctx = pieChart.value.getContext('2d')
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: electionSessionStore.ongoingElectionSession?.candidate_pairs.map(candidate => {
            return candidate.first_candidate_name + ' & ' + candidate.second_candidate_name
          }) || [],
          datasets: [{
            label: electionSessionStore.ongoingElectionSession?.name || '',
            data: electionSessionStore?.ongoingElectionSession?.candidate_pairs.map(candidate => {
              return candidate.total_vote
            }) || [],
            backgroundColor: electionSessionStore?.ongoingElectionSession?.candidate_pairs.map(() => {
              return getRandomHexColor()
            }) || []
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Data hasil pemilihan 2024'
            }
          }
        }
      })
    }
  }
})

const getRandomHexColor = () => {
  // Generate a random number between 0 and 16777215 (decimal for FFFFFF)
  let randomNum = Math.floor(Math.random() * 16777215);
  // Convert the number to a hex string and pad with zeros if necessary
  return "#" + randomNum.toString(16).padStart(6, '0');
}
</script>

<style scoped>
canvas {
  max-width: 400px;
  margin: auto;
}
</style>
