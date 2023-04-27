//Tide on Earth
//2023/1/15
//Ziyang Wang
//Acknowledgements: https://openprocessing.org/sketch/1349248, https://openprocessing.org/sketch/1751832

const dots = []
const factor = 0.01
const count = 200
const size = 500
let mic, fft;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  
  noiseDetail(2);
  colorMode(HSB, 100);
  noFill();
  
  //tides' range 
  radius = random(size * 0.5 / 2,size * 0.9 / 2);
	
  //tides' style
  for (let i = 0; i < count; i++) {		
	dots.push(new Dot(radius, [40,80], 220, random(5)));
  }
}

function draw() {
  console.log(mic);
  console.log(fft);
  
  t = millis()/10000;
  x = y = millis()/2000;
  
  prevX = x;
  prevY = y;
  
  for(let n = 0; n < 100; n++){
    //the earth's shape
  	x = sin(t-2 * prevY)*cos(t-2 * prevX) - random(0.6,0.7) * cos(t-2 * prevX) * sin(t-2 *prevX);
  	y = sin(t-2 * prevX)*cos(t-2 * prevY) - random(0.6,0.7) * cos(t-2 * prevY) * sin(t-2 *prevY);
    
    strokeWeight(1);
    color(255);
    
    //draw the earth
    point(radius * x + size/2, radius * y + size/2);
    circle(radius * x + size/2, radius * y + size/2,(sin(x)+cos(y))*random(0.5));

    prevX = x;
    prevY = y;
    }
    
    //draw tides' wave
  for (let i = 0; i < dots.length; i++) {
	const dot = dots[i];
	n = noise(dot.pos.x * factor, dot.pos.y * factor);
	dot.update(n);
	dot.draw();
   }
}

class Dot {
  constructor (radius, colorRange, brightness, alpha) {
    const r = random(TWO_PI);
	const x = width / 2 + sin(r) * radius;
	const y = height / 2 + cos(r) * radius;
	this.pos = createVector(x,y);
	this.prev = createVector(x,y);
	this.color = color(0);
	this.deadCount = 0;
	this.colorRange = colorRange;
	this.alpha = alpha;
	this.brightness = brightness;
  }
	
  update(noize) {
    this.radius = random(size * 0.5 / 2,size * 0.9 / 2)
    
    //let tides have different directions
    this.v = p5.Vector.fromAngle(noize * TWO_PI + (this.deadCount * PI));
	this.v.setMag(2.5);
	this.color = color(map(noize, 0, 1, ...this.colorRange), 100, this.brightness, this.alpha);
	this.prev = this.pos.copy();
	this.pos = this.pos.add(this.v);
		
	if (dist(width/2, height/2, this.pos.x, this.pos.y) > this.radius + 2) {
      this.deadCount++;
    }
  }
	
  draw() {
    //set the range of the shape
    if (dist(width / 2, height / 2, this.pos.x, this.pos.y) > this.radius ||dist(width / 2, height / 2, this.prev.x, this.prev.y) > this.radius) {
      return;
    }
    
    //let tides' stroke change
    strokeWeight(sin(this.noize * TWO_PI + (this.deadCount * PI)))
	stroke(this.color);
    point(this.pos.x, this.pos.y);
    circle(this.pos.x, this.pos.y,(sin(this.prev.x)+cos(this.prev.y))*random(8));
    line(this.prev.x, this.prev.y, this.pos.x, this.pos.y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}
  
