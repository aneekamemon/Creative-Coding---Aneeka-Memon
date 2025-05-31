function setup() {
    createCanvas(400, 400);
    background(210, 30, 50);
  
  }
  
  function draw() {
    
    alien(width / 2, height / 2 + 50 );
  } 
  
  function alien(xaxis, yaxis) {
    push();
    translate(xaxis, yaxis);
    
    
    
    
  // The body of the alien
    fill(710, 255, 120);
    stroke(1);
    strokeWeight(1.5);
    beginShape();
    vertex(-40, 0);
    bezierVertex(-60, -120, 70, -120, 50, 0);
    bezierVertex(35, 60, -25, 60, -40, 0);
    endShape(CLOSE);
    
    
  // Head of the alien
    noStroke();
    fill(40, 215, 120);
    ellipse(5, -120, 80, 100)
    
    
  // eyes of the alien
    fill(0);
    ellipse(-12, -125, 15, 26)
  //   Left eye
    ellipse(15, -125, 15, 26)
  //   Right eye
  //   Pupils
    fill(220);
    ellipse(-15, -125, 5, 6)
    ellipse(13, -125, 5, 6)
  
    
  // Ears of the alien
    
    stroke(710, 255, 120);
    strokeWeight(9);
    line(-20, -160, -65, -210);
    line(20, -160, 65, -210);
    noStroke();
    push();
    fill(15, 100, 20);
    ellipse(-72, -220, 20, 20);
    ellipse(72, -220, 20, 20);
    pop();
  
    
  // Arms and legs of the alien
    
    stroke(40, 215, 120);
    strokeWeight(8);
    noFill();
    scale(1.5);
    
    bezier(-35, -20, -70, 20 ,-70, 80, -60, 80);
    bezier(42, -10, 80, -60, 100, -60, 90, -110);
    
    strokeWeight(15);
    line(-10, 40, -10, 80);
    line(15, 40, 15, 80);
    noStroke();
    fill(15, 100, 20);
    ellipse(-10, 90, 20, 10);
    ellipse(15, 90, 20, 10);
    
  }