// === GLOBAL VARIABLES ===
let letters = []; // Stores OrbitLetter objects
let message = "Welcome to Bath Spa University"; // Message to display
let centerX, centerY, angleStep; // Center position and angular spacing
let assembling = false; // Flag to start assembling animation
let assembleTimer = 120; // Time delay before assembling starts
let spacing = 44; // Spacing between letters when assembled
let showRings = true, ringAlpha = 180; // Controls for background rings
let stars = []; // Starfield background
let blueCircles = []; // Floating blue circle particles
let bgColor1, bgColor2; // Background gradient colors
let t = 0; // Interpolation timer for gradient
let started = false; // Whether animation has started (after mouse press)
let assembled = false; // Whether all letters are fully assembled
let gradientColors = []; // Array of background gradient colors
let isLightBackground = false; // Used to adjust text/particle brightness

// === AUDIO VARIABLES ===
let sound, fft;
let beatThreshold = 0.2; // Threshold for detecting beats
let lastBeatTime = 0; // Timestamp of last detected beat
let beatInterval = 300; // Minimum interval between beats in ms
let explosions = []; // Array for beat-based explosion particles

// === PRELOAD SOUND ===
function preload() {
  soundFormats('mp3', 'wav');
  sound = loadSound('intro.mp3'); // Load background music
}

// === SETUP FUNCTION ===
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 255); // Use HSB for easier color transitions
  textFont('Montserrat Extra Bold');
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  textSize(80); // Initial font size

  centerX = width / 2;
  centerY = height / 2;
  angleStep = TWO_PI / message.length;

  // Create orbiting letter objects
  for (let i = 0; i < message.length; i++) {
    let angle = i * angleStep;
    let radius = random(120, 350);
    letters.push(new OrbitLetter(message[i], angle, radius, i));
  }

  // Starfield background
  for (let i = 0; i < 200; i++) {
    stars.push({ x: random(width), y: random(height), size: random(0.5, 2), alpha: random(100, 255) });
  }

  // Floating blue/white circles
  for (let i = 0; i < 40; i++) {
    blueCircles.push({
      x: random(width),
      y: random(height),
      r: random(30, 100),
      baseR: random(30, 100),
      hue: random(190, 220),
      alpha: random(20, 70),
      speedX: random(-0.15, 0.15),
      speedY: random(-0.1, 0.1),
      pulseOffset: random(TWO_PI)
    });
  }

  // Gradient color palette
  bgColor1 = color(220, 80, 20);
  bgColor2 = color(220, 80, 20);
  gradientColors = [
    color(330, 100, 100), color(290, 90, 100), color(250, 80, 100),
    color(200, 100, 100), color(160, 90, 100), color(120, 100, 100),
    color(60, 100, 100)
  ];

  fft = new p5.FFT(); // For sound analysis
}

// === MAIN DRAW FUNCTION ===
function draw() {
  if (!started) return; // Wait for user interaction

  drawAnimatedBackground(); // Dynamic background
  drawBlueWhiteCircles(); // Floating visual particles

  // Begin assembling letters after timer
  if (!assembling) {
    assembleTimer--;
    if (assembleTimer <= 0) assembling = true;
  }

  // Update and display all orbiting or assembled letters
  assembled = true;
  for (let l of letters) {
    l.update();
    l.display();
    if (!l.assembled) assembled = false;
  }

  // Fade and remove rings once letters start assembling
  if (assembling && ringAlpha > 0) {
    ringAlpha -= 3;
    if (ringAlpha <= 0) {
      ringAlpha = 0;
      showRings = false;
    }
  }

  // Visual extras
  if (showRings) drawMinimalRings();
  if (assembled && !showRings) drawSparkles();

  // Sound-based beat explosion visuals
  detectBeat();
  drawExplosions();
}

// === BACKGROUND ===
function drawAnimatedBackground() {
  if (assembled) {
    t += 0.005;
    if (t > 1) {
      t = 0;
      bgColor1 = bgColor2;
      bgColor2 = random(gradientColors);
    }
  }

  let currentColor = lerpColor(bgColor1, bgColor2, t);
  background(currentColor);
  isLightBackground = brightness(currentColor) > 75;

  // Animated stars
  noStroke();
  for (let s of stars) {
    fill(210, 20, 100, s.alpha * 0.6);
    ellipse(s.x, s.y, s.size + sin(frameCount * 0.02 + s.x) * 0.5);
  }
}

// === BLUE CIRCLES ===
function drawBlueWhiteCircles() {
  noStroke();
  for (let c of blueCircles) {
    // Move and pulse
    c.x += c.speedX;
    c.y += c.speedY;
    c.r = c.baseR + 8 * sin(frameCount * 0.02 + c.pulseOffset);

    // Wrap around screen edges
    if (c.x > width) c.x = 0;
    if (c.x < 0) c.x = width;
    if (c.y > height) c.y = 0;
    if (c.y < 0) c.y = height;

    fill(c.hue, 30, 90, c.alpha * 0.5);
    ellipse(c.x, c.y, c.r);
  }
}

