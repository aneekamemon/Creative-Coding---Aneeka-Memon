var image, xaxis, yaxis;
function preload() {
  image = loadImage("flower.jpeg");
}

// Image is loaded over here


function setup() {
  createCanvas(400, 400);
  background(0);
  noStroke();
}

function draw() {
  xaxis = random(width);
  yaxis = random(height);
  
  var color = image.get(xaxis, yaxis);
  fill(color[0], color[1], color[2], 90);
  
  ellipse(xaxis, yaxis, 60, 60)
}

// Color of the 60 by 60 circles are captured through the x and y axis that is allocated to random