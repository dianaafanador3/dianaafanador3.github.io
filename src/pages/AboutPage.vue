<script setup lang="ts">
import CircuitLines from '@/components/ui/CircuitLines.vue'
</script>

<template>
  <main class="about-page">
    <header class="page-header">
      <CircuitLines position="top-left"  color="var(--trace-cyan)" :size="44" />
      <CircuitLines position="top-right" color="var(--trace-cyan)" :size="44" />
      <p class="page-designator mono">// U02 — ABOUT</p>
      <h1 class="page-title">About</h1>
    </header>

    <article class="about-content">
      <p class="bio-text">
        Diana Afanador is a designer and developer exploring the intersection
        of code and visual form. Based in Barcelona, she builds interactive
        experiences where generative systems meet intentional design.
      </p>
      <p class="bio-text">
        Her work lives at the boundary between the technical and the poetic —
        from kaleidoscopic p5.js sketches to typographic systems and
        experimental interfaces.
      </p>

      <div class="skills-grid">
        <div class="skill-block">
          <p class="skill-label mono">// DESIGN</p>
          <ul class="skill-list">
            <li>Visual Design</li>
            <li>Typography</li>
            <li>Motion</li>
            <li>Interaction</li>
          </ul>
        </div>
        <div class="skill-block">
          <p class="skill-label mono">// CODE</p>
          <ul class="skill-list">
            <li>JavaScript / TS</li>
            <li>Vue · React</li>
            <li>p5.js / Canvas</li>
            <li>CSS Systems</li>
          </ul>
        </div>
      </div>
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
  grid-template-columns: 1fr 1fr;
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
</style>
