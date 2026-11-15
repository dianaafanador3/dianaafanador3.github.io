<script setup lang="ts">
import type { Project } from '@/types'
import { useI18n } from '@/i18n'

defineProps<{ project: Project }>()
const { locale } = useI18n()
</script>

<template>
  <a :href="project.href" class="project">
    <div class="project__media">
      <img
        v-if="project.thumbnail"
        :src="project.thumbnail"
        :alt="project.title"
        class="project__img"
        loading="lazy"
      />
      <span v-if="project.tags?.length" class="project__tag t-label">{{ project.tags.map((tag) => tag[locale]).join(' · ') }}</span>
    </div>
    <div class="project__body">
      <p class="project__meta t-label">
        <span>{{ project.number }}</span><span>{{ project.year }}</span>
      </p>
      <h3 class="project__title t-h2">
        {{ project.title }}<span class="project__arrow" aria-hidden="true">→</span>
      </h3>
      <p class="project__desc">{{ project.description[locale] }}</p>
    </div>
  </a>
</template>

<style scoped>
.project {
  display: grid;
  gap: var(--s-5);
}
.project__media {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--ink);
  aspect-ratio: 16 / 10;
}
.project__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--dur-slow) var(--ease);
}
.project:hover .project__img {
  transform: scale(1.03);
}
.project__tag {
  position: absolute;
  top: var(--s-3);
  left: var(--s-3);
  padding: 5px 10px;
  border-radius: var(--radius);
  background: var(--paper);
  color: var(--ink);
}
.project__meta {
  display: flex;
  justify-content: space-between;
  padding-bottom: var(--s-3);
  border-bottom: 1px solid var(--rule);
  color: var(--muted);
}
.project__title {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--s-4);
  margin-top: var(--s-4);
}
.project__arrow {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 0.6em;
  transition: transform var(--dur) var(--ease);
}
.project:hover .project__arrow {
  transform: translateX(6px);
  color: var(--accent);
}
.project__desc {
  margin-top: var(--s-3);
  max-width: 52ch;
  color: var(--muted);
}

@media (min-width: 1100px) {
  .project--wide {
    grid-template-columns: 1.6fr 1fr;
    align-items: end;
    gap: var(--s-7);
  }
}
</style>
