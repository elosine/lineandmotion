//GLOBAL VARIABLES /////////////////////////////////////////////
////////////////////////////////////////////////////////////////
var svgNS = "http://www.w3.org/2000/svg";
var l1x = 1000;
//ANIMATION ENGINE /////////////////////////////////////////////
////////////////////////////////////////////////////////////////
var frmRate = 60.0;
var delta = 0.0;
var lastFrameTimeMs = 0.0;
var timestep = 1000.0 / frmRate;

function mainLoop(timestamp) {
  delta += timestamp - lastFrameTimeMs;
  lastFrameTimeMs = timestamp;
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

var timeToGo = 10.0;
var pxPerSec = 60.0;
var pxPerMs = pxPerSec / 1000.0;
var startPx = timeToGo * pxPerSec;
l1x = startPx;

function update(timestep) {
  if (l1x > 0) {
    pieceClock += timestep;
  }
  pieceClock = pieceClock - clockadj;

  //Animate Line - Basic - Px per frame//////////////////
  //l1x = l1x - 1;
  //Animate Line - Px per Second//////////////////
  //var pxPerSec = 60.0;
  //  var pxPerMs = pxPerSec / 1000;
  //  var numPx = pxPerMs * timestep;
  //l1x = l1x - numPx;
  //Animate Line - Time-to-destination at fixed speed see above //////////////////
  var numPx = pxPerMs * timestep;
  if (l1x > 0) {
    l1x = l1x - numPx;
  }

}
//END UPDATE ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

//DRAW /////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
var statusbar = document.getElementById('statusbar');

function draw() {
  //Background////////////////////////////
  var bg = document.createElementNS(svgNS, "rect");
  bg.setAttributeNS(null, "fill", 'black');
  bg.setAttributeNS(null, "rx", 0);
  bg.setAttributeNS(null, "ry", 0);
  bg.setAttributeNS(null, "width", 1000);
  bg.setAttributeNS(null, "height", 100);
  document.getElementById("timeline_svg").appendChild(bg);
  //Status Bar //////////////////////
  var sb = true;
  if (sb) {
    statusbar.textContent = "Time: " + (pieceClock / 1000).toFixed(2) + " " + "Px: " + l1x.toFixed(1) + " " + "Clock: " + (Date.now() / 1000).toFixed(2);
  }
  //Draw line
  var line1 = document.createElementNS(svgNS, "line");
  line1.setAttributeNS(null, "id", 'line1');
  line1.setAttributeNS(null, "x1", l1x);
  line1.setAttributeNS(null, "y1", 0);
  line1.setAttributeNS(null, "x2", l1x);
  line1.setAttributeNS(null, "y2", 100);
  line1.setAttributeNS(null, "stroke-width", 3);
  line1.setAttributeNS(null, "stroke", 'rgb(153, 255, 0)');
  //Attach to timeline
  document.getElementById("timeline_svg").appendChild(line1);


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
