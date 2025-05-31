let size = 65;
// Size of each cube 
let num = 10;
let grid = [];
let min = 120;
// brightness threshold for the cubes where showcasing sound
// Song is the audio file
let song;
let fft;
// used for audio analysis 
let spectrum = [];
// stores the frequency data of the song
let distFromCenter = [];


// Loading the sound file 
function preload() {
  song = loadSound("song.mp3");
}


function setup() {
//   3D canvas set up for the cube over here
  createCanvas(650, 650, WEBGL);
  song.play();
//   Plays the soundtrack over here
  fft = new p5.FFT();
//   audio analysis starts here
  for (let a = 0; a <num; a++) {
    grid[a] = [];
    for (let b = 0; b<num; b++) {
      grid[a][b]= [];
      for (let c = 0; c < num; c++) {
        grid[a][b][c] = floor(random(2));
        
        let offset = size/2 - num/2*size;
        let x = a*size + offset;
        let y = b*size + offset;
        let z = c*size + offset;
        let frm = dist(a, b, c, 0, 0, 0);
//         storing the positions of the cubes 
        distFromCenter.push({a, b, c, frm});
      }
    }
  }
  
    distFromCenter.sort(compareDistances);
}
  function compareDistances(yoyo, box) {
  return yoyo.frm - box.frm;

}

function draw() {
  background(20, 20, 50);
  orbitControl();
//   background color 
// and orbit control to allow the user to observe the cube and the cube squares
  
    spectrum = fft.analyze();
  let vol = fft.getEnergy(20, 140);
  if (vol > 240) {
//     volume adjustments to showcase the volume level through the brightness of the cubes
    stroke(155, 255, 10, 20);
  } else {
    stroke(120, 20);
//     color of the cube where there is no noise
  }
  
  let totalCubes = num*num*num;
  for (let a=0; a<totalCubes; a++) {
    let pos = distFromCenter[a];
    let cee = map(spectrum[a], 0, 255, min, 255);
    grid[pos.a][pos.b][pos.c] = cee;
  }
  
  let offset = size/2 -num/2 * size
  translate(offset, offset, offset);
  noFill();
  for (let a=0; a<num; a++) {
    for (let b=0; b<num; b++) {
      for (let c=0; c<num; c++) {
        if (grid[a][b][c] > min) {
          fill(grid[a][b][c], 20, 30);
//           Where the colors change depending on the sound levels
        } else {
          noFill();
        }
        
        
        push();
        translate(a*size, b*size, c*size);
        box(size - size/4);
        pop();
      }
    }
  }

}