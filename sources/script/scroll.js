console.log("hi! scroll.js is loaded!")
import { neko } from "./lib/neko-lib";

let timer;
export let selector;
let start_pos_y;
let target_pos_y;
let event_scale;

window.addEventListener('DOMContentLoaded', function(){
  //Intersection Observer
  const sections = document.querySelectorAll(".js-section");
  const options = {
    root: null,
    rootMargin: "-10px",
    threshold: 0,
  }

  const observer = new IntersectionObserver(doWhenIntersect, options);
  sections.forEach(section => {
    observer.observe(section)
  });

  function doWhenIntersect (entries) {
    entries.forEach( (entry) => {
      if (entry.isIntersecting) {
        for (let i = 0; i < sections.length; i++) {
          if (sections[i] == entry.target) {
            selector = i;
          }
        }
        //selector = entry.target.offsetTop / window.innerHeight
        timer = new neko.Timer(800)
        timer.start();
        console.log(entry.target);
        start_pos_y = window.scrollY;
        target_pos_y = entry.target.offsetTop;
        requestAnimationFrame(loop);
      }
    });
  }

});

function loop() {
  const ease = neko.Easing.easeOutQuart(timer.getProgress())
  const distance = start_pos_y - target_pos_y;
  //console.log(target_pos_y)
  window.scrollTo(0, start_pos_y + distance * -ease);
  if(timer.getProgress() < 1) {
    requestAnimationFrame(loop);
  }
}