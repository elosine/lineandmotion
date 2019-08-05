class Bb {
  constructor(id, gotime, r, bbalgo, usalgo) {
    this.id = id;
    this.gotime = gotime;
    this.goframe = this.gotime * frmRate;
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
        var crvw = 180;
        this.crvdata = plot(
          function(x) {
            return Math.pow(x, 3.3)
          },
          [0, 1, 0, 1],
          goOffset - crvw,
          this.iy,
          crvw, ea_height - this.iy
        );
        this.crvdur = 0.7;
        this.crvdurpx = this.crvdata[2];
        this.crvnumframes = frmRate * this.crvdur;
        this.crvinc = this.crvdurpx / this.crvnumframes;
        this.crvi = 0;
        this.crvi2 = 0;
        this.makecrv = true;
        this.upswingpause = 0.14;
        break;

      default:
        var crvw = 180;
        this.crvdata = plot(
          function(x) {
            return Math.pow(x, 3)
          },
          [0, 1, 0, 1],
          goOffset - crvw,
          this.iy,
          crvw, ea_height - this.iy
        );
        this.crvdur = 0.55;
        this.crvdurpx = this.crvdata[2];
        this.crvnumframes = frmRate * this.crvdur;
        this.crvinc = this.crvdurpx / this.crvnumframes;
        this.crvi = 0;
        this.crvi2 = 0;
        this.makecrv = true;
        break;
    }

    this.godown = true;
    this.g = this.ig;
    this.vel = this.ivel;
    this.pos = this.iy;
    this.dfr = this.durframes();
    this.makeball = true;
    this.startupswing = false;
    this.tlcsr = new Tlcsr(this.id + "bb", this.gotime);
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
    this.tlcsr.move();
    if (framect > (this.goframe - this.dfr - this.crvnumframes - (this.upswingpause * frmRate))) {

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
        this.crvline = document.createElementNS(svgNS, 'line');
        this.crvline.setAttributeNS(null, 'stroke', 'rgb(254,102,1)');
        this.crvline.setAttributeNS(null, 'stroke-width', '6');
        this.crvline.setAttributeNS(null, "stroke-linecap", 'round');
        this.crvline.setAttributeNS(null, 'filter', 'url(#neonorange)');
        this.crvline.setAttributeNS(null, 'x1', goOffset);
        this.crvline.setAttributeNS(null, 'y1', this.iy);
        this.crvline.setAttributeNS(null, 'x2', goOffset);
        this.crvline.setAttributeNS(null, 'y2', this.zy);
        svgEventAction.appendChild(this.crvline);
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
        this.startupswing = true;
      }

      //Upswing for Ictus////////////////////////////
      if (this.startupswing) {
        if (this.crvi2 < this.crvdata[2]) {
          this.cf.setAttributeNS(null, 'cx', this.crvdata[1][this.crvi2].x);
          this.cf.setAttributeNS(null, 'cy', this.crvdata[1][this.crvi2].y);
          this.crvi++;
          this.crvi2 = Math.floor(this.crvi * this.crvinc);
        } else {
          //   // this.cf.setAttributeNS(null, 'cx', this.crvdata[1][this.crvdata[2] - 1].x);
          //   // this.cf.setAttributeNS(null, 'cy', this.crvdata[1][this.crvdata[2] - 1].y);
        }
        //  startupswing = false;
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
        var cftorem = document.getElementById('cf' + this.id);
        cftorem.parentNode.removeChild(cftorem);
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
