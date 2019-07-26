var width = 500;
var height = 400;
var canvas = ctx = false;
var frameRate = 1 / 60; // Seconds
var frameDelay = frameRate * 1000; // ms
var loopTimer = false;
var ballx = width / 2;

var ipos = 30;

var ball = {
  pos: ipos,
  vel: 3,
  radius: 15, // 1px = 1cm
};

var g = 8.81; // m / s^2
var acc = 1.25;
var decel = 0.3;
var godown = true;


var durframes = function(g, acc, ivel, ipos, fpos) {
  var frct = 0;
  var pos = ipos;
  var lg = g;
  var vel = ivel;
  while (pos <= fpos) {
    lg *= acc;
    vel += lg * frameRate;
    pos += vel * frameRate * 100;
    frct++;
  }

  return frct;
}

var setup = function() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  ctx.fillStyle = 'red';
  ctx.strokeStyle = '#000000';
  loopTimer = setInterval(loop, frameDelay);
  var dfr = durframes(g, acc, ball.vel, ball.pos, (height - ball.radius));
  console.log(dfr);
}

var loop = function() {
  if (godown) {
    g *= acc;
    ball.vel += g * frameRate;
    ball.pos += ball.vel * frameRate * 100;
  } else {
    g *= decel;
    ball.vel -= g * frameRate;
    ball.vel = Math.abs(ball.vel);
    ball.pos -= ball.vel * frameRate * 100;
    ball.pos = Math.max(ipos, ball.pos);
  }

  if (ball.pos > height - ball.radius) {
    godown = false;
  }
  if (ball.pos < ipos + ball.radius) {
  //  ball.vel = 0;
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
