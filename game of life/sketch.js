// Game Of Life
let grid = [];
let gridSize = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  create2dArray(gridSize, gridSize);
}

function draw() {
  background(220);
}

function displayGrid() {
  
}

function create2dArray(rows, cols) {
  for (let y=0; y<rows; y++) {
    grid.push([]);
    for (let x=0; x<cols; x++) {
      grid[y].push(0);
    }
  }
}