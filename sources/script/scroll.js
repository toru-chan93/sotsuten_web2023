console.log("hi! scroll.js is loaded!")

//Intersection Observer
const sections = document.querySelectorAll(".js-section");
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
}

const observer = new IntersectionObserver(callback, options);
sections.forEach(section => {
  observer.observe(section)
});

let callback = (entries, observer) => {
  entries.forEach(entry => {
    entry.time
  })

}