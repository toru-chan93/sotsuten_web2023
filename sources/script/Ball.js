import p5 from "p5";

export class Ball {
  constructor(p, location, velocity, diameter, mass) {
    this.p = p;
    this.r = location;
    this.v = velocity;
    this.d = diameter;
    this.a = p.createVector(0, 0);
    this.m = mass;
  }
  run() {
    this.update();
    this.display();
  }
  update() {
    this.v.add(this.a);
    this.r.add(this.v);
    this.a.mult(0);
    this.collide();
  }
  collide() {
    const [x, y] = [this.r.x, this.r.y];
    const r = this.d / 2;
    const [w, h] = [this.p.windowWidth, this.p.windowHeight];
    const decay = 0.9;
    if (x - r < 0) {
      this.v.x *= -decay;
      this.r.x = r;
    }
    if (w < x + r) {
      this.v.x *= -decay;
      this.r.x = w - r;
    }
    if (y - r < 0) {
      this.v.y *= -decay;
      this.r.y = r;
    }
    if (h < y + r) {
      this.v.y *= -decay;
      this.r.y = h - r;
    }
  }
  applyForce(f) {
    let a = p5.Vector.div(f, this.m);
    this.a.add(a);
  }
  display() {
    const p = this.p;
    p.noStroke();
    p.fill(255);
    p.ellipse(this.r.x, this.r.y, 50, 50);
  }
}
