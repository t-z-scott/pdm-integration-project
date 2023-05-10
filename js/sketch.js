/** stretch features:
 * use midi instead of hardcoded values
 * make animations random
 * make an actual instrument
 * make website where you don't need arduino (with states?)
 * make website connect to midi controller
 */


// music is "Save Point" from Kirby Super Star
//// SOUND VARIABLES ////
let synthPoly = new Tone.PolySynth();
let hiPass = new Tone.Filter(600, "highpass").toDestination();
synthPoly.connect(hiPass);
let voice1 = [["E4", "F3", "A3", "C4"], ["E4", "F3", "A3", "C4"],
  ["E4", "F3", "A3", "C4"], ["D4", "F3", "A3", "C4"], ["G3", "E3", "G3", "B3"],
  ["D4", "E3", "G3", "B3"], ["D4", "E3", "G3", "B3"], ["C4", "E3", "G3", "B3"]];
let melody = new Tone.Sequence((time, note) => {
	synthPoly.triggerAttackRelease(note, '4n', time);
}, voice1);

let synthAM = new Tone.AMSynth();
let distort = new Tone.Distortion(0.15);
synthAM.connect(distort);
let voice2 = ["E4", "E4", "E4", ["D4", "C4", "D4"], "D4", "D4", "D4",
	["C4", "D4", "E4"]];
let part = new Tone.Part((time, note) => {
	synthAM.triggerAttackRelease(note, '4n', time);
}, voice2);

let synthMem = new Tone.MembraneSynth();
let bassPart = new Tone.Part((time, note) => {
	synthMem.triggerAttackRelease(note, '4n', time);
}, ["F2", "B2", "F3", "F2", "E2", "A2", "F#3", "G3"]);
Tone.Transport.bpm.value = 42;


//// SERIAL VARIABLES ////
// let serialPdm;
let serial;
let portname = 'COM5';
let inData;
let sensors;
let valA0, valA1, valA2;
let light = false;
let randRed, randGreen, randBlue;


//// PROGRAM VARIABLES ////
let startBool = false;


function setup() {
  // serialPdm = new PDMSerial(portname);
  // console.log(serialPdm.inData);
  // sensors = serialPdm.sensorData;

  serial = new p5.SerialPort();
  serial.on('list', printList);
  serial.on('connected', serverConnected);
  serial.on('open', portOpen);
  serial.on('data', serialEvent);
  serial.on('error', serialError);
  serial.on('close', portClose);
  serial.list();
  // let options = {baudrate: 9600};
  serial.open(portname);
  
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
}


//// SERIAL FUNCTIONS ////
function printList() {}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  inData = serial.readStringUntil('\r\n');
  if (inData.length > 0) {
    sensors = split(inData, ',');
    if (sensors.length === 3) {
      valA0 = sensors[0].charAt(1);
      valA1 = sensors[1].charAt(1);
      valA2 = sensors[2].charAt(1);

      if (valA0 > 10) {
        renderPerlin.display();
        melody.start();
        randRed = random(0, 255);
        serial.write('red', randRed);
      }
      if (valA1 > 10) {
        renderDelaunay.display();
        part.start();
        randGreen = random(0, 255);
        serial.write('green', randGreen);
      }
      if (valA2 > 10) {
        renderCircle.display();
        bassPart.start();
        randBlue = random(0, 255);
        serial.write('blue', randBlue);
      }
    }
  }
}

function serialError(err) {
  console.log('something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('the serial port closed.');
}


//// PROGRAM FUNCTIONS ////
function draw() {
  if (startBool) {
    renderPoint.display();
  } else {
    background("black");
    text("press space to start!");
    text("(once started, press shift to restart)")
  }
}


function keyTyped() {
  if (keyCode === '32' & !startBool) {
    Tone.start();
    Tone.Transport.start();
    serial.write('rgb', 1);
    startBool = true;
  } else if (keyCode === SHIFT & startBool) {
    Tone.Transport.pause();
    serial.write('reset');
    serial.write('rgb', 0);
    startBool = false;
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
