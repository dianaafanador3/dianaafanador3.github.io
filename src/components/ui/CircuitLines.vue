<script setup lang="ts">
withDefaults(
  defineProps<{
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    color?: string
    size?: number
  }>(),
  {
    position: 'top-left',
    color: 'var(--trace-orange)',
    size: 40,
  }
)
</script>

<template>
  <svg
    class="circuit-lines"
    :class="`circuit-lines--${position}`"
    :width="size"
    :height="size"
    :viewBox="`0 0 ${size} ${size}`"
    fill="none"
    aria-hidden="true"
  >
    <!-- L-shaped trace -->
    <path
      v-if="position === 'top-left'"
      :d="`M ${size} 6 L 6 6 L 6 ${size}`"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="square"
    />
    <path
      v-else-if="position === 'top-right'"
      :d="`M 0 6 L ${size - 6} 6 L ${size - 6} ${size}`"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="square"
    />
    <path
      v-else-if="position === 'bottom-left'"
      :d="`M ${size} ${size - 6} L 6 ${size - 6} L 6 0`"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="square"
    />
    <path
      v-else
      :d="`M 0 ${size - 6} L ${size - 6} ${size - 6} L ${size - 6} 0`"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="square"
    />

    <!-- Via dot at the corner bend -->
    <circle
      v-if="position === 'top-left'"
      cx="6"
      cy="6"
      r="3"
      :fill="color"
      opacity="0.9"
    />
    <circle
      v-else-if="position === 'top-right'"
      :cx="size - 6"
      cy="6"
      r="3"
      :fill="color"
      opacity="0.9"
    />
    <circle
      v-else-if="position === 'bottom-left'"
      cx="6"
      :cy="size - 6"
      r="3"
      :fill="color"
      opacity="0.9"
    />
    <circle
      v-else
      :cx="size - 6"
      :cy="size - 6"
      r="3"
      :fill="color"
      opacity="0.9"
    />
  </svg>
</template>

<style scoped>
.circuit-lines {
  position: absolute;
  pointer-events: none;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}
.circuit-lines--top-left     { top: 0;    left: 0; }
.circuit-lines--top-right    { top: 0;    right: 0; }
.circuit-lines--bottom-left  { bottom: 0; left: 0; }
.circuit-lines--bottom-right { bottom: 0; right: 0; }
</style>
