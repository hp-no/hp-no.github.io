// Grid Based Game

// ***Input comment header here****

// To Do: After finishing the basic function, work on the "deletion of blocks", 
// ***Incorporate the # of blocks present to OOP constructors***
// If part of platform does not overlap the stack, delete the non-overlapping blocks (keeps track of # of blocks still alive in platform)
// (implement a function/code that checks to see # of blocks that overlap and creates a new platform according to that #)
// Include a restart screen, where if you lose all your blocks or want to restart, with the click of a button on screen/keyboard,
// game restarts/load its original state (clears all blocks, restarts layers, platform #1); USE A FUNCTION TO DO THIS
// Fix and neaten up code + comments

//Incorporate a "if blocks !== 0" thing

// If incorportating a start/title menu, incorporate removeElments(); command to get remove the text and move onto the game screen
// what is touchStarted();?

// Global Variables

let grid; //block
let gridDimensions = 30;
let cellWidth, cellHeight;

let platformArray = [];
let startingPlatform;
let removedBlocks = 0;
let row = 0; //let layer = 0
let dx = 1;
let state = "idle";



function setup() {
  // Establish a grid
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth*0.9, windowWidth*0.9);
  }
  else {
    createCanvas(windowHeight*0.9, windowHeight*0.9);
  }
  grid = createEmpty2DArray(gridDimensions, gridDimensions);

  cellWidth = width/gridDimensions;
  cellHeight = height/gridDimensions;

  // Create inital platforms
  startingPlatform = new Platform(width/2, -1, removedBlocks); // base foundation/platform the player stacks on
  let thePlatform = new Platform(random(gridDimensions), row, removedBlocks);
  platformArray.push(thePlatform);

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
  constructor(x, row, removedBlocks) {
    this.x = x;
    this.y = gridDimensions-3 - row;
    this.dx = 3;
    this.state = "move";
    this.platformLength = 3 - removedBlocks;
  }

  move() {
    if (this.state === "move") {
      if (this.x-1 >= 0 && this.x+1 <= gridDimensions) {
        // //set previous location to empty
        // grid[this.y][this.x-1] = 0;
        // grid[this.y][this.x] = 0;
        // grid[this.y][this.x+1] = 0;
    
        // this.x += this.dx;
    
        // //fill in new location spot
        // grid[this.y][this.x-1] = 9;
        // grid[this.y][this.x] = 9;
        // grid[this.y][this.x+1] = 9;

        for (let i = -1; i < this.platformLength - 1; i++)
      }
      else {
        this.dx = -this.dx;
      }
    }
  }

  place() {
    this.state = "place"; // stops platform movement

    for (let i = -1; i <= 1; i++) {
    // checks if there is a block on row below
      if (grid[this.y - 1][this.x + i] === 1) { 
        grid[this.y][this.x + i] = 1; // if true, places block down
      }
      else {
        numberOfBlocks -= 1; // if false, removes the block
      }
    }
  }
}

function keyPressed() {
  if (key === "k") {
    thePlatform.place(); // or platformArray[0].place();
    platformArray.pop;

    row++;

    let thePlatform = new Platform(random(gridDimensions), row, numberOfBlocks);
    platformArray.push(thePlatform);
  }
}

function displayGrid() {
  for (let y=0; y<gridDimensions; y++) {
    for (let x=0; x<gridDimensions; x++) {
      noStroke();
      if (grid[y][x] === 0) {
        fill("white");
      }
      else if (grid[y][x] === 1) {
        fill("black");
      }
      else if (grid[y][x] === 9) {
        stroke();
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