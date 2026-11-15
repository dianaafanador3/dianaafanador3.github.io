<script setup lang="ts">
import CircuitLines from '@/components/ui/CircuitLines.vue'
</script>

<template>
  <main class="resume-page">
    <header class="page-header">
      <CircuitLines position="top-left"  color="var(--trace-lime)" :size="44" />
      <CircuitLines position="top-right" color="var(--trace-lime)" :size="44" />
      <p class="page-designator mono">// U04 — RESUME</p>
      <h1 class="page-title">Resume</h1>
    </header>

    <div class="resume-content">
      <section class="resume-section">
        <p class="section-label mono">// EXPERIENCE</p>
        <div class="entry-list">
          <div class="entry">
            <p class="entry-period mono">2022 — Present</p>
            <h3 class="entry-title">Developer</h3>
            <p class="entry-org">DiAfanador — Barcelona</p>
          </div>
        </div>
      </section>

      <section class="resume-section">
        <p class="section-label mono">// EDUCATION</p>
        <div class="entry-list">
          <div class="entry">
            <p class="entry-period mono">Add your education</p>
            <h3 class="entry-title">Your Degree</h3>
            <p class="entry-org">Your Institution</p>
          </div>
        </div>
      </section>

      <div class="download-row">
        <a href="#" class="download-btn mono">
          <span>↓ Download PDF</span>
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
