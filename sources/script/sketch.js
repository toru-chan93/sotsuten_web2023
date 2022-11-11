import { Ball } from "./Ball";

export const sketch = (p) => {
  let ball;
  p.setup = () => {
    p.createCanvas(p.windowWidth / 2, p.windowHeight / 2);
    ball = new Ball(
      p,
      p.createVector(p.windowWidth / 4, p.windowHeight / 4),
      p.createVector(10, -20),
      50,
      10
    );
  };
  p.draw = () => {
    p.background("#fff020");
    ball.applyForce(p.createVector(0, 9.8));
    ball.run();
  };
};
