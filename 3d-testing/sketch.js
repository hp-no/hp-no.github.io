
// Experimenting with 3D features and models
let smallBoat;

function preload() {
  smallBoat = loadModel("assets/boat_small.obj", true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(220);
  rotateY(frameCount * 0.01);
  model(smallBoat);
}
