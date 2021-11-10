// Grid Based Game
let grid, level;
let gridDimensions = 21;
let gridSize = gridDimensions;
let cellWidth, cellHeight;
let theCat, player;

function preload() {
  level = loadJSON("assets/level1.json"); //assumes gridsize is 21
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth*0.9, windowWidth*0.8);
  }
  else {
    createCanvas(windowHeight*0.9, windowHeight*0.8);
  }
  
  cellWidth = width/gridDimensions;
  cellHeight = height/gridDimensions;
  grid = level;

  theCat = new Character(1, 1, "pink");
  player = new Character(1, gridDimensions-2, "yellow");
}

function draw() {
  background(220);
  displayGrid();
  if (frameCount % 30 === 0) {
    theCat.randomMovement();
  }
  theCat.display();
  player.display();

}

class Character {
  constructor(x, y, theColor) {
    this.x = x;
    this.y = y;
    this.radius = (cellWidth+cellHeight)/2*0.325;
    this.theColor = theColor;

  }

  display() {
    fill(this.theColor);
    circle(this.x*cellWidth + cellWidth/2, this.y*cellHeight + cellHeight/2, this.radius*2);
  }

  randomMovement() {
    let choice = random(100);
    if (choice < 25) { // down
      while (grid[this.x][this.y-1] === 0) {
        this.moveTo(this.x, this.y-1);
      }
    }
    else if (choice < 50) { // up
      this.moveTo(this.x, this.y+1);
    }
    else if (choice < 75) { // left
      this.moveTo(this.x-1, this.y);
    }
    else { // right
      this.moveTo(this.x+1, this.y);
    }
  }

  moveTo(newX, newY) {
    //make sure there's no walls before moving
    if (grid[newY][newX] === 0) {
      this.x = newX;
      this.y = newY;
    }
  }
}

function keyPressed() {
  if (key === "w") {
    player.moveTo(player.x, player.y-1);
  }
  if (key === "a") {
    player.moveTo(player.x-1, player.y);
  }
  if (key === "s") {
    player.moveTo(player.x, player.y+1);
  }
  if (key === "d") {
    player.moveTo(player.x+1, player.y);
  }
}

// function mousePressed() {
//   let cellWidth = width/gridSize;
//   let cellHeight = height/gridSize;

//   let cellX = Math.floor(mouseX/cellWidth);
//   let cellY = Math.floor(mouseY/cellHeight);

//   if (grid[cellY][cellX] === 1) {
//     grid[cellY][cellX] = 0;
//   }
//   else if (grid[cellY][cellX] === 0) {
//     grid[cellY][cellX] = 1;
//   }
// }

function displayGrid() {
  for (let y=0; y<gridDimensions; y++) {
    for (let x=0; x<gridDimensions; x++) {
      if (grid[y][x] !== 1) {
        fill(0);
      }
      if (grid[y][x] === 1) {
        fill("blue");
      }
      noStroke();
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}

function createBase2DArray(rows, cols) {
  let grid = [];
  for (let y=0; y<rows; y++) {
    grid.push([]);
    for (let x=0; x<cols; x++) {
      if (x === 0 || x === gridDimensions-1 || y === 0 || y === gridDimensions-1) {
        grid[y].push(1);
      }
      else {
        grid[y].push(0);
      }
    }
  }
  return grid;
}