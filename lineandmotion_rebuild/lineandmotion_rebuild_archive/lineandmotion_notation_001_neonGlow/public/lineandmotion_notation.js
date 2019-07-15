//GLOBAL VARIABLES /////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
var svgNS = "http://www.w3.org/2000/svg";
var l1x = 1000;

//ANIMATION ENGINE /////////////////////////////////////////
var frmRate = 60.0;
var delta = 0.0;
var lastFrameTimeMs = 0.0;
var timestep = 1000.0 / frmRate;

//DOM ELEMENTS /////////////////////////////////////////////
var bg = document.createElementNS(svgNS, "rect");
var csrmain = document.createElementNS(svgNS, "line");
var goline = document.createElementNS(svgNS, "line");
var ictusicon = document.createElementNS(svgNS, 'image');

//SET-UP ///////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
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
  csrmain.setAttributeNS(null, "y1", 5);
  csrmain.setAttributeNS(null, "x2", l1x);
  csrmain.setAttributeNS(null, "y2", 95);
  csrmain.setAttributeNS(null, "stroke-width", 11);
  csrmain.setAttributeNS(null, "stroke-linecap", 'round');
  csrmain.setAttributeNS(null, "stroke", 'rgb(0, 249, 255)');
  csrmain.setAttributeNS(null, 'filter', 'url(#neonblue)');
  csrmain.setAttributeNS(null, 'transform', 'translate(0, 0)');
  //Ictus Icon////////////////////////////
  ictusicon.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '/explosivematerials.svg');
  ictusicon.setAttributeNS(null, 'x', l1x);
  ictusicon.setAttributeNS(null, 'y', 10);
  ictusicon.setAttributeNS(null, 'width', 65);
  ictusicon.setAttributeNS(null, 'height', 65);
  ictusicon.setAttributeNS(null, 'visibility', 'visible');
  document.getElementById("timeline_svg").appendChild(ictusicon);
  //GO Line //////////////////////////
  goline.setAttributeNS(null, "id", 'goline');
  goline.setAttributeNS(null, "x1", 200);
  goline.setAttributeNS(null, "y1", 7);
  goline.setAttributeNS(null, "x2", 200);
  goline.setAttributeNS(null, "y2", 93);
  goline.setAttributeNS(null, "stroke-width", 11);
  goline.setAttributeNS(null, "stroke-linecap", 'round');
  goline.setAttributeNS(null, "stroke", 'rgb(243, 243, 21)');
  goline.setAttributeNS(null, 'filter', 'url(#neonyellow)');

  document.getElementById("timeline_svg").appendChild(goline);
}

setup();

//ANIMATION ENGINE ////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
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


//UPDATE ///////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
var pieceClock = 0.0;
var clockadj = 0.0;
var timeToGo = 7.0;
var pxPerSec = 60.0;
var pxPerMs = pxPerSec / 1000.0;
var startPx = timeToGo * pxPerSec;
var goOffset = 333;
l1x = startPx + goOffset;

function update(timestep) {
  //Clock //////////////////////////////
  pieceClock += timestep;
  pieceClock = pieceClock - clockadj;
  var numPx = pxPerMs * timestep;
  if (l1x > 200) {
    l1x = l1x - numPx;
  }
  //Main Cursor////////////////////////////
  csrmain.setAttributeNS(null, "x1", l1x);
  csrmain.setAttributeNS(null, "x2", l1x);
  //Ictus Icon////////////////////////////
  ictusicon.setAttributeNS(null, 'x', l1x);
}

//DRAW /////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
var statusbar = document.getElementById('statusbar');

function draw() {
  //Background////////////////////////////
  document.getElementById("timeline_svg").appendChild(bg);
  //Status Bar ///////////////////////////
  var sb = false;
  if (sb) {
    statusbar.textContent = "Time: " + (pieceClock / 1000).toFixed(2) + " " + "Px: " + l1x.toFixed(1) + " " + "Clock: " + (Date.now() / 1000).toFixed(2);
  }
  //GO Line ////////////////////////////
  document.getElementById("timeline_svg").appendChild(goline);
  //Ictus Icon////////////////////////////
  document.getElementById("timeline_svg").appendChild(ictusicon);
  //Main Cursor////////////////////////////
  document.getElementById("timeline_svg").appendChild(csrmain);
}
