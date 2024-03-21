var x = 200;
var y = 400;
var x2 = 300;
var y2 = 300;

let badGuy = [];

let synth1;
let synth2;
let scale1 = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];
let scale2 = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3'];
let sequence1 = [3, 5, 4, 6, 0, 2, 4];
let sequence2 = [1, 3, 2, 4, 5, 0, 6];
let index = 0;
let hero;
let rupee;


function setup() {
  createCanvas(400, 400);
  background(200);
  hero = new HERO();
  rupee = new RUPEE();
  synth1 = new p5.MonoSynth();
  synth1.setADSR(0.1, 0.5, 0.1, 0.5);

  synth2 = new p5.MonoSynth();
  synth2.setADSR(0.4, 1, 1, .25);

  getAudioContext().suspend();

  for (let b = 0;  b < 3;  b++){
    badGuy[b] = new BADGUYS();
  }
}

function mousePressed(){
userStartAudio();
playSequence();
}

function playSequence() {
  index = 0;
  setInterval(playNote, 500);
}

function playNote() {
  let treble = scale1[sequence1[index]];
  let bass = scale2[sequence2[index]];
  synth1.play(treble, 0, 0, 0.1);
  synth2.play(bass, 0, 0, 0.1);
  index++;
  index=index % sequence1.length;
  
  if (index >= sequence1.length) {
    clearInterval();
  }
   if (index >= sequence2.length) {
       clearInterval();
  }
}

class HERO {
  constructor() {
    this.x = x;
    this.y = y;
    this.w = 63;
    this.h = 75;
    console.log("initial this.x pos =", this.x);
    this.xspeed = random(-2, 2);
    this.yspeed = random(-2, 2);
  }

  displayHero(){
  //////CHARACTER
  //torso
  beginShape();
  noStroke();
  fill(0, 150, 0);
  rectMode(CENTER);
  rect(this.x, this.y - 5, 40, 35, 5);
  endShape();
  
  //belt
  stroke(150, 75, 0);
  strokeWeight(4);
  line(this.x + 20, this.y, this.x - 20, this.y);

  //head
  ellipseMode(CENTER);
  strokeWeight(0);
  fill(241,194,125);
  ellipse(this.x, this.y - 30, 30);

  //hair
  fill(150, 75, 0);
  rect(this.x, this.y - 37, 40, 5);

  //feet
  fill("green");
  rectMode(CORNER);
  rect(this.x - 18, this.y + 10, 10, 9, 4);
  rectMode(CORNER);
  rect(this.x + 10, this.y + 10, 10, 9, 4);

  //hand
  fill(241,194,125);
  rectMode(CORNER);
  rect(this.x + 20, this.y - 10, 10, 12, 4);

  //hat
  beginShape();
  fill(0, 150, 0);
  triangle(this.x, this.y - 55, this.x - 15, this.y - 40, this.x + 15, this.y - 40);
  endShape();

  //ears
  fill(241,194,125);
  triangle(this.x - 25, this.y - 40, this.x - 15, this.y - 35, this.x - 15, this.y - 20);
  triangle(this.x + 25, this.y - 40, this.x + 15, this.y - 35, this.x + 15, this.y - 20);

  //shield
  beginShape();
  fill(150, 75, 0);
  vertex(this.x - 13, this.y - 25);
  vertex(this.x - 30, this.y - 25);
  vertex(this.x - 30, this.y + 10);
  vertex(this.x - 15, this.y + 17);
  vertex(this.x, this.y + 10);
  vertex(this.x, this.y - 25);
  vertex(this.x - 13, this.y - 25);
  endShape();
  stroke(255, 155, 0);
  strokeWeight(4);
  line(this.x, this.y - 10, this.x - 30, this.y - 10);
  line(this.x - 15, this.y - 25, this.x - 15, this.y + 15);

  //sword
  rectMode(CORNER);
  noStroke();
  fill(255);
  rect(this.x + 23, this.y - 33, 3, 22);

  //eyes
  fill(150, 75, 0);
  ellipse(this.x + 10, this.y - 30, 5);
  ellipse(this.x - 10, this.y - 30, 5);

  // // //collider
  // noFill();
  // stroke(0);
  // strokeWeight(.25);
  // rect(this.x-32, this.y-55, this.w, this.h);
  }

