<script setup lang="ts">
import { RouterLink } from 'vue-router'

/** Compact bordered card: eyebrow, title, meta line with arrow. */
defineProps<{
  eyebrow: string
  title: string
  meta: string
  to?: string
  href?: string
}>()
</script>

<template>
  <component :is="to ? RouterLink : 'a'" :to="to" :href="href" class="link-card">
    <span class="link-card__eyebrow t-label">{{ eyebrow }}</span>
    <span class="link-card__title">{{ title }}</span>
    <span class="link-card__meta"
      >{{ meta }} <span class="link-card__arrow" aria-hidden="true">→</span></span
    >
  </component>
</template>

<style scoped>
.link-card {
  display: flex;
  flex-direction: column;
  gap: var(--s-1);
  padding: var(--s-4) var(--s-4) var(--s-4);
  min-width: 0;
  border: 1px solid var(--rule);
  border-radius: var(--radius);
  background: color-mix(in srgb, var(--paper) 70%, transparent);
  backdrop-filter: blur(6px);
  transition:
    border-color var(--dur-fast) ease,
    transform var(--dur) var(--ease);
}
.link-card:hover {
  border-color: var(--text);
  transform: translateY(-2px);
}
.link-card__eyebrow {
  color: var(--accent-strong);
}
.link-card__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.35rem;
  letter-spacing: -0.03em;
  line-height: 1.1;
}
.link-card__meta {
  margin-top: var(--s-3);
  font-size: var(--fs-small);
  color: var(--muted);
}
.link-card__arrow {
  display: inline-block;
  transition: transform var(--dur) var(--ease);
}
.link-card:hover .link-card__arrow {
  transform: translateX(3px);
}
</style>
