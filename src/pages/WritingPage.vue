<script setup lang="ts">
import CircuitLines from '@/components/ui/CircuitLines.vue'
</script>

<template>
  <main class="writing-page">
    <header class="page-header">
      <CircuitLines position="top-left"  color="var(--trace-magenta)" :size="44" />
      <CircuitLines position="top-right" color="var(--trace-magenta)" :size="44" />
      <p class="page-designator mono">// U03 — WRITING</p>
      <h1 class="page-title">Writing</h1>
    </header>

    <div class="empty-state">
      <div class="empty-board">
        <p class="empty-label mono">// NO SIGNAL</p>
        <p class="empty-text">Posts coming soon.</p>
        <div class="empty-trace" aria-hidden="true" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.writing-page {
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
  border-left: 3px solid var(--trace-magenta);
  border-radius: var(--radius);
  background: var(--bg-secondary);
  margin-bottom: clamp(32px, 5vw, 48px);
}
.page-designator {
  font-size: 0.68rem;
  letter-spacing: 0.15em;
  color: var(--trace-magenta);
  margin-bottom: 10px;
  opacity: 0.8;
}
.page-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  color: var(--text-primary);
  letter-spacing: 0.04em;
}

.empty-state {
  display: flex;
  justify-content: center;
}
.empty-board {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: clamp(32px, 6vw, 56px);
  border: 1px dashed rgba(224, 0, 208, 0.25);
  border-radius: var(--radius);
  background: var(--bg-card);
  width: 100%;
}
.empty-label {
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  color: var(--trace-magenta);
  opacity: 0.6;
}
.empty-text {
  font-size: 0.9rem;
  color: var(--text-dim);
}
.empty-trace {
  width: 40px;
  height: 1px;
  background: var(--trace-magenta);
  opacity: 0.3;
  margin-top: 8px;
}
</style>
