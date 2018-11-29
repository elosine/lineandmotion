//ANIMATION /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
var frmRate = 60.0;
var delta = 0,
  lastFrameTimeMs = 0,
  timestep = 1000 / frmRate,
  timelineAbs = 0;
var aniElements = []; //[0]id, [1]relpos
var pxPerSec = 100.0;
var pxPerMs = pxPerSec / 1000;
var test=0;
var pxCount_AtRate = 0;



function update(delta) {
  //delta = duration of 1 frame in ms or ms per frame
  pxCount_AtRate += pxPerMs * delta;
  //console.log( pxCount_AtRate + "--------------" + test);
  //pos += (velocity / frmrate) * delta;
  // Switch directions if we go too far
  //if (boxPos >= limit || boxPos <= 0) boxVelocity = -boxVelocity;
}

function draw() {
  if (aniElements.length > 0) {
    for (i = 0; i < aniElements.length; i++) {
      let tempdom = document.getElementById(aniElements[i][0]);
      tempdom.setAttribute('cx', aniElements[i][1] - Math.round(pxCount_AtRate) % 1000);
    }
  }
}

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


/*
function mainLoop() {
  clock = clockAdj + window.performance.now();
  delta += clock - lastFrameTimeMs;
  lastFrameTimeMs = clock;
  while (delta >= timestep) {
    update(timestep);
    delta -= timestep;
  }
  draw();
  requestAnimationFrame(mainLoop);
}
*/

// Start things off
requestAnimationFrame(mainLoop);
//END ANIMATION /////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


//MAKE SVG ELEMENTS /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
var svgNS = "http://www.w3.org/2000/svg";

function mkcirc(id, rpos, cy) {
  var myCircle = document.createElementNS(svgNS, "circle"); //to create a circle. for rectangle use "rectangle"
  myCircle.setAttributeNS(null, "id", id);
  myCircle.setAttributeNS(null, "cx", 1000);
  myCircle.setAttributeNS(null, "cy", cy);
  myCircle.setAttributeNS(null, "r", 15);
  myCircle.setAttributeNS(null, "fill", "Aqua");
  myCircle.setAttributeNS(null, "stroke", "none");

  document.getElementById("timeline_svg").appendChild(myCircle);
  aniElements.push([id, rpos]);


}

//END MAKE SVG ELEMENTS /////////////////////////////////////////////////
////////////////////////////////////////////////////////////////



//OSC via websockets /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
var socket = io();
socket.on('mkcirc',
  function(msg) {
    mkcirc(msg[0], msg[1], msg[2]);
  });

  socket.on('newtime',
    function(msg) {
      pxCount_AtRate = msg[0]*pxPerSec;
    });
//END OSC via websockets /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "nframe".
var div = document.getElementById("nframe")
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Configure the rendering context.
renderer.resize(140, 120);
var context = renderer.getContext();
context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

// Create a stave of width 400 at position 10, 40 on the canvas.
var stave = new VF.Stave(5, 5, 100);

// Connect it to the rendering context and draw!
stave.setContext(context).draw();
