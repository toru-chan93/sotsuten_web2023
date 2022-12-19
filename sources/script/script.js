//////////
// test //
//////////

console.log("Hello, World");

////////////////////
// hamburger (sp) //
///////////////////

window.addEventListener("load", function () {
  const ham = document.getElementById("js-ham");
  const nav = document.getElementById("js-nav");
  if (!ham) {
    return false;
  }

  // navigationの表示
  ham.addEventListener("click", function () {
    nav.classList.toggle("js-nav__in");
  });
});

/////////////////
// header (pc) //
////////////////

const hed = document.getElementById("js-header");
window.addEventListener("scroll", function () {
  // pcサイズならheader(pc)を表示
  if (window.matchMedia("(min-width: 768px)").matches) {
    // topページか否かの確認
    let url = location.href;
    if (
      url == "http://localhost:8080/index.html" ||
      url == "http://localhost:8080/" ||
      url == "https://integrated.jp/gw23/" ||
      url == "https://integrated.jp/gw23/index.html"
    ) {
      // topページのみ遅れてheader(pc)を表示
      if (window.pageYOffset > window.outerHeight - 100) {
        console.log("ヨイショ!!");
        hed.classList.remove("js-fadeout");
        hed.classList.add("js-fadein");
      } else {
        hed.classList.remove("js-fadein");
        hed.classList.add("js-fadeout");
      }
    } else {
      hed.classList.add("js-fadein");
    }
  } else {
    return false;
  }
});

// hellow world

import p5 from "p5";
import { sketch } from "./sketch.js";

// document.body.style.margin = "0";

const app = new p5(sketch, document.body);
