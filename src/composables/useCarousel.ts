import { ref } from 'vue'

export function useCarousel(total: number) {
  const currentIndex = ref(0)

  function next() {
    currentIndex.value = (currentIndex.value + 1) % total
  }

  function prev() {
    currentIndex.value = (currentIndex.value - 1 + total) % total
  }

  function goTo(index: number) {
    if (index >= 0 && index < total) {
      currentIndex.value = index
    }
  }

  // Touch / swipe
  let touchStartX = 0
  const MIN_SWIPE = 50

  function onTouchStart(event: TouchEvent) {
    touchStartX = event.changedTouches[0].screenX
  }

  function onTouchEnd(event: TouchEvent) {
    const delta = event.changedTouches[0].screenX - touchStartX
    if (Math.abs(delta) >= MIN_SWIPE) {
      delta > 0 ? prev() : next()
    }
  }

  // Keyboard
  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') prev()
    if (event.key === 'ArrowRight') next()
  }

  return {
    currentIndex,
    next,
    prev,
    goTo,
    onTouchStart,
    onTouchEnd,
    onKeydown,
  }
}
