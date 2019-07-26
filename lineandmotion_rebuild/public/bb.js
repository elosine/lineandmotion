class Bb {
  constructor(id, gotime, r, bbalgo, usalgo) {
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

    switch (usalgo) {
      case 0:
        this.crvdata = plot(
          function(x) {
            return Math.pow(x, 7)
          },
          [0, 1, 0, 1],
          50,
          this.iy,
          goOffset - 50, ea_height - this.iy - 15
        );
        this.crvdur = 0.55;
        this.crvdurpx = this.crvdata[2];
        this.crvnumframes = frmRate * this.crvdur;
        this.crvinc = this.crvdurpx / this.crvnumframes;
        this.crvi = 0;
        this.makecrv = true;
        break;
      default:
        this.crvdata = plot(
          function(x) {
            return Math.pow(x, 7)
          },
          [0, 1, 0, 1],
          50,
          this.iy,
          goOffset - 50, ea_height - this.iy - 15
        );
        this.crvdur = 0.55;
        this.crvdurpx = this.crvdata[2];
        this.crvnumframes = frmRate * this.crvdur;
        this.crvinc = this.crvdurpx / this.crvnumframes;
        this.crvi = 0;
        this.makecrv = true;
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
    if (framect > (this.goframe - this.dfr - this.crvnumframes)) {
      if (this.makecrv) {
        //MAKE UPSWING CURVE /////////////
        this.uscrv = document.createElementNS(svgNS, 'path');
        this.uscrv.setAttributeNS(null, 'id', 'uscrv' + this.id);
        this.uscrv.setAttributeNS(null, 'stroke', 'rgb(254,102,1)');
        this.uscrv.setAttributeNS(null, 'stroke-width', '6');
        this.uscrv.setAttributeNS(null, "stroke-linecap", 'round');
        this.uscrv.setAttributeNS(null, 'fill', 'none');
        this.uscrv.setAttributeNS(null, 'filter', 'url(#neonorange)');
        this.uscrv.setAttributeNS(null, 'd', this.crvdata[0]);
        svgEventAction.appendChild(this.uscrv);
        //MAKE CURVE FOLLOWER /////////////
        this.cf = document.createElementNS(svgNS, 'circle');
        this.cf.setAttributeNS(null, 'id', 'cf' + this.id);
        this.cf.setAttributeNS(null, 'fill', 'rgb(254,102,1)');
        this.cf.setAttributeNS(null, 'r', this.r);
        this.cf.setAttributeNS(null, 'filter', 'url(#neonorange)');
        this.cf.setAttributeNS(null, 'cx', this.crvdata[1][0].x);
        this.cf.setAttributeNS(null, 'cy', this.crvdata[1][0].y);
        svgEventAction.appendChild(this.cf);
        this.makecrv = false;
      }
    }

    if (framect > (this.goframe - this.dfr)) {
      if (this.makeball) {
        //MAKE BB //////////////////////
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
