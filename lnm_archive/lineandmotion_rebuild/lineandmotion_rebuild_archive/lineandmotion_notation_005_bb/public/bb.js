class Bb {
  constructor(id, gotime, r, bbalgo) {
    this.id = id;
    this.goframe = gotime * frmRate;
    this.r = r;
    this.iy = r + 5;
    this.zy = ea_height - this.r;
    switch (bbalgo) {
      case 0:
        this.ivel = 13;
        this.ig = 0.17;
        this.acc = 1.21;
        this.decel = 0.82;
        break;
      default:
        this.ivel = 13;
        this.ig = 0.17;
        this.acc = 1.21;
        this.decel = 0.82;
        break;
    }
    this.godown = true;
    this.g = this.ig;
    this.vel = this.ivel;
    this.pos = this.iy;
    this.dfr = this.durframes();
    this.makeball = true;
  }

  durframes() {
    var frct = 0;
    var pos = this.iy;
    var lg = this.ig;
    var vel = this.ivel;
    while (pos <= this.zy) {
      lg *= this.acc;
      vel += lg;
      pos += vel;
      frct++;
    }
    return frct;
  }

  drop() {
    if (framect > (this.goframe - this.dfr)) {
      if (this.makeball) {
        this.bbal = document.createElementNS(svgNS, 'circle');
        this.bbal.setAttributeNS(null, 'id', 'bb' + this.id);
        this.bbal.setAttributeNS(null, "fill", 'rgb(254,102,1)');
        this.bbal.setAttributeNS(null, "cx", goOffset);
        this.bbal.setAttributeNS(null, "cy", this.iy);
        this.bbal.setAttributeNS(null, "r", this.r);
        this.bbal.setAttributeNS(null, 'filter', 'url(#neonorange)');
        svgEventAction.appendChild(this.bbal);
        this.makeball = false;
      }
      if (this.godown) {
        this.g *= this.acc;
        this.vel += this.g;
        this.pos += this.vel;
        this.bbal.setAttributeNS(null, 'cy', this.pos);
      } else {
        this.g *= this.decel;
        this.vel -= this.g;
        this.vel = Math.abs(this.vel);
        this.pos -= this.vel;
        this.pos = Math.max(this.iy, this.pos);
        this.bbal.setAttributeNS(null, 'cy', this.pos);
      }

      if (this.pos > this.zy) {
        this.godown = false;
        // console.log("bb:" + framect);
      }
      if (framect == (this.goframe + (frmRate * 2))) {
        var bbtorem = document.getElementById('bb' + this.id);
        bbtorem.parentNode.removeChild(bbtorem);
      }
    }
  }

  remove() {
    var bbtorem = document.getElementById('bb' + this.id);
    bbtorem.parentNode.removeChild(bbtorem);
  }
}
