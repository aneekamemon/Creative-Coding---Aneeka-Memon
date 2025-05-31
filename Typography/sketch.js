let x, y;
let textColor;
// Variables being created to position the text and the text color

function setup() {
  createCanvas(1000, 1000);
  textAlign(CENTER, CENTER);
//   aligns the text in the center
  textSize(180);
  x = width / 2;
  y = height / 2;
// Text size is kept at 180pixels
}

function draw() {
    background(1, 1, 122);
// background is set to blue
  let atext = "Old is Gold";
  let textwidth = textWidth(atext);
  let textheight = textAscent() + textDescent();
// Calculating the width and height of the text used when hovering over the text to change the color. 
  
  if (mouseX > x - textwidth / 2 &&
      mouseX < x + textwidth / 2 &&
      mouseY > y - textheight / 2 &&
      mouseY < y + textheight / 2 ) {
    textColor = color(194, 249, 112);
//     This is used to check if the user is hovering over the text positions, if they are then the text color changes if not it remains the same.
  }
    else {
      textColor = color(249, 180, 45);
    }

  push();
  translate(x, y);
  rotate(frameCount * 0.02);
//   Text is made to rotate here based on the frame count speed.
  fill(textColor);
  stroke(0)
  text(atext, 0, 0);
  pop();
}