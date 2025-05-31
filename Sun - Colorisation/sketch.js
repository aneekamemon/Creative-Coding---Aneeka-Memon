function setup() {
    createCanvas(400, 400);
  }
  
  function draw() {
  //   This is the background color - blue
    background(30, 139, 195);
    
  //  This is the sun, its colored yellow
    
    fill(255, 240, 0);
    ellipse(100, 150, 90, 90)
    
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
    
    
  }