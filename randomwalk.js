let n = 3;
let walkers = [];
let hist = {};

for (let i = -100; i < 100; i++) {
 hist[i/100] = 0;
}

function setup() {
 let c = createCanvas(1200, 600);
 c.parent('container');
 for (let i = 0; i < n; i++) {
  let r = 1;
  let s = r*2;
   walkers.push(new RandomWalker(0, height/2, r, s));
 }
 background(51);
}

function draw() {
 for (let i = 0; i < walkers.length; i++) {
  walkers[i].walk();
 }
}

function RandomWalker(x, y, r, s) {
 this.x = x;
 this.y = y;
 this.r = r;
 this.s = s;
}

RandomWalker.prototype.walk = function() {
 let x = Math.random()-Math.random();
 let y = Math.floor(x*100)/100;
 
 this.dy = x*this.s;

 hist[y] = hist[y] + 1;
 let count = hist[y];

 fill(170, 220, 170, 50);
 noStroke();
 ellipse((y+1)/2*width, height-25-count/2, this.r*2, this.r*2);
 
 noStroke();
 fill(255, 205, 0, 35);
 ellipse(this.x, this.y, this.r*2, this.r*2)
 
 this.y += this.dy;
 this.x += this.s;
 
 if (this.x > width) {
  this.x = 0;
 }
}
