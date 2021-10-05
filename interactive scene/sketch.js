// Interactive Scene: Claw Machine
// Hannah Dechavez
// Date: Oct 4/2021
  // Coding a working claw machine that utilizes the keyboard and mouse to control the machine.
  // Use left-right arrow keys or the "A" or "D" keys to move the   claw. 
  // Press the red button to drop crane/claw down


  // Extra for Experts: Making own shape using beginShape(POINTS) and incorporating sound(bgm).


//global variables
let bgm, distanceButton, distanceCat, distanceBall, button, clawButton, cat, catImg, ball, soccerImg, claw, cordLength, timeClawIsDown;

let speed = 3;
let buttonPressed = false;
let catGot = false;
let ballGot = false;

function preload() {
  soundFormats("mp3");
  bgm = loadSound("pleasant-porridge.mp3");
  
  catImg = loadImage("cat.png");
  soccerImg = loadImage("soccerBall.png");
}

function setup() {
  createCanvas(450, 400);
  angleMode(DEGREES);
  timeClawIsDown = millis();
  bgm.loop(); // music
  
  claw = {
    x: 150,
    ay: 100, // y position of the claw
    by: 55, // start of the claw's cord
    xRadius: 20, // horizontal radius
    yRadius: 22.5, // vertical radius
  };
  
  clawButton = {
    x: 90,
    y: 260,
    radius: 15,
  };
  
  ball = {
    x: 160,
    y: 207.5,
    radius: 22.5,
  };
  
  cat = {
    x: 85,
    y: 195,
    radius: 35,
  };
}

function draw() {
  background(255,230,220);
  distanceButton = dist(clawButton.x, clawButton.y, mouseX, mouseY);
  distanceCat = dist(claw.x,claw.ay, cat.x, cat.y);
  distanceBall = dist(claw.x, claw.ay, ball.x, ball.y)
  
  displayMachine();
  displayPrize();
  displayClaw();

  clawMovement();

  // time claw is down
  if (buttonPressed) {
    if(millis() > timeClawIsDown + 1500) {
      timeClawIsDown = millis();
      buttonPressed = false;
    }
  }
}

function displayMachine() {
  strokeWeight(1);
  fill(190);
  rect(40,50,230,185,3); // glass outline
  fill(130,130,255);
  rect(25,25,260,25,6); // top
  fill(245,250,255);
  rect(45,55,220,175); // middle/main component
  fill(200);
  rect(200,195,65,35);// drop hole  
  fill(130,130,255);
  rect(30,230,250,155,6); // bottom
  fill(240);
  rect(60,240,190,40,10); // control panel
  fill(130,130,200);
  rect(160,305,85,60,10); // drop slot

  strokeWeight(3);
  beginShape(POINTS); // screws/bolts
  vertex(40,240);
  vertex(40,375);
  vertex(270,375);
  vertex(270,240);
  endShape(CLOSE);
  
  displayMachineButton();  
}

function displayMachineButton() {
  if (distanceButton< clawButton.radius && !buttonPressed) {
    strokeWeight(2);
    fill(255,130,150);
  }
  else {
    strokeWeight(1);
    fill(255, 70, 100);
  }
  circle(clawButton.x,clawButton.y,clawButton.radius*2);
}

function mousePressed() {
    if (distanceButton < clawButton.radius && !buttonPressed) {
      buttonPressed = true;
    }
}    

function displayClaw() {
  if (buttonPressed) {
    //claw cord is extended
    cordLength = 180;
    claw.ay = 200;
    withinPrize();
  }
  
  else {
    // claw cord is retracted
    cordLength = 80;
    claw.ay = 100;
  }
  // display claw/crane
  strokeWeight(3);
  line(claw.x, claw.by, claw.x, cordLength);
  strokeWeight(1);
  fill(175);
  arc(claw.x, claw.ay, claw.xRadius*2, claw.yRadius*2 , 135, 45, PIE);
}

function displayPrize() {
  strokeWeight(1);
  imageMode(CENTER);
  image(catImg, cat.x, cat.y, cat.radius*2, cat.radius*2);
  image(soccerImg, ball.x, ball.y, ball.radius*2, ball.radius*2);
}

function withinPrize() {
  // if claw is within the range of a prize's center
    if (distanceCat < claw.xRadius) {
      catGot = true; 
    }
    if (distanceBall < claw.xRadius) {
      ballGot = true;
    }
  prizeWon();
}

function prizeWon() {
  // if prizes are gotten, prizes are brought out of the machine
  if (catGot) {
    cat.x = 390;
    cat.y = 310;
  }
  if (ballGot) {
    ball.x = 320;
    ball.y = 350;
  }
}

function clawMovement() {
  if (!buttonPressed) {
    
    // left wall border
    if (claw.x - claw.xRadius - speed >= 45) { 
      if (keyIsDown(65)) { // a
        claw.x -= speed;
      }
      if (keyIsDown(LEFT_ARROW)) { // <--
        claw.x -= speed;
      }
    }
    
    // right wall border
    if (claw.x + claw.xRadius + speed <= 265) {
      if (keyIsDown(68)) { // d
        claw.x += speed;
      }
      if (keyIsDown(RIGHT_ARROW)) { // -->
        claw.x += speed;
      }
    }
  }
}

/*
Music used: 
Pleasant Porridge by Kevin MacLeod
Link: https://incompetech.filmmusic.io/song/7614-pleasant-porridge
License: https://filmmusic.io/standard-license
*/