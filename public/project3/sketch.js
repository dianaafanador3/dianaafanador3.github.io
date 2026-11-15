// Pac-Man style screensaver for Project 3
let images = [];
let container = null;
let canvas;
let isFullscreen = false;

// Maze and game variables
let cellSize = 20; // Size of each cell in the maze
let maze = [];
let dots = [];
let pacman = null;
let monsters = [];
let pacmanImage = null;
let controlMode = 'auto'; // 'auto' or 'manual'
let keyDirections = { up: false, down: false, left: false, right: false };

// Image paths - all images in the images folder
const imagePaths = [];
for (let i = 1; i <= 65; i++) {
    imagePaths.push(`images/image${i}.png`);
}

let loadedImages = [];
let loadErrors = [];
let imagesLoaded = false;
let initAttempts = 0;
const maxInitAttempts = 50; // 50 attempts * 200ms = 10 seconds max

// Classic Pac-Man monster colors (will be initialized in setup)
let classicColors = [];

function initColors() {
    classicColors = [
        color(255, 0, 0), // Red (Blinky)
        color(255, 184, 255), // Pink (Pinky)
        color(0, 255, 255), // Cyan (Inky)
        color(255, 184, 82), // Orange (Clyde)
    ];
}

// Pac-Man class
class PacMan {
    constructor(img) {
        this.img = img;
        this.x = 0;
        this.y = 0;
        this.vx = 2;
        this.vy = 0;
        this.size = cellSize * 0.9; // Pac-Man size
        this.mouthAngle = 0;
        this.mouthSpeed = 0.15;
        this.score = 0;
        this.visitedCells = new Set(); // Track visited cells to avoid revisiting empty ones
        this.lastCellX = -1;
        this.lastCellY = -1;
        this.lastValidVx = 2; // Store last valid velocity for rotation when stopped
        this.lastValidVy = 0;
        this.stuckCounter = 0; // Counter to detect if Pac-Man is stuck
        this.lastPosition = { x: 0, y: 0 }; // Track last position to detect being stuck
        this.nextDirX = 0; // Next direction intent (for manual mode)
        this.nextDirY = 0;
        this.manualDirX = 0; // Current manual direction (persists until new direction set)
        this.manualDirY = 0;
    }

