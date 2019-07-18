var svgel = document.getElementById('svgelement');
var svgel_bbox = svgel.getBoundingClientRect('svgel');
var width = svgel_bbox.width;
var height = svgel_bbox.height;
var svgNS = "http://www.w3.org/2000/svg";


var plot = function plot(fn, range) {
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
      coord.push("M" + x);
      coord.push(yGVal);
    } else {
      coord.push("L" + x);
      coord.push(yGVal);
    }
  }
  for (var i = 0; i < coord.length; i++) {

    if (i == 0) {
      pathstring = coord[i];
    } else {
      pathstring = pathstring.concat(" " + coord[i]);
    }
  }
  var crv = document.createElementNS(svgNS, 'path');
  crv.setAttributeNS(null, 'stroke', 'rgb(153,255,0)');
  crv.setAttributeNS(null, 'stroke-width', '8');
  crv.setAttributeNS(null, 'fill', 'none');
  crv.setAttributeNS(null, 'd', pathstring);
  svgelement.appendChild(crv);
}

function rads(deg) {
  return (deg * Math.PI) / 180;
}

plot( function(x) {return Math.sin(x) + Math.sin(x * 2);}, [0, Math.PI * 2, -2, 2] );
//plot( function(x) {return Math.sin(x) + Math.sin(x * 2);}, [rads(-305), rads(55), -2, 2] );
//plot( function(x) { return Math.pow(x, 1.6); }, [0, 1, 0, 1] );
