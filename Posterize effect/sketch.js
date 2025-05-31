var yoyo;
function preload() {
  yoyo = loadImage("flower.jpeg")
}


function setup() {
  createCanvas(400, 400);
    background(220);

}

function draw() {
  background(0);
  image(yoyo, 0, 0);
  var position = map(mouseX, 0, width, 2, 20);
  filter(POSTERIZE, position);
}