    update() {
        // Animate mouth
        this.mouthAngle += this.mouthSpeed;
        if (this.mouthAngle > TWO_PI / 3 || this.mouthAngle < 0) {
            this.mouthSpeed *= -1;
        }

        // Get current cell position
        let currentCellX = floor(this.x / cellSize);
        let currentCellY = floor(this.y / cellSize);
        let targetX = currentCellX * cellSize + cellSize / 2;
        let targetY = currentCellY * cellSize + cellSize / 2;

        // Track visited cells (only empty ones, not cells with dots)
        if (currentCellX !== this.lastCellX || currentCellY !== this.lastCellY) {
            let cellKey = `${currentCellX},${currentCellY}`;
            // Check if this cell has a dot
            let hasDot = false;
            for (let dot of dots) {
                let dotCellX = floor(dot.x / cellSize);
                let dotCellY = floor(dot.y / cellSize);
                if (dotCellX === currentCellX && dotCellY === currentCellY) {
                    hasDot = true;
                    break;
                }
            }
            // Only mark as visited if no dot (so we can revisit cells with dots)
            if (!hasDot) {
                this.visitedCells.add(cellKey);
            }
            this.lastCellX = currentCellX;
            this.lastCellY = currentCellY;
        }

        // Snap to center if close
        let atCenter = abs(this.x - targetX) < 1 && abs(this.y - targetY) < 1;
        if (atCenter) {
            this.x = targetX;
            this.y = targetY;
        }

        // Check if next cell is blocked BEFORE moving
        // Only check the primary direction (no diagonal checks)
        let nextCellX = currentCellX;
        let nextCellY = currentCellY;

        // Determine primary movement direction - prevent diagonal movement
        if (abs(this.vx) > abs(this.vy)) {
            // Moving horizontally
            nextCellX = currentCellX + (this.vx > 0 ? 1 : this.vx < 0 ? -1 : 0);
        } else if (abs(this.vy) > abs(this.vx)) {
            // Moving vertically
            nextCellY = currentCellY + (this.vy > 0 ? 1 : this.vy < 0 ? -1 : 0);
        } else if (this.vx !== 0) {
            // Only horizontal velocity
            nextCellX = currentCellX + (this.vx > 0 ? 1 : this.vx < 0 ? -1 : 0);
        } else if (this.vy !== 0) {
            // Only vertical velocity
            nextCellY = currentCellY + (this.vy > 0 ? 1 : this.vy < 0 ? -1 : 0);
        }

        let canMoveForward = isValidMove(nextCellX, nextCellY);

        // Handle manual mode input - arrow keys only change direction, Pac-Man keeps moving
        if (controlMode === 'manual') {
            // Check for new keyboard input to change direction
            let newKeyDirX = 0;
            let newKeyDirY = 0;
            if (keyDirections.right) newKeyDirX = 1;
            else if (keyDirections.left) newKeyDirX = -1;
            if (keyDirections.down) newKeyDirY = 1;
            else if (keyDirections.up) newKeyDirY = -1;

            // If a key is pressed, update the stored manual direction
            if (newKeyDirX !== 0 || newKeyDirY !== 0) {
                // Prioritize horizontal over vertical (classic Pac-Man behavior)
                if (newKeyDirX !== 0) {
                    this.manualDirX = newKeyDirX;
                    this.manualDirY = 0;
                } else {
                    this.manualDirX = 0;
                    this.manualDirY = newKeyDirY;
                }
            }

            // Initialize manual direction from current velocity if not set yet
            if (
                this.manualDirX === 0 &&
                this.manualDirY === 0 &&
                (this.vx !== 0 || this.vy !== 0)
            ) {
                // If moving but no manual direction set, use current velocity
                if (this.vx !== 0) {
                    this.manualDirX = this.vx > 0 ? 1 : -1;
                    this.manualDirY = 0;
                } else if (this.vy !== 0) {
                    this.manualDirX = 0;
                    this.manualDirY = this.vy > 0 ? 1 : -1;
                }
            }

            // Use stored manual direction (keeps moving even if no key is currently pressed)
            let dirX = this.manualDirX;
            let dirY = this.manualDirY;

            // If we have a stored next direction intent, try to use it when at center
            if (atCenter && (this.nextDirX !== 0 || this.nextDirY !== 0)) {
                dirX = this.nextDirX;
                dirY = this.nextDirY;
                this.nextDirX = 0;
                this.nextDirY = 0;
                // Update stored manual direction when we successfully change direction
                this.manualDirX = dirX;
                this.manualDirY = dirY;
            }

            // Try to move in the current direction (always try if we have a direction)
            if (dirX !== 0 || dirY !== 0) {
                // Only check for direction change when at center or stopped
                if (atCenter || (this.vx === 0 && this.vy === 0)) {
                    let testX = currentCellX + dirX;
                    let testY = currentCellY + dirY;

                    if (isValidMove(testX, testY)) {
                        // Can move in this direction - set velocity
                        this.vx = dirX * 2;
                        this.vy = dirY * 2;
                        // Update stored manual direction
                        this.manualDirX = dirX;
                        this.manualDirY = dirY;
                        // Update last valid direction for rotation
                        if (this.vx !== 0) {
                            this.lastValidVx = this.vx;
                            this.lastValidVy = 0;
                        } else if (this.vy !== 0) {
                            this.lastValidVy = this.vy;
                            this.lastValidVx = 0;
                        }
                    } else {
                        // Can't move in this direction - store intent for when we reach center
                        if (atCenter) {
                            this.nextDirX = dirX;
                            this.nextDirY = dirY;
                            // Blocked at center - stop until direction becomes valid
                            this.vx = 0;
                            this.vy = 0;
                        }
                        // If not at center, keep moving in current direction until we reach center
                    }
                }
                // If not at center and already moving, continue in current direction (movement handled below)
            }

            // In manual mode, we've set the direction - now continue to movement section
            // Update canMoveForward based on whether we can move in the current direction
            if (this.vx !== 0 || this.vy !== 0) {
                let nextX = currentCellX + (this.vx > 0 ? 1 : this.vx < 0 ? -1 : 0);
                let nextY = currentCellY + (this.vy > 0 ? 1 : this.vy < 0 ? -1 : 0);
                canMoveForward = isValidMove(nextX, nextY) || !atCenter; // Allow movement if not at center or valid move
            }
        } else {
            // Auto mode - automatic pathfinding (original logic)
            // If at center and can't move forward OR if velocity is zero, choose new direction
            // Also check if we need to force a direction change
            if (
                (atCenter && !canMoveForward) ||
                (this.vx === 0 && this.vy === 0) ||
                this.forceDirectionChange
            ) {
                this.forceDirectionChange = false; // Reset flag

                // Find nearest dot
                let nearestDot = null;
                let minDist = Infinity;
                for (let dot of dots) {
                    let d = dist(this.x, this.y, dot.x, dot.y);
                    if (d < minDist) {
                        minDist = d;
                        nearestDot = dot;
                    }
                }

                // Find all valid directions and categorize them
                let directions = [
                    { x: 1, y: 0 },
                    { x: -1, y: 0 },
                    { x: 0, y: 1 },
                    { x: 0, y: -1 },
                ];

                // Categorize all valid directions
                let directionsWithDots = [];
                let unvisitedDirections = [];
                let visitedEmptyDirections = [];

                for (let dir of directions) {
                    let testX = currentCellX + dir.x;
                    let testY = currentCellY + dir.y;
                    if (isValidMove(testX, testY)) {
                        let cellKey = `${testX},${testY}`;
                        let hasDot = false;
                        // Check if this cell has a dot
                        for (let dot of dots) {
                            let dotCellX = floor(dot.x / cellSize);
                            let dotCellY = floor(dot.y / cellSize);
                            if (dotCellX === testX && dotCellY === testY) {
                                hasDot = true;
                                break;
                            }
                        }

                        if (hasDot) {
                            directionsWithDots.push(dir);
                        } else if (!this.visitedCells.has(cellKey)) {
                            unvisitedDirections.push(dir);
                        } else {
                            visitedEmptyDirections.push(dir);
                        }
                    }
                }

                // Determine direction: prioritize dots, but allow backtracking when stuck
                let dirX = 0;
                let dirY = 0;
                let chosenDir = null;

                // First, try to go towards nearest dot if available
                if (nearestDot && dots.length > 0) {
                    let dx = nearestDot.x - this.x;
                    let dy = nearestDot.y - this.y;
                    let preferredDir = null;

                    // Choose the direction with greater distance (primary direction)
                    if (abs(dx) > abs(dy)) {
                        preferredDir = { x: dx > 0 ? 1 : -1, y: 0 };
                    } else if (abs(dy) > 0) {
                        preferredDir = { x: 0, y: dy > 0 ? 1 : -1 };
                    }

                    // Check if preferred direction is valid and has a dot
                    if (preferredDir) {
                        let testX = currentCellX + preferredDir.x;
                        let testY = currentCellY + preferredDir.y;
                        if (isValidMove(testX, testY)) {
                            // Check if this direction leads to a dot
                            let hasDotInDir = false;
                            for (let dot of dots) {
                                let dotCellX = floor(dot.x / cellSize);
                                let dotCellY = floor(dot.y / cellSize);
                                if (dotCellX === testX && dotCellY === testY) {
                                    hasDotInDir = true;
                                    break;
                                }
                            }
                            if (hasDotInDir) {
                                chosenDir = preferredDir;
                            }
                        }
                    }
                }

                // If no preferred direction or preferred direction is blocked, choose from available
                if (!chosenDir) {
                    if (directionsWithDots.length > 0) {
                        chosenDir = random(directionsWithDots);
                    } else if (unvisitedDirections.length > 0) {
                        chosenDir = random(unvisitedDirections);
                    } else if (visitedEmptyDirections.length > 0) {
                        // Allow backtracking through visited empty cells when stuck
                        chosenDir = random(visitedEmptyDirections);
                    }
                }

                // Ensure we always have a direction - if no preferred direction, pick any valid one
                // This is critical for areas without dots - we MUST find a direction
                if (!chosenDir) {
                    // Try all directions again - must find something
                    // Shuffle directions for more variety
                    for (let i = directions.length - 1; i > 0; i--) {
                        let j = floor(random(i + 1));
                        [directions[i], directions[j]] = [directions[j], directions[i]];
                    }

                    // First pass: try any valid direction
                    for (let dir of directions) {
                        let testX = currentCellX + dir.x;
                        let testY = currentCellY + dir.y;
                        if (isValidMove(testX, testY)) {
                            chosenDir = dir;
                            break;
                        }
                    }

                    // Second pass: if still no direction, try direct maze check (bypass isValidMove)
                    if (!chosenDir) {
                        let cols = floor(width / cellSize);
                        let rows = floor(height / cellSize);
                        for (let dir of directions) {
                            let testX = currentCellX + dir.x;
                            let testY = currentCellY + dir.y;
                            if (
                                testX >= 0 &&
                                testX < cols &&
                                testY >= 0 &&
                                testY < rows &&
                                maze[testY] &&
                                maze[testY][testX] === 0
                            ) {
                                chosenDir = dir;
                                break;
                            }
                        }
                    }
                }

                // Always ensure we have a direction chosen - critical for avoiding getting stuck
                // When there are no dots, we still need to navigate!
                if (chosenDir) {
                    dirX = chosenDir.x;
                    dirY = chosenDir.y;
                } else {
                    // If no dots available, prioritize unvisited cells, but allow ANY valid move
                    if (unvisitedDirections.length > 0) {
                        chosenDir = random(unvisitedDirections);
                        dirX = chosenDir.x;
                        dirY = chosenDir.y;
                    } else if (visitedEmptyDirections.length > 0) {
                        // Even if all cells visited, we need to move - pick any valid direction
                        chosenDir = random(visitedEmptyDirections);
                        dirX = chosenDir.x;
                        dirY = chosenDir.y;
                    } else {
                        // Last resort: try reverse of last valid direction
                        if (this.lastValidVx !== 0) {
                            let reverseX = currentCellX - (this.lastValidVx > 0 ? 1 : -1);
                            if (isValidMove(reverseX, currentCellY)) {
                                dirX = this.lastValidVx > 0 ? -1 : 1;
                                dirY = 0;
                            }
                        } else if (this.lastValidVy !== 0) {
                            let reverseY = currentCellY - (this.lastValidVy > 0 ? 1 : -1);
                            if (isValidMove(currentCellX, reverseY)) {
                                dirY = this.lastValidVy > 0 ? -1 : 1;
                                dirX = 0;
                            }
                        }

                        // If still no direction, try ALL directions systematically
                        if (dirX === 0 && dirY === 0) {
                            for (let dir of directions) {
                                let testX = currentCellX + dir.x;
                                let testY = currentCellY + dir.y;
                                if (isValidMove(testX, testY)) {
                                    dirX = dir.x;
                                    dirY = dir.y;
                                    break;
                                }
                            }
                        }
                    }
                }

                // Try to move in chosen direction
                // Only set velocity for ONE direction (no diagonal movement)
                if (dirX !== 0 || dirY !== 0) {
                    // Prioritize horizontal movement if both directions set
                    if (dirX !== 0 && dirY !== 0) {
                        // Both directions set - choose the one with greater distance to target
                        if (nearestDot) {
                            let dx = abs(nearestDot.x - this.x);
                            let dy = abs(nearestDot.y - this.y);
                            if (dx > dy) {
                                dirY = 0; // Prefer horizontal
                            } else {
                                dirX = 0; // Prefer vertical
                            }
                        } else {
                            dirY = 0; // Default to horizontal
                        }
                    }

                    let testX = currentCellX + dirX;
                    let testY = currentCellY + dirY;

                    if (isValidMove(testX, testY)) {
                        // Set only ONE velocity component (no diagonal movement)
                        this.vx = dirX !== 0 ? dirX * 2 : 0;
                        this.vy = dirY !== 0 ? dirY * 2 : 0;
                        // Update last valid direction for rotation
                        if (this.vx !== 0) {
                            this.lastValidVx = this.vx;
                            this.lastValidVy = 0;
                        } else if (this.vy !== 0) {
                            this.lastValidVy = this.vy;
                            this.lastValidVx = 0;
                        }
                    } else {
                        // Primary direction is blocked - try all available directions
                        // Prioritize but allow all valid moves including visited empty cells
                        let allDirections = [
                            { x: 1, y: 0 },
                            { x: -1, y: 0 },
                            { x: 0, y: 1 },
                            { x: 0, y: -1 },
                        ];

                        let fallbackDots = [];
                        let fallbackUnvisited = [];
                        let fallbackVisited = [];

                        for (let dir of allDirections) {
                            let testX = currentCellX + dir.x;
                            let testY = currentCellY + dir.y;
                            if (isValidMove(testX, testY)) {
                                let cellKey = `${testX},${testY}`;
                                let hasDot = false;
                                for (let dot of dots) {
                                    let dotCellX = floor(dot.x / cellSize);
                                    let dotCellY = floor(dot.y / cellSize);
                                    if (dotCellX === testX && dotCellY === testY) {
                                        hasDot = true;
                                        break;
                                    }
                                }

                                if (hasDot) {
                                    fallbackDots.push(dir);
                                } else if (!this.visitedCells.has(cellKey)) {
                                    fallbackUnvisited.push(dir);
                                } else {
                                    fallbackVisited.push(dir);
                                }
                            }
                        }

                        // Choose any valid direction (prioritize but allow all)
                        let found = false;
                        if (fallbackDots.length > 0) {
                            let dir = random(fallbackDots);
                            this.vx = dir.x !== 0 ? dir.x * 2 : 0;
                            this.vy = dir.y !== 0 ? dir.y * 2 : 0;
                            // Update last valid direction
                            if (this.vx !== 0) {
                                this.lastValidVx = this.vx;
                                this.lastValidVy = 0;
                            } else if (this.vy !== 0) {
                                this.lastValidVy = this.vy;
                                this.lastValidVx = 0;
                            }
                            found = true;
                        } else if (fallbackUnvisited.length > 0) {
                            let dir = random(fallbackUnvisited);
                            this.vx = dir.x !== 0 ? dir.x * 2 : 0;
                            this.vy = dir.y !== 0 ? dir.y * 2 : 0;
                            // Update last valid direction
                            if (this.vx !== 0) {
                                this.lastValidVx = this.vx;
                                this.lastValidVy = 0;
                            } else if (this.vy !== 0) {
                                this.lastValidVy = this.vy;
                                this.lastValidVx = 0;
                            }
                            found = true;
                        } else if (fallbackVisited.length > 0) {
                            // Allow backtracking through visited cells
                            let dir = random(fallbackVisited);
                            this.vx = dir.x !== 0 ? dir.x * 2 : 0;
                            this.vy = dir.y !== 0 ? dir.y * 2 : 0;
                            // Update last valid direction
                            if (this.vx !== 0) {
                                this.lastValidVx = this.vx;
                                this.lastValidVy = 0;
                            } else if (this.vy !== 0) {
                                this.lastValidVy = this.vy;
                                this.lastValidVx = 0;
                            }
                            found = true;
                        }

                        // Last resort: reverse direction
                        if (!found) {
                            if (this.lastValidVx !== 0) {
                                this.vx = -this.lastValidVx;
                                this.vy = 0;
                                this.lastValidVx = this.vx;
                                this.lastValidVy = 0;
                            } else if (this.lastValidVy !== 0) {
                                this.vy = -this.lastValidVy;
                                this.vx = 0;
                                this.lastValidVy = this.vy;
                                this.lastValidVx = 0;
                            }
                        }
                    }
                }
            }
        }

        // Only move if next cell is valid
        if (canMoveForward) {
            // Move only in one direction at a time (no diagonal movement)
            // Clear the secondary velocity to prevent diagonal movement
            if (abs(this.vx) > abs(this.vy)) {
                // Moving horizontally - clear vertical movement
                this.x += this.vx;
                this.vy = 0;
            } else if (abs(this.vy) > abs(this.vx)) {
                // Moving vertically - clear horizontal movement
                this.y += this.vy;
                this.vx = 0;
            } else {
                // Only one direction should be active
                if (abs(this.vx) > 0) {
                    this.x += this.vx;
                    this.vy = 0;
                } else if (abs(this.vy) > 0) {
                    this.y += this.vy;
                    this.vx = 0;
                }
            }

            // Constrain to valid position and check for wall collisions
            let newCellX = floor(this.x / cellSize);
            let newCellY = floor(this.y / cellSize);

            // Check if new position is valid
            if (!isValidMove(newCellX, newCellY)) {
                // We moved into a wall - snap back to center of current valid cell
                this.x = currentCellX * cellSize + cellSize / 2;
                this.y = currentCellY * cellSize + cellSize / 2;

                // Stop movement and force direction change immediately
                // Don't update lastValidVx/Vy here - keep the last direction for rotation
                this.vx = 0;
                this.vy = 0;
                // Force direction change on next update
                this.forceDirectionChange = true;
            } else {
                // Moving successfully - update last valid direction
                if (this.vx !== 0) {
                    this.lastValidVx = this.vx;
                    this.lastValidVy = 0;
                } else if (this.vy !== 0) {
                    this.lastValidVy = this.vy;
                    this.lastValidVx = 0;
                }
            }
        } else if (!atCenter) {
            // Continue moving if we're not at center yet and not blocked
            // But only move in the primary direction
            if (abs(this.vx) > abs(this.vy)) {
                this.x += this.vx;
                this.vy = 0;
            } else if (abs(this.vy) > abs(this.vx)) {
                this.y += this.vy;
                this.vx = 0;
            }

            // In manual mode, check for stored direction intent when approaching center
            if (controlMode === 'manual' && (this.nextDirX !== 0 || this.nextDirY !== 0)) {
                let distToCenter = dist(this.x, this.y, targetX, targetY);
                if (distToCenter < cellSize / 2) {
                    // Close to center - check if we can turn
                    let testX = currentCellX + this.nextDirX;
                    let testY = currentCellY + this.nextDirY;
                    if (isValidMove(testX, testY)) {
                        this.vx = this.nextDirX * 2;
                        this.vy = this.nextDirY * 2;
                        this.nextDirX = 0;
                        this.nextDirY = 0;
                        // Update last valid direction
                        if (this.vx !== 0) {
                            this.lastValidVx = this.vx;
                            this.lastValidVy = 0;
                        } else if (this.vy !== 0) {
                            this.lastValidVy = this.vy;
                            this.lastValidVx = 0;
                        }
                    }
                }
            }

            // Check if we're stuck (not moving forward) - force direction change (only in auto mode)
            if (controlMode === 'auto') {
                let movedX = abs(this.x - (currentCellX * cellSize + cellSize / 2));
                let movedY = abs(this.y - (currentCellY * cellSize + cellSize / 2));
                if (
                    (this.vx === 0 && this.vy === 0) ||
                    (movedX < 0.5 && movedY < 0.5 && (this.vx !== 0 || this.vy !== 0))
                ) {
                    // Not moving - force direction change
                    this.forceDirectionChange = true;
                }
            }
        }

        // Periodic check: if no velocity for too long, force direction change (only in auto mode)
        if (controlMode === 'auto' && this.vx === 0 && this.vy === 0) {
            this.stuckCounter++;
            if (this.stuckCounter > 2) {
                // Force immediate direction change
                this.forceDirectionChange = true;
                this.stuckCounter = 0;
            }
        } else {
            this.stuckCounter = 0; // Reset if moving
        }

        // Wrap around sides
        if (this.x < 0) this.x = width;
        else if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        else if (this.y > height) this.y = 0;

        // Final safety check: if velocity is zero and we're not at a decision point, force a direction
        if (this.vx === 0 && this.vy === 0) {
            let currentCellX = floor(this.x / cellSize);
            let currentCellY = floor(this.y / cellSize);
            let directions = [
                { x: 1, y: 0 },
                { x: -1, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: -1 },
            ];

            // Find ANY valid direction
            for (let dir of directions) {
                let testX = currentCellX + dir.x;
                let testY = currentCellY + dir.y;
                if (isValidMove(testX, testY)) {
                    this.vx = dir.x * 2;
                    this.vy = dir.y * 2;
                    // Update last valid direction
                    if (this.vx !== 0) {
                        this.lastValidVx = this.vx;
                        this.lastValidVy = 0;
                    } else if (this.vy !== 0) {
                        this.lastValidVy = this.vy;
                        this.lastValidVx = 0;
                    }
                    break;
                }
            }
        }

        // Eat dots
        for (let i = dots.length - 1; i >= 0; i--) {
            let dot = dots[i];
            let d = dist(this.x, this.y, dot.x, dot.y);
            if (d < this.size / 2 + dot.size / 2) {
                dots.splice(i, 1);
                this.score++;
            }
        }

        // Check collision with monsters
        for (let i = monsters.length - 1; i >= 0; i--) {
            let monster = monsters[i];
            if (!monster.isDying) {
                let d = dist(this.x, this.y, monster.x, monster.y);
                if (d < this.size / 2 + monster.size / 2) {
                    // Pac-Man eats the monster
                    monster.die();
                }
            }
        }
    }

