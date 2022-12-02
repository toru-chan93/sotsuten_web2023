//////////
// test //
//////////

console.log("Hello, World");
console.log("Hello, Japan");
console.log("Hello, EN");

///////////////
// hamburger //
///////////////

window.addEventListener("load", function () {
  const ham = document.getElementById("js-ham");
  const nav = document.getElementById("js-nav");
  if (!ham) {
    console.log("!ham");
  }

  ham.addEventListener("click", function () {
    console.log("OK");
    console.log(window.pageYOffset);
    console.log(window.outerHeight);
    nav.classList.toggle("js-nav__in");
  });
});

////////////
// header //
////////////
const hed = document.getElementById("js-header");
window.addEventListener("scroll", function () {
  // メディアクエリ
  if (window.matchMedia("(min-width: 768px)").matches) {
    console.log("mq!");
    // urlの取得
    let url = location.href;
    if (url == "http://localhost:8080/index.html") {
      if (window.pageYOffset > window.outerHeight - 100) {
        console.log("ヨイショ");
        hed.classList.add("js-fadein");
      }
    } else {
      hed.classList.add("js-fadein");
    }
  } else {
    console.log("mq?");
    return false;
  }
});

// hellow world

import p5 from "p5";
import { sketch } from "./sketch.js";

// document.body.style.margin = "0";

const app = new p5(sketch, document.body);
