let mic; 
let fft; 
let samples; 
let slider; 


//for canvas 1's big circle
let e;
let r;

//for buttons
var isRunning = false;
var isRunning2 = false;

//for canvas 1's mode
var circles = [];
var freq = 1024;
var spectrum;

function preload() {
	img = loadImage('colour.png');
}


function setup() {
	createCanvas(windowWidth*0.98, windowHeight*0.8);
			
	background('rgb(0,0,0)');

	//create a slider
	 slider = createSlider(0.1, 2, 1, 0);
	 slider.style('width', '300px');
	 slider.style('height', '30px');
	 slider.style('position', 'absolute');
	 slider.style('bottom', '40px');
	 slider.style('left', '32px');
	 slider.style('z-index', '1');
	 

	mic = new p5.AudioIn();
	mic.start();
	fft = new p5.FFT(0, 256);
	fft.setInput(mic);

	ellipseMode(CENTER);

	for (var i = 0; i < freq; i++) {
		circles.push(new Circle());
	}
}

function draw() {
	if (isRunning2) {
		//for canvas 2
		background(0, 1);
		spectrum = fft.analyze();

		for (var i = 0; i < freq; i++) {
			var myDiam = map(spectrum[i], 0, 255, 0, 20);
			var mySpeed = map(spectrum[i], 0, 255, 0, 50);
			circles[i].speed = floor(mySpeed);
			circles[i].diameter = floor(myDiam);
			circles[i].display();
			circles[i].move();
		}
	} else {
		//for canvas 1
		background(0, 5); 
		samples = fft.analyze();

		for (let i = 0; i < samples.length - 1; i++) {
			if (i % 2 == 1) samples[i] *= -1; // Flips the y-pos
			fill(255);
			stroke(255)
			// Draws circles from-left-to-right
			point(map(i, 0, samples.length - 1, 0, width), (height / 2 + (samples[i] * slider.value())))

			//Draw a big circle
			stroke(255)
			e = -random(Math.PI * 2);
			r = map(i, 0, samples.length - 1, width / 3, height / 3) * pow(random(), map(i, 0, samples.length - 1, 0.1, 0.2) - abs(e - Math.PI) / 10),
				point(cos(e) * (r) + width / 2, sin(e) * r + height / 2);

			if (isRunning) {
				//small circle,change with miclevel 
				micLevel = mic.getLevel();
				stroke(map(i, 0, micLevel, 0, 255))
				point(width / 2 + sin(i) * micLevel * samples[i] * slider.value() * 60, height / 2 + cos(i) * micLevel * samples[i] * slider.value() * 30);
			}
		}
	}
}



function start() {
	getAudioContext().resume()
}

//for buttons
   function toggleProgram() {
 	isRunning = !isRunning;
   }

   function toggleProgram2() {
 	background(0)
 	isRunning2 = !isRunning2;
   }

//for canvas 2
function Circle() {
	this.x = random() * width;
	this.y = random() * height;
	this.diameter = 15 * slider.value();
	this.color = img.get(this.x, this.y);
	this.speed = 0;
	this.move = function () {
		this.x += random(-this.speed, this.speed);
		this.y += random(-this.speed, this.speed);
	}
	this.display = function () {
		stroke(this.color, 150);
		fill(0, 0, 0, 0);
		ellipse(this.x, this.y, this.diameter, this.diameter);
	};
}
