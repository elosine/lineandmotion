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
var timeToGo = 3.0;
var pxPerSec = 60.0;
var pxPerMs = pxPerSec / 1000.0;
var startPx = timeToGo * pxPerSec;
var goOffset = 250.0;
var durfrm_csr = Math.ceil((timeToGo * 1000.0) / timestep) + 2; //?+2frames
l1x = startPx + goOffset;
var done = true;

//DOM ELEMENTS /////////////////////////////////////////////
var svgtl = document.getElementById("timeline_svg");
var svgicn = document.getElementById("icon_svg");
var svgEventAction = document.getElementById("eventAction_svg");
var svgEventAction_bbox = svgEventAction.getBoundingClientRect();
var bg = document.createElementNS(svgNS, "rect");
var blendgroup = document.createElementNS(svgNS, 'g');
blendgroup.setAttribute('style', "isolation: isolate");
var csrmain = document.createElementNS(svgNS, "line");
var goline = document.createElementNS(svgNS, "line");
var ictusicon = document.createElementNS(svgNS, 'image');
var ictusorb = document.createElementNS(svgNS, 'circle');

//ICTUS ORB /////////////////////////////////////////////
var ioipos = 23;

var io = {
  pos: ioipos,
  vel: 3,
  radius: 16, // 1px = 1cm
};

var g = 8.81; // m / s^2
var acc = 1.26;
var decel = 0.82;
var godown = true;

var durframes = function(g, acc, ivel, ipos, fpos) {
  var frct = 0;
  var pos = ipos;
  var lg = g;
  var vel = ivel;
  while (pos <= fpos) {
    lg *= acc;
    vel += lg * (1.0 / frmRate);
    pos += vel * (1.0 / frmRate) * 100;
    frct++;
  }

  return frct;
}
var dfr;
//SET-UP ///////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function setup() {
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
  ictusorb.setAttributeNS(null, "cy", ioipos);
  ictusorb.setAttributeNS(null, "r", io.radius);
  ictusorb.setAttributeNS(null, 'filter', 'url(#neonorange)');
  svgEventAction.appendChild(ictusorb);
  dfr = durframes(g, acc, io.vel, io.pos, (svgEventAction_bbox.height - io.radius));
  console.log(dfr);
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

var startorb = false;
//UPDATE ///////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function update(timestep) {
  framect++;
  //Clock //////////////////////////////
  pieceClock += timestep;
  pieceClock = pieceClock - clockadj;
  var numPx = pxPerMs * timestep;
  if (l1x >= 0) {
    l1x = l1x - numPx;
  } else {
    if (done) {
      done = false;
      console.log("csr:" + framect);
    }
  }
  //Main Cursor////////////////////////////
  csrmain.setAttributeNS(null, "x1", l1x);
  csrmain.setAttributeNS(null, "x2", l1x);
  //Ictus Icon////////////////////////////
  ictusicon.setAttributeNS(null, 'x', l1x - 21);
  //Ictus Orb////////////////////////////
  if(framect > (durfrm_csr - dfr)) startorb = true;
  if (startorb) {
    if (godown) {
      g *= acc;
      io.vel += g * (1.0 / frmRate);
      io.pos += io.vel * (1.0 / frmRate) * 100;
      ictusorb.setAttributeNS(null, 'cy', io.pos);
    } else {
      g *= decel;
      io.vel -= g * (1.0 / frmRate);
      io.vel = Math.abs(io.vel);
      io.pos -= io.vel * (1.0 / frmRate) * 100;
      io.pos = Math.max(ioipos, io.pos);
      ictusorb.setAttributeNS(null, 'cy', io.pos);
    }

    if (io.pos > svgEventAction_bbox.height - io.radius) {
      godown = false;
      console.log("bb:" + framect);
    }
  }

}
//DRAW /////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
var statusbar = document.getElementById('statusbar');

function draw() {
  //Status Bar ///////////////////////////
  var sb = false;
  if (sb) {
    statusbar.textContent = "Time: " + (pieceClock / 1000).toFixed(2) + " " + "Px: " + l1x.toFixed(1) + " " + "Clock: " + (Date.now() / 1000).toFixed(2);
  }
}
