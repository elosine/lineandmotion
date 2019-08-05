
// var godown = true;
//
//
// //Ictusorb////////////////////////////
//   ictusorb.setAttributeNS(null, "fill", 'rgb(254,102,1)');
//   ictusorb.setAttributeNS(null, "cx", goOffset);
//   ictusorb.setAttributeNS(null, "cy", ioipos);
//   ictusorb.setAttributeNS(null, "r", io.radius);
//   ictusorb.setAttributeNS(null, 'filter', 'url(#neonorange)');
//   svgEventAction.appendChild(ictusorb);
//   dfr = durframes(g, acc, io.vel, io.pos, (svgEventAction_bbox.height - io.radius));
//   console.log("ictus dur frames: " + dfr);
//
//   //Ictus Orb////////////////////////////
//   if (framect > (durfrm_csr - dfr)) startorb = true;
//   if (startorb) {
//     if (godown) {
//       g *= acc;
//       io.vel += g * (1.0 / frmRate);
//       io.pos += io.vel * (1.0 / frmRate) * 100;
//       ictusorb.setAttributeNS(null, 'cy', io.pos);
//     } else {
//       g *= decel;
//       io.vel -= g * (1.0 / frmRate);
//       io.vel = Math.abs(io.vel);
//       io.pos -= io.vel * (1.0 / frmRate) * 100;
//       io.pos = Math.max(ioipos, io.pos);
//       ictusorb.setAttributeNS(null, 'cy', io.pos);
//     }
//
//     if (io.pos > svgEventAction_bbox.height - io.radius) {
//       godown = false;
//       console.log("bb:" + framect);
//     }
//   }

// export default class Ictusbb{
  // constructor(iy, zy, ivel, r, g, acc, decel, gotime){
  //   this.iy = iy;
  //   this.zy = zy;
  //   this.ivel = ivel;
  //   this.r = r;
  //   this.g = g;
  //   this.acc = acc;
  //   this.decel = decel;
  //   this.gotime = gotime;
  // }
  //
  // var durframes = function() {
  //   var frct = 0;
  //   var pos = iy;
  //   var lg = g;
  //   var vel = ivel;
  //   while (pos <= zy) {
  //     lg *= acc;
  //     vel += lg * (1.0 / frmRate);
  //     pos += vel * (1.0 / frmRate) * 100;
  //     frct++;
  //   }
  //
  //   return frct;
  // }

// }

 export class Ictusbb{
   constructor(){}
  // constructor(iy, zy, ivel, r, g, acc, decel, gotime){
  //   this.iy = iy;
  //   this.zy = zy;
  //   this.ivel = ivel;
  //   this.r = r;
  //   this.g = g;
  //   this.acc = acc;
  //   this.decel = decel;
  //   this.gotime = gotime;
  // }
  //
  // var durframes = function() {
  //   var frct = 0;
  //   var pos = iy;
  //   var lg = g;
  //   var vel = ivel;
  //   while (pos <= zy) {
  //     lg *= acc;
  //     vel += lg * (1.0 / frmRate);
  //     pos += vel * (1.0 / frmRate) * 100;
  //     frct++;
  //   }
  //
  //   return frct;
  // }

}
