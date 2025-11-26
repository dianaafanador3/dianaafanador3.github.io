class Mold {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.radius = 1;
        this.rotAngle = 45;
        this.sensorAngle = 45;

        this.heading = random(360);
        this.vx = cos(this.heading);
        this.vy = sin(this.heading);

        this.rSensor = new Sensor(10);
        this.fSensor = new Sensor(10);
        this.lSensor = new Sensor(10);
    }

    display() {
        noStroke();
        fill(0, 255, 0); // Portfolio green color #00ff00
        ellipse(this.x, this.y, this.radius, this.radius);
    }

    update() {
        this.vx = cos(this.heading);
        this.vy = sin(this.heading);

        this.x = (this.x + this.vx + width) % width;
        this.y = (this.y + this.vy + height) % height;

        this.rSensor.update(this.x, this.y, this.heading + this.sensorAngle);
        this.lSensor.update(this.x, this.y, this.heading - this.sensorAngle);
        this.fSensor.update(this.x, this.y, this.heading);

        let r = this.rSensor.getPixel();
        let l = this.lSensor.getPixel();
        let f = this.fSensor.getPixel();

        if (f > l && f > r) {
            this.heading += 0;
        } else if (f < l && f < r) {
            if (random(1) < 0.5) {
                this.heading += this.rotAngle;
            }
        } else if (l > r) {
            this.heading += -this.rotAngle;
        } else if (r > l) {
            this.heading += this.rotAngle;
        }
    }
}

class Sensor {
    constructor(distance) {
        this.pos = createVector(0, 0);
        this.distance = distance;
    }

    update(x, y, angle) {
        this.pos.x = (x + this.distance * cos(angle) + width) % width;
        this.pos.y = (y + this.distance * sin(angle) + height) % height;
    }

    getPixel() {
        // Ensure coordinates are within bounds
        let x = floor(this.pos.x);
        let y = floor(this.pos.y);

        // Check bounds
        if (x < 0 || x >= width || y < 0 || y >= height) {
            return undefined; // or return null/0 if out of bounds
        }

        // Calculate index accounting for pixel density
        // Each pixel has 4 values (R, G, B, A)
        // With pixel density, the actual array width is width * d
        let index = 4 * (y * d * width * d + x * d);

        // Clamp index to array bounds
        if (index >= pixels.length || index < 0) {
            return undefined;
        }

        return pixels[index + 1];
    }
}
