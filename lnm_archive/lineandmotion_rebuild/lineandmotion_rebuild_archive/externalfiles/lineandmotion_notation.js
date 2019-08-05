var goOffset = 250.0;
var svgNS = "http://www.w3.org/2000/svg";
var svgtl = document.getElementById("timeline_svg");



//GO Line //////////////////////////
var goline = document.createElementNS(svgNS, "line");
goline.setAttributeNS(null, "id", 'goline');
goline.setAttributeNS(null, "x1", goOffset);
goline.setAttributeNS(null, "y1", 5);
goline.setAttributeNS(null, "x2", goOffset);
goline.setAttributeNS(null, "y2", 75);
goline.setAttributeNS(null, "stroke-width", 8);
goline.setAttributeNS(null, "stroke-linecap", 'round');
goline.setAttributeNS(null, "stroke", 'rgb(0, 249, 255)');
goline.setAttributeNS(null, 'filter', 'url(#neonblue)');
svgtl.appendChild(goline);

var user = new TryClass("JDawg");
user.speak();
