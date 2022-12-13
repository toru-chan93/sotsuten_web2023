console.log("hi! scroll.js is loaded!")
import { neko } from "./lib/neko-lib";

let timer;
export let selector;
let start_pos_y;
let target_pos_y;
let event_scale;

const ua = window.navigator.userAgent.toLowerCase();
console.log(ua);
if (selector != undefined && ua.indexOf("mac os x") !== -1) {
  //document.addEventListener('touchmove', scrollSetting, { passive: false });
document.addEventListener('wheel', scrollSetting, { passive: false });
}

function scrollSetting(e) {
  e.preventDefault();
  window.scrollBy(e.deltaX, e.deltaY / 4);
}

function NoScroll(event) {
  event.preventDefault();
}

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
        //document.removeEventListener('touchmove', scrollSetting, { passive: false });
        document.removeEventListener('wheel', scrollSetting, { passive: false });
        document.addEventListener('touchmove', NoScroll, { passive: false });
        document.addEventListener('wheel', NoScroll, { passive: false });
        loop();
      }
    });
  }

});

function loop() {
  const ease = neko.Easing.easeOutQuart(timer.getProgress());
  const distance = start_pos_y - target_pos_y;
  //console.log(target_pos_y)
  window.scrollTo(0, start_pos_y + distance * -ease);
  //document.body.style.position = 'fixed';
  if(timer.getCompleat()) {
    //document.addEventListener('touchmove', scrollSetting, { passive: false });
    if (selector != 0 && ua.indexOf("mac os x") !== -1) document.addEventListener('wheel', scrollSetting, { passive: false });
    document.removeEventListener('touchmove', NoScroll, { passive: false });
    document.removeEventListener('wheel', NoScroll, { passive: false });
  } else {
    requestAnimationFrame(loop);
  }
}