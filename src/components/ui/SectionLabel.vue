<script setup lang="ts">
/** Small mono chip that opens a section: "01 · About". */
defineProps<{ tone?: 'default' | 'solid' }>()
</script>

<template>
  <p class="section-label t-label" :class="{ 'section-label--solid': tone === 'solid' }">
    <span class="section-label__dot" aria-hidden="true" />
    <slot />
  </p>
</template>

<style scoped>
.section-label {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  padding: 5px 10px 5px 8px;
  border: 1px solid var(--rule);
  border-radius: var(--radius);
  color: var(--muted);
  line-height: 1;
}
.section-label__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}
.section-label--solid {
  background: var(--text);
  border-color: var(--text);
  color: var(--paper);
}
.surface-ink .section-label--solid {
  color: var(--ink);
}
</style>
