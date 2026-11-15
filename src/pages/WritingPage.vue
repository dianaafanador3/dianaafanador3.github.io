<script setup lang="ts">
import { useI18n } from '@/i18n'
import PageHero from '@/components/ui/PageHero.vue'

const { t } = useI18n()
</script>

<template>
  <main>
    <PageHero :label="t.writing.designator" :title="t.writing.title" :lead="t.writing.lead" />

    <section class="section container rule-top">
      <div class="empty surface-panel">
        <p class="t-label t-muted">{{ t.writing.noSignal }}</p>
        <p class="empty__text t-h3">{{ t.writing.soon }}</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.empty {
  display: grid;
  gap: var(--s-3);
  place-items: center;
  text-align: center;
  padding: clamp(48px, 10vw, 120px) var(--s-5);
  border-radius: var(--radius-lg);
}
</style>
