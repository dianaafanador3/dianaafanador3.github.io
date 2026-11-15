<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

/**
 * Outlined mono pill. Renders a RouterLink for `to`, an <a> for `href`
 * (external links open in a new tab), otherwise a <button>.
 */
const props = defineProps<{
  to?: string
  href?: string
  variant?: 'outline' | 'solid'
  arrow?: boolean
}>()

const external = computed(() => !!props.href && /^https?:/.test(props.href))
</script>

<template>
  <RouterLink v-if="to" :to="to" class="pill t-label" :class="`pill--${variant ?? 'outline'}`">
    <slot /><span v-if="arrow" class="pill__arrow" aria-hidden="true">→</span>
  </RouterLink>
  <a
    v-else-if="href"
    :href="href"
    class="pill t-label"
    :class="`pill--${variant ?? 'outline'}`"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener' : undefined"
  >
    <slot /><span v-if="arrow" class="pill__arrow" aria-hidden="true">{{ external ? '↗' : '→' }}</span>
  </a>
  <button v-else type="button" class="pill t-label" :class="`pill--${variant ?? 'outline'}`">
    <slot /><span v-if="arrow" class="pill__arrow" aria-hidden="true">→</span>
  </button>
</template>

<style scoped>
.pill {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  min-height: 40px;
  padding: 0 var(--s-4);
  border: 1px solid currentColor;
  border-radius: var(--radius-pill);
  color: var(--text);
  white-space: nowrap;
  transition:
    background var(--dur-fast) ease,
    color var(--dur-fast) ease,
    border-color var(--dur-fast) ease;
}
.pill:hover {
  background: var(--text);
  border-color: var(--text);
  color: var(--paper);
}
.surface-ink .pill:hover {
  color: var(--ink);
}
.pill--solid {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--on-accent);
}
.pill--solid:hover {
  background: var(--text);
  border-color: var(--text);
}
.pill__arrow {
  transition: transform var(--dur) var(--ease);
}
.pill:hover .pill__arrow {
  transform: translateX(3px);
}
</style>