    display() {
        push();
        translate(this.x, this.y);

        // Face direction - use current velocity or last valid direction if stopped
        let dirX = this.vx !== 0 ? this.vx : this.lastValidVx;
        let dirY = this.vy !== 0 ? this.vy : this.lastValidVy;

        if (dirX > 0) rotate(0);
        else if (dirX < 0) rotate(PI);
        else if (dirY > 0) rotate(PI / 2);
        else if (dirY < 0) rotate(-PI / 2);

        // Yellow glow
        drawingContext.shadowColor = 'rgb(255, 255, 0)';
        drawingContext.shadowBlur = 20;

        // Draw yellow circle for Pac-Man
        fill(255, 255, 0);
        noStroke();

        // Draw Pac-Man shape (circle with mouth)
        arc(0, 0, this.size, this.size, this.mouthAngle, TWO_PI - this.mouthAngle, PIE);

        // If image is loaded, draw it on top
        if (this.img && this.img.width > 0) {
            imageMode(CENTER);
            noTint();
            image(this.img, 0, 0, this.size, this.size);
        }

        pop();
    }
}

// Monster class
class Monster {
    constructor(img, color, startX, startY) {
        this.img = img;
        this.color = color;
        this.x = startX;
        this.y = startY;
        this.vx = random([-1, 1]) * 1.5;
        this.vy = random([-1, 1]) * 1.5;
        this.size = cellSize * 0.85; // Increased from 0.75 to 0.85 for bigger monsters
        this.directionChangeCounter = 0;
        this.directionChangeInterval = 60;
        this.isDying = false; // Death animation state
        this.deathScale = 1.0; // Scale for death animation (starts at 1, goes up)
        this.deathAlpha = 255; // Alpha for death animation (fades out)
        this.deathTimer = 0; // Timer for death animation duration
        this.deathDuration = 90; // Animation duration in frames (longer animation)
    }

