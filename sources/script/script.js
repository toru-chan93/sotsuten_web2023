console.log("Hello, World");
console.log("Hello, Japan");
console.log("Hello, EN");

window.addEventListener("load", function () {
  const ham = document.getElementById("js-ham");
  const nav = document.getElementById("js-nav");
  if (!ham) {
    console.log("!ham");
  }

  ham.addEventListener("click", function () {
    console.log("OK");
    nav.classList.toggle("js-nav__in");
  });
});

// hellow worldß

import p5 from "p5";
import { sketch } from "./sketch.js";

// document.body.style.margin = "0";

const app = new p5(sketch, document.body);
