//ANIMATION /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
var frmRate = 60.0;
var delta = 0,
  lastFrameTimeMs = 0,
  timestep = 1000 / frmRate,
  timelineAbs = 0;
var aniElements = []; //[0]id, [1]gotime, [2]currpos, [3]lastpos
var pxPerSec = 50.0;
var pxPerMs = pxPerSec / 1000;
var test = 0;
var pxCount_AtRate = 0;
var pxCount_cycle = 0;

var currtick = -9999;
var lasttick = 9999;

var notationnow_svg = document.getElementById("notationnow");

function update(delta) {
  //delta = duration of 1 frame in ms or ms per frame
  pxCount_AtRate += pxPerMs * delta;
  pxCount_cycle = pxCount_AtRate % 1000;
}

var goPxOffset = 300 + 15; //go cursor location + object (circle) radius
function draw() {
  if (aniElements.length > 0) {
    for (i = 0; i < aniElements.length; i++) {
      let tempdom = document.getElementById(aniElements[i][0]);

      var countdown = aniElements[i][1] - pieceClock;
      if (countdown >= 0) {
        if (countdown <= (700 / pxPerMs)) {
          aniElements[i][2] = (countdown * pxPerMs) + goPxOffset; //current position
          console.log(countdown + ':' + aniElements[i][2]);
          tempdom.setAttribute('cx', aniElements[i][2]); //set x pos
          //remove if past 0
          if (aniElements[i][2] <= -goPxOffset) {
            removeElement(aniElements[i][0]);
            aniElements.splice(i, 1);
          }
        }
      } ////   if (countdown >= 0) {
    }
  }
}

var pieceClock = 0.0;
var clockadj = 0.0;

function mainLoop(timestamp) {
  pieceClock = timestamp + clockadj;
  delta += pieceClock - lastFrameTimeMs; //delta = time transpired since last frame
  lastFrameTimeMs = pieceClock;
  //timestep = # of ms per frame at the desired framerate
  //this loop will only update if the time transpired since last frame
  //is greater or = to the desired timestep
  //and it will keep the additional time for the next frame
  //so we keep up with the clock
  while (delta >= timestep) {
    pxCount_AtRate += pxPerMs * timestep;
    pxCount_cycle = Math.round(pxCount_AtRate) % 1000;
    delta -= timestep;
  }
  draw();
  requestAnimationFrame(mainLoop);
}

// Start things off
requestAnimationFrame(mainLoop);
//END ANIMATION /////////////////////////////////////////////////
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
    //pxCount_AtRate = msg[0];
    var tsync = msg[0] * 1000.0;
    clockadj = tsync - window.performance.now();
    lastFrameTimeMs = tsync;
    pxCount_AtRate = tsync * pxPerMs;
    console.log(window.performance.now() + ' : ' + tsync + ' : ' + clockadj);
  });
//END OSC via websockets /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


//MAKE SVG ELEMENTS /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
var svgNS = "http://www.w3.org/2000/svg";

function mkcirc(id, gotime, cy) {
  var myCircle = document.createElementNS(svgNS, "circle"); //to create a circle. for rectangle use "rectangle"
  myCircle.setAttributeNS(null, "id", id);
  myCircle.setAttributeNS(null, "cx", 20000);
  myCircle.setAttributeNS(null, "cy", cy);
  myCircle.setAttributeNS(null, "r", 15);
  myCircle.setAttributeNS(null, "fill", "Aqua");
  myCircle.setAttributeNS(null, "stroke", "none");

  document.getElementById("timeline_svg").appendChild(myCircle);
  aniElements.push([id, gotime, -9999, 9999]);
}

function removeElement(elementId) {
  // Removes an element from the document
  var element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
}

//END MAKE SVG ELEMENTS /////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


//CURVES /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//<path d="M9, 12 C93, 7, 43, 271, 178, 89" stroke="#99ff00" stroke-width="5"/>

var path = document.createElementNS(svgNS, 'path');
var path2 = document.createElementNS(svgNS, 'path');
path.setAttribute('stroke', "#99ff00");
path.setAttribute('stroke-width', "5");
path2.setAttribute('stroke', "#99ff00");
path2.setAttribute('stroke-width', "5");

var d = "M9, 125 C56, 228, 88, 4, 167, 92";
var d2 = "M167, 92 C255, 190, 249, 70, 317, 13";
path.setAttribute('d', d);
path2.setAttribute('d', d2);
notationnow_svg.appendChild(path);
notationnow_svg.appendChild(path2);

drawShape(notationnow_svg, 315, 5, 173, 130, "#99ff00", "5");

