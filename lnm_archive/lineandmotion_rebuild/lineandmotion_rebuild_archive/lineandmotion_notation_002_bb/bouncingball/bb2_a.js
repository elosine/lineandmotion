/* Burak Kanber */
var width = 500;
var height = 400;
var canvas = ctx = false;
var frameRate = 1 / 60; // Seconds
var frameDelay = frameRate * 1000; // ms
var loopTimer = false;
var ballx = width / 2;

var ball = {
  pos: 100,
  vel: 0,
  radius: 15, // 1px = 1cm
  restitution: -0.9
};

var g = 9.81; // m / s^2
var accOG = 1.06;
var acc = accOG;
var decel = 0.1;
var dir = 1;

var setup = function() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  ctx.fillStyle = 'red';
  ctx.strokeStyle = '#000000';
  loopTimer = setInterval(loop, frameDelay);
}
var loop = function() {
  // Handle collisions
if (ball.pos > height - ball.radius) {
  dir = -1;
  g = 9.81;
 acc = 0.01;
 ball.vel = -ball.vel;
 ball.vel *= dir;
  ball.pos = height - ball.radius;
}
  // Calculate acceleration ( F = ma )
  g *= acc;
  var ay = g ;
  // Integrate to get velocity
  ball.vel += ay * frameRate;

  // Integrate to get position
  ball.pos += ball.vel * frameRate * 100;


  if (ball.pos < ball.radius) {
    dir = 1;
    g = 9.81;
    ball.vel *= dir;
    acc = accOG;
    ball.vel = 0;
    ball.pos = ball.radius;
  }
  // Draw the ball
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.translate(ballx, ball.pos);
  ctx.beginPath();
  ctx.arc(0, 0, ball.radius, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.closePath();
  ctx.restore();

}
setup();
