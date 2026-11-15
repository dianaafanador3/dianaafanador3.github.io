<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import type { NavItem } from '@/types'
import { useI18n } from '@/i18n'
import LanguageSwitch from '@/components/ui/LanguageSwitch.vue'

const route = useRoute()
const { t } = useI18n()

const navItems: NavItem[] = [
  { key: 'portfolio', to: '/' },
  { key: 'about', to: '/about' },
  { key: 'writing', to: '/writing' },
  { key: 'resume', to: '/resume' },
]

const open = ref(false)
const scrolled = ref(false)

function isActive(to: string) {
  return route.path === to
}

function onScroll() {
  scrolled.value = window.scrollY > 8
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}

watch(() => route.fullPath, () => (open.value = false))
watch(open, (v) => document.documentElement.classList.toggle('menu-open', v))

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
  document.documentElement.classList.remove('menu-open')
})
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled, 'nav--open': open }">
    <div class="nav__bar container">
      <RouterLink to="/" class="nav__brand" :aria-label="t.nav.home">
        DiAfanador<span class="accent">.</span>
      </RouterLink>

      <nav class="nav__links" :aria-label="t.nav.main">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav__link t-label"
          :class="{ 'nav__link--active': isActive(item.to) }"
          :aria-current="isActive(item.to) ? 'page' : undefined"
        >
          {{ t.nav[item.key] }}
        </RouterLink>
      </nav>

      <div class="nav__actions">
        <LanguageSwitch class="nav__lang" />
        <button
          type="button"
          class="nav__menu-btn t-label"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          @click="open = !open"
        >
          {{ open ? t.nav.close : t.nav.menu }}
          <span class="nav__burger" :class="{ 'nav__burger--x': open }" aria-hidden="true">
            <span /><span />
          </span>
        </button>
      </div>
    </div>

    <Transition name="menu">
      <div v-show="open" id="mobile-menu" class="menu surface-ink">
        <nav class="menu__links container" :aria-label="t.nav.main">
          <RouterLink
            v-for="(item, i) in navItems"
            :key="item.to"
            :to="item.to"
            class="menu__link"
            :class="{ 'menu__link--active': isActive(item.to) }"
            :aria-current="isActive(item.to) ? 'page' : undefined"
          >
            <span class="menu__num t-label">0{{ i }}</span>
            <span class="menu__text">{{ t.nav[item.key] }}</span>
          </RouterLink>
        </nav>
        <div class="menu__foot container">
          <LanguageSwitch size="lg" />
          <a class="menu__ext t-label" href="https://www.linkedin.com/in/diafanador/" target="_blank" rel="noopener">LinkedIn ↗</a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--paper) 86%, transparent);
  backdrop-filter: saturate(1.4) blur(12px);
  -webkit-backdrop-filter: saturate(1.4) blur(12px);
  border-bottom: 1px solid transparent;
  transition: border-color var(--dur) ease;
}
.nav--scrolled {
  border-bottom-color: var(--rule);
}
.nav__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-5);
  height: var(--nav-height);
}

.nav__brand {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: -0.04em;
}

.nav__links {
  display: none;
  gap: var(--s-6);
}
.nav__link {
  position: relative;
  color: var(--muted);
  padding-block: var(--s-2);
  transition: color var(--dur-fast) ease;
}
.nav__link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 2px;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--dur) var(--ease);
}
.nav__link:hover,
.nav__link--active {
  color: var(--text);
}
.nav__link:hover::after,
.nav__link--active::after {
  transform: scaleX(1);
}

.nav__actions {
  display: flex;
  align-items: center;
  gap: var(--s-3);
}
.nav__lang {
  display: none;
}

.nav__menu-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--s-3);
  height: 38px;
  padding: 0 var(--s-3) 0 var(--s-4);
  border: 1px solid var(--text);
  border-radius: var(--radius-pill);
}
.nav__burger {
  position: relative;
  width: 16px;
  height: 8px;
}
.nav__burger span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 1.5px;
  background: currentColor;
  transition:
    transform var(--dur) var(--ease),
    top var(--dur) var(--ease);
}
.nav__burger span:first-child {
  top: 0;
}
.nav__burger span:last-child {
  top: 6.5px;
}
.nav__burger--x span:first-child {
  top: 3.25px;
  transform: rotate(45deg);
}
.nav__burger--x span:last-child {
  top: 3.25px;
  transform: rotate(-45deg);
}

/* Full-screen mobile menu */
.menu {
  position: fixed;
  inset: var(--nav-height) 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-block: var(--s-6) var(--s-7);
  overflow-y: auto;
}
.nav--open {
  background: var(--paper);
}
.menu__links {
  display: flex;
  flex-direction: column;
}
.menu__link {
  display: flex;
  align-items: baseline;
  gap: var(--s-4);
  padding-block: var(--s-3);
  border-bottom: 1px solid var(--rule-ink);
}
.menu__num {
  color: var(--on-ink-muted);
  min-width: 2ch;
}
.menu__text {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.4rem, 11vw, 4rem);
  letter-spacing: var(--tracking-display);
  line-height: 1.05;
}
.menu__link--active .menu__text {
  color: var(--accent);
}
.menu__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-4);
  flex-wrap: wrap;
  margin-top: var(--s-7);
}
.menu__ext {
  color: var(--on-ink-muted);
}

.menu-enter-active,
.menu-leave-active {
  transition:
    opacity var(--dur) var(--ease),
    transform var(--dur) var(--ease);
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Tablet and up: inline nav, no menu button */
@media (min-width: 760px) {
  .nav__links,
  .nav__lang {
    display: flex;
  }
  .nav__menu-btn,
  .menu {
    display: none !important;
  }
}
@media (min-width: 760px) and (max-width: 899px) {
  .nav__links {
    gap: var(--s-4);
  }
}
</style>

<style>
html.menu-open {
  overflow: hidden;
}
</style>
