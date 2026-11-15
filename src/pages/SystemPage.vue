<script setup lang="ts">
/**
 * Living style guide for the DiAfanador design system.
 * English only, not linked from the nav; open /#/system.
 */
import PageHero from '@/components/ui/PageHero.vue'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import PillButton from '@/components/ui/PillButton.vue'
import LinkCard from '@/components/ui/LinkCard.vue'
import LanguageSwitch from '@/components/ui/LanguageSwitch.vue'

const colors = [
  { name: 'paper', hex: '#FBFAF7', use: 'Page background' },
  { name: 'panel', hex: '#F1EEE8', use: 'Raised sections, empty states' },
  { name: 'rule', hex: '#DEDAD2', use: 'Hairlines and borders' },
  { name: 'muted', hex: '#6B6862', use: 'Secondary text' },
  { name: 'ink', hex: '#141414', use: 'Text, dark surfaces' },
  { name: 'accent', hex: '#E8590C', use: 'Full stops, marks, solid buttons' },
  { name: 'accent-strong', hex: '#B8460A', use: 'Small accent text on paper' },
]

const type = [
  { token: 'fs-display', cls: 't-display', sample: 'Display' },
  { token: 'fs-h1', cls: 't-h1', sample: 'Heading 1' },
  { token: 'fs-h2', cls: 't-h2', sample: 'Heading 2' },
  { token: 'fs-h3', cls: 't-h3', sample: 'Heading 3' },
  { token: 'fs-lead', cls: 't-lead', sample: 'Lead paragraph for introductions.' },
  { token: 'fs-body', cls: '', sample: 'Body text, 16px Inter at 1.6 line height.' },
  { token: 'fs-label', cls: 't-label', sample: 'Mono label' },
]

const space = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128]
</script>

<template>
  <main>
    <PageHero
      label="System · v1"
      title="Design system"
      lead="Paper & ink: warm surfaces, near-black type, one orange accent. Tokens live in src/assets/styles/tokens.css; components in src/components/ui."
    />

    <section class="block container">
      <h2 class="block__title t-label">Colour</h2>
      <div class="swatches">
        <div v-for="c in colors" :key="c.name" class="swatch">
          <div class="swatch__chip" :style="{ background: c.hex }" />
          <p class="swatch__name">{{ c.name }}</p>
          <p class="t-label t-muted">{{ c.hex }}</p>
          <p class="swatch__use t-muted">{{ c.use }}</p>
        </div>
      </div>
    </section>

    <section class="block container">
      <h2 class="block__title t-label">Type</h2>
      <p class="t-muted families">
        Inter Tight (display) · Inter (body) · Geist Mono (labels) ·
        <span class="serif">Instrument Serif</span> (accent words)
      </p>
      <div v-for="row in type" :key="row.token" class="type-row">
        <p class="t-label t-muted">{{ row.token }}</p>
        <p :class="row.cls">
          {{ row.sample
          }}<span v-if="row.cls.startsWith('t-d') || row.cls.startsWith('t-h')" class="accent"
            >.</span
          >
        </p>
      </div>
    </section>

    <section class="block container">
      <h2 class="block__title t-label">Spacing · 4px base</h2>
      <div class="space">
        <div v-for="(px, i) in space" :key="px" class="space__row">
          <span class="t-label t-muted">s-{{ i + 1 }}</span>
          <span class="space__bar" :style="{ width: px + 'px' }" />
          <span class="t-label t-muted">{{ px }}</span>
        </div>
      </div>
      <p class="t-muted note">
        Breakpoints: 760px (tablet, 2 columns) · 1100px (desktop, wide grids). Gutter is fluid:
        clamp(20px, 6.5vw, 112px).
      </p>
    </section>

    <section class="block container">
      <h2 class="block__title t-label">Components</h2>
      <div class="demo">
        <p class="t-label t-muted">SectionLabel</p>
        <div class="demo__row">
          <SectionLabel>01 · About</SectionLabel>
          <SectionLabel tone="solid">00 · Portfolio</SectionLabel>
        </div>
      </div>
      <div class="demo">
        <p class="t-label t-muted">PillButton</p>
        <div class="demo__row">
          <PillButton to="/system" arrow>Outline</PillButton>
          <PillButton to="/system" variant="solid" arrow>Solid</PillButton>
          <PillButton href="https://example.com" arrow>External</PillButton>
        </div>
      </div>
      <div class="demo">
        <p class="t-label t-muted">LinkCard</p>
        <div class="demo__cards">
          <LinkCard eyebrow="Featured" title="Motlle" meta="Generative art" to="/system" />
          <LinkCard eyebrow="Career" title="Resume" meta="10 years · 10 roles" to="/system" />
        </div>
      </div>
      <div class="demo">
        <p class="t-label t-muted">LanguageSwitch</p>
        <div class="demo__row">
          <LanguageSwitch />
          <LanguageSwitch size="lg" />
        </div>
      </div>
    </section>

    <section class="section surface-ink">
      <div class="container">
        <SectionLabel>Surface · ink</SectionLabel>
        <p class="t-h2 ink-demo">
          Any section can flip to ink with <span class="serif accent">.surface-ink</span
          ><span class="accent">.</span>
        </p>
        <PillButton to="/system" arrow>Button on ink</PillButton>
      </div>
    </section>
  </main>
</template>

<style scoped>
.block {
  display: grid;
  gap: var(--s-5);
  padding-top: var(--s-6);
  border-top: 1px solid var(--text);
  margin-bottom: var(--section-space);
}
.block__title {
  color: var(--accent-strong);
}

.swatches {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--s-5);
}
.swatch__chip {
  aspect-ratio: 4 / 3;
  border-radius: var(--radius);
  border: 1px solid var(--rule);
  margin-bottom: var(--s-3);
}
.swatch__name {
  font-weight: 600;
}
.swatch__use {
  font-size: var(--fs-small);
  margin-top: var(--s-1);
}

.families {
  margin-bottom: var(--s-3);
}
.type-row {
  display: grid;
  gap: var(--s-2);
  padding-block: var(--s-4);
  border-bottom: 1px solid var(--rule);
  overflow-wrap: anywhere;
}

.space {
  display: grid;
  gap: var(--s-2);
}
.space__row {
  display: grid;
  grid-template-columns: 56px 1fr 40px;
  align-items: center;
  gap: var(--s-3);
}
.space__bar {
  height: 10px;
  max-width: 100%;
  background: var(--accent);
  border-radius: 2px;
}
.note {
  font-size: var(--fs-small);
}

.demo {
  display: grid;
  gap: var(--s-3);
  padding-block: var(--s-4);
  border-bottom: 1px solid var(--rule);
}
.demo__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--s-3);
}
.demo__cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 220px));
  gap: var(--s-3);
}

.ink-demo {
  margin-block: var(--s-5) var(--s-6);
  max-width: 20ch;
}

@media (min-width: 760px) {
  .type-row {
    grid-template-columns: 140px 1fr;
    align-items: baseline;
  }
}
</style>
