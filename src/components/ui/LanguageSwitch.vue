<script setup lang="ts">
import { useI18n, locales, localeNames } from '@/i18n'

/** Segmented ES · EN · CA pill. `size="lg"` for the mobile menu. */
defineProps<{ size?: 'md' | 'lg' }>()

const { t, locale, setLocale } = useI18n()
</script>

<template>
  <div
    class="lang"
    :class="{ 'lang--lg': size === 'lg' }"
    role="group"
    :aria-label="t.nav.language"
  >
    <button
      v-for="l in locales"
      :key="l"
      type="button"
      class="lang__btn t-label"
      :class="{ 'lang__btn--active': l === locale }"
      :aria-pressed="l === locale"
      :lang="l"
      :title="localeNames[l]"
      @click="setLocale(l)"
    >
      {{ l }}
    </button>
  </div>
</template>

<style scoped>
.lang {
  display: inline-flex;
  padding: 3px;
  border: 1px solid var(--rule);
  border-radius: var(--radius-pill);
}
.lang__btn {
  min-width: 34px;
  height: 30px;
  padding: 0 var(--s-2);
  border-radius: var(--radius-pill);
  color: var(--muted);
  transition:
    background var(--dur-fast) ease,
    color var(--dur-fast) ease;
}
.lang__btn:hover {
  color: var(--text);
}
.lang__btn--active {
  background: var(--text);
  color: var(--paper);
}
.surface-ink .lang__btn--active {
  color: var(--ink);
}
.lang--lg .lang__btn {
  min-width: 52px;
  height: 40px;
  font-size: 0.8rem;
}
</style>
