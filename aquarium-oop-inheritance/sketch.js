// Aquarium

let theCreatures = [];
let clownfishImg; //clownfish is just an orange fish
let octopusImg;

function preload() {
  clownfishImg = loadImage("assets/orange-fish.png");
  octopusImg = loadImage("assets/octopus.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i=0; i<50; i++) {
    if (random(100) < 30) {
      let octopus = new Octopus(random(width), random(height), 100, octopusImg);
      theCreatures.push(octopus);
    }
    else {
      let fish = new Clownfish(random(width), random(height), 30, clownfishImg);
      theCreatures.push(fish);
    }
  }
}

function draw() {
  background(220);
  for (let someCreature of theCreatures) {
    someCreature.update();
    someCreature.display();
  }
}

class Creature {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  update() {
    this.x += 2;
    this.y += sin(this.x/100);

    if (this.x > width) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = width;
    }
  }

  display() {
    fill("green");
    circle(this.x, this.y, this.size);
  }
}

class Clownfish extends Creature {
  constructor(x, y, size, theImage) {
    super(x, y, size);
    this.myImage = theImage;
  }

  update() {
    this.x -= 2;
    this.y += sin(this.x/100);
    
  }

  display() {
    image(this.myImage, this.x, this.y, this.size, this.size);
  }
}

class Octopus extends Creature {
  constructor(x, y, size, someImage) {
    super(x, y, size);
    this.image = someImage;
  }

  display() {
    image(this.image, this.x, this.y, this.size, this.size);
  }
}