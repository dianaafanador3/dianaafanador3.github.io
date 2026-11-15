<script setup lang="ts">
import ProjectCarousel from '@/components/portfolio/ProjectCarousel.vue'
import CircuitLines from '@/components/ui/CircuitLines.vue'
import { projects } from '@/data/projects'
import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>

<template>
  <main class="home-page">
    <header class="home-header">
      <!-- Corner circuit decorations -->
      <CircuitLines position="top-left"     color="var(--trace-yellow)" :size="48" />
      <CircuitLines position="top-right"    color="var(--trace-yellow)" :size="48" />
      <CircuitLines position="bottom-left"  color="var(--trace-yellow)" :size="48" />
      <CircuitLines position="bottom-right" color="var(--trace-yellow)" :size="48" />

      <p class="header-designator mono">{{ t.home.designator }}</p>
      <h1 class="main-title">DiAfanador</h1>
      <p class="subtitle">{{ t.home.subtitle }}</p>
    </header>

    <ProjectCarousel :projects="projects" />
  </main>
</template>

<style scoped>
.home-page {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: clamp(40px, 7vw, 72px) clamp(20px, 5vw, 60px);
  animation: page-in 0.4s ease-out both;
}

@keyframes page-in {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Hero header */
.home-header {
  position: relative;
  text-align: center;
  margin-bottom: clamp(40px, 7vw, 64px);
  padding: clamp(24px, 4vw, 40px);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-secondary);
}

.header-designator {
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: var(--trace-yellow);
  margin-bottom: 16px;
  opacity: 0.8;
}

.main-title {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: clamp(2.4rem, 7vw, 5rem);
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--text-primary);
  text-shadow:
    0 0 40px rgba(255, 214, 0, 0.12),
    0 0 80px rgba(255, 214, 0, 0.06);
  margin-bottom: 12px;
}

.subtitle {
  font-size: clamp(0.85rem, 1.8vw, 1rem);
  color: var(--text-secondary);
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
</style>
