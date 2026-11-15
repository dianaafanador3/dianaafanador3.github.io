// Define the global variables.
// The symmetry variable will define how many reflective sections the canvas
// is split into.
let symmetry = 6;

// The angle button will calculate the angle at which each section is rotated.
let angle = 360 / symmetry;

// Variables for continuous curve generation
let pathPoints = [];
let lastPointTime = 0;
let pointInterval = 50; // milliseconds between points
let maxRadius;
let resetInterval = 8000; // Reset every 8 seconds
let lastResetTime = 0;
let currentHue = 0;
let hueSpeed = 0.5; // Speed of color change

let canvas;
let isFullscreen = false;
let container = null;

function setup() {
    container = document.getElementById('sketch-container');
    // Account for padding (20px on each side = 40px total)
    let containerWidth = container.offsetWidth - 40;
    let containerHeight = Math.max(container.offsetHeight - 40, 400);

    canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent('sketch-container');
    frameRate(5);
    colorMode(HSB, 360, 100, 100);
    angleMode(DEGREES);
    background(0, 0, 0); // Dark background
    maxRadius = min(width, height) * 0.4; // Maximum distance from center for lines
    lastResetTime = millis();

    // Setup fullscreen button
    setupFullscreenButton();
}

function draw() {
    // Reset periodically or when screen gets too filled
    if (millis() - lastResetTime > resetInterval || pathPoints.length > 200) {
        background(0, 0, 0);
        pathPoints = [];
        lastResetTime = millis();
    }

    // Reset transformations and move origin to center
    push();
    translate(width / 2, height / 2);

    // Generate continuous curve points
    if (millis() - lastPointTime > pointInterval) {
        // Update color hue
        currentHue = (currentHue + hueSpeed) % 360;

        // Generate next point in the continuous path
        let newAngle, newRadius;

        if (pathPoints.length === 0) {
            // Start a new path
            newAngle = random(360);
            newRadius = random(maxRadius * 0.2, maxRadius);
        } else {
            // Continue from last point with smooth transition
            let lastPoint = pathPoints[pathPoints.length - 1];
            let lastAngle = atan2(lastPoint.y, lastPoint.x);
            let lastRadius = dist(0, 0, lastPoint.x, lastPoint.y);

            // Add some randomness but keep it smooth
            let angleChange = random(-30, 30);
            newAngle = lastAngle + angleChange;
            newRadius = constrain(
                lastRadius + random(-maxRadius * 0.1, maxRadius * 0.1),
                maxRadius * 0.2,
                maxRadius
            );
        }

        let newX = cos(newAngle) * newRadius;
        let newY = sin(newAngle) * newRadius;

        pathPoints.push({ x: newX, y: newY, hue: currentHue });

        // Draw the continuous curved path
        if (pathPoints.length > 1) {
            // For every reflective section the canvas is split into, draw the curve...
            for (let i = 0; i < symmetry; i++) {
                rotate(angle);

                // Draw smooth curve with color gradient by drawing segments
                noFill();
                strokeWeight(2);

                for (let j = 1; j < pathPoints.length; j++) {
                    let prevP = pathPoints[j - 1];
                    let p = pathPoints[j];

                    // Color changes along the path
                    let pathHue = (p.hue + j * 2) % 360;
                    stroke(pathHue, 80, 100, 200);

                    // Draw smooth curve segment using quadratic curve
                    let controlX = (prevP.x + p.x) / 2;
                    let controlY = (prevP.y + p.y) / 2;

                    beginShape();
                    vertex(prevP.x, prevP.y);
                    quadraticVertex(controlX, controlY, p.x, p.y);
                    endShape();
                }

                // ... and reflect the curve within the symmetry sections as well.
                push();
                scale(1, -1);

                for (let j = 1; j < pathPoints.length; j++) {
                    let prevP = pathPoints[j - 1];
                    let p = pathPoints[j];

                    let pathHue = (p.hue + j * 2) % 360;
                    stroke(pathHue, 80, 100, 200);

                    let controlX = (prevP.x + p.x) / 2;
                    let controlY = (prevP.y + p.y) / 2;

                    beginShape();
                    vertex(prevP.x, prevP.y);
                    quadraticVertex(controlX, controlY, p.x, p.y);
                    endShape();
                }
                pop();
            }
        }

        lastPointTime = millis();
    }
    pop(); // End transform block
}

function windowResized() {
    if (isFullscreen) {
        resizeCanvas(windowWidth, windowHeight);
    } else {
        // Account for padding when not in fullscreen
        let containerWidth = container.offsetWidth - 40;
        let containerHeight = Math.max(container.offsetHeight - 40, 400);
        resizeCanvas(containerWidth, containerHeight);
    }
    maxRadius = min(width, height) * 0.4;
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
