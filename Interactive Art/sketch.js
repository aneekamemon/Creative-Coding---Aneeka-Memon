let a = [], b = [];
let column, rows;
// The grid dimensions
// and the pixel sizes
let size = 5; 
let p = 0, q = 1;
// The diffusion rates
let dA = 1.0, dB = 0.5;
let feed = 0.055, sqa = 0.062;
// the addition and removal rates 
let mouseRadius = 10;
// The size of the mouse when adding color.




function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100);
//   HSB used for the colors 
  column = floor(width/size);
  rows = floor(height/size);
// width and height of the grid
  
  for (let i = 0; i < column; i++) {
    a[i] = [];
    b[i] = [];
    for (let j = 0; j < rows; j++) {
      a[i][j] = [1, 1]; // Substance A
      b[i][j] = [0, 0]; // Substance B
    }
  }
  
// The pattern shown in the center of the canvas
  for (let i = column/2 - 10; i < column/2 + 5; i++) {
    for (let j = rows/2 - 5; j < rows/2 + 2; j++) {
      b[i][j][p] = 1;
    }
  }
}

function draw() {
  background(0);
  
    if (mouseIsPressed) {
    let mx = floor(mouseX / size);
    let my = floor(mouseY / size);
//     the color added when the user clicks on the mouse
    for (let x = mx - mouseRadius; x <= mx + mouseRadius; x++){
//       A circular brush used to display the color.
      for (let y = my - mouseRadius; y <= my + mouseRadius; y++) {
        if (dist(mx, my, x, y) <= mouseRadius) {
          let boxx = (x + column) % column;
          let boxy = (y + rows) % rows;
          b[boxx][boxy][p] = 1;
        }
      }
    }
  }
    for (let i = 0; i < column; i++) {
    for (let j = 0; j < rows; j++) {
      let cA = a[i][j][p];
      let cB = b[i][j][p];
      
      let reaction = cA * cB * cB; 
      
      let lapA = laplace(a, i, j);
      let lapB = laplace(b, i, j);
      
      a[i][j][q] = constrain(cA + (dA * lapA - reaction + feed * (1 - cA)), 0, 1);
      b[i][j][q] = constrain(cB + (dB * lapB + reaction - (sqa + feed) * cB), 0, 1);
    }
  }
  
    noStroke();
  for (let i = 0; i < column; i++) {
    for (let j = 0; j < rows; j++) {
      let c = a[i][j][p];
      

      let hue = map(c, 0, 1, 80, 160);
      let sat = map(c, 0, 1, 80, 100);
      let brt = map(c, 0, 1, 210, 10);
      
      fill(hue, sat, brt);
      rect(i * size, j * size, size, size);
    }
  }
  
    [p, q] = [q, p];
  
}
// diffusion of the color is calculated here 
  function laplace(grid, xaxis, yaxis) {
  let sum = 0;
  sum += grid[xaxis][yaxis][p] * -1;
    
  sum += grid[wrapX(xaxis+1)][yaxis][p] * 0.2;
  sum += grid[wrapX(xaxis-1)][yaxis][p] * 0.2;
  sum += grid[xaxis][wrapY(yaxis+1)][p] * 0.2;
  sum += grid[xaxis][wrapY(yaxis-1)][p] * 0.2;
//   directions of the pattern
  sum += grid[wrapX(xaxis-1)][wrapY(yaxis-1)][p] * 0.05;
  sum += grid[wrapX(xaxis-1)][wrapY(yaxis+1)][p] * 0.05;
  sum += grid[wrapX(xaxis+1)][wrapY(yaxis-1)][p] * 0.05;
  sum += grid[wrapX(xaxis+1)][wrapY(yaxis+1)][p] * 0.05;
//   patterns emerged similar to the gray-scott model, showcasing shapes similar to biological forms of life.
  return sum;
}

function wrapX(xaxis) {
  return (xaxis + column) % column;
}

function wrapY(yaxis) {
  return (yaxis + rows) % rows;
}

function keyPressed() {
  if (key === 's') setup();
//   artwork is reset if the key 's' is pressed.
}