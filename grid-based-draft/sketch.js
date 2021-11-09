// Grid Based Game
let grid, block;
let gridDimensions = 20;
let cellWidth, cellHeight;
let layer = 0;
let dx = 1;
let row = 0;
state = "move";

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth*0.9, windowWidth*0.9);
  }
  else {
    createCanvas(windowHeight*0.9, windowHeight*0.9);
  }
  grid = createBase2DArray(gridDimensions, gridDimensions);
  
  cellWidth = width/gridDimensions;
  cellHeight = height/gridDimensions;

  block = {
    x: 0,
    y: gridDimensions-2,
    speed: 4, //the lower the number, the faster
  };

}

function draw() {
  background(220);
  displayGrid();
    
  if (frameCount % block.speed === 0) {
    moveBlocks(block.x + dx, block.y); 
  }
}

function keyPressed() {
 if (key === "r") {
   placeBlocks();
   block.y -= 1;
   state = "move";
 }
}

function moveBlocks(newX) {
  if (state === "move") {
    if (newX-1 >= 0 && newX+1 < gridDimensions) {
      //set previous location to empty
      grid[block.y][block.x-1] = 0; //back block
      grid[block.y][block.x] = 0; //middle block
      grid[block.y][block.x+1] = 0; //front block
  
      block.x = newX;
  
      //fill in new location spot
      grid[block.y][block.x-1] = 9; //back block
      grid[block.y][block.x] = 9; //middle block
      grid[block.y][block.x+1] = 9; //front block
    }
    else {
      dx = -dx;
    }
  }
}

function placeBlocks() {
  state = "placing";
  for (let i = -1; i <= 1; i++) { 
    // if (grid[this.y - 1][this.x + i] === 1) { // if true, places block down
    grid[block.y][block.x + i] = 1; 
    // }
    // else if (grid[this.y][this.x + i] === 0) { // if it's an empty space, removes a block from platform
    //   removedBlocks++; 
    // }
  }
}


function displayGrid() {
  for (let y=0; y<gridDimensions; y++) {
    for (let x=0; x<gridDimensions; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      }
      else if (grid[y][x] === 1) {
        fill("black");
      }
      else if (grid[y][x] === 9) {
        fill("red");
      }
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}

function createBase2DArray(rows, cols) {
  let grid = [];
  for (let y=0; y<rows; y++) {
    grid.push([]);
    for (let x=0; x<cols; x++) {
      if (x === 0 || x === gridDimensions || y === 0 || y === gridDimensions) {
        grid[y].push(1);
      }
      else {
        grid[y].push(0);
      }
    }
  }
  return grid;
}