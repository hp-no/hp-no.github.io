// Grid Based Game: Pacman basics
// Hannah Dechavez
// Date: 2021-11-14
  // Coded a basic grid function of the Pacman game. The player can move around using the
  // WASD keys and can consume pellets on the spaces they move to on the grid.

  // Extra for experts:
    // Use of JSON files to save, create and load a custom grid layout
    // Use of sound effects when consuming the pellets
    // Utilized OOP in the code, both by itself and with an array. Incorporated OOP to -
    // possibly extend on in the future when implementing enemy characters or clones of the player

    
// Global variables
let grid, level;
let gridDimensions = 21;
let gridSize = gridDimensions;
let cellWidth, cellHeight;
let player;
let pelletArray = [];
let pelletEatenSound;

function preload() {
  level = loadJSON("assets/level1.json"); //assumes gridsize is 21
  pelletEatenSound = loadSound("assets/click-sound.wav"); // sound for when a pellet is consumed
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth*0.9, windowWidth*0.8);
  }
  else {
    createCanvas(windowHeight*0.9, windowHeight*0.8);
  }

  // grid setup
  cellWidth = width/gridDimensions;
  cellHeight = height/gridDimensions;
  grid = level;

  // store pellets in an array
  for (let y=0; y<gridDimensions; y++) {
    for (let x=0; x<gridDimensions; x++) {
      let thePellet = new Pellet(x, y);
      pelletArray.push(thePellet);
    }
  }

  // create player
  player = new Character(1, gridDimensions-2, "yellow");
}

function draw() {
  background(220);
  displayGrid();
  displayPellets();

  player.display();
}

function keyPressed() {
  // WASD player movement
  if (key === "w") { // up
    player.moveTo(player.x, player.y-1);
  }
  if (key === "a") { // left
    player.moveTo(player.x-1, player.y);
  }
  if (key === "s") { // down
    player.moveTo(player.x, player.y+1);
  }
  if (key === "d") { // right
    player.moveTo(player.x+1, player.y);
  }
}

function displayPellets() {
  let p = 0; // position within the pellet array
  for (let y=0; y<gridDimensions; y++) {
    for (let x=0; x<gridDimensions; x++) {
      if (grid[y][x] === 0) { 
        pelletArray[p].display();
      }
      p++;
    }
  }
}

function displayGrid() {
  for (let y=0; y<gridDimensions; y++) {
    for (let x=0; x<gridDimensions; x++) {
      if (grid[y][x] === 0) { // pellet occupies this space
        fill(0);
      }
      if (grid[y][x] === 1) { // blue square/wall occupies this space
        fill("blue");
      }
      if (grid[y][x] === 9) { // empty space
        fill(0);
      }
      noStroke();
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
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
    //play sound if new location has a pellet
    if (grid[newY][newX] === 0) {
      pelletEatenSound.play();
    }

    //make sure there's no walls before moving
    if (grid[newY][newX] !== 1) {
      this.x = newX;
      this.y = newY;
      grid[this.y][this.x] = 9;
    }
  }
}
