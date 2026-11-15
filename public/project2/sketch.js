let canvas;
let isFullscreen = false;
let container = null;
let molds = [];
let numMolds = 10000;
let d;

function setup() {
    container = document.getElementById('sketch-container');
    // Account for padding (20px on each side = 40px total)
    let containerWidth = container.offsetWidth - 40;
    let containerHeight = Math.max(container.offsetHeight - 40, 400);

    canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent('sketch-container');

    angleMode(DEGREES);
    d = pixelDensity();

    for (let i = 0; i < numMolds; i++) {
        molds.push(new Mold());
    }

    // Setup fullscreen button
    setupFullscreenButton();
}

function draw() {
    background(0, 5);
    loadPixels();

    for (let mold of molds) {
        mold.update();
        mold.display();
    }
}

function setupFullscreenButton() {
    const fullscreenBtn = document.getElementById('fullscreen-btn');

    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }
}

function toggleFullscreen() {
    const sketchContainer = document.getElementById('sketch-container');

    if (!isFullscreen) {
        // Enter fullscreen
        if (sketchContainer.requestFullscreen) {
            sketchContainer.requestFullscreen();
        } else if (sketchContainer.webkitRequestFullscreen) {
            sketchContainer.webkitRequestFullscreen();
        } else if (sketchContainer.msRequestFullscreen) {
            sketchContainer.msRequestFullscreen();
        }
        isFullscreen = true;
    } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        isFullscreen = false;
    }
}

// Handle fullscreen change events
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('msfullscreenchange', handleFullscreenChange);

function handleFullscreenChange() {
    if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
    ) {
        isFullscreen = true;
        // Resize canvas to fullscreen
        setTimeout(() => {
            resizeCanvas(windowWidth, windowHeight);
            maxRadius = min(width, height) * 0.4;
        }, 100);
    } else {
        isFullscreen = false;
        // Resize canvas back to container
        setTimeout(() => {
            let containerWidth = container.offsetWidth - 40;
            let containerHeight = Math.max(container.offsetHeight - 40, 400);
            resizeCanvas(containerWidth, containerHeight);
            maxRadius = min(width, height) * 0.4;
        }, 100);
    }
}
