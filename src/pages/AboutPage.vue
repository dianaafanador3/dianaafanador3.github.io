<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/i18n'
import PageHero from '@/components/ui/PageHero.vue'
import PillButton from '@/components/ui/PillButton.vue'

const { t } = useI18n()

const blocks = computed(() => [
  { label: t.value.about.mobileLabel, items: t.value.about.mobile },
  { label: t.value.about.beyondLabel, items: t.value.about.beyond },
  { label: t.value.about.languagesLabel, items: t.value.about.languages },
])
</script>

<template>
  <main>
    <PageHero :label="t.about.designator" :title="t.about.title" :lead="t.about.bio1" />

    <section class="section container rule-top">
      <div class="split">
        <p class="split__aside t-label t-muted">Barcelona</p>
        <p class="split__body">{{ t.about.bio2 }}</p>
      </div>
    </section>

    <section class="section container rule-top">
      <div class="skills">
        <div v-for="block in blocks" :key="block.label" class="skills__col">
          <p class="skills__label t-label">{{ block.label }}</p>
          <ul class="skills__list" role="list">
            <li v-for="item in block.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
      <div class="cta">
        <PillButton href="https://www.linkedin.com/in/diafanador/" arrow>LinkedIn</PillButton>
      </div>
    </section>
  </main>
</template>

<style scoped>
.split {
  display: grid;
  gap: var(--s-4);
}
.split__body {
  font-size: var(--fs-lead);
  line-height: 1.5;
  max-width: var(--measure);
}

.skills {
  display: grid;
  gap: var(--s-7);
}
.skills__label {
  color: var(--accent-strong);
  padding-bottom: var(--s-3);
  border-bottom: 1px solid var(--text);
}
.skills__list li {
  padding-block: var(--s-3);
  border-bottom: 1px solid var(--rule);
  font-size: 1.05rem;
}
.cta {
  margin-top: var(--s-7);
}

@media (min-width: 760px) {
  .split {
    grid-template-columns: 1fr 3fr;
  }
  .skills {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--s-6);
  }
}
</style>
