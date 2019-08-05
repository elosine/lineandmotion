//ANIMATION ENGINE /////////////////////////////////////////////
////////////////////////////////////////////////////////////////
var frmRate = 60.0; //desired frame rate which will be forced by animation engine
var delta = 0.0; //actual time lapsed between frames
var lastFrameTimeMs = 0.0; //timestamp of last frame
var timestep = 1000.0 / frmRate; //the number of milliseconds that will change each frame

function mainLoop(timestamp) {
  delta += timestamp - lastFrameTimeMs; //calculate time lapsed since last frame
  lastFrameTimeMs = timestamp; //store timestamp for use next frame
  /*
  This while loop forces a consistant frame framerate
  If the current elapsed time since the last frame (delta)
  is less than the desired elapsed time per frame (timestep),
  do not update timing
  while delta is >= timestep, keep updating until all excess > delta is used up
  If timestep is 1 second and it has been 3 seconds since last frame delta,
  update 3 times this frame to catch up
  */
  while (delta >= timestep) {
    update(timestep);
    delta -= timestep;
  }
  draw();
  requestAnimationFrame(mainLoop);
}
// Start things off
requestAnimationFrame(mainLoop);
//END ANIMATION ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


//UPDATE ///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
var pieceClock = 0.0;
var clockadj = 0.0;
function update(timestep){
  pieceClock += timestep;
  pieceClock = clockadj - pieceClock;
}
//END UPDATE ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


//DRAW /////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
function draw(){

}
//END DRAW /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////







/*
DISPLAY TEXT
// Assumes we've added <div id="fpsDisplay"></div> to the HTML
var fpsDisplay = document.getElementById('fpsDisplay');

function draw() {
    box.style.left = boxPos + 'px';
    fpsDisplay.textContent = Math.round(fps) + ' FPS'; // display the FPS
}
*/
