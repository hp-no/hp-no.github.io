// Grid Based Game

let grid, block;
let gridDimensions = 30;
let cellWidth, cellHeight;
let layer = 0;
let dx = 1;

function setup() {
  // Note: MAKE CHANGES TO DO windowwidth *windowwidth OR windowHeight*windowHeight
  createCanvas(windowWidth*0.9, windowHeight*0.9);
  grid = createEmpty2DArray(gridDimensions, gridDimensions);
  
  cellWidth = width/gridDimensions;
  cellHeight = height/gridDimensions;

  block = {
    x: 0,
    y: gridDimensions-2 //- layer, temporarily 5
  };

  //put block on grid
  grid[block.y][block.x] = 9;
}

function draw() {
  background(220);
  displayGrid();

  if (frameCount % 5 === 0) {
    moveBlocks(block.x+dx);
  }
}

// function mousePressed() {
//   let cellWidth = width/gridDimensions;
//   let cellHeight = height/gridDimensions;

//   let cellX = Math.floor(mouseX/cellWidth);
//   let cellY = Math.floor(mouseY/cellHeight);

//   if (grid[cellY][cellX] === 1) {
//     grid[cellY][cellX] = 0;
//   }
//   else if (grid[cellY][cellX] === 0) {
//     grid[cellY][cellX] = 1;
//   }
// }

function moveBlocks(newX) {
  if (newX-1 >= 0 && newX+1 < gridDimensions) {
    //set previous location to empty
    grid[block.y][block.x-1] = 0; //back end
    grid[block.y][block.x] = 0; //middle block
    grid[block.y][block.x+1] = 0; //front end
    block.x = newX;
  
    //fill in new location spot
    grid[block.y][block.x-1] = 9; //back end
    grid[block.y][block.x] = 9; //middle block
    grid[block.y][block.x+1] = 9; //front end
  }
  else {
    dx = -dx;
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