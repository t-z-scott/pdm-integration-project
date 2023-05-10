#include "PDMSerial.h"
PDMSerial pdm;

const int sensorPins[3] = {A0, A1, A2};
const int pinRed = 3;
const int pinGreen = 5;
const int pinBlue = 7;
int pressureValues[3];

void setup() {
  Serial.begin(9600); // need higher baud rate to send more data? (38400)
  pinMode(sensorPins[0], INPUT);
  pinMode(sensorPins[1], INPUT);
  pinMode(sensorPins[2], INPUT);
  pinMode(pinRed, OUTPUT);
  pinMode(pinGreen, OUTPUT);
  pinMode(pinBlue, OUTPUT);
}

void loop() {
  pressureValues[0] = analogRead(sensorPins[0]);
  pressureValues[1] = analogRead(sensorPins[1]);
  pressureValues[2] = analogRead(sensorPins[2]);

  pdm.transmitSensor("", pressureValues[0]);
  pdm.transmitSensor("", pressureValues[1]);
  pdm.transmitSensor("", pressureValues[2]);
  pdm.transmitSensor("end");

  bool newData = pdm.checkSerial();
  if (newData) {
    if (pdm.getName().equals(String("rgb"))) {
      analogWrite(pinRed, pdm.getValue());
      analogWrite(pinGreen, pdm.getValue());
      analogWrite(pinBlue, pdm.getValue());
    } else if (pdm.getName().equals(String("red"))) {
      analogWrite(pinRed, pdm.getValue());
    } else if (pdm.getName().equals(String("green"))) {
      analogWrite(pinGreen, pdm.getValue());
    } else if (pdm.getName().equals(String("blue"))) {
      analogWrite(pinBlue, pdm.getValue());
    } else if (pdm.getName().equals(String("reset"))) {
      return;
    }
  }
  delay(1);
}