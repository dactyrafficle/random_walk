let n = 3;
let walkers = [];
let hist = {};

let x0 = -3;
let x1 = 3;
let dx = 0.05;
let dx_inv = 1/dx;
let x_range = x1-x0;
for (let i = x0*100; i < x1*100; i+=dx*100) {
 hist[i/100] = 0;
}
console.log(hist);

function setup() {
 let c = createCanvas(1200, 600);
 c.parent('container');
 for (let i = 0; i < n; i++) {
  let r = 1;
  let dx = r*2; // INCREMENT X
  let A = 1; // AMPLITUDE  
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
 this.dy_norm = rnorm();
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
 let y = Math.floor(this.dy_norm*dx_inv)/dx_inv;
 hist[y] = hist[y] + 1;
 let count = hist[y];
 
 fill(170, 220, 170, 25);
 noStroke();
 ellipse((y*(width/x_range)+width/2), height-25-count/2, this.r*2, this.r*2);
}
function rnorm() {
 var u = 0, v = 0;
 while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
 while(v === 0) v = Math.random();
 return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}