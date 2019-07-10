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

//DOM ELEMENTS /////////////////////////////////////////////
var bg = document.createElementNS(svgNS, "rect");
var csrmain = document.createElementNS(svgNS, "line");
var ictusicon = document.createElementNS(svgNS, 'image');

//SET-UP /////////////////////////////////////////////
////////////////////////////////////////////////////////////////
function setup() {
  //Background////////////////////////////
  bg.setAttributeNS(null, "fill", 'black');
  bg.setAttributeNS(null, "rx", 0);
  bg.setAttributeNS(null, "ry", 0);
  bg.setAttributeNS(null, "width", 1000);
  bg.setAttributeNS(null, "height", 100);
  document.getElementById("timeline_svg").appendChild(bg);
  //MAIN Cursor //////////////////////////
  csrmain.setAttributeNS(null, "id", 'csrmain');
  csrmain.setAttributeNS(null, "x1", l1x);
  csrmain.setAttributeNS(null, "y1", 0);
  csrmain.setAttributeNS(null, "x2", l1x);
  csrmain.setAttributeNS(null, "y2", 100);
  csrmain.setAttributeNS(null, "stroke-width", 3);
  csrmain.setAttributeNS(null, "stroke", 'rgb(153, 255, 0)');
  //Ictus Icon////////////////////////////
  ictusicon.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '/explosivematerials.svg');
  //ictusicon.setAttributeNS( null, 'src', "/explosivematerials.svg");

  ictusicon.setAttributeNS(null, 'x', l1x);
  ictusicon.setAttributeNS(null, 'y', 10);
  ictusicon.setAttributeNS(null, 'width', 65);
  ictusicon.setAttributeNS(null, 'height', 65);
  ictusicon.setAttributeNS(null, 'visibility', 'visible');
  document.getElementById("timeline_svg").appendChild(ictusicon);


}

setup();


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

var timeToGo = 20.0;
var pxPerSec = 60.0;
var pxPerMs = pxPerSec / 1000.0;
var startPx = timeToGo * pxPerSec;
l1x = startPx;

function update(timestep) {
  //Clock //////////////////////////////
  pieceClock += timestep;

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

  //Main Cursor////////////////////////////
  csrmain.setAttributeNS(null, "x1", l1x);
  csrmain.setAttributeNS(null, "x2", l1x);
  //Ictus Icon////////////////////////////
  ictusicon.setAttributeNS(null, 'x', l1x);

}
//END UPDATE ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

//DRAW /////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
var statusbar = document.getElementById('statusbar');

function draw() {
  //Background////////////////////////////
  document.getElementById("timeline_svg").appendChild(bg);
  //Status Bar ///////////////////////////
  var sb = true;
  if (sb) {
    statusbar.textContent = "Time: " + (pieceClock / 1000).toFixed(2) + " " + "Px: " + l1x.toFixed(1) + " " + "Clock: " + (Date.now() / 1000).toFixed(2);
  }
  //Ictus Icon////////////////////////////
  document.getElementById("timeline_svg").appendChild(ictusicon);


  //Main Cursor////////////////////////////
  document.getElementById("timeline_svg").appendChild(csrmain);
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
