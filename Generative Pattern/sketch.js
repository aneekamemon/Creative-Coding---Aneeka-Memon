let pattern = [];
let yoyo;  
// The number of columns of the pattern
let rows;
// The number of rows of the pattern
let size = 50;
// The size of each pink box 


class box {
  constructor(x, y){
    this.x = x;
//     Positions of the boxes
    this.y = y;
    this.angle = 0;
  }

  
//   This is what showcases the boxes
  display(){
    push();
    translate(this.x, this.y);
    rotate(this.angle);
//     rotates the box in their spot.
    fill(255, 100, 200);
    rectMode(CENTER);
    rect(0, 0, size, size);
//     Color and size of the boxes
    pop();
  }
  
  move(speed) {
    this.angle +=speed;
  }
}

function setup() {
  createCanvas(600, 600);
  yoyo = width/size;
  rows = height/size;
  
  for(let yurp=0; yurp < yoyo; yurp++) {
    pattern[yurp] = []; 
//     grid of the boxes are created here
    for(let a=0; a< rows; a++) {
      let b = size/2 + yurp*size;
      let c = size/2 + a*size;
      pattern[yurp][a] = new box(b, c);
    }
  }
}

function draw() {
  background(20, 20, 90);
//   background color - dark blue
  for (let yurp = 0; yurp < yoyo; yurp++) {
  for (let a= 0; a < rows; a++){
  pattern[yurp][a].display();
  pattern[yurp][a].move(0.025);
//     The speed at which the boxes rotate
    }
  }
}