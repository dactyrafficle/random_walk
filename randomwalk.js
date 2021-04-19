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
  let dx = r*2; // INCREMENT X
  let A = r*2; // AMPLITUDE  
   walkers.push(new RandomWalker(0, height/2, r, dx, A));
 }
 background(51);
}

function draw() {
 for (let i = 0; i < walkers.length; i++) {
  walkers[i].getRandom(); // GET A NUMBER BW -1 AND 1
  walkers[i].update();
  walkers[i].displayWalker();
  walkers[i].displayHist();
 }
}

function RandomWalker(x, y, r, dx, A) {
 this.x = x;
 this.y = y;
 this.r = r;
 this.dx = dx;
 this.A = A;
 this.dy_norm = 0;
 this.dy = 0;
}
RandomWalker.prototype.getRandom = function() {
 this.dy_norm = Math.random()-Math.random();
}
RandomWalker.prototype.update = function() {
 this.dy = this.A*this.dy_norm;
 this.y += this.dy;
 this.x += this.dx;
 
 if (this.x > width) {
  this.x = 0;
 }
}
RandomWalker.prototype.displayWalker = function() {
 noStroke();
 fill(255, 205, 0, 35);
 ellipse(this.x, this.y, this.r*2, this.r*2)
}
RandomWalker.prototype.displayHist = function() {
 let y = Math.floor(this.dy_norm*100)/100;
 hist[y] = hist[y] + 1;
 let count = hist[y];
 
 fill(170, 220, 170, 50);
 noStroke();
 ellipse((y+1)/2*width, height-25-count/2, this.r*2, this.r*2);
}
