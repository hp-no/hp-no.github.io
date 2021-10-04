let speed = 3;
let radius = 15;
let item1, item2, claw;
let cordlength = 80;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);

  claw = {
    x: 150,
    ay: 55,
    by: 100,
  };

  item1 = {
    x: ,
    y: ,
  };

  item2 = {
    x: ,
    y: ,
  };
}

function draw() {
  background(220);
  
  displayMachine();
}

function displayMachine() {
  strokeWeight(1);

  fill(190);
  rect(40,50,230,185,3); // glass outline
  
  fill(130,130,255);
  rect(25,25,260,25,6); // top
  
  // displayItems();
  displayClaw();
  
  fill(245,250,255);
  rect(45,55,220,175,245); // middle/main component
  
  fill(200);
  rect(200,195,65,35);// drop hole  
  
  fill(230, 100, 120);
  // fill(130,130,255);
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
  
  strokeWeight(1);
  fill(255, 70, 100);
  circle(90,260,radius*2); // button
  
}

function displayClaw() {
  strokeWeight(3);
  line(claw.x,claw.ay,claw.x,cordLength);
  
  strokeWeight(1);
  fill(175);
  arc(claw.x,claw.by,40,45,135,45,PIE);
  
}

// function movement() {
//   if (!button) {
//     while (x > 100 && x < 300) { 
//       if (keyIsDown(65)) { // a
//         x -= speed;
//       }
//       if (keyIsDown(68)) { // d
//         x += speed;
//       }
//       if (keyIsDown(LEFT_ARROW)) { // <--
//         x -= speed;
//       }
//       if (keyIsDown(RIGHT_ARROW)) { // -->
//         x += speed;
//       }
//     }
//   }
// }


// soccer ball + cat plush + monkey ball // toy capsule
// claw has to drop down within the coordinates/borders of plushie, else there is no chance plushie can be got
// if claw DOES fall within the guidelines/range of plushie, then there will be a 1/2 chance of plushie actually being gotten 
  //  use (rand)
//if it goes inbetween 2 plushies, it wont get either, has to get the plushie dead-on