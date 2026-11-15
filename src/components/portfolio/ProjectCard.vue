<script setup lang="ts">
import CircuitLines from '@/components/ui/CircuitLines.vue'
import type { Project } from '@/types'

defineProps<{
  project: Project
}>()
</script>

<template>
  <a :href="project.href" class="project-card" :style="{ '--card-color': project.color }">
    <!-- Corner circuit decorations -->
    <CircuitLines position="top-left"     :color="project.color" :size="36" />
    <CircuitLines position="top-right"    :color="project.color" :size="36" />
    <CircuitLines position="bottom-left"  :color="project.color" :size="36" />
    <CircuitLines position="bottom-right" :color="project.color" :size="36" />

    <!-- Thumbnail -->
    <div class="card-image-wrapper">
      <img
        v-if="project.thumbnail"
        :src="project.thumbnail"
        :alt="project.title"
        class="card-image"
        loading="lazy"
      />
      <div v-else class="card-image-placeholder">
        <span class="placeholder-label mono">{{ project.number }}</span>
      </div>

      <!-- Tech badge -->
      <div class="card-badge">
        <span
          v-for="t in project.tech"
          :key="t"
          class="badge-item mono"
        >{{ t }}</span>
      </div>
    </div>

    <!-- Info bar -->
    <div class="card-info">
      <h2 class="card-title">{{ project.title }}</h2>
      <span class="card-number mono">{{ project.number }}</span>
    </div>
  </a>
</template>

<style scoped>
.project-card {
  display: block;
  position: relative;
  text-decoration: none;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition:
    box-shadow 0.25s ease,
    border-color 0.25s ease,
    transform 0.25s ease;
}

.project-card:hover {
  border-color: var(--card-color, var(--trace-orange));
  box-shadow:
    0 0 0 1px var(--card-color, var(--trace-orange)),
    0 0 40px color-mix(in srgb, var(--card-color, var(--trace-orange)) 20%, transparent);
  transform: translateY(-3px);
}

/* Show circuit lines brighter on hover */
.project-card:hover :deep(.circuit-lines) {
  opacity: 1;
}

/* Image */
.card-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--bg-secondary);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease, filter 0.3s ease;
  filter: brightness(0.85) saturate(0.9);
}
.project-card:hover .card-image {
  transform: scale(1.04);
  filter: brightness(1) saturate(1.1);
}

/* Placeholder for projects without a thumbnail */
.card-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    repeating-linear-gradient(
      45deg,
      rgba(255, 128, 0, 0.03) 0px,
      rgba(255, 128, 0, 0.03) 1px,
      transparent 1px,
      transparent 12px
    );
}
.placeholder-label {
  font-size: 3rem;
  opacity: 0.2;
}

/* Tech badge */
.card-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 6px;
}
.badge-item {
  font-size: 0.65rem;
  padding: 3px 7px;
  background: rgba(5, 10, 15, 0.85);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  letter-spacing: 0.08em;
  backdrop-filter: blur(4px);
}

/* Info row */
.card-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: clamp(16px, 3vw, 24px) clamp(18px, 3vw, 28px);
  background: var(--bg-card);
  border-top: 1px solid var(--border);
}

.card-title {
  font-size: clamp(1.2rem, 2.5vw, 1.6rem);
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.card-number {
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: var(--card-color, var(--trace-orange));
  font-weight: 700;
  letter-spacing: 0.1em;
  text-shadow: 0 0 10px color-mix(in srgb, var(--card-color, var(--trace-orange)) 60%, transparent);
}

/* No hover transform on touch */
@media (hover: none) and (pointer: coarse) {
  .project-card:hover {
    transform: none;
  }
}
</style>
