var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d'),
  width = canvas.width,
  height = canvas.height;

  var coord = [];

  var plot = function plot(fn, range) {
    var widthScale = (width / (range[1] - range[0])),
      heightScale = (height / (range[3] - range[2])),
      first = true;

    ctx.beginPath();

    for (var x = 0; x < width; x++) {
      var xFnVal = (x / widthScale) - range[0],
        yGVal = (fn(xFnVal) - range[2]) * heightScale;

      yGVal = height - yGVal; // 0,0 is top-left

      if (first) {
        ctx.moveTo(x, yGVal);
        first = false;
        coord.push(yGVal);
      } else {
        ctx.lineTo(x, yGVal);
        coord.push(yGVal);
      }
    }

    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.stroke();
    console.log(coord);
  };

  function rads(deg){
    return (deg * Math.PI)/180;
  }

//plot( function(x) {return Math.sin(x) + Math.sin(x * 2);}, [0, Math.PI * 2, -2, 2] );
//plot( function(x) {return Math.sin(x) + Math.sin(x * 2);}, [rads(-305), rads(55), -2, 2] );
plot( function(x) {return Math.pow(x, 3);}, [0, 1, 0, 1] );