    // Start death animation
    die() {
        this.isDying = true;
        this.deathScale = 1.0;
        this.deathAlpha = 255;
        this.deathTimer = 0;
        this.vx = 0;
        this.vy = 0; // Stop movement
    }

    update() {
        // Handle death animation
        if (this.isDying) {
            this.deathTimer++;
            // Zoom in and fade out - much bigger zoom (takes big part of screen)
            this.deathScale = 1.0 + (this.deathTimer / this.deathDuration) * 10.0; // Zoom to 11x size
            this.deathAlpha = 255 - (this.deathTimer / this.deathDuration) * 255; // Fade to 0

            // Return true if animation is complete (monster should be removed)
            if (this.deathTimer >= this.deathDuration) {
                return true; // Signal that monster should be removed
            }
            return false; // Still animating
        }

        // Get current cell position
        let currentCellX = floor(this.x / cellSize);
        let currentCellY = floor(this.y / cellSize);
        let targetX = currentCellX * cellSize + cellSize / 2;
        let targetY = currentCellY * cellSize + cellSize / 2;

        // Snap to center if close
        let atCenter = abs(this.x - targetX) < 1 && abs(this.y - targetY) < 1;
        if (atCenter) {
            this.x = targetX;
            this.y = targetY;
        }

        // Check if next cell is blocked BEFORE moving
        let nextCellX = currentCellX + (this.vx > 0 ? 1 : this.vx < 0 ? -1 : 0);
        let nextCellY = currentCellY + (this.vy > 0 ? 1 : this.vy < 0 ? -1 : 0);
        let canMoveForward = isValidMove(nextCellX, nextCellY);

        // Change direction periodically or if blocked
        this.directionChangeCounter++;
        let shouldChangeDirection =
            (atCenter && !canMoveForward) ||
            this.directionChangeCounter >= this.directionChangeInterval;

        if (shouldChangeDirection) {
            this.directionChangeCounter = 0;
            this.directionChangeInterval = random(30, 90);

            // Try new random direction
            let directions = [
                { vx: 1.5, vy: 0 },
                { vx: -1.5, vy: 0 },
                { vx: 0, vy: 1.5 },
                { vx: 0, vy: -1.5 },
            ];

            // Shuffle directions
            for (let i = directions.length - 1; i > 0; i--) {
                let j = floor(random(i + 1));
                [directions[i], directions[j]] = [directions[j], directions[i]];
            }

            let found = false;
            for (let dir of directions) {
                let testX = currentCellX + (dir.vx > 0 ? 1 : dir.vx < 0 ? -1 : 0);
                let testY = currentCellY + (dir.vy > 0 ? 1 : dir.vy < 0 ? -1 : 0);

                if (isValidMove(testX, testY)) {
                    this.vx = dir.vx;
                    this.vy = dir.vy;
                    found = true;
                    break;
                }
            }

            // If no valid direction found, try reverse
            if (!found) {
                let reverseX = currentCellX - (this.vx > 0 ? 1 : this.vx < 0 ? -1 : 0);
                let reverseY = currentCellY - (this.vy > 0 ? 1 : this.vy < 0 ? -1 : 0);
                if (isValidMove(reverseX, reverseY)) {
                    this.vx *= -1;
                    this.vy *= -1;
                } else {
                    // Find any valid direction
                    for (let dir of directions) {
                        let testX = currentCellX + (dir.vx > 0 ? 1 : dir.vx < 0 ? -1 : 0);
                        let testY = currentCellY + (dir.vy > 0 ? 1 : dir.vy < 0 ? -1 : 0);
                        if (isValidMove(testX, testY)) {
                            this.vx = dir.vx;
                            this.vy = dir.vy;
                            break;
                        }
                    }
                }
            }
        }

        // Only move if next cell is valid
        if (canMoveForward || !atCenter) {
            this.x += this.vx;
            this.y += this.vy;

            // Constrain to valid position if we accidentally move into a wall
            let newCellX = floor(this.x / cellSize);
            let newCellY = floor(this.y / cellSize);
            if (!isValidMove(newCellX, newCellY)) {
                // Snap back to center of current valid cell
                this.x = currentCellX * cellSize + cellSize / 2;
                this.y = currentCellY * cellSize + cellSize / 2;
            }
        }

        // Ensure monster is always moving (prevent zero velocity)
        if (this.vx === 0 && this.vy === 0) {
            // Force a direction change
            this.directionChangeCounter = this.directionChangeInterval;
        }

        // Wrap around sides
        if (this.x < 0) this.x = width;
        else if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        else if (this.y > height) this.y = 0;

        return false; // Monster is still alive, don't remove
    }

