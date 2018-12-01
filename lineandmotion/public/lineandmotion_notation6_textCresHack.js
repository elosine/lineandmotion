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



//VexFlow Notation /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
VF = Vex.Flow;
// Create an SVG renderer and attach it to the DIV element named "nframe".
var div = document.getElementById("nframe")
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
// Configure the rendering context.
renderer.resize(290, 133);
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
  //addArticulation(0, new VF.Articulation("a>").setPosition(3) )
  .addModifier(0, new Vex.Flow.Annotation("ppp")
    .setFont('gonville', 16, 'italic')
    .setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.BOTTOM))

];
var cres1 = [
  new VF.GhostNote({
    clef: "treble",
    keys: ["c/5"],
    duration: "8"
  }),
  new VF.Crescendo({
    duration: "hd"
  }).setLine(8.5).setHeight(18),
  new VF.GhostNote({
    clef: "treble",
    keys: ["c/5"],
    duration: "8"
  })
];

var gh = new VF.GhostNote({
  duration: "h"
});
var g8 = new VF.GhostNote({
  duration: "8"
});
var gq = new VF.GhostNote({
  duration: "q"
});

var text = new Vex.Flow.TextNote({
       text: "fff",
       font: {
           family: "gonville",
           size: 16,
           weight: "italic"
       },
       duration: '8'
   })
   .setLine(9)
   .setStave(stave)
   .setJustification(Vex.Flow.TextNote.Justification.LEFT)
   .setContext(context);

var voice = new VF.Voice({
  num_beats: 4,
  beat_value: 4
});

var voice2 = new VF.Voice({
  num_beats: 4,
  beat_value: 4,
  resolution: VF.RESOLUTION
});

voice.addTickables(notes);
voice2.addTickables([gh, g8, text, gq]);

//VF.Formatter.FormatAndDraw(context, stave, notes);
VF.Formatter.FormatAndDraw(context, stave, cres1);
var formatter = new Vex.Flow.Formatter().
joinVoices([voice, voice2]).format([voice, voice2], 300);

// Render voice
voice.draw(context, stave);
text.setContext(context).draw();

// Connect it to the rendering context and draw!
stave.setContext(context).draw();