function drawShape(ctx, x, y, w, h, clr, strw) {
  var ns = "http://www.w3.org/2000/svg";
  var d = [];
  var path = [];
  var stptx, stpty, ctp1x, ctp1y, ctp2x, ctp2y, endptx, endpty;

  stptx = ((0.0117 * w) + x);
  stpty = ((0.9444 * h) + y);
  ctp1x = ((0.1283 * w) + x);
  ctp1y = ((0.9867 * h) + y);
  ctp2x = ((0.0302 * w) + x);
  ctp2y = ((0.2583 * h) + y);
  endptx = ((0.1567 * w) + x);
  endpty = ((0.3089 * h) + y);
  d.push('M' + stptx + ', ' + stpty + ' C' + ctp1x + ', ' + ctp1y + ', ' + ctp2x + ', ' + ctp2y + ', ' + endptx + ', ' + endpty);
  stptx = ((0.1567 * w) + x);
  stpty = ((0.3089 * h) + y);
  ctp1x = ((0.2233 * w) + x);
  ctp1y = ((0.3356 * h) + y);
  ctp2x = ((0.2906 * w) + x);
  ctp2y = ((0.6715 * h) + y);
  endptx = ((0.3750 * w) + x);
  endpty = ((0.6422 * h) + y);
  d.push('M' + stptx + ', ' + stpty + ' C' + ctp1x + ', ' + ctp1y + ', ' + ctp2x + ', ' + ctp2y + ', ' + endptx + ', ' + endpty);
  stptx = ((0.3750 * w) + x);
  stpty = ((0.6422 * h) + y);
  ctp1x = ((0.5350 * w) + x);
  ctp1y = ((0.5867 * h) + y);
  ctp2x = ((0.4850 * w) + x);
  ctp2y = ((-0.0178 * h) + y);
  endptx = ((0.5900 * w) + x);
  endpty = ((0.0178 * h) + y);
  d.push('M' + stptx + ', ' + stpty + ' C' + ctp1x + ', ' + ctp1y + ', ' + ctp2x + ', ' + ctp2y + ', ' + endptx + ', ' + endpty);
  stptx = ((0.5900 * w) + x);
  stpty = ((0.0178 * h) + y);
  ctp1x = ((0.6963 * w) + x);
  ctp1y = ((0.0538 * h) + y);
  ctp2x = ((0.6700 * w) + x);
  ctp2y = ((0.4911 * h) + y);
  endptx = ((0.8583 * w) + x);
  endpty = ((0.4022 * h) + y);
  d.push('M' + stptx + ', ' + stpty + ' C' + ctp1x + ', ' + ctp1y + ', ' + ctp2x + ', ' + ctp2y + ', ' + endptx + ', ' + endpty);
  stptx = ((0.8583 * w) + x);
  stpty = ((0.4022 * h) + y);
  ctp1x = ((0.9528 * w) + x);
  ctp1y = ((0.3576 * h) + y);
  ctp2x = ((0.8450 * w) + x);
  ctp2y = ((0.9778 * h) + y);
  endptx = ((0.9767 * w) + x);
  endpty = ((0.8956 * h) + y);
  d.push('M' + stptx + ', ' + stpty + ' C' + ctp1x + ', ' + ctp1y + ', ' + ctp2x + ', ' + ctp2y + ', ' + endptx + ', ' + endpty);
  for (i = 0; i < d.length; i++) {
    var pathtemp = document.createElementNS(svgNS, "path");
    pathtemp.setAttribute('stroke', clr);
    pathtemp.setAttribute('stroke-width', strw);
    pathtemp.setAttribute('d', d[i]);
    ctx.appendChild(pathtemp);
  }
}
//CURVES /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

//VexFlow Notation /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
VF = Vex.Flow;
// Create an SVG renderer and attach it to the DIV element named "nframe".
var div = document.getElementById("nframe")
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
// Configure the rendering context.
renderer.resize(100, 133);
var context = renderer.getContext();
context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
// Create a stave of width 400 at position 10, 40 on the canvas.
var stave = new VF.Stave(5, 5, 300);
stave.addClef("treble");
var notes = [
  new VF.StaveNote({
    clef: "treble",
    keys: ["c/5"],
    duration: "w"
  })
];
var voice = new VF.Voice({
  num_beats: 4,
  beat_value: 4
});
voice.addTickables(notes);
var formatter = new Vex.Flow.Formatter().
joinVoices([voice]).format([voice], 290);
voice.draw(context, stave);
stave.setContext(context).draw();