    display() {
        push();
        translate(this.x, this.y);

        // Handle death animation - zoom in effect
        if (this.isDying) {
            scale(this.deathScale);
            tint(255, this.deathAlpha); // Apply alpha for fade out
        }

        // Face direction (only if not dying)
        if (!this.isDying) {
            if (this.vx > 0) rotate(0);
            else if (this.vx < 0) rotate(PI);
            else if (this.vy > 0) rotate(PI / 2);
            else if (this.vy < 0) rotate(-PI / 2);
        }

        // Colored glow
        let c = this.color;
        drawingContext.shadowColor = `rgb(${red(c)}, ${green(c)}, ${blue(c)})`;
        drawingContext.shadowBlur = 15;

        imageMode(CENTER);
        // Draw colored circle behind image for visibility
        fill(red(c), green(c), blue(c), this.isDying ? this.deathAlpha : 255);
        noStroke();
        circle(0, 0, this.size * 1.2);

        if (this.isDying) {
            // During death animation, tint the image
            tint(255, this.deathAlpha);
        } else {
            noTint(); // Show original image colors
        }
        image(this.img, 0, 0, this.size, this.size);

        // Reset tint after drawing
        noTint();

        pop();
    }
}

// Create connected maze using recursive backtracking algorithm
function createMaze() {
    let cols = floor(width / cellSize);
    let rows = floor(height / cellSize);

    // Ensure minimum size (must be odd for proper maze)
    if (cols < 11) cols = 11;
    if (rows < 11) rows = 11;
    if (cols % 2 === 0) cols += 1;
    if (rows % 2 === 0) rows += 1;

    // Initialize maze (1 = wall, 0 = path)
    maze = [];
    for (let y = 0; y < rows; y++) {
        maze[y] = [];
        for (let x = 0; x < cols; x++) {
            maze[y][x] = 1; // Start with all walls
        }
    }

    // Stack for backtracking
    let stack = [];
    // Start from (1, 1) - must be odd coordinates
    let startX = 1;
    let startY = 1;
    maze[startY][startX] = 0; // Mark as path
    stack.push({ x: startX, y: startY });

    // Directions: right, down, left, up
    let directions = [
        { x: 2, y: 0 },
        { x: 0, y: 2 },
        { x: -2, y: 0 },
        { x: 0, y: -2 },
    ];

    while (stack.length > 0) {
        let current = stack[stack.length - 1];
        let neighbors = [];

        // Find unvisited neighbors
        for (let dir of directions) {
            let nx = current.x + dir.x;
            let ny = current.y + dir.y;

            if (nx >= 1 && nx < cols - 1 && ny >= 1 && ny < rows - 1 && maze[ny][nx] === 1) {
                neighbors.push({ x: nx, y: ny, dir: dir });
            }
        }

        if (neighbors.length > 0) {
            // Choose random neighbor
            let next = random(neighbors);
            let nextX = next.x;
            let nextY = next.y;

            // Remove wall between current and next
            maze[nextY][nextX] = 0;
            maze[current.y + next.dir.y / 2][current.x + next.dir.x / 2] = 0;

            // Push to stack
            stack.push({ x: nextX, y: nextY });
        } else {
            // Backtrack
            stack.pop();
        }
    }

    // Create border walls
    for (let x = 0; x < cols; x++) {
        maze[0][x] = 1;
        maze[rows - 1][x] = 1;
    }
    for (let y = 0; y < rows; y++) {
        maze[y][0] = 1;
        maze[y][cols - 1] = 1;
    }
}

