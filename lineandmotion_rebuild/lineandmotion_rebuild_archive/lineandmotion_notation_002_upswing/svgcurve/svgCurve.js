var svgel = document.getElementById('svgelement');
var svgel_bbox = svgel.getBoundingClientRect('svgel');
var width = svgel_bbox.width;
var height = svgel_bbox.height;
var svgNS = "http://www.w3.org/2000/svg";


var plotSVGcurve = function plot(fn, range, ix, iy, width, height) {
  var coord = [];
  var pathstring;
  var widthScale = (width / (range[1] - range[0]));
  var heightScale = (height / (range[3] - range[2]));
  var first = true;

  for (var x = 0; x < width; x++) {
    var xFnVal = (x / widthScale) - range[0];
    var yGVal = (fn(xFnVal) - range[2]) * heightScale;

    yGVal = height - yGVal; // 0,0 is top-left

    if (first) {
      first = false;
      var xtemp = x + ix;
      var ytemp = yGVal + iy;
      coord.push({
        x: xtemp,
        y: ytemp
      });
      pathstring = "M" + xtemp + " " + ytemp;
    } else {
      var xtemp = x + ix;
      var ytemp = yGVal + iy;
      coord.push({
        x: xtemp,
        y: ytemp
      });
      pathstring = pathstring.concat(" L" + xtemp + " " + ytemp);
    }
  }
  var data = [pathstring, coord];
  return data
}
var crvs = {
  pow: {
    fun: function(x) {
      return Math.pow(x, 1.6)
    },
    range: [0, 1, 0, 1]
  },
  sin2: {
    fun: function(x) {return Math.sin(x) + Math.sin(x * 2);},
    range: [0, Math.PI * 2, -2, 2]
  },
  sin: {
    fun: function(x) {return Math.sin(x) + Math.sin(x * 2);},
    range: [rads(-305), rads(55), -2, 2]
  }

}
var crvdata = plotSVGcurve(crvs.sin.fun, crvs.sin.range, 0, 0, width, height);

var crv = document.createElementNS(svgNS, 'path');
crv.setAttributeNS(null, 'stroke', 'rgb(153,255,0)');
crv.setAttributeNS(null, 'stroke-width', '8');
crv.setAttributeNS(null, 'fill', 'none');
crv.setAttributeNS(null, 'd', crvdata[0]);
svgelement.appendChild(crv);

var ball = document.createElementNS(svgNS, 'circle');
ball.setAttributeNS(null, 'fill', 'rgb(255,255,0)');
ball.setAttributeNS(null, 'r', '13');
ball.setAttributeNS(null, 'cx', crvdata[1][100].x);
ball.setAttributeNS(null, 'cy', crvdata[1][100].y);
svgelement.appendChild(ball);

function rads(deg) {
  return (deg * Math.PI) / 180;
}

//plot( function(x) {return Math.sin(x) + Math.sin(x * 2);}, [0, Math.PI * 2, -2, 2] );
//plot( function(x) {return Math.sin(x) + Math.sin(x * 2);}, [rads(-305), rads(55), -2, 2] );
//plot( function(x) { return Math.pow(x, 1.6); }, [0, 1, 0, 1] );
