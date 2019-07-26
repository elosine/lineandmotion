//GLOBAL VARIABLES ///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//TIMING & ANIMATION ENGINE ////////////////////
var frmRate = 60.0;
var framect = 0;
var delta = 0.0;
var lastFrameTimeMs = 0.0;
var timestep = 1000.0 / frmRate;
var pieceClock = 0.0;
var clockadj = 0.0;
var timeToGo = 3.0;
var pxPerSec = 60.0;
var pxPerMs = pxPerSec / 1000.0;
//STATUS BAR ///////////////////////////////////
var sb = true;
var statusbar = document.getElementById('statusbar');
//SVG //////////////////////////////////////////
var svgNS = "http://www.w3.org/2000/svg";
var svgtlicn = document.getElementById("tlicon_svg");
var svgtl = document.getElementById("timeline_svg");
var svgEventAction = document.getElementById("eventAction_svg");
var svgEventAction_bbox = svgEventAction.getBoundingClientRect();
var ea_height = svgEventAction_bbox.height;
//BLENDING ////////////////////////////////////
var blendgroup = document.createElementNS(svgNS, 'g');
blendgroup.setAttribute('style', "isolation: isolate");
svgtl.appendChild(blendgroup);
//GO LINE /////////////////////////////////////
var goOffset = 250.0;
var goline = document.createElementNS(svgNS, "line");
goline.setAttributeNS(null, "id", 'goline');
goline.setAttributeNS(null, "x1", goOffset);
goline.setAttributeNS(null, "y1", 5);
goline.setAttributeNS(null, "x2", goOffset);
goline.setAttributeNS(null, "y2", 75);
goline.setAttributeNS(null, "stroke-width", 8);
goline.setAttributeNS(null, "stroke-linecap", 'round');
goline.setAttributeNS(null, "stroke", 'rgb(0, 249, 255)');
goline.setAttributeNS(null, 'filter', 'url(#neonblue)');
goline.setAttributeNS(null, 'style', "mix-blend-mode: multiply");
blendgroup.appendChild(goline);
//BB //////////////////////////////////////////
var bb1 = new Bb(0, 3, 16, 0);
//DRAW ///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
function draw() {
  //Status Bar ///////////////////////////
  if (sb) {
    statusbar.textContent = "Time: " + (pieceClock / 1000).toFixed(2) + " " + "Frame: " + framect.toFixed(1) + " " + "Clock: " + (Date.now() / 1000).toFixed(2);
  }
}
//UPDATE /////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
function update(timestep) {
  framect++;
  //Clock //////////////////////////////////
  pieceClock += timestep;
  pieceClock = pieceClock - clockadj;
  //BB /////////////////////////////////////
  bb1.drop();
}
//ANIMATION ENGINE ///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
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