// Check if move is valid (not a wall)
function isValidMove(cellX, cellY) {
    if (
        cellX < 0 ||
        cellX >= floor(width / cellSize) ||
        cellY < 0 ||
        cellY >= floor(height / cellSize)
    ) {
        return false;
    }
    return maze[cellY] && maze[cellY][cellX] === 0;
}

// Create dots in all path cells
function createDots() {
    dots = [];
    let cols = floor(width / cellSize);
    let rows = floor(height / cellSize);

    for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
            if (maze[y][x] === 0) {
                // Place a dot in every path cell
                dots.push({
                    x: x * cellSize + cellSize / 2,
                    y: y * cellSize + cellSize / 2,
                    size: cellSize * 0.3, // Scale dot size with cell size
                });
            }
        }
    }
}

// Draw maze
function drawMaze() {
    fill(0, 255, 0); // Green walls (portfolio color)
    stroke(0, 255, 0);
    strokeWeight(1);

    let cols = floor(width / cellSize);
    let rows = floor(height / cellSize);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (maze[y] && maze[y][x] === 1) {
                rect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
}

// Draw dots
function drawDots() {
    fill(0, 255, 0); // Green dots (portfolio color)
    noStroke();

    for (let dot of dots) {
        circle(dot.x, dot.y, dot.size);
    }
}

function preload() {
    // Load image65.png specifically for Pac-Man
    pacmanImage = loadImage('images/image65.png');

    // Load other images for monsters
    for (let i = 0; i < imagePaths.length; i++) {
        if (i !== 64) {
            // Skip image65 (index 64)
            let img = loadImage(imagePaths[i]);
            images.push(img);
        }
    }
}

function setup() {
    container = document.getElementById('sketch-container');
    let containerWidth = container.offsetWidth - 40;
    let containerHeight = Math.max(container.offsetHeight - 40, 400);

    canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent('sketch-container');
    angleMode(RADIANS);
    colorMode(RGB);

    // Initialize colors after p5.js is ready
    initColors();

    // Scale cell size based on canvas size - make everything 2x bigger
    cellSize = floor(min(width, height) / 12.5); // Changed from /25 to /12.5 for 2x bigger cells
    if (cellSize < 40) cellSize = 40; // Increased minimum to 40
    if (cellSize > 80) cellSize = 80; // Increased maximum to 80
    // Ensure cellSize is reasonable for maze generation
    if (cellSize % 2 === 0) cellSize += 1;

    // Create maze immediately
    createMaze();
    createDots();

    // Wait a moment for canvas to be ready, then check images
    setTimeout(() => {
        checkImagesAndInit();
    }, 100);

    // Setup keyboard controls, mode toggle, and fullscreen button
    setupKeyboardControls();
    setupModeToggleButton();
    setupFullscreenButton();
}

function checkImagesAndInit() {
    // Check if Pac-Man image is loaded
    let pacmanReady = false;
    if (pacmanImage) {
        // Check if image has loaded by trying to access width
        try {
            // In p5.js, images have a width property that's > 0 when loaded
            // Also check if the image object has been created properly
            if (
                typeof pacmanImage.width !== 'undefined' &&
                pacmanImage.width > 0 &&
                pacmanImage.height > 0
            ) {
                pacmanReady = true;
                console.log(
                    'Pac-Man image loaded successfully:',
                    pacmanImage.width,
                    'x',
                    pacmanImage.height
                );
            } else {
                console.log(
                    'Pac-Man image width:',
                    pacmanImage.width,
                    'height:',
                    pacmanImage.height
                );
            }
        } catch (e) {
            console.log('Error checking Pac-Man image:', e);
        }
    } else {
        console.log('Pac-Man image object is null/undefined');
    }

    // Filter loaded monster images
    loadedImages = [];
    for (let i = 0; i < images.length; i++) {
        let img = images[i];
        try {
            if (img && typeof img.width !== 'undefined' && img.width > 0 && img.height > 0) {
                loadedImages.push(img);
            }
        } catch (e) {
            // Image not ready yet
        }
    }

    console.log('Pac-Man ready:', pacmanReady);
    console.log('Monster images ready:', loadedImages.length, '/', images.length);

    initAttempts++;

    if (pacmanReady && loadedImages.length >= 5) {
        initAttempts = 0; // Reset counter
        initGame();
    } else {
        // Wait a bit more and try again (max 10 seconds)
        if (initAttempts < maxInitAttempts) {
            setTimeout(() => {
                checkImagesAndInit();
            }, 200);
        } else {
            console.error('Timeout waiting for images to load. Starting game anyway...');
            console.log('Pac-Man image exists:', !!pacmanImage);
            // Start game even if images aren't fully loaded - the fallback shapes will be used
            if (pacmanImage || loadedImages.length > 0) {
                initGame();
            }
        }
    }
}

function initGame() {
    console.log('Initializing game...');
    console.log('Pac-Man image:', pacmanImage);
    console.log('Loaded images count:', loadedImages.length);

    // Ensure colors are initialized
    if (classicColors.length === 0) {
        initColors();
    }

    if (pacmanImage) {
        // Find a valid starting position for Pac-Man
        let startPos = findValidPosition();
        pacman = new PacMan(pacmanImage);
        pacman.x = startPos.x;
        pacman.y = startPos.y;
        pacman.size = cellSize * 0.8;

        // Initialize Pac-Man with a valid direction
        let cellX = floor(pacman.x / cellSize);
        let cellY = floor(pacman.y / cellSize);
        let directions = [
            { vx: 2, vy: 0 },
            { vx: -2, vy: 0 },
            { vx: 0, vy: 2 },
            { vx: 0, vy: -2 },
        ];
        for (let dir of directions) {
            let nextX = cellX + (dir.vx > 0 ? 1 : dir.vx < 0 ? -1 : 0);
            let nextY = cellY + (dir.vy > 0 ? 1 : dir.vy < 0 ? -1 : 0);
            if (isValidMove(nextX, nextY)) {
                pacman.vx = dir.vx;
                pacman.vy = dir.vy;
                break;
            }
        }

        console.log(
            'Pac-Man created at:',
            pacman.x,
            pacman.y,
            'with velocity:',
            pacman.vx,
            pacman.vy
        );

        // Create exactly 5 monsters from random images
        let numMonsters = min(5, loadedImages.length);
        monsters = [];
        for (let i = 0; i < numMonsters; i++) {
            if (loadedImages.length > 0) {
                let img = loadedImages[floor(random(loadedImages.length))];
                if (img && img.width > 0) {
                    let color = classicColors[floor(random(classicColors.length))];
                    let pos = findValidPosition();

                    let monster = new Monster(img, color, pos.x, pos.y);
                    monster.size = cellSize * 0.75;

                    // Initialize monster with a valid direction
                    let cellX = floor(monster.x / cellSize);
                    let cellY = floor(monster.y / cellSize);
                    let directions = [
                        { vx: 1.5, vy: 0 },
                        { vx: -1.5, vy: 0 },
                        { vx: 0, vy: 1.5 },
                        { vx: 0, vy: -1.5 },
                    ];
                    for (let dir of directions) {
                        let nextX = cellX + (dir.vx > 0 ? 1 : dir.vx < 0 ? -1 : 0);
                        let nextY = cellY + (dir.vy > 0 ? 1 : dir.vy < 0 ? -1 : 0);
                        if (isValidMove(nextX, nextY)) {
                            monster.vx = dir.vx;
                            monster.vy = dir.vy;
                            break;
                        }
                    }

                    monsters.push(monster);
                    console.log(
                        `Monster ${i} created at:`,
                        pos.x,
                        pos.y,
                        'with velocity:',
                        monster.vx,
                        monster.vy
                    );
                }
            }
        }
        console.log('Monsters created:', monsters.length);
        console.log('Game initialized successfully!');
    }
}

function findValidPosition() {
    let cols = floor(width / cellSize);
    let rows = floor(height / cellSize);
    let attempts = 0;

    while (attempts < 200) {
        let x = floor(random(2, cols - 2));
        let y = floor(random(2, rows - 2));

        if (maze[y] && maze[y][x] === 0) {
            return {
                x: x * cellSize + cellSize / 2,
                y: y * cellSize + cellSize / 2,
            };
        }
        attempts++;
    }

    // Fallback - find first available path
    for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
            if (maze[y] && maze[y][x] === 0) {
                return {
                    x: x * cellSize + cellSize / 2,
                    y: y * cellSize + cellSize / 2,
                };
            }
        }
    }

    // Last resort
    return { x: width / 2, y: height / 2 };
}

