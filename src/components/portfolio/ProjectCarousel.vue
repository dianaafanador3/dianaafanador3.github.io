<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import type { Project } from '@/types'
import { useCarousel } from '@/composables/useCarousel'
import ProjectCard from './ProjectCard.vue'
import IconChevron from '@/components/ui/IconChevron.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()

const props = defineProps<{
  projects: Project[]
}>()

const { currentIndex, next, prev, goTo, onTouchStart, onTouchEnd, onKeydown } =
  useCarousel(props.projects.length)

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="carousel-wrap">
    <!-- Prev button -->
    <button
      v-if="projects.length > 1"
      class="carousel-btn carousel-btn--prev"
      :aria-label="t.carousel.prev"
      @click="prev"
    >
      <IconChevron direction="left" />
    </button>

    <!-- Carousel track -->
    <div
      class="carousel"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
    >
      <Transition name="slide" mode="out-in">
        <div :key="currentIndex" class="carousel-item">
          <ProjectCard :project="projects[currentIndex]" />
        </div>
      </Transition>
    </div>

    <!-- Next button -->
    <button
      v-if="projects.length > 1"
      class="carousel-btn carousel-btn--next"
      :aria-label="t.carousel.next"
      @click="next"
    >
      <IconChevron direction="right" />
    </button>

    <!-- Via-hole dots -->
    <div v-if="projects.length > 1" class="carousel-vias" role="tablist" :aria-label="t.carousel.projects">
      <button
        v-for="(project, i) in projects"
        :key="project.id"
        class="via"
        :class="{ 'via--active': i === currentIndex }"
        :style="i === currentIndex ? { '--via-color': project.color } : {}"
        :aria-label="t.carousel.view.replace('{title}', project.title)"
        :aria-selected="i === currentIndex"
        role="tab"
        @click="goTo(i)"
      />
    </div>
  </div>
</template>

<style scoped>
.carousel-wrap {
  position: relative;
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
}

/* Track */
.carousel {
  width: 100%;
  border-radius: var(--radius);
  overflow: hidden;
}
.carousel-item { width: 100%; }

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-enter-from {
  opacity: 0;
  transform: scale(0.97);
}
.slide-leave-to {
  opacity: 0;
  transform: scale(0.97);
}

/* Nav buttons — PCB test-point style */
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-secondary);
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
  opacity: 0;
  pointer-events: none;
}
.carousel-wrap:hover .carousel-btn {
  opacity: 1;
  pointer-events: all;
}
.carousel-btn:hover {
  background: var(--trace-orange);
  border-color: var(--trace-orange);
  color: #050a0f;
  box-shadow: var(--glow-orange);
  transform: translateY(-50%) scale(1.08);
}

.carousel-btn--prev { left: -54px; }
.carousel-btn--next { right: -54px; }

/* Via-hole dots */
.carousel-vias {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  margin-top: clamp(24px, 4vw, 36px);
}

.via {
  width: var(--via-size);
  height: var(--via-size);
  border-radius: 50%;
  background: transparent;
  border: 1.5px solid rgba(255, 128, 0, 0.35);
  cursor: pointer;
  padding: 0;
  transition: all 0.25s ease;
  position: relative;
}

/* Inner ring — like a real PCB via */
.via::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 50%;
  background: transparent;
  transition: background 0.25s ease;
}

.via--active {
  border-color: var(--via-color, var(--trace-orange));
  width: 28px;
  border-radius: 3px;
  box-shadow: 0 0 8px var(--via-color, var(--trace-orange));
}
.via--active::after {
  background: var(--via-color, var(--trace-orange));
  border-radius: 2px;
  inset: 3px;
}

.via:hover:not(.via--active) {
  border-color: rgba(255, 128, 0, 0.7);
}

/* Responsive: show buttons always on mobile */
@media (max-width: 1080px) {
  .carousel-btn--prev { left: 8px; }
  .carousel-btn--next { right: 8px; }
  .carousel-btn {
    opacity: 0.85;
    pointer-events: all;
  }
}
@media (max-width: 600px) {
  .carousel-btn {
    width: 36px;
    height: 36px;
  }
}
@media (hover: none) and (pointer: coarse) {
  .carousel-btn {
    min-width: 44px;
    min-height: 44px;
    opacity: 0.9;
    pointer-events: all;
  }
  .via {
    min-width: 32px;
    min-height: 32px;
  }
}
</style>
