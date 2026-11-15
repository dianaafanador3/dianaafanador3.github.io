<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import type { NavItem } from '@/types'

const route = useRoute()

const navItems: NavItem[] = [
  { label: 'Portfolio', to: '/',        color: 'var(--trace-yellow)' },
  { label: 'About',     to: '/about',   color: 'var(--trace-cyan)' },
  { label: 'Writing',   to: '/writing', color: 'var(--trace-magenta)' },
  { label: 'Resume',    to: '/resume',  color: 'var(--trace-lime)' },
]

function isActive(to: string) {
  return route.path === to
}
</script>

<template>
  <nav class="app-nav" aria-label="Main navigation">
    <!-- Logo / brand -->
    <RouterLink to="/" class="nav-logo" aria-label="DiAfanador — Home">
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
          {{ item.label }}
        </RouterLink>
      </li>
    </ul>
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
