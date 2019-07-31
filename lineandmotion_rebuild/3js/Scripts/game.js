// --------------------------------------------- //
// ------- 3D PONG built with Three.JS --------- //
// -------- Created by Nikhil Suresh ----------- //
// -------- Three.JS is by Mr. doob  ----------- //
// --------------------------------------------- //

// ------------------------------------- //
// ------- GLOBAL VARIABLES ------------ //
// ------------------------------------- //

// scene object variables
var renderer, scene, camera, pointLight, spotLight;

// field variables
var fieldWidth = 400,
  fieldHeight = 200;

// paddle variables
var paddleWidth, paddleHeight, paddleDepth, paddleQuality;
var paddle1DirY = 0,
  paddle2DirY = 0,
  paddleSpeed = 3;

// ball variables
var ball, paddle1, paddle2;
var ballDirX = 1,
  ballDirY = 1,
  ballSpeed = 2;

// game-related variables
var score1 = 0,
  score2 = 0;
// you can change this to any positive whole number
var maxScore = 7;

// set opponent reflexes (0 - easiest, 1 - hardest)
var difficulty = 0.2;

// ------------------------------------- //
// ------- GAME FUNCTIONS -------------- //
// ------------------------------------- //

function setup() {
  // update the board to reflect the max score for match win
  document.getElementById("winnerBoard").innerHTML = "First to " + maxScore + " wins!";

  // now reset player and opponent scores
  score1 = 0;
  score2 = 0;

  // set up all the 3D objects in the scene
  createScene();

  // and let's get cracking!
  draw();
}

function createScene() {
  // set the scene size
  var WIDTH = 640,
    HEIGHT = 360;

  // set some camera attributes
  var VIEW_ANGLE = 50,
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
  // not doing this somehow messes up shadow rendering
  camera.position.z = 320;

  // start the renderer
  renderer.setSize(WIDTH, HEIGHT);

  // attach the render-supplied DOM element
  c.appendChild(renderer.domElement);

  // set up the playing surface plane
  var planeWidth = fieldWidth,
    planeHeight = fieldHeight,
    planeQuality = 10;

  // create the paddle1's material
  var paddle1Material =
    new THREE.MeshLambertMaterial({
      color: 0x1B32C0
    });
  // create the paddle2's material
  var paddle2Material =
    new THREE.MeshLambertMaterial({
      color: 0xFF4045
    });
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
      planeWidth * 0.95, // 95% of table width, since we want to show where the ball goes out-of-bounds
      planeHeight,
      planeQuality,
      planeQuality),

    planeMaterial);

  scene.add(plane);
  plane.receiveShadow = true;

  var table = new THREE.Mesh(

    new THREE.CubeGeometry(
      planeWidth * 1.05, // this creates the feel of a billiards table, with a lining
      planeHeight * 1.03,
      100, // an arbitrary depth, the camera can't see much of it anyway
      planeQuality,
      planeQuality,
      1),

    tableMaterial);
  table.position.z = -51; // we sink the table into the ground by 50 units. The extra 1 is so the plane can be seen
  scene.add(table);
  table.receiveShadow = true;

  // // set up the sphere vars
  // lower 'segment' and 'ring' values will increase performance
  var radius = 5,
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
      rings),

    sphereMaterial);

  // // add the sphere to the scene
  scene.add(ball);

  ball.position.x = 0;
  ball.position.y = 0;
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
  cameraPhysics();
}

function ballPhysics() {
  // if ball goes off the 'left' side (Player's side)
  if (ball.position.x <= -fieldWidth / 2) {
    // CPU scores
    score2++;
    // update scoreboard HTML
    document.getElementById("scores").innerHTML = score1 + "-" + score2;
    // reset ball to center
    resetBall(2);
    matchScoreCheck();
  }

  // if ball goes off the 'right' side (CPU's side)
  if (ball.position.x >= fieldWidth / 2) {
    // Player scores
    score1++;
    // update scoreboard HTML
    document.getElementById("scores").innerHTML = score1 + "-" + score2;
    // reset ball to center
    resetBall(1);
    matchScoreCheck();
  }

  // if ball goes off the top side (side of table)
  if (ball.position.y <= -fieldHeight / 2) {
    ballDirY = -ballDirY;
  }
  // if ball goes off the bottom side (side of table)
  if (ball.position.y >= fieldHeight / 2) {
    ballDirY = -ballDirY;
  }

  // update ball position over time
  ball.position.x += ballDirX * ballSpeed;
  ball.position.y += ballDirY * ballSpeed;

  // limit ball's y-speed to 2x the x-speed
  // this is so the ball doesn't speed from left to right super fast
  // keeps game playable for humans
  if (ballDirY > ballSpeed * 2) {
    ballDirY = ballSpeed * 2;
  } else if (ballDirY < -ballSpeed * 2) {
    ballDirY = -ballSpeed * 2;
  }
}

function cameraPhysics() {
  // we can easily notice shadows if we dynamically move lights during the game
  spotLight.position.x = ball.position.x * 2;
  spotLight.position.y = ball.position.y * 2;

  // move to behind the player's paddle
  camera.position.x = -290;
  camera.position.z = 102.32;

  // rotate to face towards the opponent
  camera.rotation.x = -0.00034906585039886593;
  camera.rotation.y = -60 * Math.PI / 180;
  camera.rotation.z = -90 * Math.PI / 180;
}

function resetBall(loser) {
  // position the ball in the center of the table
  ball.position.x = 0;
  ball.position.y = 0;

  // if player lost the last point, we send the ball to opponent
  if (loser == 1) {
    ballDirX = -1;
  }
  // else if opponent lost, we send ball to player
  else {
    ballDirX = 1;
  }

  // set the ball to move +ve in y plane (towards left from the camera)
  ballDirY = 1;
}

var bounceTime = 0;
// checks if either player or opponent has reached 7 points
function matchScoreCheck() {
  // if player has 7 points
  if (score1 >= maxScore) {
    // stop the ball
    ballSpeed = 0;
    // write to the banner
    document.getElementById("scores").innerHTML = "Player wins!";
    document.getElementById("winnerBoard").innerHTML = "Refresh to play again";
    // make paddle bounce up and down
    bounceTime++;
    paddle1.position.z = Math.sin(bounceTime * 0.1) * 10;
    // enlarge and squish paddle to emulate joy
    paddle1.scale.z = 2 + Math.abs(Math.sin(bounceTime * 0.1)) * 10;
    paddle1.scale.y = 2 + Math.abs(Math.sin(bounceTime * 0.05)) * 10;
  }
  // else if opponent has 7 points
  else if (score2 >= maxScore) {
    // stop the ball
    ballSpeed = 0;
    // write to the banner
    document.getElementById("scores").innerHTML = "CPU wins!";
    document.getElementById("winnerBoard").innerHTML = "Refresh to play again";
    // make paddle bounce up and down
    bounceTime++;
    paddle2.position.z = Math.sin(bounceTime * 0.1) * 10;
    // enlarge and squish paddle to emulate joy
    paddle2.scale.z = 2 + Math.abs(Math.sin(bounceTime * 0.1)) * 10;
    paddle2.scale.y = 2 + Math.abs(Math.sin(bounceTime * 0.05)) * 10;
  }
}
