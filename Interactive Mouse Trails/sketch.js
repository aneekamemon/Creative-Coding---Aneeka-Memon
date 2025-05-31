let circleX, circleY, circleSize;
// To determine the position and size of the circle 
let isAttached = false;
// This checks if the circle is following the mouse
let trailOpacity = 2.5;
// Opacity of the circle trails 
let erasetool;
// An erase tool added to remove the circles if needed
function setup() {
  createCanvas(windowWidth, windowHeight);
//   the canvas takes up the whole window.
  erasetool = color(130, 94, 92)
//   erasetool has been set to the background color
  background(erasetool);
  
  noFill();
  strokeWeight(2.6);
//   the stroke of the circle trails
}

function draw() {
  background(erasetool.levels[0], erasetool.levels[1], erasetool.levels[2], trailOpacity);
//   a trail effect added where the trails are circles with decreased opacity.
  if (isAttached) {
    circleX = constrain(mouseX, circleSize / 2, width - circleSize /2);
    circleY = constrain(mouseY, circleSize / 2, height - circleSize /2);
// allows for the circle to stay visible 
    
  }
  
  if (circleX && circleY) {
    stroke(20);
    circle(circleX, circleY, circleSize);
  }
//   circle is drawn onto the canvas over here with a dark outline different from the trails
  
//   eraser over here. 
  if (mouseIsPressed && mouseButton === RIGHT) {
    noStroke();
    fill(erasetool);
    circle(mouseX, mouseY, 70);
  }

}



  function mousePressed(event) {
    if (mouseButton === LEFT) {
      isAttached = !isAttached;
      
      if (isAttached) {
        circleSize = random(20, 250);
//         circles set to random sizes, that change where the left toggle is clicked 
        circleX = constrain(mouseX, circleSize / 2, width - circleSize / 2);
        circleY = constrain(mouseY, circleSize / 2, height - circleSize / 2);
      }
    }
    
    return false;
  }