  moveHero(){
    if (keyCode === UP_ARROW && keyIsPressed) {
      this.y = this.y - 2;
    }
    
    if (keyCode === DOWN_ARROW && keyIsPressed) {
     this.y = this.y + 2;
    }
  
    if (keyCode === LEFT_ARROW && keyIsPressed) {
      this.x = this.x - 2;
    } 
    
    if (keyCode === RIGHT_ARROW && keyIsPressed) {
      this.x = this.x + 2;
    }
  
    // if (this.x >= 400)
    // {
    // this.x = 0;
    // }
    //window boundaries

    if(this.x < 20){
      this.x = this.x + 3;
    }
  
    if(this.x >= 370){
      this.x = this.x - 3;
    }
  
    if(this.y < 40) {
      this.y = this.y + 3;
    }
  
    if(this.y >= 370) {
      this.y = this.y - 3;
    }
  }
  
}

class BADGUYS {
  constructor() {
    this.x2 = random(width);
    this.y2 = random(100, 275);
    this.w2 = 55;
    this.h2= 65;
    console.log("initial this.x2 pos =", this.x2);
    this.xspeed = random(-2, 2);
    this.yspeed = random(-2, 2);
  }

displayBADGUYS() {
  noStroke();
  fill(150);
  ellipse(this.x2, this.y2, 55, 40);
  ellipse(this.x2, this.y2 - 20, 25, 40);
  fill(255, 255, 0);
  rectMode(CENTER);
  rect(this.x2 + 4, this.y2 - 20, 3, 5);
  rect(this.x2 - 4, this.y2 - 20, 3, 5);

  //  //collider
  //  noFill();
  //  stroke(0);
  //  strokeWeight(.25);
  //  rectMode(CENTER);
  //  rect(this.x2, this.y2 - 10, this.w, this.h);
 }

moveBADGUYS() {    
 //this.y2 = this.y2 + this.yspeed;
  this.x2 = this.x2 + this.xspeed;

if (this.x2 > width -  20 || this.x2 < 20){
 this.xspeed = this.xspeed*-1;
 console.log("switching");
  }

if (this.y2 > height - 20 || this.y2 < 20){
  this.yspeed = this.yspeed*-1;
   console.log("switching" );
     }
    }

checkCollision() {
  if(hero.x + hero.w > this.x2 && hero.x < this.x2 + this.w2 &&
    hero.y + hero.h > this.y2 && hero.y < this.y2 + this.h2)
    {console.log('bumped!');
      hero.y = height - 2;
       // reset frog pos
  }
}
}

class RUPEE {
  constructor(){
  this.x3 = 0;
  this.y3 = 0;
  this.w3 = 50;
  this.h3 = 50;
}

displayRUPEE(){
beginShape();
stroke(0, 0, 255);
strokeWeight(1)
fill(255);
vertex(this.x3 + 40, this.y3 + 20);
vertex(this.x3 + 50, this.y3 + 30);
vertex(this.x3 + 50, this.y3 + 50);
vertex(this.x3 + 40, this.y3 + 60);
vertex(this.x3 + 30, this.y3 + 50);
vertex(this.x3 + 30, this.y3 + 30);
vertex(this.x3 + 40, this.y3 + 20);
endShape();
}

checkCollision() {
  if(hero.x + hero.w > this.x3 && hero.x < this.x3 + this.w3 &&
    hero.y + hero.h > this.y3 && hero.y < this.y3 + this.h3)
    {console.log("you win!");
    textSize(40);
    textAlign(CENTER);
    fill("yellow");
    text("YOU WIN!", width/2, height/2);
      }
}
}

function draw() {
 background(0, 125, 100);
    //keyPressed();

  for (var x = 0; x < width; x += width / 8) {
		for (var y = 0; y < height; y += height / 8) {
			stroke(175);
			strokeWeight(.25);
			line(x, 0, x, height);
			line(0, y, width, y);
		}
  }

  let jump = width/8;
  
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      
      noStroke();
      fill(0, 75, 100, 50);
      rectMode(CORNER);
      rect(x * jump + 10, y * jump + 10, 35, 35);
      
    }
} 
  rupee.displayRUPEE();
  hero.moveHero();
  hero.displayHero();
  


  for (let b = 0; b < badGuy.length; b++){
    badGuy[b].displayBADGUYS();
    badGuy[b].moveBADGUYS();
    badGuy[b].checkCollision();
  }
  rupee.checkCollision();

}






// function keyPressed() {
//   if (keyCode === UP_ARROW && keyIsPressed) {
//     this.y = this.y - 2;
//   }
  
//   if (keyCode === DOWN_ARROW && keyIsPressed) {
//    this.y = this.y + 2;
//   }

//   if (keyCode === LEFT_ARROW && keyIsPressed) {
//     this.x = this.x - 2;
//   } 
  
//   if (keyCode === RIGHT_ARROW && keyIsPressed) {
//     this.x = this.x + 2;
//   }
// }

