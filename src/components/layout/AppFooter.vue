<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <div class="footer-trace" aria-hidden="true" />
    <p class="footer-text">
      <span class="mono">©{{ year }}</span>
      <span class="footer-sep">//</span>
      <span>DiAfanador</span>
    </p>
  </footer>
</template>

<style scoped>
.app-footer {
  padding: clamp(20px, 3vw, 32px) clamp(20px, 5vw, 60px);
  border-top: 1px solid var(--border);
  background: var(--bg-nav);
  border-left: 3px solid var(--trace-orange);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

/* Decorative trace line above text */
.footer-trace {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--trace-orange), transparent);
  opacity: 0.5;
}

.footer-text {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.75rem;
  color: var(--text-dim);
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 0.06em;
}

.footer-sep {
  color: var(--trace-orange);
  opacity: 0.5;
}

.mono {
  color: var(--trace-orange);
  opacity: 0.7;
}
</style>
