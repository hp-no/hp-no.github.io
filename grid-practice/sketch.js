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
  theCat.display();
  player.display();
  // movePlayer();
}

class Character {
  constructor(x, y, theColor) {
    this.x = x;
    this.y = y;
    this.dx = cellWidth; //cellWidth*0.07;
    this.dy = cellHeight; //cellHeight*0.07;
    this.radius = (cellWidth+cellHeight)/2*0.325;
    this.theColor = theColor;
  }
   
  display() {
    fill(this.theColor);
    circle(this.x*cellWidth + cellWidth/2, this.y*cellHeight + cellHeight/2, this.radius*2);
  }

  randomMovement() {
    grid[this.y][this.x] = 9;
  }
}


function keyPressed() {
  if (key === "w") {
    if (grid[player.y - player.dy][player.x] === 0) {
     player.y -= player.dy;
   }

  }
  if (key === "a") {
    newLocation(player.x - player.dx, player.y);
  }
  if (key === "s") {
    newLocation(player.x, player.y + player.dy);
  }
  if (key === "d") {
    newLocation(player.x + player.dx, player.y);
  }
}

function newLocation(newX, newY) {
  return grid[newY][newX] === 0;
}

// function movePlayer() {
//   if (keyIsDown(87)) {
//     player.y -= player.dy;
//   }
//   if (keyIsDown(65)) {
//     player.x -= player.dx;
//   }
//   if (keyIsDown (83)) {
//     player.y += player.dy;
//   }
//   if (keyIsDown(68) && grid[player.y][player.x+1] === 0) {
//     player.x += player.dx;
//   }
// }

function mousePressed() {
  let cellWidth = width/gridSize;
  let cellHeight = height/gridSize;

  let cellX = Math.floor(mouseX/cellWidth);
  let cellY = Math.floor(mouseY/cellHeight);

  if (grid[cellY][cellX] === 1) {
    grid[cellY][cellX] = 0;
  }
  else if (grid[cellY][cellX] === 0) {
    grid[cellY][cellX] = 1;
  }
}

function displayGrid() {
  for (let y=0; y<gridDimensions; y++) {
    for (let x=0; x<gridDimensions; x++) {
      if (grid[y][x] === 0) {
        fill(0);
      }
      else if (grid[y][x] === 1) {
        fill("blue");
      }
      else if (grid[y][x] === 9) {
        fill("red");
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