function draw() {
    background(0); // Black background

    // Display current control mode
    fill(0, 255, 0);
    textAlign(LEFT, TOP);
    textSize(14);
    textFont('Courier New');
    let modeText = controlMode === 'auto' ? 'Mode: AUTO' : 'Mode: MANUAL (Arrow Keys)';
    text(modeText, 10, 10);

    // Check for game over condition
    let gameOver = dots.length === 0 && pacman && maze.length > 0;

    if (!gameOver) {
        // Draw maze
        if (maze.length > 0) {
            drawMaze();
            drawDots();
        }

        // Draw and update Pac-Man
        if (pacman) {
            pacman.update();
            pacman.display();
        }

        // Draw and update monsters
        for (let i = monsters.length - 1; i >= 0; i--) {
            let monster = monsters[i];
            let shouldRemove = monster.update(); // Returns true when death animation is complete

            if (shouldRemove) {
                monsters.splice(i, 1); // Remove monster after animation
            } else {
                monster.display();
            }
        }
    } else {
        // Game Over - show message
        fill(0, 255, 0);
        textAlign(CENTER, CENTER);
        textSize(48);
        textFont('Courier New');
        text('GAME OVER!', width / 2, height / 2 - 40);
        textSize(24);
        text(`Score: ${pacman ? pacman.score : 0}`, width / 2, height / 2 + 20);
        textSize(18);
        text('All dots collected!', width / 2, height / 2 + 60);
    }

    // Show debug info
    if (!pacmanImage) {
        fill(0, 255, 0);
        textAlign(CENTER, CENTER);
        textSize(16);
        textFont('Courier New');
        text('Loading Pac-Man image...', width / 2, height / 2);
    } else if (loadedImages.length < 5) {
        fill(0, 255, 0);
        textAlign(CENTER, CENTER);
        textSize(16);
        textFont('Courier New');
        text(`Loading monster images... (${loadedImages.length}/5)`, width / 2, height / 2);
    } else if (!pacman) {
        fill(0, 255, 0);
        textAlign(CENTER, CENTER);
        textSize(16);
        textFont('Courier New');
        text('Initializing game...', width / 2, height / 2);
    }
}

