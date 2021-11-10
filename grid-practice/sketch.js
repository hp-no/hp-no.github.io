// Grid Based Game
let grid, level;
let gridDimensions = 21;
let gridSize = gridDimensions;
let cellWidth, cellHeight;
let theGhost, player;
let pelletArray = [];

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

  theGhost = new Character(1, 1, "pink");
  player = new Character(1, gridDimensions-2, "yellow");

}

function draw() {
  background(220);
  displayGrid();
  player.display();

  // if (frameCount % 20 === 0) {
  //   theGhost.randomMovement();
  // }
  // theGhost.display();

}

class Pellet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = (cellWidth+cellHeight)/2*0.1;
    this.theColor = "white";
  }

  display() {
    if (grid[this.y][this.x] === 0) {
      fill(this.theColor);
      circle(this.x*cellWidth + cellWidth/2, this.y*cellHeight + cellHeight/2, this.radius*2);
    }
  }
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

  moveTo(newX, newY) {
    //make sure there's no walls before moving
    if (grid[newY][newX] === 0 || grid[newY][newX] === 9) {
      this.x = newX;
      this.y = newY;
      grid[this.y][this.x] = 9;
    }
  }

  randomMovement() { //for ghosts
    // if (this.y > player.y && grid[this.x][this.y-1] === 0) { // up
    //   this.moveTo(this.x, this.y-1);
    // }
    // else if (this.x > player.x && grid[this.x-1][this.y] === 0) { // left
    //   this.moveTo(this.x-1, this.y);
    // } 
    // else if (this.x < player.x && grid[this.x+1][this.y] === 0) { // right
    //   this.moveTo(this.x+1, this.y);
    // }
    // else if (this.y < player.y && grid[this.x][this.y+1] === 0) { //down
    //   this.moveTo(this.x, this.y+1);
    // }
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

function displayGrid() {
  n = 0; //number of pellets
  for (let y=0; y<gridDimensions; y++) {
    for (let x=0; x<gridDimensions; x++) {
      if (grid[y][x] === 0) {
        fill(0);
      }
      if (grid[y][x] === 1) {
        fill("blue");
      }
      if (grid[y][x] === 9) {
        
        fill(0);
      }
      noStroke();
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);

      if (grid[y][x] === 0) {
        let thePellet = new Pellet(x, y);
        pelletArray.push(thePellet);
        pelletArray[n].display();
        n++;
      }
    }
  }
}