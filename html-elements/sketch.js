//html elements demo
let someText;

function setup() {
  let canvas = createCanvas(300, 300);
  canvas.position(500, 400);

  someText = createP("Some HTML string");
  someText.position(500, 200);
  someText.style("color", "green");
  someText.style("font-size", "20pt");
}

function draw() {
  background(220);
  circle(mouseX, mouseY, 100);

}

function mousePressed() {
  someText.html("Something <em>else</em> belongs here...");
}
