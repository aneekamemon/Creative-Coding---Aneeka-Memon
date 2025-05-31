let time = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  
//   This is the changing background that changes color once the sun switches to the moon.
  
  let backgroundColor = lerpColor(color(30, 139, 195), color(10, 19, 22), time);
  background(backgroundColor);
  
// This is the sun and its movement across the canvas
  
  let transition = PI * time;
  let xaxis = map(time, 0, 1, 50, 350);
  let yaxis = 300 - 200 * sin(transition);
  
// This is the transition that will occur
  
  let suntomooncolor = lerpColor(color(255, 240, 0), color(255), time);
  fill(suntomooncolor);
  noStroke();
  ellipse(xaxis, yaxis, 90, 90);
  
  
//   This is the portion of the moon that is shown to signifiy the nighttime
  if (time > 0.5) {
    fill(backgroundColor);
    ellipse(xaxis - -20, yaxis, 60, 60);
  }
  
  
  if (time > 0.06) {
    fill(255);
// These are the shimmering stars in the background
    for(let yoyo = 0; yoyo < 500; yoyo++) {
      ellipse(random(width), random (400), 2, 2)
      
    }
  }
  
  // This is the grass infront of the background
// It is colored green
  fill(30, 130, 76);
  rect(0, 300, width, 100);
// It is meant to take up the bottom portion of the canvas.
  
// This is the grass
  
  beginShape()
  stroke(110, 150, 40);
  for (let grass = 1;
      grass < width;
      grass += 4) {
    bezier(grass, 400, grass, 210, grass + 4, 320, grass + 12, 310);
  }
  endShape(CLOSE);
  
  time += 0.0025;
  if (time > 1) time = 0;
  
  
}