let canvas
let isFullscreen = false
let container = null
let molds = []
let numMolds = 10000
let d

function setup() {
  container = document.getElementById('sketch-container')
  // Account for padding (20px on each side = 40px total)
  let containerWidth = container.offsetWidth - 40
  let containerHeight = Math.max(container.offsetHeight - 40, 400)

  canvas = createCanvas(containerWidth, containerHeight)
  canvas.parent('sketch-container')

  angleMode(DEGREES)
  d = pixelDensity()

  for (let i = 0; i < numMolds; i++) {
    molds.push(new Mold())
  }

  // Setup fullscreen button
  setupFullscreenButton()
}

function draw() {
  background(0, 5)
  loadPixels()

  for (let mold of molds) {
    mold.update()
    mold.display()
  }
}

function setupFullscreenButton() {
  const fullscreenBtn = document.getElementById('fullscreen-btn')

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', toggleFullscreen)
  }
}

// Fullscreen: use the Fullscreen API where it works (desktop, Android).
// iPhone browsers only allow it on <video>, so there we fall back to a
// CSS "pseudo-fullscreen" that pins the sketch over the whole viewport.
function nativeFullscreenElement() {
  return document.fullscreenElement || document.webkitFullscreenElement || null
}

function canUseNativeFullscreen(el) {
  return (
    !!(el.requestFullscreen || el.webkitRequestFullscreen) &&
    (document.fullscreenEnabled || document.webkitFullscreenEnabled)
  )
}

function toggleFullscreen() {
  const el = document.getElementById('sketch-container')
  if (isFullscreen) {
    exitFullscreen(el)
  } else {
    enterFullscreen(el)
  }
}

function enterFullscreen(el) {
  if (canUseNativeFullscreen(el)) {
    try {
      const req = el.requestFullscreen ? el.requestFullscreen() : el.webkitRequestFullscreen()
      if (req && typeof req.catch === 'function') {
        req.catch(() => enterPseudoFullscreen(el))
      }
      return
    } catch (e) {
      /* fall through to the CSS fallback */
    }
  }
  enterPseudoFullscreen(el)
}

function exitFullscreen(el) {
  if (nativeFullscreenElement()) {
    if (document.exitFullscreen) document.exitFullscreen()
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen()
  } else {
    exitPseudoFullscreen(el)
  }
}

function enterPseudoFullscreen(el) {
  el.classList.add('is-pseudo-fullscreen')
  document.documentElement.classList.add('sketch-fullscreen-lock')
  setFullscreenState(true)
}

function exitPseudoFullscreen(el) {
  el.classList.remove('is-pseudo-fullscreen')
  document.documentElement.classList.remove('sketch-fullscreen-lock')
  setFullscreenState(false)
}

function setFullscreenState(on) {
  const entering = on && !isFullscreen
  isFullscreen = on
  const btn = document.getElementById('fullscreen-btn')
  if (btn) btn.setAttribute('aria-pressed', on ? 'true' : 'false')
  setTimeout(() => {
    fitCanvas()
    if (entering) restartSketch()
  }, 60)
}

// Start Motlle over: fresh molds spread across the current canvas size
function restartSketch() {
  molds = []
  for (let i = 0; i < numMolds; i++) {
    molds.push(new Mold())
  }
  background(0)
}

function fitCanvas() {
  if (!container) return
  if (isFullscreen) {
    const vv = window.visualViewport
    resizeCanvas(Math.round(vv ? vv.width : windowWidth), Math.round(vv ? vv.height : windowHeight))
  } else {
    const containerWidth = container.offsetWidth - 40
    const containerHeight = Math.max(container.offsetHeight - 40, 400)
    resizeCanvas(containerWidth, containerHeight)
  }
  background(0)
}

// Native fullscreen changes (including the user pressing Esc or the system back gesture)
document.addEventListener('fullscreenchange', () => setFullscreenState(!!nativeFullscreenElement()))
document.addEventListener('webkitfullscreenchange', () =>
  setFullscreenState(!!nativeFullscreenElement())
)

// Esc also closes the CSS fallback
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isFullscreen && !nativeFullscreenElement()) {
    exitPseudoFullscreen(document.getElementById('sketch-container'))
  }
})

// Keep the canvas sized on rotation / window resize
function windowResized() {
  fitCanvas()
}
