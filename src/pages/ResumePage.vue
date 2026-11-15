<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/i18n'
import { experience, education, honors, type Role } from '@/data/resume'
import PageHero from '@/components/ui/PageHero.vue'
import PillButton from '@/components/ui/PillButton.vue'

const { t, locale } = useI18n()

const monthFmt = computed(
  () => new Intl.DateTimeFormat(locale.value, { month: 'short', year: 'numeric' }),
)

function fmt(ym: string) {
  const [y, m] = ym.split('-').map(Number)
  return monthFmt.value.format(new Date(y, m - 1, 1))
}

function period(r: Role) {
  return `${fmt(r.start)} — ${r.end ? fmt(r.end) : t.value.resume.present}`
}

/** Year span for the left column, e.g. "2021 — 2024" or "2026 —". */
function span(roles: Role[]) {
  const start = roles[roles.length - 1].start.slice(0, 4)
  const endRole = roles[0].end
  const end = endRole ? endRole.slice(0, 4) : ''
  return start === end ? start : `${start} — ${end}`
}
</script>

<template>
  <main>
    <PageHero :label="t.resume.designator" :title="t.resume.title" :lead="t.resume.lead">
      <div class="hero-cta">
        <PillButton href="https://www.linkedin.com/in/diafanador/" arrow>{{ t.resume.fullProfile }}</PillButton>
      </div>
    </PageHero>

    <!-- Experience -->
    <section class="block container">
      <h2 class="block__label t-label">{{ t.resume.experience }}</h2>
      <ol class="block__list" role="list">
        <li v-for="job in experience" :key="job.company" class="row">
          <p class="row__when t-label">{{ span(job.roles) }}</p>
          <div class="row__body">
            <h3 class="row__title t-h3">
              {{ job.company }}
              <span v-if="job.location" class="row__place">{{ job.location[locale] }}</span>
            </h3>
            <ul class="roles" role="list">
              <li v-for="role in job.roles" :key="role.start" class="role">
                <span class="role__title">{{ role.title[locale] }}</span>
                <span class="role__period t-label">{{ period(role) }}</span>
              </li>
            </ul>
            <ul v-if="job.highlights" class="highlights">
              <li v-for="(h, i) in job.highlights" :key="i">{{ h[locale] }}</li>
            </ul>
          </div>
        </li>
      </ol>
    </section>

    <!-- Education -->
    <section class="block container">
      <h2 class="block__label t-label">{{ t.resume.education }}</h2>
      <ol class="block__list" role="list">
        <li v-for="study in education" :key="study.degree.en" class="row">
          <p class="row__when t-label">
            {{ study.period }}<template v-if="study.ongoing"> — {{ t.resume.present }}</template>
          </p>
          <div class="row__body">
            <h3 class="row__title t-h3">{{ study.degree[locale] }}</h3>
            <p class="row__sub">{{ study.school }}</p>
          </div>
        </li>
      </ol>
    </section>

    <!-- Honours -->
    <section class="block container block--last">
      <h2 class="block__label t-label">{{ t.resume.honors }}</h2>
      <ol class="block__list" role="list">
        <li v-for="h in honors" :key="h.org + h.year" class="row">
          <p class="row__when t-label">{{ h.year }}</p>
          <div class="row__body">
            <h3 class="row__title t-h3">{{ h.name[locale] }}</h3>
            <p class="row__sub">{{ h.org }}</p>
          </div>
        </li>
      </ol>
    </section>
  </main>
</template>

<style scoped>
.hero-cta {
  margin-top: var(--s-6);
}

.block {
  display: grid;
  gap: var(--s-4);
  padding-top: var(--s-6);
  border-top: 1px solid var(--text);
  margin-bottom: var(--section-space);
}
.block--last {
  margin-bottom: var(--section-space);
}
.block__label {
  color: var(--accent-strong);
  font-weight: 500;
}

.row {
  display: grid;
  gap: var(--s-2);
  padding-block: var(--s-5);
  border-bottom: 1px solid var(--rule);
}
.row:first-child {
  padding-top: var(--s-2);
}
.row__when {
  color: var(--muted);
}
.row__title {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  column-gap: var(--s-3);
}
.row__place {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: var(--fs-small);
  letter-spacing: 0;
  color: var(--muted);
}
.row__sub {
  margin-top: var(--s-1);
  color: var(--muted);
}

.roles {
  margin-top: var(--s-2);
  display: grid;
  gap: var(--s-2);
}
.role {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  column-gap: var(--s-4);
  row-gap: 2px;
}
.role__title {
  font-weight: 500;
}
.role__period {
  color: var(--muted);
}

.highlights {
  margin-top: var(--s-4);
  padding-left: 1.1em;
  display: grid;
  gap: var(--s-2);
  max-width: var(--measure);
  color: var(--muted);
  font-size: 0.95rem;
}
.highlights li::marker {
  color: var(--accent);
}

/* Tablet+: label column on the left, timeline on the right */
@media (min-width: 760px) {
  .block {
    grid-template-columns: 1fr 3fr;
    gap: var(--s-6);
  }
  .row {
    grid-template-columns: 140px 1fr;
    gap: var(--s-6);
  }
  .row__when {
    padding-top: 0.35em;
  }
}
@media (min-width: 1100px) {
  .block__label {
    position: sticky;
    top: calc(var(--nav-height) + var(--s-5));
    align-self: start;
  }
}
</style>
