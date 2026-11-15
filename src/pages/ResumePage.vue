<script setup lang="ts">
import { computed } from 'vue'
import CircuitLines from '@/components/ui/CircuitLines.vue'
import { useI18n } from '@/i18n'
import { experience, education, honors, type Role } from '@/data/resume'

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
</script>

<template>
  <main class="resume-page">
    <header class="page-header">
      <CircuitLines position="top-left"  color="var(--trace-lime)" :size="44" />
      <CircuitLines position="top-right" color="var(--trace-lime)" :size="44" />
      <p class="page-designator mono">{{ t.resume.designator }}</p>
      <h1 class="page-title">{{ t.resume.title }}</h1>
    </header>

    <div class="resume-content">
      <section class="resume-section">
        <p class="section-label mono">{{ t.resume.experience }}</p>
        <div class="entry-list">
          <div v-for="job in experience" :key="job.company" class="entry">
            <p class="entry-company">
              {{ job.company }}<span v-if="job.location" class="entry-location"> · {{ job.location[locale] }}</span>
            </p>
            <div v-for="role in job.roles" :key="role.start" class="entry-role">
              <h3 class="entry-title">{{ role.title[locale] }}</h3>
              <p class="entry-period mono">{{ period(role) }}</p>
            </div>
            <ul v-if="job.highlights" class="entry-highlights">
              <li v-for="(h, i) in job.highlights" :key="i">{{ h[locale] }}</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="resume-section">
        <p class="section-label mono">{{ t.resume.education }}</p>
        <div class="entry-list">
          <div v-for="study in education" :key="study.period" class="entry">
            <p class="entry-period mono">
              {{ study.period }}<template v-if="study.ongoing"> — {{ t.resume.present }}</template>
            </p>
            <h3 class="entry-title">{{ study.degree[locale] }}</h3>
            <p class="entry-org">{{ study.school }}</p>
          </div>
        </div>
      </section>

      <section class="resume-section">
        <p class="section-label mono">{{ t.resume.honors }}</p>
        <div class="entry-list">
          <div v-for="h in honors" :key="h.org + h.year" class="entry">
            <p class="entry-period mono">{{ h.year }}</p>
            <h3 class="entry-title">{{ h.name[locale] }}</h3>
            <p class="entry-org">{{ h.org }}</p>
          </div>
        </div>
      </section>

      <div class="download-row">
        <a
          href="https://www.linkedin.com/in/diafanador/"
          class="download-btn mono"
          target="_blank"
          rel="noopener"
        >
          <span>{{ t.resume.fullProfile }}</span>
        </a>
      </div>
    </div>
  </main>
</template>

<style scoped>
.resume-page {
  max-width: 740px;
  margin: 0 auto;
  padding: clamp(40px, 7vw, 72px) clamp(20px, 5vw, 60px);
  animation: page-in 0.4s ease-out both;
}
@keyframes page-in {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.page-header {
  position: relative;
  padding: clamp(20px, 3.5vw, 32px) clamp(18px, 3vw, 28px);
  border: 1px solid var(--border);
  border-left: 3px solid var(--trace-lime);
  border-radius: var(--radius);
  background: var(--bg-secondary);
  margin-bottom: clamp(32px, 5vw, 48px);
}
.page-designator {
  font-size: 0.68rem;
  letter-spacing: 0.15em;
  color: var(--trace-lime);
  margin-bottom: 10px;
  opacity: 0.8;
}
.page-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  color: var(--text-primary);
  letter-spacing: 0.04em;
}

.resume-content {
  display: flex;
  flex-direction: column;
  gap: clamp(28px, 5vw, 40px);
}
.resume-section {
  border: 1px solid var(--border);
  border-left: 3px solid var(--trace-lime);
  border-radius: var(--radius);
  background: var(--bg-card);
  padding: clamp(20px, 3vw, 28px);
}
.section-label {
  font-size: 0.68rem;
  letter-spacing: 0.15em;
  color: var(--trace-lime);
  margin-bottom: 16px;
  opacity: 0.8;
}

.entry-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.entry-period {
  font-size: 0.72rem;
  color: var(--trace-lime);
  letter-spacing: 0.1em;
  margin-bottom: 4px;
  opacity: 0.7;
}
.entry-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2px;
}
.entry-org {
  font-size: 0.85rem;
  color: var(--text-secondary);
}
.entry + .entry {
  padding-top: 20px;
  border-top: 1px solid var(--border);
}
.entry-company {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}
.entry-location {
  font-weight: 400;
  font-size: 0.85rem;
  color: var(--text-secondary);
}
.entry-role {
  margin-bottom: 6px;
}
.entry-role .entry-title {
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--text-secondary);
}
.entry-highlights {
  margin-top: 10px;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.entry-highlights li {
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--text-secondary);
}
.entry-highlights li::marker {
  color: var(--trace-lime);
}

.download-row {
  display: flex;
}
.download-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 1px solid var(--trace-lime);
  border-radius: var(--radius);
  background: transparent;
  color: var(--trace-lime);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: var(--transition);
}
.download-btn:hover {
  background: var(--trace-lime);
  color: #050a0f;
  box-shadow: var(--glow-lime);
}
</style>
