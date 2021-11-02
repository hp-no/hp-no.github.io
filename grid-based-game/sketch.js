// Grid Based Game

// ***Input comment header here****

// To Do: After finishing the basic function, work on the "deletion of blocks", add # of blocks present to OOP constructors
// If part of platform does not overlap the stack, delete the non-overlapping blocks 
// (implement a function/code that checks to see # of blocks that overlap and creates a new platform according to that #)


let platformArray = [];
let startingPlatform;
let grid, block;
let state = "idle";
let gridDimensions = 30;
let cellWidth, cellHeight;
let row = 0; //let layer = 0
let dx = 1;

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth*0.9, windowWidth*0.9);
  }
  else {
    createCanvas(windowHeight*0.9, windowHeight*0.9);
  }
  grid = createEmpty2DArray(gridDimensions, gridDimensions);

  cellWidth = width/gridDimensions;
  cellHeight = height/gridDimensions;

  startingPlatform = new Platform(width/2, -1); // base foundation/platform the player stacks on

  let thePlatform = new Platform(random(gridDimensions), row);
  platformArray.push(thePlatform);

  // block = {
  //   x: 0,
  //   y: gridDimensions-2,
  //   speed: 5, //the lower the number, the faster
  // };
}

function draw() {
  background(220);
  displayGrid();

  startingPlatform.place();
  platformArray[0].move();
  
  // if (frameCount % block.speed === 0) {
  //   moveBlocks(block.x + dx, block.y - layer); 
//     // problem: when block.y is set to newY, it keeps adding the layers to the new block., creating a loop of the blocks floating up
//     // idea(?): use OOP, when ENTER is pressed, spawn a new platform and change the state of the previous platform to stop the movement...
//     // platformArray = [];
//   }
}

class Platform {
  constructor(x, row) {
    this.x = x;
    this.y = gridDimensions-3 - row;
    this.dx = 3;
    this.state = "move";
  }

  move() {
    if (this.state === "move") {
      if (this.x-1 >= 0 && this.x+1 <= gridDimensions) {
        //set previous location to empty
        grid[this.y][this.x-1] = 0;
        grid[this.y][this.x] = 0;
        grid[this.y][this.x+1] = 0;
    
        this.x += this.dx;
    
        //fill in new location spot
        grid[this.y][this.x-1] = 9;
        grid[this.y][this.x] = 9;
        grid[this.y][this.x+1] = 9;
      }
      else {
        this.dx = -this.dx;
      }
    }
  }

  place() {
    this.state = "place"; // this stops the prior movement function
    grid[this.y][this.x-1] = 1;
    grid[this.y][this.x] = 1;
    grid[this.y][this.x+1] = 1;
  }
}

function keyPressed() {
  if (key === "k") {
    thePlatform.place(); // or platformArray[0].place();
    platformArray.pop;

    row++;

    let thePlatform = new Platform(random(gridDimensions), row);
    platformArray.push(thePlatform);
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


// Draft for using OOP in grid-based game:

// class Platform {
//   constructor(x, row) {
//     this.x = x;
//     this.y = gridDimensions-3 - row;
//     this.dx = 3;
//   }

//   moveOrPlace() {
//     if (state === "move") {
//       this.move();
//     }
//     else if (state === "place") {
//       this.place();
//     }
//   }

//   move() {
//     if (this.x-1 >= 0 && this.x+1 <= gridDimensions) {
//       //set previous location to empty
//       grid[this.y][this.x-1] = 0;
//       grid[this.y][this.x] = 0;
//       grid[this.y][this.x+1] = 0;
  
//       this.x += this.dx;
  
//       //fill in new location spot
//       grid[this.y][this.x-1] = 9;
//       grid[this.y][this.x] = 9;
//       grid[this.y][this.x+1] = 9;
//     }
//     else {
//       this.dx = -this.dx;
//     }
//   }

//   place() {
//     grid[this.y][this.x-1] = 1;
//     grid[this.y][this.x] = 1;
//     grid[this.y][this.x+1] = 1;

//     this.y -= 1;

//     state = "move";
//   }
// }


// OLD CODE:

// function moveBlocks(newX, newY) {
//   if (state === "idle") {
//     if (newX-1 >= 0 && newX+1 < gridDimensions) {
//       //set previous location to empty
//       grid[block.y][block.x-1] = 0; //back block
//       grid[block.y][block.x] = 0; //middle block
//       grid[block.y][block.x+1] = 0; //front block
  
//       block.x = newX;
//       block.y = newY;
  
//       //fill in new location spot
//       grid[block.y][block.x-1] = 9; //back block
//       grid[block.y][block.x] = 9; //middle block
//       grid[block.y][block.x+1] = 9; //front block
//     }
//     else {
//       dx = -dx;
//     }
//   }
//   else if (state === "new layer") {
//     placeBlocks(newX, newY);

//     state = "idle";
//     layer++;
//   }
// }

// function placeBlocks(x, y) {
//   grid[y][x-1] = 1; //back block
//   grid[y][x] = 1; //middle block
//   grid[y][x+1] = 1; //front block
// }