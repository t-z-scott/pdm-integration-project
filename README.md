# pdm-integration-project
(under construction)

## vid
https://github.com/t-z-scott/pdm-integration-project/assets/65211220/8d33f074-f349-4680-a24e-3dd88664027c 

---

## outline
I created an art installation controlled by force-sensitive sensors to change the music and animation playing. Pressing the sensors also generates a random value of red, green, or blue - respectively - in p5 and sends it back to the board to light up the RGB light. I used Arduino to control the sensors and the LED. I used [c2.js](https://github.com/ren-yuan/c2.js) to make the animation, [p5.js](https://p5js.org/) for the client-side code, and [p5 Serial Control](https://github.com/p5-serial/p5.serialcontrol) to connect my program to the Arduino board. The music is Save Point from Kirby Super Star, composed by Jun Ishikawa & Dan Miyakawa.
* ![relevant schematic](https://github.com/t-z-scott/pdm-integration-project/blob/main/images/project%20schematic%20(final).png) 

## images
- ![hardware](https://github.com/t-z-scott/pdm-integration-project/blob/main/images/hardware.jpg) 

## narrative description
Originally, I wanted to make a digital instrument. When the user pressed on the sensors, it was going to play a note, and the note would be low or high depending on the amount of pressure. I had to scale it back for time (*and* because it required more analog pins than available on the Arduino Uno), and I landed on this idea instead. I like how it turned out, but I think I'd still like to do my original idea sometime.
* ![relevant schematic](https://github.com/t-z-scott/pdm-integration-project/blob/main/images/project%20schematic%20(initial).png) 

---

## future development
In the future, I hope to expand on this project by using MIDI instead of hardcoded values. I'd make the animations (psuedo)random, and add an option to the website to use a keyboard in case the user doesn't have an Arduino kit. I would also like to make it connect to MIDI controllers, if possible. I'd also cover the force pressure sensors with some kind of hardware to make it look better!