// === RINGS AROUND CENTER ===
function drawMinimalRings() {
  noFill();
  strokeWeight(1);
  translate(centerX, centerY);

  for (let r = 120; r <= 360; r += 120) {
    let hue = map(sin(r * 0.01 + frameCount * 0.01), -1, 1, 180, 220);
    stroke(hue, 40, 100, ringAlpha * 0.4);
    ellipse(0, 0, r + sin(frameCount * 0.01 + r * 0.02) * 10);
  }

  resetMatrix();
}

// === SPARKLES ON TEXT ===
function drawSparkles() {
  for (let i = 0; i < 10; i++) {
    let x = centerX - 180 + random(360);
    let y = centerY - 40 + random(80);
    let size = random(1, 3);
    let alpha = 180 + 75 * sin(frameCount * 0.1 + i);

    fill(isLightBackground ? 0 : 255, alpha);
    noStroke();
    ellipse(x, y, size);
  }
}

// === SOUND BEAT DETECTION ===
function detectBeat() {
  let spectrum = fft.analyze();
  let energy = fft.getEnergy("bass");
  let now = millis();

  if (energy > 200 && now - lastBeatTime > beatInterval) {
    lastBeatTime = now;
    triggerExplosion();
  }
}

// === CREATE PARTICLE EXPLOSIONS ===
function triggerExplosion() {
  let pos = {
    x: random(width * 0.2, width * 0.8),
    y: random(height * 0.2, height * 0.8)
  };

  for (let i = 0; i < 50; i++) {
    explosions.push({
      x: pos.x,
      y: pos.y,
      angle: random(TWO_PI),
      speed: random(2, 5),
      life: 255,
      size: random(2, 5),
      color: color(random(360), 100, 100)
    });
  }
}

// === DRAW EXPLOSION PARTICLES ===
function drawExplosions() {
  for (let p of explosions) {
    p.x += cos(p.angle) * p.speed;
    p.y += sin(p.angle) * p.speed;
    p.life -= 4;

    fill(p.color.levels[0], p.color.levels[1], p.color.levels[2], p.life);
    noStroke();
    ellipse(p.x, p.y, p.size);
  }

  explosions = explosions.filter(p => p.life > 0);
}

// === CLASS: OrbitLetter ===
class OrbitLetter {
  constructor(char, angle, radius, index) {
    this.char = char;
    this.angle = angle;
    this.radius = radius;
    this.speed = random(0.005, 0.01);
    this.sizePulse = random(0, TWO_PI);
    this.opacity = 0;
    this.index = index;
    this.targetX = 0;
    this.targetY = 0;
    this.x = centerX + cos(angle) * radius;
    this.y = centerY + sin(angle) * radius;
    this.assembled = false;
  }

  update() {
    this.sizePulse += 0.04;

    if (assembling) {
      if (this.targetX === 0 && this.targetY === 0) {
        let totalWidth = message.length * spacing;
        this.targetX = centerX - totalWidth / 2 + this.index * spacing;
        this.targetY = centerY;
      }
      this.x = lerp(this.x, this.targetX, 0.08);
      this.y = lerp(this.y, this.targetY, 0.08);

      if (dist(this.x, this.y, this.targetX, this.targetY) < 1) {
        this.opacity = lerp(this.opacity, 255, 0.05);
        this.assembled = true;
      }
    } else {
      this.angle += this.speed;
      this.x = centerX + cos(this.angle) * this.radius;
      this.y = centerY + sin(this.angle) * this.radius;
      this.opacity = 120;
    }
  }

  display() {
    let lerpFactor = map(this.index, 0, message.length - 1, 0, 1);
    let hue = 210;
    let saturation = lerp(20, 80, lerpFactor);
    let brightnessVal = lerp(95, 100, lerpFactor);
    let alphaVal = this.opacity;

    push();
    translate(this.x, this.y);

    if (!assembling) {
      let orbitSize = 32 + 2 * sin(this.sizePulse);
      fill(210, 80, 100, 40);
      noStroke();
      ellipse(0, 0, orbitSize + 20);
      fill(isLightBackground ? 0 : 255, alphaVal);
      textSize(orbitSize + 24);
      text(this.char, 0, 0);
    } else {
      let floatY = sin(frameCount * 0.02 + this.index) * 6;
      let swayX = 4 * sin(frameCount * 0.02 + this.index);
      translate(swayX, floatY);

      let pulse = 60 + 18 * sin(frameCount * 0.05 + this.index);
      fill(hue, saturation, brightnessVal, 30);
      noStroke();
      ellipse(0, 0, pulse);

      drawingContext.shadowColor = `hsla(${hue}, ${saturation}%, ${brightnessVal}%, 0.7)`;
      drawingContext.shadowBlur = 16;

      fill(isLightBackground ? 0 : color(hue, saturation, brightnessVal), alphaVal);
      textSize(80 + 18 * sin(this.sizePulse));
      text(this.char, 0, 0);
    }

    pop();
  }
}

// === START ANIMATION ON MOUSE PRESS ===
function mousePressed() {
  started = true;
  if (!sound.isPlaying()) {
    sound.play();
  }
}

// === ADJUST TO WINDOW SIZE CHANGES ===
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centerX = width / 2;
  centerY = height / 2;
}