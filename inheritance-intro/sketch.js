// OOP Inheritance Demo

let car;

function setup() {
  createCanvas(windowWidth, windowHeight);
  car = new Car("Civic");
}

class Vehicle {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }

  getName() {
    return this.name;
  }

  getType() {
    return this.type;
  }
}

function draw() {
  background(220);
}

class Car extends Vehicle { //subclass
  constructor(name) {
    super(name, "car");
  }

  getName() {
    return "This car is a " + super.getName();
  }
}

