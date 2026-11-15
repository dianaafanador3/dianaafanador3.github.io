<script setup lang="ts">
import { useI18n } from '@/i18n'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import PillButton from '@/components/ui/PillButton.vue'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer surface-ink">
    <div class="container">
      <div class="footer__cta">
        <SectionLabel>{{ t.footer.label }}</SectionLabel>
        <h2 class="footer__title t-h1">{{ t.footer.title }}<span class="accent">.</span></h2>
        <p class="footer__lead t-lead">{{ t.footer.lead }}</p>
        <div class="footer__links">
          <PillButton href="https://www.linkedin.com/in/diafanador/" variant="solid" arrow
            >LinkedIn</PillButton
          >
          <PillButton href="https://github.com/dianaafanador3" arrow>GitHub</PillButton>
        </div>
      </div>

      <div class="footer__base t-label">
        <span>© {{ year }} Diana Afanador</span>
        <span>Barcelona</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding-top: var(--section-space);
}
.footer__title {
  margin-top: var(--s-5);
  max-width: 14ch;
}
.footer__lead {
  margin-top: var(--s-4);
}
.footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-3);
  margin-top: var(--s-6);
}
.footer__base {
  display: flex;
  justify-content: space-between;
  gap: var(--s-4);
  margin-top: var(--section-space);
  padding-block: var(--s-5);
  border-top: 1px solid var(--rule-ink);
  color: var(--on-ink-muted);
}
</style>