function windowResized() {
    if (isFullscreen) {
        resizeCanvas(windowWidth, windowHeight);
    } else {
        let containerWidth = container.offsetWidth - 40;
        let containerHeight = Math.max(container.offsetHeight - 40, 400);
        resizeCanvas(containerWidth, containerHeight);
    }

    // Scale cell size based on canvas size
    cellSize = floor(min(width, height) / 12.5); // 2x bigger cells
    if (cellSize < 40) cellSize = 40; // Increased minimum to 40
    if (cellSize > 80) cellSize = 80; // Increased maximum to 80
    if (cellSize % 2 === 0) cellSize += 1;

    // Recreate maze and reset positions
    createMaze();
    createDots();
    if (pacman) {
        let pos = findValidPosition();
        pacman.x = pos.x;
        pacman.y = pos.y;
        pacman.size = cellSize * 0.8;
        for (let monster of monsters) {
            pos = findValidPosition();
            monster.x = pos.x;
            monster.y = pos.y;
            monster.size = cellSize * 0.75;
        }
    }
}

function setupKeyboardControls() {
    // Set up keyboard event listeners
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                keyDirections.up = true;
                e.preventDefault();
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                keyDirections.down = true;
                e.preventDefault();
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                keyDirections.left = true;
                e.preventDefault();
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                keyDirections.right = true;
                e.preventDefault();
                break;
        }
    });

    document.addEventListener('keyup', (e) => {
        switch (e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                keyDirections.up = false;
                e.preventDefault();
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                keyDirections.down = false;
                e.preventDefault();
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                keyDirections.left = false;
                e.preventDefault();
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                keyDirections.right = false;
                e.preventDefault();
                break;
        }
    });
}

function setupModeToggleButton() {
    const modeBtn = document.getElementById('mode-toggle-btn');
    if (modeBtn) {
        modeBtn.addEventListener('click', toggleControlMode);
        updateModeButtonText();
    }
}

function toggleControlMode() {
    controlMode = controlMode === 'auto' ? 'manual' : 'auto';
    updateModeButtonText();

    // Reset key directions when switching modes
    keyDirections.up = false;
    keyDirections.down = false;
    keyDirections.left = false;
    keyDirections.right = false;
}

function updateModeButtonText() {
    const modeBtn = document.getElementById('mode-toggle-btn');
    if (modeBtn) {
        modeBtn.textContent = controlMode === 'auto' ? 'Manual Mode' : 'Auto Mode';
        modeBtn.title =
            controlMode === 'auto'
                ? 'Switch to manual control (use arrow keys)'
                : 'Switch to automatic control';
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
        if (sketchContainer.requestFullscreen) {
            sketchContainer.requestFullscreen();
        } else if (sketchContainer.webkitRequestFullscreen) {
            sketchContainer.webkitRequestFullscreen();
        } else if (sketchContainer.msRequestFullscreen) {
            sketchContainer.msRequestFullscreen();
        }
        isFullscreen = true;
    } else {
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
        setTimeout(() => {
            resizeCanvas(windowWidth, windowHeight);
            // Scale cell size based on canvas size - make everything bigger
            cellSize = floor(min(width, height) / 25); // Changed from /40 to /25 for bigger cells
            if (cellSize < 20) cellSize = 20; // Increased minimum from 12 to 20
            if (cellSize > 40) cellSize = 40; // Increased maximum from 25 to 40
            if (cellSize % 2 === 0) cellSize += 1;
            createMaze();
            createDots();
            if (pacman) {
                let pos = findValidPosition();
                pacman.x = pos.x;
                pacman.y = pos.y;
                pacman.size = cellSize * 0.8;
                for (let monster of monsters) {
                    pos = findValidPosition();
                    monster.x = pos.x;
                    monster.y = pos.y;
                    monster.size = cellSize * 0.75;
                }
            }
        }, 100);
    } else {
        isFullscreen = false;
        setTimeout(() => {
            let containerWidth = container.offsetWidth - 40;
            let containerHeight = Math.max(container.offsetHeight - 40, 400);
            resizeCanvas(containerWidth, containerHeight);
            // Scale cell size based on canvas size - make everything bigger
            cellSize = floor(min(width, height) / 25); // Changed from /40 to /25 for bigger cells
            if (cellSize < 20) cellSize = 20; // Increased minimum from 12 to 20
            if (cellSize > 40) cellSize = 40; // Increased maximum from 25 to 40
            if (cellSize % 2 === 0) cellSize += 1;
            createMaze();
            createDots();
            if (pacman) {
                let pos = findValidPosition();
                pacman.x = pos.x;
                pacman.y = pos.y;
                pacman.size = cellSize * 0.8;
                for (let monster of monsters) {
                    pos = findValidPosition();
                    monster.x = pos.x;
                    monster.y = pos.y;
                    monster.size = cellSize * 0.75;
                }
            }
        }, 100);
    }
}
