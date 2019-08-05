class Tlcsr {
  constructor(id, startTime) {
    this.id = id;
    this.startTime = startTime;
    this.startPx = this.startTime * pxPerSec;
    this.x = this.startPx + goOffset;
    this.targetFrm = Math.round(this.startTime * frmRate);
    this.csr = document.createElementNS(svgNS, "line");
    this.csr.setAttributeNS(null, "id", "csr" + this.id);
    this.csr.setAttributeNS(null, "x1", this.x);
    this.csr.setAttributeNS(null, "y1", 5);
    this.csr.setAttributeNS(null, "x2", this.x);
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
    this.numFrmsTilGo = this.targetFrm - framect;
    console.log(this.numFrmsTilGo);
    this.dx = (this.numFrmsTilGo * pxPerFrame) + goOffset;
    this.csr.setAttributeNS(null, "x1", this.dx);
    this.csr.setAttributeNS(null, "x2", this.dx);
  }

}
