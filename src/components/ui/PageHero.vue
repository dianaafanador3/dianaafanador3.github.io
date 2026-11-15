<script setup lang="ts">
import SectionLabel from './SectionLabel.vue'

/** Top of every inner page: label chip, huge title with accent stop, optional lead. */
defineProps<{
  label: string
  title: string
  lead?: string
}>()
</script>

<template>
  <header class="page-hero container">
    <SectionLabel>{{ label }}</SectionLabel>
    <h1 class="page-hero__title t-display">{{ title }}<span class="accent">.</span></h1>
    <p v-if="lead" class="page-hero__lead t-lead">{{ lead }}</p>
    <slot />
  </header>
</template>

<style scoped>
.page-hero {
  padding-top: clamp(40px, 8vw, 112px);
  padding-bottom: clamp(40px, 6vw, 80px);
}
.page-hero__title {
  margin-top: var(--s-5);
}
.page-hero__lead {
  margin-top: var(--s-5);
}
</style>
