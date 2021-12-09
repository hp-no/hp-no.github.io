// Circle Recursion

let theColors = ["blue", "white", "yellow", "red", "orange", "violet", "beige", "brown"];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  recursiveCircle(width/2, height/2, height, 0);
}

function recursiveCircle(x, y, diameter, level) {
  fill(theColors[level]);
  circle(x, y, diameter);

  if (diameter > 50) {
    recursiveCircle(x - (mouseX/width/2)*diameter, y - (mouseY/width/2)*diameter, diameter/2, level+1);
    recursiveCircle(x + (mouseX/width/2)*diameter, y + (mouseY/width/2)*diameter, diameter/2, level+1);
    recursiveCircle(x - (mouseX/width/2)*diameter, y + (mouseY/width/2)*diameter, diameter/2, level+1);
    recursiveCircle(x + (mouseX/width/2)*diameter, y - (mouseY/width/2)*diameter, diameter/2, level+1);
  }
}