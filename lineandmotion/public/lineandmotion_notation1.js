//ANIMATION /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
var frmRate = 60.0;
var delta = 0,
  lastFrameTimeMs = 0,
  timestep = 1000 / frmRate,
  timelineAbs = 0;
var aniElements = []; //[0]id, [1]relpos, [2]currpos, [3]lastpos
var pxPerSec = 50.0;
var pxPerMs = pxPerSec / 1000;
var test = 0;
var pxCount_AtRate = 0;

var currtick = -9999;
var lasttick = 9999;

function update(delta) {
  //delta = duration of 1 frame in ms or ms per frame
  pxCount_AtRate += pxPerMs * delta;
}

function draw() {
  if (aniElements.length > 0) {
    for (i = 0; i < aniElements.length; i++) {
      let tempdom = document.getElementById(aniElements[i][0]);
      // currpos = relpos - ...
      aniElements[i][2] = aniElements[i][1] - (Math.round(pxCount_AtRate) % 1000);
      if (aniElements[i][2] > aniElements[i][3]) {
        aniElements[i][2] = aniElements[i][1] - (Math.round(pxCount_AtRate) % 1000) - 1000;
      }
      tempdom.setAttribute('cx', aniElements[i][2]);
      aniElements[i][3] = aniElements[i][2];
      //remove if past 0
      if (aniElements[i][2] <= 0) {
        removeElement(aniElements[i][0]);
        aniElements.splice(i, 1);
      }
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
  aniElements.push([id, rpos, -9999, 9999]);
}

function removeElement(elementId) {
  // Removes an element from the document
  var element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
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
    pxCount_AtRate = msg[0];
  });
//END OSC via websockets /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "nframe".
var div = document.getElementById("nframe")
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Configure the rendering context.
renderer.resize(133, 233);
var context = renderer.getContext();
context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

// Create a stave of width 400 at position 10, 40 on the canvas.
var stave = new VF.Stave(5, 10, 223);
stave.addClef("treble");



var notes = [
  // A quarter-note C.
  new VF.StaveNote({clef: "treble", keys: ["c/5"], duration: "h" })
  //addArticulation(0, new VF.Articulation("a>").setPosition(3) )
  .addModifier(0, new Vex.Flow.Annotation("ppp")
    .setFont('gonville', 16, 'italic')
    .setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.BOTTOM)),
    new VF.TextNote({glyph: "p", duration: "16"}),
];










VF.Formatter.FormatAndDraw(context, stave, notes);

// Create a voice in 4/4 and add above notes
var voice = new VF.Voice({num_beats: 3,  beat_value: 4});
voice.addTickables(notes);

// Format and justify the notes to 400 pixels.
var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

// Render voice
voice.draw(context, stave);
// Connect it to the rendering context and draw!
stave.setContext(context).draw();
