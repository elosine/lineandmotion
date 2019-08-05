// GLOBAL VARIABLES ------------------------------------- //
//TIMING & ANIMATION ENGINE /////////////
var frmRate = 60.0;
var framect = 0;
var delta = 0.0;
var lastFrameTimeMs = 0.0;
var timestep = 1000.0 / frmRate;
var pieceClock = 0.0;
var clockadj = 0.0;
var timeToGo = 3.0;
var pxPerSec = 100.0;
var pxPerFrame = pxPerSec / frmRate;
var pxPerMs = pxPerSec / 1000.0;
//STATUS BAR ////////////////////////////
var sb = true;
var statusbar = document.getElementById('statusbar');
//SCENE /////////////////////////////////
var renderer, scene, camera, pointLight, spotLight;
var fieldLength = 700;
var fieldWidth = 150;
//TEMPO FRETS ///////////////////////////////
var tfgeom, tfmatl, gofret, tfbgeom, tfbmatl, gofretborder;
var gofretposx = -340;
var gofretposz = 3;
var tfs = [];
// SET UP ----------------------------------------------- //
function setup() {
  createScene();
  requestAnimationFrame(mainLoop);
}
// FUNCTION: CREATE SCENE ------------------------------- //
function createScene() {
  //Scene Size
  var WIDTH = 500;
  var HEIGHT = 300;
  //Camera Attributes
  var VIEW_ANGLE = 45;
  var ASPECT = WIDTH / HEIGHT;
  var NEAR = 0.1;
  var FAR = 10000;
  //Get DOM div
  var c = document.getElementById("tlcanvas");
  // create a WebGL renderer, camera, and a scene
  renderer = new THREE.WebGLRenderer();
  camera =
    new THREE.PerspectiveCamera(
      VIEW_ANGLE,
      ASPECT,
      NEAR,
      FAR);
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x708090);
  scene.add(camera);
  //Camera Position
  camera.position.x = -(fieldLength / 2) - 95;
  camera.position.z = 120;
  camera.rotation.y = -60 * Math.PI / 180;
  camera.rotation.z = -90 * Math.PI / 180;
  //Start the renderer
  renderer.setSize(WIDTH, HEIGHT);
  //Attach the render-supplied DOM element
  c.appendChild(renderer.domElement);
  //Set up the playing surface plane
  var planeLength = fieldLength;
  var planeWidth = fieldWidth + 50;
  var planeQuality = 10;
  var planeMaterial =
    new THREE.MeshLambertMaterial({
      color: 'black'
    });
  var plane = new THREE.Mesh(
    new THREE.PlaneGeometry(
      planeLength * 0.99, // 95% of table width, since we want to show where the ball goes out-of-bounds
      planeWidth,
      planeQuality,
      planeQuality
    ),
    planeMaterial
  );
  scene.add(plane);
  plane.receiveShadow = true;
  //TEMPO FRETS ///////////////////////////////////////////
  tfgeom = new THREE.CubeGeometry(4, 194, 5);
  gfmatl = new THREE.MeshBasicMaterial({
    color: "rgb(255,255,0)"
  });
  tfmatl = new THREE.MeshBasicMaterial({
    color: "rgb(255,128,0)"
  });
  tfbgeom = new THREE.EdgesGeometry(tfgeom);
  tfbmatl = new THREE.LineBasicMaterial({
    color: 0x000000,
  });
  gofret = new THREE.Mesh(tfgeom, gfmatl);
  gofretborder = new THREE.LineSegments(tfbgeom, tfbmatl);
  gofretborder.renderOrder = 1; // make sure wireframes are rendered 2nd
  gofret.position.x = gofretposx;
  gofret.position.z = gofretposz;
  gofretborder.position.x = gofretposx;
  gofretborder.position.z = gofretposz;
  scene.add(gofret);
  scene.add(gofretborder);

  for (var i = 0; i < 7; i++) {
    //Add orange fret and move
    var tft = new THREE.Mesh(tfgeom, tfmatl);
    var tfbt = new THREE.LineSegments(tfbgeom, tfbmatl);
    tfbt.renderOrder = 1;
    tft.position.x = pxPerSec * i;
    tft.position.z = gofretposz;
    tfbt.position.x = pxPerSec * i;
    tfbt.position.z = gofretposz;
    tft.name = "tft" + i;
    tfbt.name = "tfbt" + i;
    //[boolean:add, tft, tfbt]
    var ntft = [true, tft, tfbt];
    tfs.push(ntft);
  }

  // // create a point light
  pointLight =
    new THREE.PointLight(0xF8D898);
  // set its position
  pointLight.position.x = -1000;
  pointLight.position.y = 0;
  pointLight.position.z = 1000;
  pointLight.intensity = 2.9;
  pointLight.distance = 10000;
  // add to the scene
  scene.add(pointLight);
  // add a spot light
  spotLight = new THREE.SpotLight(0xF8D898);
  spotLight.position.set(0, 0, 460);
  spotLight.intensity = 1.5;
  spotLight.castShadow = true;
  scene.add(spotLight);
  // MAGIC SHADOW CREATOR DELUXE EDITION with Lights PackTM DLC
  renderer.shadowMapEnabled = true;
}
// DRAW --------------------------------------------------------- //
function draw() {
  //Status Bar ///////////////////////////
  if (sb) {
    statusbar.textContent = "Time: " + (pieceClock / 1000).toFixed(2) + " " + "Frame: " + framect.toFixed(1) + " " + "Clock: " + (Date.now() / 1000).toFixed(2);
  }
  // MAIN TIMELINE THREE.JS SCENE
  renderer.render(scene, camera);
}
// UPDATE ------------------------------------------------------ //
function update(timestep) {
  framect++;
  //Clock //////////////////////////////////
  pieceClock += timestep;
  pieceClock = pieceClock - clockadj;
  //Tempo FRETS
  for (var i = 0; i < tfs.length; i++) {
    if (tfs[i][1].position.x >= gofretposx) {
      tfs[i][1].position.x -= pxPerFrame;
      tfs[i][2].position.x -= pxPerFrame;
    }
    if (tfs[i][1].position.x < 300) {
      if (tfs[i][0]) {
        tfs[i][0] = false;
        scene.add(tfs[i][1]);
        scene.add(tfs[i][2]);
      }
    }
    if(tfs[i][1].position.x < gofretposx) {
      scene.remove(scene.getObjectByName(tfs[i][1].name));
      scene.remove(scene.getObjectByName(tfs[i][2].name));
      tfs.splice(i,1);
    }
  }
}
// ANIMATION ENGINE -------------------------------------------- //
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
