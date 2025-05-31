function setup() {
    createCanvas(800, 400);
  }
  
  // The background has been set to 800 in length and 400 in height 
  
  function draw() {
    background(210);
    
  // The background has been set to a greylike color
    
  // This is the code for the back tire
    fill(10);
    ellipse(220, 300, 90, 90);
  //   Another circle in the tire for design
    fill(40);
    ellipse(220, 300, 75, 75);
  
  // Same concept once again for the smaller front tire
    
    fill(10);
    ellipse(570, 305, 80, 80);
    fill(40);
    ellipse(570, 305, 65, 65);
    
  // This is the body of the car
    
  // The color for the body is blue
    
    fill(4, 59, 92);
    beginShape();
    vertex(130, 295);
    vertex(220, 250);
    vertex(370, 220);
    vertex(430, 220);
    vertex(480, 250);
    vertex(570, 250);
    vertex(590, 240);
    vertex(620, 240);
    vertex(620, 295);
    vertex(180, 300);
    endShape(CLOSE);
    
  // Some design elements for the car
    
    fill(50);
    rect(350, 260, 100, 5);
    rect(375, 225, 50 , 3);
    
  // Design element in front of the car
    fill(255);
    rect(600, 275, 60, 15);
    rect(615, 235, 10, 40);
    
    
  // Design element for the rear side of the car
    rect(180, 215, 20, 60);
    rect(130, 215, 60, 9);
    
  // A shadow for the car
  
    fill(0 , 40);
    ellipse((190 + 580) / 2, 330, 600, 20);
    
    
    
  
  }