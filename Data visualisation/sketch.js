let dataset= [86.5, 61.2, 84.1, 55.1, 66.5, 80.6, 84.0, 81.7, 82.5, 82.0, 65.0, 71.6, 76.2, 70.4];
// The ages of the populations

// The different countries
let countries = ["Monaco", "Niger", "Andorra", "Chad", "Sudan", "Germany", "Spain", "Greece", "Portugal", "Slovenia", "Haiti", "Egypt", "Latvia", "Nepal"]



function setup() {
  createCanvas(900, 900);
//   canvas size and alignment of the texts
  textAlign(CENTER, CENTER);
  textSize(25);
//   title text size
}

function draw() {
  background(10, 10, 100);
  colorMode(HSB, 360, 120, 120, 120);
//   HSB used for the different brightness, saturation, and hue levels.
  
  fill(20);
  textSize(28);
  text("Countries and their life Expectancy", width / 2, 40);
//   text size of the labels
  textSize(15);
  
  for (let a = 0; a < dataset.length; a++) {
    let s = dataset[a];
    let m = map(a, 0, dataset.length, 0, width);
    let w = width / dataset.length;
    let h = map(s, 0, max(dataset), 0, 360);
    let y = height - h;
    
    let hueValu = map(s, 0, max(dataset), 0, 360);
//     color of the bars that are dependent on the dataset amounts.
//     checks if the user is hovering over the bars in the bar chart
    let isHovered = mouseX > m && mouseX < m + w && mouseY > y && mouseY < height;
    
    if (isHovered) {
      fill((hueValu +60 ) % 360, 100, 100);
      
    }  else {
      fill(hueValu, 100, 100)
    }
    rect(m, y, w, h );
//     bars are drawn here
    if (isHovered) {
      fill(0);
      text(s, m + w /2, y + h / 2);
    }
//     showcases the given value of the bar here (only when hovering over the bar)
    fill(0);
    text(countries[a], m + w /2, height - 10);
  }
//   names of the countries, these are always visible 
}