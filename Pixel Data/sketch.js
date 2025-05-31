var picture, xaxis, yaxis;
function preload() {
picture = loadImage("flower.jpeg");
}
// Preload the flower image over here

function setup() {
  createCanvas(400, 400);
  background(0);
  noStroke();
}
// Set up a background


function draw() {
  background(0);
  xaxis = mouseX;
  yaxis = mouseY;
  image(picture , 0 ,0);
  var color = get(xaxis, yaxis);
  fill(color);
  ellipse(xaxis, yaxis, 100, 100);
}

// The x/yaxis work as the mouse axis and a 100, 100 circle is colored with the color the mouse hovers over.