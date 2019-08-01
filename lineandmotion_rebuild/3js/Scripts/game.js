// ------------------------------------- //
// ------- GLOBAL VARIABLES ------------ //
// ------------------------------------- //

// scene object variables
var renderer, scene, camera, pointLight, spotLight;
// field variables
var fieldLength = 700;
var fieldWidth = 150;
// ball variables
var ball;
var ballSpeed = 2;

function setup() {
  createScene();
  draw();
}

function createScene() {

  // set the scene size
  var WIDTH = 500,
    HEIGHT = 500;
  // Camera attributes
  var VIEW_ANGLE = 70,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;
  var c = document.getElementById("gameCanvas");
  // create a WebGL renderer, camera
  // and a scene
  renderer = new THREE.WebGLRenderer();
  camera =
    new THREE.PerspectiveCamera(
      VIEW_ANGLE,
      ASPECT,
      NEAR,
      FAR);
  scene = new THREE.Scene();
  // add the camera to the scene
  scene.add(camera);
  // set a default position for the camera
  camera.position.x = -(fieldLength / 2) - 83;
  camera.position.z = 80;
  camera.rotation.y = -60 * Math.PI / 180;
  camera.rotation.z = -90 * Math.PI / 180;
  // start the renderer
  renderer.setSize(WIDTH, HEIGHT);
  // attach the render-supplied DOM element
  c.appendChild(renderer.domElement);
  // set up the playing surface plane
  var planeLength = fieldLength;
  var planeWidth = fieldWidth;
  var planeQuality = 10;
  // create the plane's material
  var planeMaterial =
    new THREE.MeshLambertMaterial({
      color: 0x4BD121
    });
  // create the table's material
  var tableMaterial =
    new THREE.MeshLambertMaterial({
      color: 0x111111
    });
  // create the playing surface plane
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

  var table = new THREE.Mesh(
    new THREE.CubeGeometry(
      planeLength * 1.01, // this creates the feel of a billiards table, with a lining
      planeWidth * 1.02,
      10, // an arbitrary depth, the camera can't see much of it anyway
      planeQuality,
      planeQuality,
      1
    ),
    tableMaterial
  );
  table.position.z = -6; // we sink the table into the ground by 50 units. The extra 1 is so the plane can be seen
  scene.add(table);
  table.receiveShadow = true;
  // // set up the sphere vars
  // lower 'segment' and 'ring' values will increase performance
  var radius = 7,
    segments = 6,
    rings = 6;
  // // create the sphere's material
  var sphereMaterial =
    new THREE.MeshLambertMaterial({
      color: 0xD43001
    });
  // Create a ball with sphere geometry
  ball = new THREE.Mesh(
    new THREE.SphereGeometry(
      radius,
      segments,
      rings
    ),
    sphereMaterial
  );

  // // add the sphere to the scene
  scene.add(ball);
  ball.position.x = fieldLength / 2;
  ball.position.y = (fieldWidth / 2) - 20;
  // set ball above the table surface
  ball.position.z = radius;
  ball.receiveShadow = true;
  ball.castShadow = true;

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
  // this is important for casting shadows
  spotLight = new THREE.SpotLight(0xF8D898);
  spotLight.position.set(0, 0, 460);
  spotLight.intensity = 1.5;
  spotLight.castShadow = true;
  scene.add(spotLight);
  // MAGIC SHADOW CREATOR DELUXE EDITION with Lights PackTM DLC
  renderer.shadowMapEnabled = true;
}

function draw() {
  // draw THREE.JS scene
  renderer.render(scene, camera);
  // loop draw function call
  requestAnimationFrame(draw);
  ballPhysics();
}

function ballPhysics() {
  // we can easily notice shadows if we dynamically move lights during the game
  spotLight.position.x = ball.position.x * 2;
  spotLight.position.y = ball.position.y * 2;
  // animate ball if not off table
  if (ball.position.x >= -fieldLength / 2) {
    ball.position.x -= ballSpeed;
  }
  else{
    ball.position.z -= ballSpeed;
  }
}
