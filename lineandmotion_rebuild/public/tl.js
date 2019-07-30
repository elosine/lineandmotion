class Tlevent {
  constructor(id, x) {
    this.id = id;
    this.x = x;
    this.csr = document.createElementNS(svgNS, "line");
    this.csr.setAttributeNS(null, "id", "csr" + this.id);
    this.csr.setAttributeNS(null, "x1", l1x);
    this.csr.setAttributeNS(null, "y1", 5);
    this.csr.setAttributeNS(null, "x2", l1x);
    this.csr.setAttributeNS(null, "y2", 75);
    this.csr.setAttributeNS(null, "stroke-width", 8);
    this.csr.setAttributeNS(null, "stroke-linecap", 'round');
    this.csr.setAttributeNS(null, "stroke", 'rgb(243, 243, 21)');
    this.csr.setAttributeNS(null, 'filter', 'url(#neonyellow)');
    this.csr.setAttributeNS(null, 'transform', 'translate(0, 0)');
    this.csr.setAttributeNS(null, 'style', "mix-blend-mode: multiply");
    blendgroup.appendChild(this.csr);
  }

  move(dx){
    this.csr.setAttributeNS(null, "x1", dx);
    this.csr.setAttributeNS(null, "x2", dx);
  }

}
