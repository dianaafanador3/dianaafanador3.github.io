<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import type { NavItem } from '@/types'
import { useI18n, locales, localeNames } from '@/i18n'

const route = useRoute()
const { t, locale, setLocale } = useI18n()

const navItems: NavItem[] = [
  { key: 'portfolio', to: '/',        color: 'var(--trace-yellow)' },
  { key: 'about',     to: '/about',   color: 'var(--trace-cyan)' },
  { key: 'writing',   to: '/writing', color: 'var(--trace-magenta)' },
  { key: 'resume',    to: '/resume',  color: 'var(--trace-lime)' },
]

function isActive(to: string) {
  return route.path === to
}
</script>

<template>
  <nav class="app-nav" :aria-label="t.nav.main">
    <!-- Logo / brand -->
    <RouterLink to="/" class="nav-logo" :aria-label="t.nav.home">
      <span class="nav-logo__chip">◈</span>
      <span class="nav-logo__text">DiAfanador</span>
    </RouterLink>

    <!-- Nav links -->
    <ul class="nav-links" role="list">
      <li v-for="item in navItems" :key="item.to">
        <RouterLink
          :to="item.to"
          class="nav-link"
          :class="{ 'nav-link--active': isActive(item.to) }"
          :style="isActive(item.to) ? { '--link-color': item.color } : {}"
          :aria-current="isActive(item.to) ? 'page' : undefined"
        >
          {{ t.nav[item.key] }}
        </RouterLink>
      </li>
    </ul>

    <!-- Language selector -->
    <div class="lang-switch" role="group" :aria-label="t.nav.language">
      <button
        v-for="l in locales"
        :key="l"
        type="button"
        class="lang-btn mono"
        :class="{ 'lang-btn--active': l === locale }"
        :aria-pressed="l === locale"
        :lang="l"
        :title="localeNames[l]"
        @click="setLocale(l)"
      >
        {{ l.toUpperCase() }}
      </button>
    </div>
  </nav>
</template>

<style scoped>
.app-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: clamp(14px, 2.5vw, 22px) clamp(20px, 5vw, 60px);
  background: var(--bg-nav);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
  /* Subtle left trace decoration */
  border-left: 3px solid var(--trace-orange);
}

/* Logo */
.nav-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: clamp(0.9rem, 1.8vw, 1.1rem);
  font-weight: 700;
  color: var(--trace-orange);
  letter-spacing: 0.05em;
  text-shadow: 0 0 12px rgba(255, 128, 0, 0.5);
  transition: var(--transition);
}
.nav-logo:hover {
  text-shadow: 0 0 20px rgba(255, 128, 0, 0.8);
  color: #ffaa44;
}
.nav-logo__chip {
  font-size: 1.1em;
  opacity: 0.85;
}
.nav-logo__text {
  letter-spacing: 0.08em;
}

/* Nav links list */
.nav-links {
  display: flex;
  gap: clamp(12px, 2.5vw, 28px);
  list-style: none;
}

/* Individual link */
.nav-link {
  font-size: clamp(0.8rem, 1.3vw, 0.9rem);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  letter-spacing: 0.06em;
  color: var(--text-secondary);
  text-decoration: none;
  text-transform: uppercase;
  padding-bottom: 4px;
  position: relative;
  transition: color 0.2s ease;
}

/* Animated trace underline */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1.5px;
  background: var(--link-color, var(--trace-orange));
  transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 6px var(--link-color, var(--trace-orange));
}

.nav-link:hover {
  color: var(--text-primary);
}
.nav-link:hover::after {
  width: 100%;
}
.nav-link--active {
  color: var(--link-color, var(--trace-orange));
}
.nav-link--active::after {
  width: 100%;
}

/* Language selector */
.lang-switch {
  display: flex;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  overflow: hidden;
}
.lang-btn {
  background: transparent;
  border: 0;
  color: var(--text-secondary);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  padding: 6px 9px;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease;
}
.lang-btn + .lang-btn {
  border-left: 1px solid var(--border);
}
.lang-btn:hover {
  color: var(--text-primary);
}
.lang-btn--active {
  color: var(--trace-orange);
  background: rgba(255, 128, 0, 0.1);
}
.lang-btn:focus-visible {
  outline: 1px solid var(--trace-orange);
  outline-offset: -1px;
}

/* Tablet: wrap links below logo + selector */
@media (max-width: 760px) {
  .app-nav {
    flex-wrap: wrap;
    row-gap: 12px;
  }
  .nav-links {
    order: 3;
    width: 100%;
    justify-content: center;
  }
}

/* Mobile: stack */
@media (max-width: 520px) {
  .app-nav {
    flex-direction: column;
    gap: 14px;
    padding: 14px 20px;
  }
  .nav-links {
    gap: 14px;
  }
}
</style>
