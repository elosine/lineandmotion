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
var svgtl_bbox = svgtl.getBoundingClientRect();
var tl_width = svgtl_bbox.width;
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
var bb1 = new Bb(0, 3, 16, 0, 0);
//FUNCTIONS //////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//Function to convert degrees to radians ///////////
function rads(deg) {
  return (deg * Math.PI) / 180;
}

//plotSVGcurve function returns an array with:
//[0] A long string to put in the SVG path i.e. d = M100 100 L101 49...
//[1] A dictionary of x/y coordinates plotSVGcurve[1].x plotSVGcurve[1].y
//[2] Length of the array
function plot(fn, range, ix, iy, width, height) {
  var coord = [];
  var pathstring;
  var widthScale = (width / (range[1] - range[0]));
  var heightScale = (height / (range[3] - range[2]));
  var first = true;

  for (var x = 0; x < width; x++) {
    var xFnVal = (x / widthScale) - range[0];
    var yGVal = (fn(xFnVal) - range[2]) * heightScale;

    yGVal = height - yGVal; // 0,0 is top-left

    if (first) {
      first = false;
      var xtemp = x + ix;
      var ytemp = yGVal + iy;
      coord.push({
        x: xtemp,
        y: ytemp
      });
      pathstring = "M" + xtemp + " " + ytemp;
    } else {
      var xtemp = x + ix;
      var ytemp = yGVal + iy;
      coord.push({
        x: xtemp,
        y: ytemp
      });
      pathstring = pathstring.concat(" L" + xtemp + " " + ytemp);
    }
  }
  var data = [pathstring, coord, coord.length];
  return data
}
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
