// Grid Based Game

let grid, block;
let gridDimensions = 30;
let cellWidth, cellHeight;
let layer = 0;
let dx = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createEmpty2DArray(gridDimensions, gridDimensions);
  
  cellWidth = width/gridDimensions;
  cellHeight = height/gridDimensions;

  block = {
    blockX: 0,
    blockY: gridDimensions - layer,
  };
}

function draw() {
  background(220);
  // displayGrid();

  // // if (frameCount % 10 === 0) {
  moveBlocks(blockX+1, blockY);
  // }

}

function mousePressed() {
  let cellWidth = width/gridDimensions;
  let cellHeight = height/gridDimensions;

  let cellX = Math.floor(mouseX/cellWidth);
  let cellY = Math.floor(mouseY/cellHeight);

  if (grid[cellY][cellX] === 1) {
    grid[cellY][cellX] = 0;
  }
  else if (grid[cellY][cellX] === 0) {
    grid[cellY][cellX] = 1;
  }
}

function moveBlocks(newX) {
  grid[blockY][x-1] = 1;
  grid[blockY][x] = 1;
  grid[blockY][x+1] = 1;

}

function displayGrid() {
  for (let y = 0; y<gridDimensions; y++) {
    for (let x=0; x<gridDimensions; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      }
      else if (grid[y][x] === 1) {
        fill("black");
      }
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}

function createEmpty2DArray(rows, cols) {
  let grid = [];
  for (let y=0; y<rows; y++) {
    grid.push([]);
    for (let x=0; x<cols; x++) {
      grid[y].push(0);
    }
  }
  return grid;
}