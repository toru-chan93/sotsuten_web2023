import { Ball } from "./Ball";
import { neko } from "./lib/neko-lib";
import { selector } from "./scroll";

export const sketch = (p) => {
  let img;

  let p_selector;

  let e_animation_scale;
  let e_scroll_scale;
  let e_scroll_real_scale;
  let e_scroll_transform = {x: null, y: null};

  let section_scale;
  let section_real_scale;
  let section_transform;

  let hart_now_prop;

  window.addEventListener('scroll', function(){
    if (selector == 4) {
      sectionTargetValueSetting();
      hart_now_prop.transform = {x: section_transform[selector].x, y: section_transform[selector].y};
      scrollApply();
    }
  });

  p.windowResized = () => { // ウィンドウがリサイズされるたびにこの関数が自動的に実行される
    p.resizeCanvas(p.windowWidth, p.windowHeight); // キャンバスをリサイズする（createCanvasではないので注意）
    sectionTargetValueSetting();
    hartPropSetting();
    scrollApply();
  }

  p.preload = () => {
    img = p.loadImage("./assets/img/gap/hurt-gap.png")
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    sectionHartAnimationSetting();
    sectionTargetValueSetting();
    hartPropSetting();

    e_scroll_scale = new neko.Tween(hart_now_prop.scale);
    e_scroll_transform.x = new neko.Tween(hart_now_prop.transform.x);
    e_scroll_transform.y = new neko.Tween(hart_now_prop.transform.y);
  };

  p.draw = () => {
    //p.background("#fff020");
    p.clear();

    if(e_animation_scale.getCompleat()) {
      e_animation_scale.reset();
      e_animation_scale.execute();
    }

    hartPropUpdate()
    if (selector != p_selector) {
      console.log(selector);
      sectionHartAnimationSetting();
      scrollApply();
      p_selector = selector;
    }

    p.push();
      p.translate(hart_now_prop.transform.x, hart_now_prop.transform.y);
      p.scale(hart_now_prop.scale);
      p.scale(e_animation_scale.getValue());
      p.imageMode(p.CENTER);
      p.image(img, 0, 0, section_real_scale[selector], section_real_scale[selector]);
    p.pop();
  };

  function hartPropSetting() {
    hart_now_prop = {
      scale: section_scale[selector],
      transform: {x: section_transform[selector].x, y: section_transform[selector].y}
    };
  }

  function hartPropUpdate() {
    hart_now_prop = {
      scale: e_scroll_scale.getValue(),
      transform: {x: e_scroll_transform.x.getValue(), y: e_scroll_transform.y.getValue()}
    };
  }

  function sectionHartAnimationSetting() {
    if (selector == 2) {
      e_animation_scale = new neko.Tween(1.0);
      e_animation_scale.eventPush(0.965, 1, 400, neko.Easing.easeInQuart);
      e_animation_scale.eventPush(1, 0.95, 400, neko.Easing.easeInOutQuart);
      e_animation_scale.eventPush(0.95, 0.96, 1200, neko.Easing.easeInOutQuad);
      e_animation_scale.eventPush(0.96, 0.965, 1600);
      e_animation_scale.execute();
    } else {
      e_animation_scale = new neko.Tween(1.0);
      e_animation_scale.eventPush(0.99, 1, 400, neko.Easing.easeInQuart);
      e_animation_scale.eventPush(1, 0.98, 400, neko.Easing.easeInOutQuart);
      e_animation_scale.eventPush(0.98, 0.985, 1200, neko.Easing.easeInOutQuad);
      e_animation_scale.eventPush(0.985, 0.99, 1600);
      e_animation_scale.execute();
    }
  }

  function scrollApply() {
    e_animation_scale.cancel();
    if (selector == 2) {
      e_scroll_scale = new neko.Tween(hart_now_prop.scale);
      e_scroll_scale.eventPush(hart_now_prop.scale, section_scale[selector], 400, neko.Easing.easeOutQuint);
      e_scroll_scale.execute();

      e_scroll_transform.x = new neko.Tween(hart_now_prop.transform.x);
      e_scroll_transform.x.eventPush(hart_now_prop.transform.x, section_transform[selector].x, 400, neko.Easing.easeOutQuint);
      e_scroll_transform.x.execute();

      e_scroll_transform.y = new neko.Tween(hart_now_prop.transform.y);
      e_scroll_transform.y.eventPush(hart_now_prop.transform.y, section_transform[selector].y, 400, neko.Easing.easeOutQuint);
      e_scroll_transform.y.execute();
    } else {
      e_scroll_scale = new neko.Tween(hart_now_prop.scale);
      e_scroll_scale.eventPush(hart_now_prop.scale, section_scale[selector], 400, neko.Easing.easeOutQuint);
      e_scroll_scale.execute();

      e_scroll_transform.x = new neko.Tween(hart_now_prop.transform.x);
      e_scroll_transform.x.eventPush(hart_now_prop.transform.x, section_transform[selector].x, 400, neko.Easing.easeOutQuad);
      e_scroll_transform.x.execute();

      e_scroll_transform.y = new neko.Tween(hart_now_prop.transform.y);
      e_scroll_transform.y.eventPush(hart_now_prop.transform.y, section_transform[selector].y, 400, neko.Easing.easeOutQuad);
      e_scroll_transform.y.execute();
    }
    e_animation_scale.execute();
  }

  function sectionTargetValueSetting() {
    let map = document.querySelector(".access-contents__map");
    let footer = document.querySelector(".footer");

    if (p.width > p.height) {
      section_real_scale = [p.height, p.height, map.clientWidth, p.height, footer.clientHeight * 2];
    } else {
      section_real_scale = [p.width, p.width, map.clientWidth, p.width, footer.clientHeight * 2];
    }
    section_scale = [0.995, 0.6, 0.21, 0, 0.47]
    section_transform = [
      {x: p.width / 2, y: p.height / 2},
      {x: p.width / 2 + p.width * 0.05, y: p.height / 2 - p.height * 0.07},
      {
        x: map.getBoundingClientRect().left + map.clientWidth * 0.7815,
        y: (map.getBoundingClientRect().top + window.pageYOffset) - window.innerHeight * 2 + map.clientWidth * 0.236
      },
      {x: p.width / 2, y: p.height / 2},
      {
        x: footer.clientHeight * 0.5,
        y: footer.getBoundingClientRect().top + footer.clientHeight / 2
      }
    ];
  }
};
