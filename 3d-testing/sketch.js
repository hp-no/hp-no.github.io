let p5 = require("p5");

// Experimenting with 3D features and models
let smallBoat;
let bottle, bottleCoords;

function preload() {
  smallBoat = loadModel("assets/boat_small.obj", true);
  bottle = loadModel("assets/bottle.obj", true);
}

function setup() {
  createCanvas(windowWidth*0.95, windowHeight*0.95, WEBGL);
  bottleCoords = new p5.Geometry();
}

function draw() {
  background(220);
  rotateX(135);
  // rotateY(frameCount * 0.01);
  model(bottle);
}
