<script setup lang="ts">
import { projects } from '@/data/projects'
import { useI18n } from '@/i18n'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import LinkCard from '@/components/ui/LinkCard.vue'
import PillButton from '@/components/ui/PillButton.vue'
import ProjectCard from '@/components/portfolio/ProjectCard.vue'

const { t } = useI18n()
const featured = projects[0]
</script>

<template>
  <main>
    <!-- Hero -->
    <section class="hero container">
      <SectionLabel tone="solid">{{ t.home.label }}</SectionLabel>

      <div class="hero__grid">
        <div class="hero__text">
          <h1 class="hero__title t-display">
            {{ t.home.line1 }}<br />
            {{ t.home.line2 }} <span class="serif accent">{{ t.home.accent }}</span><span class="accent">.</span>
          </h1>
          <p class="hero__lead t-lead">{{ t.home.lead }}</p>
        </div>

        <div class="hero__cards">
          <LinkCard
            :eyebrow="t.home.featuredEyebrow"
            :title="featured.title"
            :meta="t.home.featuredMeta"
            :href="featured.href"
          />
          <LinkCard
            :eyebrow="t.home.careerEyebrow"
            :title="t.home.careerTitle"
            :meta="t.home.careerMeta"
            to="/resume"
          />
        </div>
      </div>
    </section>

    <!-- Work -->
    <section class="section container rule-top">
      <div class="section-head">
        <SectionLabel>{{ t.home.workLabel }}</SectionLabel>
        <h2 class="t-h2">{{ t.home.workTitle }}<span class="accent">.</span></h2>
      </div>
      <div class="work-grid">
        <ProjectCard
          v-for="p in projects"
          :key="p.id"
          :project="p"
          :class="{ 'project--wide': projects.length === 1 }"
        />
      </div>
    </section>

    <!-- About teaser -->
    <section class="section surface-panel">
      <div class="container about">
        <SectionLabel>{{ t.home.aboutLabel }}</SectionLabel>
        <p class="about__statement t-h2">{{ t.home.aboutStatement }}</p>
        <PillButton to="/about" arrow>{{ t.home.aboutCta }}</PillButton>
      </div>
    </section>
  </main>
</template>

<style scoped>
.hero {
  padding-top: clamp(40px, 9vw, 120px);
  padding-bottom: clamp(56px, 8vw, 112px);
}
.hero__grid {
  display: grid;
  gap: var(--s-7);
  margin-top: var(--s-5);
}
.hero__title {
  max-width: 13ch;
}
.hero__lead {
  margin-top: var(--s-5);
  max-width: 46ch;
}
.hero__cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--s-3);
  align-self: end;
}

.section-head {
  display: grid;
  gap: var(--s-4);
  justify-items: start;
  margin-bottom: clamp(32px, 5vw, 64px);
}
.work-grid {
  display: grid;
  gap: var(--s-8);
}

.about {
  display: grid;
  gap: var(--s-6);
  justify-items: start;
}
.about__statement {
  max-width: 22ch;
  font-weight: 600;
}

@media (min-width: 760px) {
  .work-grid {
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 420px), 1fr));
  }
  .work-grid > .project--wide {
    grid-column: 1 / -1;
  }
}

@media (min-width: 1100px) {
  .hero__grid {
    grid-template-columns: 1fr 380px;
    align-items: end;
  }
  .hero__title {
    max-width: none;
  }
}

@media (max-width: 400px) {
  .hero__cards {
    grid-template-columns: 1fr;
  }
}
</style>
