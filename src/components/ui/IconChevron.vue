<script setup lang="ts">
defineProps<{
  direction: 'left' | 'right'
}>()
</script>

<template>
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2.5"
    stroke-linecap="square"
    stroke-linejoin="miter"
    aria-hidden="true"
  >
    <polyline v-if="direction === 'left'" points="15 18 9 12 15 6" />
    <polyline v-else points="9 18 15 12 9 6" />
  </svg>
</template>
