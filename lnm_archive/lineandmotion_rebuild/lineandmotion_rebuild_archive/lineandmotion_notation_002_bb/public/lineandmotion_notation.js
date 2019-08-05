//GLOBAL VARIABLES /////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
var svgNS = "http://www.w3.org/2000/svg";
var l1x = 1000;

//ANIMATION ENGINE /////////////////////////////////////////
var frmRate = 60.0;
var delta = 0.0;
var lastFrameTimeMs = 0.0;
var timestep = 1000.0 / frmRate;
var framect = 0;
var pieceClock = 0.0;
var clockadj = 0.0;
var timeToGo = 8.0;
var pxPerSec = 60.0;
var pxPerMs = pxPerSec / 1000.0;
var startPx = timeToGo * pxPerSec;
var goOffset = 250.0;
var durframes = Math.ceil((timeToGo * 1000.0) / timestep) + 2; //?+2frames
l1x = startPx + goOffset;
var done = true;

//DOM ELEMENTS /////////////////////////////////////////////
var svgtl = document.getElementById("timeline_svg");
var svgicn = document.getElementById("icon_svg");
var svgEventAction = document.getElementById("eventAction_svg");
var bg = document.createElementNS(svgNS, "rect");
var blendgroup = document.createElementNS(svgNS, 'g');
blendgroup.setAttribute('style', "isolation: isolate");
var csrmain = document.createElementNS(svgNS, "line");
var goline = document.createElementNS(svgNS, "line");
var ictusicon = document.createElementNS(svgNS, 'image');
var ictusorb = document.createElementNS(svgNS, 'circle');

//ICTUS ORB /////////////////////////////////////////////
var io = {
  iypos: 17,
  ypos: 17,
  r: 16,
  fac: 0
}
var godown = true;
//SET-UP ///////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function setup() {
  //Background////////////////////////////
  bg.setAttributeNS(null, "fill", 'black');
  bg.setAttributeNS(null, "rx", 0);
  bg.setAttributeNS(null, "ry", 0);
  bg.setAttributeNS(null, "width", 1000);
  bg.setAttributeNS(null, "height", 100);
  // svgtl.appendChild(bg);
  //MAIN Cursor //////////////////////////
  csrmain.setAttributeNS(null, "id", 'csrmain');
  csrmain.setAttributeNS(null, "x1", l1x);
  csrmain.setAttributeNS(null, "y1", 5);
  csrmain.setAttributeNS(null, "x2", l1x);
  csrmain.setAttributeNS(null, "y2", 75);
  csrmain.setAttributeNS(null, "stroke-width", 8);
  csrmain.setAttributeNS(null, "stroke-linecap", 'round');
  csrmain.setAttributeNS(null, "stroke", 'rgb(243, 243, 21)');
  csrmain.setAttributeNS(null, 'filter', 'url(#neonyellow)');
  csrmain.setAttributeNS(null, 'transform', 'translate(0, 0)');
  csrmain.setAttributeNS(null, 'style', "mix-blend-mode: multiply");
  //Ictus Icon////////////////////////////
  ictusicon.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '/explosivematerials.svg');
  ictusicon.setAttributeNS(null, 'x', l1x - 23);
  ictusicon.setAttributeNS(null, 'y', 4);
  ictusicon.setAttributeNS(null, 'width', 46);
  ictusicon.setAttributeNS(null, 'height', 46);
  ictusicon.setAttributeNS(null, 'visibility', 'visible');
  svgicn.appendChild(ictusicon);
  //GO Line //////////////////////////
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
  svgtl.appendChild(blendgroup);
  blendgroup.appendChild(goline);
  blendgroup.appendChild(csrmain);
  //Ictusorb////////////////////////////
  ictusorb.setAttributeNS(null, "fill", 'rgb(254,102,1)');
  ictusorb.setAttributeNS(null, "cx", goOffset);
  ictusorb.setAttributeNS(null, "cy", io.iypos);
  ictusorb.setAttributeNS(null, "r", io.r);
  svgEventAction.appendChild(ictusorb);
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
function update(timestep) {
  framect++;
  //Clock //////////////////////////////
  pieceClock += timestep;
  pieceClock = pieceClock - clockadj;
  var numPx = pxPerMs * timestep;
  if (l1x >= goOffset) {
    l1x = l1x - numPx;
  } else {
    if (done) {
      done = false;
    }
  }
  //Main Cursor////////////////////////////
  csrmain.setAttributeNS(null, "x1", l1x);
  csrmain.setAttributeNS(null, "x2", l1x);
  //Ictus Icon////////////////////////////
  ictusicon.setAttributeNS(null, 'x', l1x - 21);
  //Ictus Orb////////////////////////////
  //xinc = xdurSec/frmRate
  x += xinc;
  var crv = Math.pow(x, 4);
  if (!done) {
    io.ypos = io.iypos + ((220 - io.r) * crv);
  }
  ictusorb.setAttributeNS(null, "cy", io.ypos);

  if (io.ypos >= (220 - io.r)) {
    done = true;
    io.ypos = 220 - io.r;
  }

}
var done = false;
var x = 0;
//xinc = xdurSec/frmRate
var xinc = 1.0 / (frmRate*0.4);
//DRAW /////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
var statusbar = document.getElementById('statusbar');

function draw() {
  // svgtl.removeChild(bg);
  // blendgroup.removeChild(goline);
  // svgicn.removeChild(ictusicon);
  // blendgroup.removeChild(csrmain);
  // svgtl.removeChild(blendgroup);
  // svgEventAction.removeChild(ictusorb);

  //Background////////////////////////////
  // svgtl.appendChild(bg);
  //Status Bar ///////////////////////////
  var sb = false;
  if (sb) {
    statusbar.textContent = "Time: " + (pieceClock / 1000).toFixed(2) + " " + "Px: " + l1x.toFixed(1) + " " + "Clock: " + (Date.now() / 1000).toFixed(2);
  }
  //GO Line ///////////////////////////////
  // blendgroup.appendChild(goline);
  //Ictus Icon/////////////////////////////
  // svgicn.appendChild(ictusicon);
  //Main Cursor////////////////////////////
  // blendgroup.appendChild(csrmain);
  //Blend Group////////////////////////////
  // svgtl.appendChild(blendgroup);
  //Ictus Orb////////////////////////////
  // svgEventAction.appendChild(ictusorb);
}
