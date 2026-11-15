<script setup lang="ts">
import { computed } from 'vue'
import CircuitLines from '@/components/ui/CircuitLines.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()

const blocks = computed(() => [
  { label: t.value.about.mobileLabel, items: t.value.about.mobile },
  { label: t.value.about.beyondLabel, items: t.value.about.beyond },
  { label: t.value.about.languagesLabel, items: t.value.about.languages },
])
</script>

<template>
  <main class="about-page">
    <header class="page-header">
      <CircuitLines position="top-left"  color="var(--trace-cyan)" :size="44" />
      <CircuitLines position="top-right" color="var(--trace-cyan)" :size="44" />
      <p class="page-designator mono">{{ t.about.designator }}</p>
      <h1 class="page-title">{{ t.about.title }}</h1>
    </header>

    <article class="about-content">
      <p class="bio-text">{{ t.about.bio1 }}</p>
      <p class="bio-text">{{ t.about.bio2 }}</p>

      <div class="skills-grid">
        <div v-for="block in blocks" :key="block.label" class="skill-block">
          <p class="skill-label mono">{{ block.label }}</p>
          <ul class="skill-list">
            <li v-for="item in block.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>

      <a
        class="linkedin-link mono"
        href="https://www.linkedin.com/in/diafanador/"
        target="_blank"
        rel="noopener"
      >LinkedIn ↗</a>
    </article>
  </main>
</template>

<style scoped>
.about-page {
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
  border-left: 3px solid var(--trace-cyan);
  border-radius: var(--radius);
  background: var(--bg-secondary);
  margin-bottom: clamp(32px, 5vw, 48px);
}
.page-designator {
  font-size: 0.68rem;
  letter-spacing: 0.15em;
  color: var(--trace-cyan);
  margin-bottom: 10px;
  opacity: 0.8;
}
.page-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  color: var(--text-primary);
  letter-spacing: 0.04em;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: clamp(20px, 3.5vw, 28px);
}
.bio-text {
  font-size: clamp(0.95rem, 1.8vw, 1.05rem);
  color: var(--text-secondary);
  line-height: 1.8;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 16px;
  margin-top: 8px;
}
.skill-block {
  padding: clamp(16px, 2.5vw, 24px);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-card);
}
.skill-label {
  font-size: 0.68rem;
  letter-spacing: 0.15em;
  color: var(--trace-cyan);
  margin-bottom: 12px;
  opacity: 0.8;
}
.skill-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.skill-list li {
  font-size: 0.9rem;
  color: var(--text-secondary);
  padding-left: 12px;
  position: relative;
}
.skill-list li::before {
  content: '─';
  position: absolute;
  left: 0;
  color: var(--trace-cyan);
  opacity: 0.5;
  font-size: 0.75rem;
}

@media (max-width: 480px) {
  .skills-grid { grid-template-columns: 1fr; }
}

.linkedin-link {
  display: inline-block;
  margin-top: 28px;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  color: var(--trace-cyan);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}
.linkedin-link:hover {
  border-bottom-color: var(--trace-cyan);
}
</style>
